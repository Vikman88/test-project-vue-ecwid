export default (key: string, defaultValue: {} | [] | 0 | []) => {
  try {
    return JSON.parse(localStorage.getItem(key) ?? `${defaultValue}`);
  } catch (e) {
    return defaultValue;
  }
};