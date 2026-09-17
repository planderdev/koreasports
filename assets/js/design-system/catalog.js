export const componentGroups = {
 'Actions': [
  ['action-area','Action area','화면의 마지막 단계에서 주요 행동과 보조 행동을 정렬합니다.','보조 행동은 왼쪽, 주요 행동은 오른쪽에 둡니다. 모바일에서는 긴 레이블이 잘리지 않도록 줄바꿈합니다.'],
  ['button','Button','명확한 레이블로 작업을 실행하는 기본 액션입니다.','한 영역의 주된 행동은 하나의 Solid 버튼으로 강조합니다. 완료 전에는 중복 실행을 차단합니다.'],
  ['chip','Chip','짧은 선택 항목이나 필터를 표현합니다.','복수 선택 여부를 명확히 하고 선택 상태를 aria-pressed로 전달합니다.'],
  ['icon-button','Icon button','익숙한 행동을 아이콘 하나로 표현합니다.','아이콘만 있는 버튼에는 항상 접근 가능한 이름을 지정합니다.'],
  ['text-button','Text button','시각적 강조가 낮은 보조 행동을 제공합니다.','취소·더보기 같은 보조 동작에 사용하고 텍스트 색상만으로 클릭 가능성을 구분하지 않습니다.']
 ],
 'Contents': [
  ['accordion','Accordion','관련 정보를 펼치거나 접어 화면 밀도를 조절합니다.','제목은 요약 정보를 담고, 열린 상태에서도 다음 항목의 제목을 찾을 수 있게 합니다.'],
  ['avatar','Avatar','사람이나 단체를 나타내는 원형 식별 요소입니다.','사진이 없는 경우 이니셜을 표시하고 이름을 보조 텍스트로 제공합니다.'],
  ['avatar-group','Avatar group','여러 참여자를 겹친 아바타로 요약합니다.','최대 표시 인원 이후는 +N으로 표현하고 전체 인원에 접근할 방법을 제공합니다.'],
  ['card','Card','이미지·제목·메타 정보를 하나의 탐색 단위로 묶습니다.','카드 안에 중첩 링크를 만들지 않습니다. 목록과 상세에서 동일한 데이터를 사용합니다.'],
  ['content-badge','Content badge','콘텐츠 분류와 운영 상태를 짧게 표시합니다.','색상 외에 접수중·마감 같은 명확한 텍스트를 함께 제공합니다.'],
  ['list-card','List card','가로형 이미지와 핵심 정보를 나란히 배치합니다.','반복 목록에서 썸네일 비율과 제목의 줄 수를 일정하게 유지합니다.'],
  ['list-cell','List cell','설정이나 선택 목록의 한 행을 구성합니다.','행 전체가 하나의 행동을 수행하도록 클릭 영역을 통일합니다.'],
  ['play-badge','Play badge','미디어의 재생 가능 여부를 보여주는 액션입니다.','정적인 사진에 재생 버튼을 붙이지 않고 실제 영상 재생으로 연결합니다.'],
  ['section-header','Section header','콘텐츠 묶음의 제목과 보조 액션을 배치합니다.','화면의 제목 계층을 지키고 더보기 링크에 목적지를 제공합니다.'],
  ['table','Table','같은 속성을 가진 데이터를 행과 열로 비교합니다.','열 제목은 th로 제공하며 작은 화면에서는 표 내부만 가로 스크롤합니다.'],
  ['thumbnail','Thumbnail','일정한 비율의 이미지로 콘텐츠를 미리 보여줍니다.','로딩 전에 비율을 확보하고 정보성 이미지에는 대체 텍스트를 작성합니다.']
 ],
 'Feedback': [
  ['alert','Alert','사용자의 확인이 필요한 중요한 정보를 제시합니다.','동작 결과와 다음 행동을 간결하게 쓰고 포커스를 대화상자 내부에 유지합니다.'],
  ['fallback-view','Fallback view','빈 결과나 콘텐츠 오류에서 다음 행동을 안내합니다.','상태의 원인을 설명하고 재시도 또는 조건 초기화 경로를 제공합니다.'],
  ['push-badge','Push badge','읽지 않은 항목 수나 새 소식을 표시합니다.','숫자만으로 의미를 전달하지 않고 관련 버튼의 이름에 개수를 포함합니다.'],
  ['section-message','Section message','현재 영역과 관련된 안내·성공·오류를 표시합니다.','오류는 수정할 위치와 함께 안내하고 중요한 정보를 자동으로 숨기지 않습니다.'],
  ['snackbar','Snackbar','작업 결과와 실행 취소 같은 후속 액션을 제공합니다.','실행 취소는 실제 상태를 되돌리며 메시지를 닫아도 결과 상태는 유지합니다.'],
  ['toast','Toast','흐름을 중단하지 않는 간단한 결과 메시지입니다.','중요한 오류나 동의 요청은 토스트만으로 전달하지 않습니다.']
 ],
 'Loading': [
  ['loading','Loading','진행 중인 작업을 알리는 상태 표시입니다.','텍스트와 aria-busy를 함께 사용합니다. 모션 감소 환경에서는 회전을 멈춥니다.'],
  ['skeleton','Skeleton','콘텐츠가 들어올 자리와 대략적인 형태를 보여줍니다.','장식용 골격은 접근성 트리에서 숨기고 로딩 상태 텍스트를 별도로 제공합니다.']
 ],
 'Navigations': [
  ['bottom-navigation','Bottom navigation','모바일의 주요 목적지를 하단에 배치합니다.','세 개에서 다섯 개의 주요 목적지만 사용하고 선택 항목을 명시합니다.'],
  ['category','Category','주제별 콘텐츠를 빠르게 전환합니다.','선택 즉시 콘텐츠가 바뀌는 경우 변경 결과를 같은 영역에 표시합니다.'],
  ['page-counter','Page counter','전체 항목 중 현재 위치를 숫자로 표시합니다.','이전·다음 버튼에는 명확한 레이블을 제공하고 경계에서는 비활성화합니다.'],
  ['pagination','Pagination','긴 목록을 페이지 단위로 나눕니다.','현재 페이지와 전체 페이지 수를 제공하고 검색 조건을 유지합니다.'],
  ['pagination-dots','Pagination dots','짧은 슬라이드 묶음의 현재 위치를 표시합니다.','점의 클릭 영역은 시각적 크기보다 넓게 확보합니다.'],
  ['progress-indicator','Progress indicator','완료 정도를 수치와 막대로 표시합니다.','현재값과 최대값을 전달하고 불확정 진행률을 거짓 숫자로 표시하지 않습니다.'],
  ['progress-tracker','Progress tracker','다단계 흐름의 현재 단계와 남은 단계를 보여줍니다.','완료·현재·예정 단계를 텍스트와 시각 표현으로 함께 구분합니다.'],
  ['tab','Tab','관련 콘텐츠를 같은 자리에서 전환합니다.','탭과 패널을 연결하고 방향키·Home·End 키 탐색을 지원합니다.'],
  ['top-navigation','Top navigation','화면의 제목, 이동 경로, 주요 목적지를 제공합니다.','사이트 이동에는 링크를 사용하고 현재 위치를 aria-current로 표시합니다.']
 ],
 'Presentation': [
  ['autocomplete','Autocomplete','텍스트 입력 중 선택 가능한 후보를 제안합니다.','이 예시는 브라우저 기본 datalist를 사용합니다. 플랫폼별 후보 UI 차이가 있습니다.'],
  ['bottom-sheet','Bottom sheet','모바일에서 하단으로부터 보조 작업을 제시합니다.','대화상자 의미를 제공하고 닫은 뒤 원래 트리거로 포커스를 돌려줍니다.'],
  ['menu','Menu','현재 맥락의 추가 행동을 모아서 제공합니다.','단순 링크·버튼 목록은 일반 탐색 순서로 제공하고 Escape·외부 클릭으로 닫습니다.'],
  ['popover','Popover','트리거 근처에 관련 정보를 임시로 띄웁니다.','정보를 가리지 않게 배치하고 외부 클릭과 Escape로 닫습니다.'],
  ['popup','Popup','집중해서 처리해야 하는 보조 과업을 담습니다.','포커스를 내부에 유지하고 바탕 화면의 조작을 일시적으로 차단합니다.'],
  ['tooltip','Tooltip','짧은 보충 설명을 포인터와 키보드 사용자에게 제공합니다.','중요한 정보를 툴팁에만 넣지 않습니다. hover와 focus 모두에서 표시합니다.']
 ],
 'Selection and input': [
  ['check-mark','Check mark','선택 여부를 확인 표시로 나타냅니다.','상태만 보여주는 체크 표시와 입력 가능한 체크박스를 구분합니다.'],
  ['checkbox','Checkbox','복수 항목의 독립적인 선택을 받습니다.','필수 동의 항목은 기본값으로 선택하지 않습니다.'],
  ['date-picker','Date picker','날짜를 입력하거나 달력에서 선택합니다.','브라우저 기본 date 입력을 사용하며 형식과 최소·최대 날짜를 제공합니다.'],
  ['filter-button','Filter button','필터 적용 여부와 선택 수를 표시합니다.','해제 방법과 선택 결과를 함께 제공하고 적용 수가 실제 상태와 일치하게 합니다.'],
  ['framed-style','Framed style','테두리가 있는 카드형 선택 영역입니다.','단일 선택에는 라디오를 사용하고 전체 레이블 영역을 선택할 수 있게 합니다.'],
  ['radio','Radio','서로 배타적인 옵션 중 하나를 선택합니다.','같은 name으로 그룹화하고 fieldset·legend로 질문을 제공합니다.'],
  ['search-field','Search field','콘텐츠를 검색할 수 있는 입력과 실행 액션입니다.','Enter 제출과 검색 결과 개수, 결과 없음 상태를 제공합니다.'],
  ['segmented-control','Segmented control','작은 수의 동등한 보기 옵션을 전환합니다.','짧은 레이블을 사용하고 선택 상태를 항상 하나로 유지합니다.'],
  ['select','Select','정해진 목록 중 하나의 값을 선택합니다.','기본 select를 사용해 키보드 탐색과 플랫폼 접근성을 유지합니다.'],
  ['slider','Slider','범위 안에서 연속적인 값을 선택합니다.','정확한 현재값을 텍스트로 제공하고 방향키로도 값을 조절할 수 있게 합니다.'],
  ['switch','Switch','즉시 적용되는 설정의 켜짐·꺼짐을 전환합니다.','저장 버튼 없이 적용되는 설정에 사용하고 켜짐 상태를 함께 읽어줍니다.'],
  ['text-area','Text area','여러 줄의 자유로운 텍스트를 입력받습니다.','입력 한도와 현재 글자 수를 표시하고 필수 정보는 레이블에 포함합니다.'],
  ['text-field','Text field','한 줄의 구조화된 정보를 입력받습니다.','레이블을 유지하고 오류를 입력 옆에 표시하며 도움말과 연결합니다.'],
  ['time-picker','Time picker','일정에 필요한 시간을 입력받습니다.','브라우저 기본 time 입력을 사용하고 지역별 표시 차이를 허용합니다.']
 ]
};
export const utilityRows = [
 ['animation-presence','AnimationPresence','Web utility components','요소의 등장과 제거를 모션 감소 설정에 맞춰 전환합니다.','CSS transition과 hidden 속성으로 표시를 제어합니다.'],
 ['box','Box','Web utility components','배경·여백·테두리를 가진 기본 레이아웃 단위입니다.','ds-box 클래스와 CSS 토큰으로 표면을 구성합니다.'],
 ['dismissable-layer','DismissableLayer','Web utility components','외부 클릭 또는 Escape로 닫히는 레이어입니다.','브라우저 popover=auto의 light dismiss 동작을 사용합니다.'],
 ['divider','Divider','Web utility components','정보 영역 사이의 시각적 경계를 만듭니다.','의미 있는 구분에는 hr을, 장식에는 border를 사용합니다.'],
 ['flex-box','FlexBox','Web utility components','가로·세로 흐름에 따라 요소를 정렬합니다.','ds-flex와 gap 토큰으로 정렬하며 좁은 화면에서 줄바꿈합니다.'],
 ['focus-scope','FocusScope','Web utility components','포커스를 한 영역에 가두고 닫을 때 복귀시킵니다.','showModal()을 사용하는 dialog의 기본 포커스 제약을 활용합니다.'],
 ['force-theme','ForceTheme','Web utility components','한 영역에 독립적인 테마를 적용합니다.','data-ds-theme 속성으로 의미별 색상을 다시 정의합니다.'],
 ['form','Form','Web utility components','입력·검증·오류 표시를 한 흐름으로 묶습니다.','HTML form과 submit 이벤트를 사용하며 입력값을 서버에 보내지 않습니다.'],
 ['grid','Grid','Web utility components','일정한 열과 간격으로 요소를 배치합니다.','CSS Grid와 minmax(0,1fr)을 사용하여 콘텐츠 넘침을 방지합니다.'],
 ['label','Label','Web utility components','입력의 이름과 클릭 영역을 연결합니다.','for와 id를 일치시키거나 입력을 label 안에 포함합니다.'],
 ['no-ssr','NoSsr','Web utility components','브라우저에서만 가능한 UI를 마운트합니다.','PHP 환경 대응 예제입니다. DOM 준비 후 JS로 렌더링하며 React NoSsr API와 다릅니다.'],
 ['popper','Popper','Web utility components','트리거 기준으로 떠 있는 요소의 위치를 잡습니다.','앵커 위치를 읽고 viewport 경계 안으로 보정하는 positionLayer()를 사용합니다.'],
 ['portal','Portal','Web utility components','상위 overflow의 영향을 받지 않는 레이어를 만듭니다.','기존 body 직계 dialog와 브라우저 top layer를 사용합니다. React Portal API와 다릅니다.'],
 ['region-config','RegionConfig','Web utility components','지역에 맞는 날짜·숫자 표기를 제공합니다.','Intl.DateTimeFormat과 Intl.NumberFormat을 사용합니다.'],
 ['scroll-area','ScrollArea','Web utility components','한정된 영역에 독립적인 스크롤을 제공합니다.','overflow:auto와 tabindex로 키보드 스크롤을 지원합니다.'],
 ['typography','Typography','Web utility components','의미에 맞는 HTML 요소에 서체 토큰을 적용합니다.','type-body-1 등의 클래스를 사용하며 h1~h6 의미는 별도로 선택합니다.'],
 ['with-interaction','WithInteraction','Web utility components','hover·pressed·focus의 일관된 시각 반응입니다.','ds-interactive는 키보드 포커스를 보존하는 버튼에 적용합니다.'],
 ['add-opacity','addOpacity','Web utilities','색상에 명시적인 투명도를 결합합니다.','hex 값과 0~1 범위를 검증한 뒤 CSS rgba() 값을 반환합니다.'],
 ['aria-hidden','ariaHidden','Web utilities','장식용 시각 요소를 접근성 트리에서 제외합니다.','장식 아이콘만 aria-hidden=true로 숨깁니다. 포커스 가능한 요소에는 사용하지 않습니다.'],
 ['container-style','containerStyle','Web utilities','일관된 최대 폭과 양쪽 여백을 제공합니다.','ds-container에 container와 gutter 토큰을 연결합니다.'],
 ['ellipsis-typography-style','ellipsisTypographyStyle','Web utilities','긴 텍스트를 제한된 줄 수로 요약합니다.','한 줄 ellipsis와 여러 줄 line-clamp를 제공합니다. 원문은 DOM에 유지합니다.'],
 ['gradient','gradient','Web utilities','두 색상 사이의 부드러운 전환을 만듭니다.','semantic 토큰으로 linear-gradient를 구성합니다.'],
 ['list-style','listStyle','Web utilities','목록의 정렬과 구분선을 표준화합니다.','반복 정보에 ul 또는 ol의 의미를 유지합니다.'],
 ['media','Media','Web utilities','화면 크기와 입력 환경에 맞춰 레이아웃을 조절합니다.','CSS 미디어쿼리와 matchMedia 대응 값을 문서에 표시합니다.'],
 ['navigation','Navigation','Web utilities','URL을 가진 탐색을 브라우저 기본 동작에 연결합니다.','실제 a 링크를 사용하여 새 탭 열기와 뒤로가기를 지원합니다.'],
 ['typography-style','typographyStyle','Web utilities','타입 스케일의 크기·행간·자간을 함께 적용합니다.','getTypographyStyle()은 지정한 타입 이름에 대응하는 토큰 문자열을 반환합니다.'],
 ['use-alert','useAlert','Web utilities','확인이 필요한 메시지를 대화상자로 엽니다.','기존 modal() 함수로 구현합니다. React hook을 제공하는 것은 아닙니다.'],
 ['use-size','useSize','Web utilities','요소의 크기 변화를 관찰합니다.','ResizeObserver로 현재 프리뷰의 폭을 측정합니다.'],
 ['use-snackbar','useSnackbar','Web utilities','후속 액션이 있는 작업 결과를 표시합니다.','실행 취소 가능한 프리뷰 상태를 갱신합니다.'],
 ['use-theme-control','useThemeControl','Web utilities','문서 프리뷰의 라이트·다크 테마를 전환합니다.','문서 내부의 토큰만 전환하며 홈페이지 테마를 강제로 바꾸지 않습니다.'],
 ['use-toast','useToast','Web utilities','짧은 결과 메시지를 라이브 영역에 표시합니다.','기존 toast() 함수와 role=status 영역을 재사용합니다.']
];
export const components=Object.entries(componentGroups).flatMap(([group,rows])=>rows.map(([id,name,description,usage])=>({id,name,group,description,usage,section:'components',source:`https://montage.wanted.co.kr/docs/components/${group.toLowerCase().replaceAll(' ','-')}/${id}/design`})));
export const utilities=utilityRows.map(([id,name,group,description,usage])=>({id,name,group,description,usage,section:'utilities',source:`https://montage.wanted.co.kr/docs/utilities/${group.toLowerCase().replaceAll(' ','-')}/${id}`}));
export const foundations=[
 ['overview','Overview','원시값과 의미별 토큰, 컴포넌트를 연결하는 설계 원칙'],['colors','Colors','원시 팔레트 · 의미별 색상 · 라이트/다크'],['typography','Typography','19개 타입 스케일과 4개 굵기'],['elevation','Elevation','Normal · Spread · 레이어 순서'],['grid','Grid','반응형 열 · 컨테이너 · 브레이크포인트'],['icons','Icons','아이콘 크기 · 의미 · 터치 영역'],['spacing','Spacing & Radius','간격 · 둥글기 · 테두리'],['motion','Motion','전환 시간 · 이징 · 상태 투명도'],['tokens','Token explorer','전체 토큰 검색 · 원시값 · 계산값 · 복사']
].map(([id,name,description])=>({id,name,description,section:'foundations',group:'Base material'}));
export const allDocs=[...foundations,...components,...utilities];
const searchAliases={colors:'색상 컬러 팔레트',typography:'서체 폰트 글꼴 타이포그래피',elevation:'그림자 깊이',grid:'그리드 레이아웃',icons:'아이콘',spacing:'간격 여백 둥글기',motion:'모션 애니메이션',tokens:'토큰 변수',button:'버튼',chip:'칩 태그','icon-button':'아이콘 버튼','text-button':'텍스트 버튼',avatar:'아바타 프로필',accordion:'아코디언',card:'카드',table:'표 테이블',tooltip:'툴팁',popup:'팝업 모달',popover:'팝오버',checkbox:'체크박스',radio:'라디오',switch:'스위치',slider:'슬라이더',select:'셀렉트 선택','text-field':'텍스트 필드 입력','text-area':'텍스트 영역 입력',tab:'탭',pagination:'페이지네이션 페이지',toast:'토스트',snackbar:'스낵바','focus-scope':'포커스 접근성','force-theme':'다크 테마','use-theme-control':'다크 테마'};
allDocs.forEach(d=>d.keywords=searchAliases[d.id]||'');
