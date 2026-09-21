import test from 'node:test';
import assert from 'node:assert/strict';
import * as r from '../assets/js/services/repository.js';

test('community board menus use registered categories and preserve member visibility', () => {
  r.resetDemo();
  try {
    const community = r.content('navigation').find(group => group.title === '커뮤니티');
    // Q&A 게시판과 기사제보 페이지는 사이트 소유자 요청으로 제거되었습니다.
    assert.ok(!community.items.some(item => item.title === 'Q&A'));
    assert.ok(!r.content('boards').includes('Q&A'));
    assert.equal(r.content('pageContents')['press-tip'], undefined);
    for (const category of ['자료실', '안전개선제안', '회원전용']) {
      const menu = community.items.find(item => item.title === category);
      assert.equal(new URL(menu.url, 'https://example.test').searchParams.get('category'), category);
      assert.ok(r.content('boards').includes(category));
    }
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
