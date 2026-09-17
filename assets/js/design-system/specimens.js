import {esc} from '../renderers.js';
export function variants(d){const id=d.id;
 if(['text-field','text-area','search-field','autocomplete','date-picker','time-picker','select','form','label'].includes(id))return `<div class="ds-state-grid">${[['Default',''],['Focused','ds-input-focused'],['Error','ds-input-error'],['Disabled','']].map(([n,c])=>`<label>${n}<input class="ds-input ${c}" placeholder="입력 예시" ${n==='Disabled'?'disabled':n==='Error'?'aria-invalid="true"':''} aria-label="${d.name} ${n} 상태 예시">${n==='Error'?'<span class="ds-error">필수 값을 확인해주세요.</span>':'<span class="ds-help">도움말은 입력 아래 표시합니다.</span>'}</label>`).join('')}</div>`;
 if(['checkbox','radio','switch','framed-style','check-mark'].includes(id))return `<div class="ds-state-grid">${[['기본',false,false],['선택',true,false],['비활성',false,true],['선택·비활성',true,true]].map(([n,c,disabled],i)=>`<label class="ds-check"><input type="${id==='radio'?'radio':'checkbox'}" name="state-${i}" ${c?'checked':''} ${disabled?'disabled':''}>${n}</label>`).join('')}</div>`;
 if(['chip','filter-button','segmented-control','category'].includes(id))return `<div class="ds-flex"><button class="button ds-chip" aria-pressed="false" data-variant-toggle>기본</button><button class="button ds-chip" aria-pressed="true" data-variant-toggle>선택</button><button class="button ds-chip" disabled>비활성</button></div>`;
 if(['avatar','avatar-group'].includes(id))return `<div class="ds-flex">${[['sm','32'],['md','40'],['lg','56']].map(([n,v])=>`<div class="ds-variant-label"><span class="ds-avatar" aria-label="크기 ${v}픽셀 프로필" style="width:var(--avatar-${n});height:var(--avatar-${n})">김</span><small>${v}px</small></div>`).join('')}</div>`;
 if(['content-badge','push-badge','section-message'].includes(id))return `<div class="ds-flex">${[['positive','Positive'],['cautionary','Cautionary'],['negative','Negative'],['neutral','Neutral']].map(([t,n])=>`<span class="ds-badge" data-tone="${t}">${n}</span>`).join('')}</div>`;
 if(['loading','skeleton','progress-indicator'].includes(id))return `<div class="ds-state-grid">${[0,40,100].map(v=>`<label>${v===0?'시작':v===100?'완료':'진행중'} · ${v}%<progress value="${v}" max="100">${v}%</progress></label>`).join('')}</div>`;
 if(['button','icon-button','text-button','action-area'].includes(id))return `<div class="ds-flex">${['sm','md','lg'].map(n=>`<button class="button" data-size="${n}" data-variant-toast>${n.toUpperCase()}</button>`).join('')}<button class="button ds-outline" data-variant-toast>Outlined</button><button class="button ds-text" data-variant-toast>Text</button></div>`;
 return '';
}
export function implementationCode(d){const imports={
 'add-opacity':"import {addOpacity} from '/assets/js/design-system/utilities.js';\nconst color = addOpacity('#176B45', 0.4);",
 'typography-style':"import {getTypographyStyle} from '/assets/js/design-system/utilities.js';\nheading.style.cssText = getTypographyStyle('title-3');",
 'region-config':"import {formatRegion} from '/assets/js/design-system/utilities.js';\nconst {date, number} = formatRegion('ko-KR');",
 'popper':"import {positionLayer} from '/assets/js/design-system/utilities.js';\nlayer.showPopover();\npositionLayer(trigger, layer);",
 'use-size':"const observer = new ResizeObserver(([entry]) => {\n  output.textContent = Math.round(entry.contentRect.width) + 'px';\n});\nobserver.observe(element);\n// 정리 시 observer.disconnect();",
 'use-toast':"import {toast} from '/assets/js/renderers.js';\ntoast('신청 내용을 확인했습니다.');",
 'use-alert':"import {modal} from '/assets/js/renderers.js';\nmodal('확인', '<p>입력 내용을 확인해주세요.</p>');",
 'force-theme':"element.dataset.dsTheme = 'dark'; // light | dark",
 'use-theme-control':"element.dataset.dsTheme = element.dataset.dsTheme === 'dark' ? 'light' : 'dark';"
 };return `<section class="ds-doc-section" id="implementation"><h2>Implementation code</h2><p>공통 스타일은 tokens.css, base.css, components.css, controls.css에서 관리하며, 문서 화면은 design-system-docs.css를 함께 로드합니다. 아래 예제는 프로젝트의 공통 dialog·toast 영역이 있는 페이지를 기준으로 합니다. 예제 ID가 겹치지 않도록 한 화면에는 각 예제를 한 번씩 마운트합니다.</p><pre><code>${esc(imports[d.id]||`import {${d.section==='utilities'?'renderUtility':'renderComponent'}, bindExamples} from '/assets/js/design-system/components.js';\n\nconst root = document.querySelector('#example');\nroot.innerHTML = ${d.section==='utilities'?'renderUtility':'renderComponent'}('${d.id}');\nbindExamples(root);`)}</code></pre></section>`;
}
