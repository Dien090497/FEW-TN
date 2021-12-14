import {upload, get, post} from './http/HttpClient';
import {administrator} from './http/ApiUrl';

export function changePasswordApi(
  body,
  {success, failure, refLoading} = {},
) {
  return post(administrator,{
    body,
    success,
    failure,
    refLoading
  });
}

export function getUserApi(
  params,
  {success, failure, refLoading} = {},
) {
  return get([administrator,'user'].join('/'),{
    params,
    success,
    failure,
    refLoading
  });
}

export function updateAdminApi(
  body,
  {success, failure, refLoading} = {},
) {
  return post([administrator,'update'].join('/'),{
    body,
    success,
    failure,
    refLoading
  });
}




