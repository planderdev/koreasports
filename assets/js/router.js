import {designSystem} from './pages/design-system.js';
import {renderHome} from './pages/home.js';
import {listing,detail,board,post,search,contentPage,support} from './pages/catalog.js';
import {login,join,apply,mypage,qualification,learn} from './pages/member.js';
import {admin} from './pages/admin.js';
import {notFound} from './renderers.js';
export function renderPage(type){const routes={'design-system':designSystem,home:renderHome,page:contentPage,board,post,search,support,login,join,apply,mypage,qualification,learn,admin,events:()=>listing('events'),clubs:()=>listing('clubs'),education:()=>listing('education'),volunteers:()=>listing('volunteers'),event:()=>detail('event'),club:()=>detail('club'),course:()=>detail('course'),volunteer:()=>detail('volunteer')};return (routes[type]||notFound)();}
