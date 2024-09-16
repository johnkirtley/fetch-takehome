export function setValueExpiration(key: string, value: string, ttl: number) {
  const now = new Date();
  const item = {
    value: value,
    expiration: now.getTime() + ttl,
  };

  localStorage.setItem(key, JSON.stringify(item));
}

export function getValueExpiration(key: string) {
  const entry = localStorage.getItem(key);

  if (!entry) return null;

  const item = JSON.parse(entry);
  const now = new Date();

  if (now.getTime() > item.expiration) {
    localStorage.removeItem(key);
    return null;
  }

  return item.value;
}
