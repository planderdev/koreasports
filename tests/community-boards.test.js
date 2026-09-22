import test from 'node:test';
import assert from 'node:assert/strict';
import * as r from '../assets/js/services/repository.js';

test('community board menus use registered categories and preserve member visibility', () => {
  r.resetDemo();
  try {
    const community = r.content('navigation').find(group => group.title === '커뮤니티');
    const all = r.content('navigationAll').find(group => group.title === '커뮤니티');
    // 표시되는 게시판 메뉴는 등록된 분류를 써야 합니다. 안전개선제안·회원전용은 숨김 항목입니다.
    for (const category of ['공지사항', '대회공고', '언론·보도', '포토·영상', 'Q&A', '자료실']) {
      const menu = community.items.find(item => item.title === category);
      assert.equal(new URL(menu.url, 'https://example.test').searchParams.get('category'), category);
      assert.ok(r.content('boards').includes(category));
    }
    for (const category of ['안전개선제안', '회원전용']) {
      assert.ok(!community.items.some(item => item.title === category), category);
      assert.ok(all.items.find(item => item.title === category)?.hidden, category);
      assert.ok(r.content('boards').includes(category));
    }
    assert.equal(r.content('pageContents')['press-tip'], undefined);
    r.setRole('admin');
    const post = r.collection('posts')[0];
    r.saveRecord('posts', post.id, {category: '회원전용'});
    r.setRole('guest');
    assert.equal(r.listPosts({category: '회원전용'}).length, 0);
    assert.equal(r.getPost(post.id), undefined);
    assert.ok(!r.searchAll(post.title).some(item => item.id === post.id));
    r.setRole('member');
    assert.equal(r.getPost(post.id).id, post.id);
  } finally {
    r.resetDemo();
  }
});
