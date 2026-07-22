export function formatReg(raw) {
  return raw.replace(/[^a-zA-Z0-9]/g, "").toUpperCase().slice(0, 8);
}

export function isPlausiblePlate(reg) {
  return /^[A-Z0-9]{2,8}$/.test(reg);
}

export function linkifyHtml(html) {
  if (!html) return "";
  let out = html.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" style="color:#0B2545; text-decoration:underline;">$1</a>'
  );
  out = out.replace(
    /(?<!["'=])(https?:\/\/[^\s<"']+)/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer" style="color:#0B2545; text-decoration:underline;">$1</a>'
  );
  out = out.replace(/<a /g, '<a target="_blank" rel="noopener noreferrer" ');
  return out;
}