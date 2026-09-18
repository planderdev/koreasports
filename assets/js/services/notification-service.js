import {collection,logNotification} from './repository.js';
export function previewMessage(templateId,variables={}){const t=collection('notificationTemplates').find(x=>x.id===templateId);return (t?.body||'').replace(/\{(\w+)\}/g,(_,key)=>String(variables[key]||`[${key}]`));}
export function simulateSend(templateId,recipientIds,variables){if(!recipientIds.length)throw Error('발송 대상을 선택해주세요.');const body=previewMessage(templateId,variables);if(/\[[a-z]+\]/.test(body))throw Error('메시지 변수를 모두 입력해주세요.');logNotification({templateId,recipientIds,body});return '발송 대기';}
