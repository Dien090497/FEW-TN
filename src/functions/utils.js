export function generateRandomId(length = 10) {
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function isEmptyObject(obj) {
  return !!obj && obj.constructor === Object && Object.keys(obj).length === 0;
}

export function sortByName(list) {
  list.sort(function(a, b) {
    if (a < b) { return -1; }
    if (a > b) { return 1; }
    return 0;
  });
}

export function showLoading(ref) {
  if (!ref || ref.current === undefined) {
    return;
  }
  ref.current.open();
}

export function hideLoading(ref) {
  if (!ref) {
    return;
  }
    ref.current.hide();
}
