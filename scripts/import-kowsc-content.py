"""Import owner-authorized original content; preserve wording and existing routes.

Run after reviewing the source in a browser. --refresh refreshes the 159 public
detail records and 5 introduction records. Default rebuilds from raw snapshots.
No authenticated endpoints or source-site mutations are used.
"""
import argparse
import concurrent.futures
import hashlib
import html
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import urllib.parse
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
RESEARCH = ROOT / 'docs/research/kowsc'
RAW = RESEARCH / 'raw'
ORIGIN = 'http://5.78.131.126:8090'
BASE = json.loads((RESEARCH / 'import-base.json').read_text(encoding='utf-8'))
IMAGE = re.compile(r'!\[([^\]]*)\]\(([^)]+)\)')


def request(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'KOWSC-Renewal-Content-Import/1.0'})
    with urllib.request.urlopen(req, timeout=12) as response:
        return response.read(), response.headers.get_content_type()


def save_json(path, value):
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')


def refresh(post):
    kind, number = post['id'].split('-')[1:]
    endpoint = 'articles' if kind == 'article' else 'boards'
    data, _ = request(f'{ORIGIN}/api/{endpoint}/public/{number}')
    save_json(RAW / (post['id'] + '.json'), json.loads(data))


def absolute(url):
    return urllib.parse.urljoin(ORIGIN, html.unescape(url).strip())


class Assets(HTMLParser):
    def __init__(self):
        super().__init__(); self.urls = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag in ('img', 'video', 'audio', 'source'):
            for key in ('src', 'poster'):
                if attrs.get(key): self.urls.append(absolute(attrs[key]))


class CleanHTML(HTMLParser):
    allowed = set('p div span br hr h1 h2 h3 h4 h5 h6 b strong i em u s strike sub sup blockquote ul ol li table thead tbody tfoot tr th td caption colgroup col a img figure figcaption pre code video audio source'.split())
    void = {'br', 'hr', 'img', 'col', 'source'}

    def __init__(self, assets):
        super().__init__(convert_charrefs=False)
        self.output = []; self.assets = assets; self.blocked = 0

    def handle_starttag(self, tag, attrs):
        if tag in ('script', 'style', 'iframe', 'object'):
            self.blocked += 1; return
        if self.blocked or tag not in self.allowed: return
        clean = []
        for key, value in attrs:
            if value is None: continue
            if key in ('src', 'poster', 'href'):
                url = absolute(value)
                if urllib.parse.urlparse(url).scheme not in ('http', 'https', 'mailto', 'tel'): continue
                value = self.assets.get(url, url)
            elif key not in ('alt', 'title', 'colspan', 'rowspan', 'start', 'type'): continue
            clean.append(f'{key}="{html.escape(value, quote=True)}"')
        if tag == 'a': clean += ['target="_blank"', 'rel="noopener noreferrer"']
        if tag == 'img': clean += ['loading="lazy"', 'decoding="async"']
        if tag in ('video', 'audio'): clean += ['controls']
        if tag == 'table': self.output.append('<div class="source-table-wrap">')
        self.output.append('<' + tag + (' ' + ' '.join(clean) if clean else '') + '>')

    def handle_endtag(self, tag):
        if tag in ('script', 'style', 'iframe', 'object'):
            self.blocked = max(0, self.blocked - 1); return
        if not self.blocked and tag in self.allowed and tag not in self.void:
            self.output.append(f'</{tag}>')
            if tag == 'table': self.output.append('</div>')

    def handle_data(self, data):
        if not self.blocked: self.output.append(html.escape(data, quote=False))

    def handle_entityref(self, name):
        if not self.blocked: self.output.append('&' + name + ';')

    def handle_charref(self, name):
        if not self.blocked: self.output.append('&#' + name + ';')


def main():
    parser = argparse.ArgumentParser(); parser.add_argument('--refresh', action='store_true')
    args = parser.parse_args(); RAW.mkdir(exist_ok=True)
    if args.refresh:
        with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
            list(pool.map(refresh, BASE['sourcePosts']))
        data, _ = request(ORIGIN + '/api/contents/public'); save_json(RAW / 'pages.json', json.loads(data))
    records = {p['id']: json.loads((RAW / (p['id'] + '.json')).read_text(encoding='utf-8')) for p in BASE['sourcePosts']}
    pages = json.loads((RAW / 'pages.json').read_text(encoding='utf-8'))
    urls = set()
    for record in records.values():
        if record.get('thumbnailUrl'): urls.add(absolute(record['thumbnailUrl']))
        urls.update(absolute(m.group(2)) for m in IMAGE.finditer(record['content']))
    for page in pages:
        finder = Assets(); finder.feed(page['content']); urls.update(finder.urls)
    old_manifest = json.loads((RESEARCH / 'import-manifest.json').read_text(encoding='utf-8'))
    assets = {r['source']: r['local'] for r in old_manifest['assets'] if (ROOT / r['local'].lstrip('/')).exists()}
    failures = []

    def download(url):
        if url in assets: return url, assets[url], None
        ext = Path(urllib.parse.urlparse(url).path).suffix.lower()
        if ext not in ('.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.pdf', '.mp4'): ext = '.bin'
        local = '/assets/images/kowsc/' + hashlib.sha256(url.encode()).hexdigest()[:16] + ext
        path = ROOT / local.lstrip('/')
        try:
            if not path.exists():
                data, mime = request(url)
                if not (mime.startswith('image/') or mime.startswith('video/') or mime == 'application/pdf'):
                    raise ValueError('Unexpected content type: ' + mime)
                path.write_bytes(data)
            return url, local, None
        except Exception as error: return url, None, str(error)

    with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
        for index, (url, local, error) in enumerate(pool.map(download, sorted(urls)), 1):
            if error: failures.append({'url': url, 'error': error})
            else: assets[url] = local
            if index % 25 == 0: print(f'Assets {index}/{len(urls)}', flush=True)

    def article_html(content):
        parts = []; offset = 0
        for match in IMAGE.finditer(content):
            parts.append(html.escape(content[offset:match.start()]))
            url = absolute(match.group(2)); src = assets.get(url, url)
            parts.append(f'<img src="{html.escape(src, quote=True)}" alt="{html.escape(match.group(1), quote=True)}" loading="lazy" decoding="async">')
            offset = match.end()
        parts.append(html.escape(content[offset:]))
        return '<div class="source-text">' + ''.join(parts) + '</div>'

    for post in BASE['sourcePosts']:
        record = records[post['id']]; content = record['content']
        post.update(title=record['title'], body=[content], originalBody=[content], bodyHtml=article_html(content),
                    contentMode='full-original', showLeadImage=bool(record.get('thumbnailUrl')), summary='',
                    author=record.get('authorNickname') or record.get('authorName') or post['author'],
                    views=record.get('viewCount', post['views']))
        if record.get('thumbnailUrl'):
            url = absolute(record['thumbnailUrl']); post['image'] = assets.get(url, url)
        post['contentHash'] = hashlib.sha256(content.encode()).hexdigest()
    mapping = {'GREETING': 'greeting', 'HISTORY': 'history', 'CHART': 'organization', 'REGIONAL': 'regional', 'OFFICERS': 'committee'}
    for record in pages:
        page = BASE['sourcePages'][mapping[record['contentKey']]]
        clean = CleanHTML(assets); clean.feed(record['content'])
        page.update(bodyHtml=''.join(clean.output), originalContent=record['content'], contentMode='full-original',
                    contentHash=hashlib.sha256(record['content'].encode()).hexdigest(), subtitle='')
        # Keep structured factual arrays for existing consumers; no summarized prose remains.
        for key in ('paragraphs', 'headline', 'body'): page.pop(key, None)
    for media in BASE['sourceMedia']:
        post = next(p for p in BASE['sourcePosts'] if p['id'] == media['postId']); media['image'] = post['image']
    output = '// Owner-authorized original content. Generated by scripts/import-kowsc-content.py.\n'
    for key in ('sourcePosts', 'sourceMedia', 'sourcePages'):
        output += 'export const ' + key + ' = ' + json.dumps(BASE[key], ensure_ascii=False, indent=2) + ';\n'
    (ROOT / 'assets/js/source-content.js').write_text(output, encoding='utf-8')
    save_json(RESEARCH / 'full-content-manifest.json', {
        'source': ORIGIN, 'posts': len(records), 'pages': len(pages),
        'assets': [{'source': url, 'local': assets[url]} for url in sorted(urls) if url in assets],
        'unavailableAssets': failures,
        'contentHashes': {p['id']: p['contentHash'] for p in BASE['sourcePosts']}
    })
    print(f'Imported {len(records)} original posts and {len(pages)} original pages; {len(failures)} unavailable assets.', flush=True)


if __name__ == '__main__': main()
