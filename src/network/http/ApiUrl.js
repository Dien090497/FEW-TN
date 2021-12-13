import AppConfig from '../../functions/AppConfig';

export const appConfig = AppConfig.product;

//////////////////////////////////////////////////////
export const hostUrl = appConfig.rootDomain;

// login
export const login = hostUrl + '/login';

//product
export const product = hostUrl + '/product';

//order
export const order = hostUrl + '/order';

/// url: string, obj: object
export function assignUrlParams(url, obj) {
  if (!obj) {
    return url;
  }

  const keys = Object.keys(obj);
  if (keys.length === 0) {
    return url;
  }

  let newUrl = url;
  for (let i = 0; i < keys.length; i++) {
    const k = keys[i];
    newUrl = newUrl.split(`{${k}}`).join(obj[k]);
  }

  return newUrl;
}
