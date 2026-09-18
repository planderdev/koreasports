// Browser persistence adapter. Replace these methods at the server integration boundary.
const PREFIX = "kowsc-admin:";
export function adminPreference(key, fallback = null) {
  try {
    return JSON.parse(localStorage.getItem(PREFIX + key)) ?? fallback;
  } catch {
    return fallback;
  }
}
export function saveAdminPreference(key, value) {
  localStorage.setItem(PREFIX + key, JSON.stringify(value));
}
export function adminSelection(ids) {
  const token = crypto.randomUUID();
  sessionStorage.setItem(PREFIX + "selection:" + token, JSON.stringify(ids));
  return token;
}
export function readAdminSelection(token) {
  try {
    return (
      JSON.parse(sessionStorage.getItem(PREFIX + "selection:" + token)) || []
    );
  } catch {
    return [];
  }
}
export function readDraft(key) {
  return adminPreference("draft:" + key);
}
export function saveDraft(key, value) {
  saveAdminPreference("draft:" + key, {
    version: 1,
    updatedAt: new Date().toISOString(),
    value,
  });
}
export function removeDraft(key) {
  localStorage.removeItem(PREFIX + "draft:" + key);
}
function db() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open("kowsc-admin-media", 1);
    req.onupgradeneeded = () =>
      req.result.createObjectStore("media", { keyPath: "id" });
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(Error("미디어 저장소를 열 수 없습니다."));
  });
}
export async function uploadAdminMedia(file) {
  if (
    !/^image\/(png|jpeg|webp|gif)$/.test(file.type) ||
    file.size > 10 * 1024 * 1024
  )
    throw Error("PNG/JPG/WebP/GIF 이미지, 10MB 이하 파일을 선택해주세요.");
  return storeFile(file);
}
async function storeFile(file) {
  const connection = await db(),
    item = {
      id: crypto.randomUUID(),
      name: file.name,
      type: file.type,
      blob: file,
      createdAt: new Date().toISOString(),
    };
  try {
    await new Promise((resolve, reject) => {
      const tx = connection.transaction("media", "readwrite");
      tx.objectStore("media").put(item);
      tx.oncomplete = resolve;
      tx.onerror = () =>
        reject(Error("이미지 저장에 실패했습니다. 저장 공간을 확인해주세요."));
    });
    return item;
  } finally {
    connection.close();
  }
}
export async function readAdminMedia(id) {
  const connection = await db();
  try {
    return await new Promise((resolve, reject) => {
      const req = connection.transaction("media").objectStore("media").get(id);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(Error("이미지를 불러올 수 없습니다."));
    });
  } finally {
    connection.close();
  }
}
export async function hydrateAdminMedia(root) {
  const urls = [];
  for (const image of root.querySelectorAll("img[data-media-id]")) {
    try {
      const file = await readAdminMedia(image.dataset.mediaId);
      if (!file) throw Error();
      const url = URL.createObjectURL(file.blob);
      urls.push(url);
      image.src = url;
    } catch {
      image.alt = image.alt || "이미지를 불러올 수 없습니다.";
    }
  }
  return () => urls.forEach(URL.revokeObjectURL);
}

export async function uploadAdminAttachment(file) {
  if (
    !/\.(pdf|hwp|hwpx|doc|docx|xls|xlsx|ppt|pptx|txt|zip)$/i.test(file.name) ||
    file.size > 20 * 1024 * 1024
  )
    throw Error("문서·ZIP 파일을 20MB 이하로 선택해주세요.");
  return storeFile(file);
}
export async function hydrateAdminAttachments(root) {
  const urls = [];
  for (const link of root.querySelectorAll("a[data-attachment-id]")) {
    try {
      const item = await readAdminMedia(link.dataset.attachmentId);
      if (!item) continue;
      const url = URL.createObjectURL(item.blob);
      urls.push(url);
      link.href = url;
      link.download = item.name;
    } catch {
      link.setAttribute("aria-disabled", "true");
    }
  }
  return () => urls.forEach(URL.revokeObjectURL);
}
export function saveNotificationDraft(value) {
  sessionStorage.setItem("kwsa-notification-draft", JSON.stringify(value));
}
export function readNotificationDraft() {
  try {
    return JSON.parse(sessionStorage.getItem("kwsa-notification-draft"));
  } catch {
    return null;
  }
}
export function clearNotificationDraft() {
  sessionStorage.removeItem("kwsa-notification-draft");
}
