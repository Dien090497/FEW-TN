import { post} from './http/HttpClient';

import {login} from './http/ApiUrl';

export function loginAPI(
    body,
  {success, failure, refLoading} = {},
) {
  return post(login, {
    body,
    success,
    failure,
    refLoading
  });
}

export function uploadTokenFirebase(
  body,
  {success, failure, refLoading} = {},
) {
  const url = [login,'token-firebase'].join('/')
  return post(url, {
    body,
    success,
    failure,
    refLoading
  });
}
// export function setAlarmApi(
//   deviceId,
//   body,
//   {success, failure, autoShowMsg = true, refLoading = null, refNotification = null} = {},
// ) {
//   const url = [alarmUrl, deviceId].join('/');
//   return post(url, {
//     body,
//     success,
//     failure,
//     autoShowMsg,
//     refLoading,
//     refNotification
//   });
// }
