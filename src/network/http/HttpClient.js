import {hostUrl} from './ApiUrl';
import {
  generateRandomId,
  showLoading,
  hideLoading
} from '../../functions/utils';

import {RETRY_HTTP_REQUEST_NUMBER} from '../../functions/AppConfig';
import axios from 'axios';
import DataLocal from "../../functions/dataLocal";

const TIMEOUT_CONNECT = 60000;

const client = axios.create({
  baseURL: hostUrl,
  timeout: TIMEOUT_CONNECT,
});

const requestType = {
  post: 'post',
  put: 'put',
  patch: 'patch',
  get: 'get',
  delete: 'delete',
};

const getDefaultHeaders = () => {
  return {
    'Accept': 'application/json',
    'Content-type': 'application/json',
    'request-id': generateRandomId(5).toLowerCase(),
  };
};

const successResponse = (data, rawResponse) => {
  return {success: data, failure: null, rawResponse: rawResponse};
};

const failureResponse = (err, rawResponse) => {
  return {success: null, failure: err, rawResponse};
};

function getHeaders(headers) {
  let requestHeaders = headers;
  if (!headers) requestHeaders = getDefaultHeaders();

  const accessToken = DataLocal.token;
  if (accessToken) {
    requestHeaders['Authorization'] = 'Bearer ' + accessToken;
  }

  return requestHeaders;
}

async function tryRequest(url, headers, body, type) {
  let response;
  let config = {
    headers: headers,
    timeout: TIMEOUT_CONNECT,
    responseType: 'json',
  };
  if (type === requestType.delete) {
    config.data = body;
  }

  console.log('[API] [call]', type, url, 'body:', body, 'headers:', headers);

  const bodyStr = JSON.stringify(body);
  try {
    switch (type) {
      case requestType.post:
        response = await client.post(url, bodyStr, config);
        break;
      case requestType.patch:
        response = await client.patch(url, bodyStr, config);
        break;
      case requestType.put:
        response = await client.put(url, bodyStr, config);
        break;
      case requestType.get:
        response = await client.get(url, config);
        break;
      case requestType.delete:
        response = await client.delete(url, config);
        break;
      default:
        return {success: false, data: null, error: null};
    }
    console.log('[API] [response]', type, url, response);
    return {success: true, data: response, error: null};
  } catch (error) {
    response = await error.response;
    console.log(`[API] [ERROR] ${type} ${url}:`, response);
    return {success: false, data: null, error: response};
  }
}

async function doRequest(url, headers, body, type) {
  let response;
  let tmp = await tryRequest(url, headers, body, type);
  if (tmp.success) {
    response = tmp.data;
  } else {
    response = tmp.error;
    let number = RETRY_HTTP_REQUEST_NUMBER;
    while (number > 0) {
      const tmp = await tryRequest(url, headers, body, type);
      if (tmp.success) {
        response = tmp.data;
        break;
      }

      number -= 1;
    }
  }
  return response;
}

export async function post(
  url,
  {body, headers, success, failure, autoShowMsg = true, refLoading = null,} = {}
) {
  showLoading(refLoading);
  const headersGet = getHeaders(headers);
  let response = await doRequest(url, headersGet, body, requestType.post);
  hideLoading(refLoading);
  return handleResp(response, autoShowMsg, success, failure, refLoading);
}

export async function path(
  url, {body, headers, success, failure, autoShowMsg = true, refLoading = null} = {}) {
  showLoading(refLoading);
  const headersGet = getHeaders(headers);
  let response = await doRequest(url, headersGet, body, requestType.patch);
  hideLoading(refLoading);
  return handleResp(response, autoShowMsg, success, failure, refLoading);
}

export async function put(
  url, {body, headers, success, failure, autoShowMsg = true, refLoading = null} = {}) {
  showLoading(refLoading);
  const headersGet = getHeaders(headers);
  let response = await doRequest(url, headersGet, body, requestType.put);
  hideLoading(refLoading)
  return handleResp(response, autoShowMsg, success, failure, refLoading);
}

export async function get(
  url, {params, headers, success, failure, autoShowMsg = true, refLoading = null} = {}) {
  showLoading(refLoading)
  if (params) {
    let arrBody = [];
    for (let key in params) {
      if (params.hasOwnProperty(key)) {
        arrBody.push(key + '=' + params[key]);
      }
    }
    const strQuery = arrBody.join('&');
    url = url + '?' + strQuery;
  }

  const headersGet = getHeaders(headers);
  let response = await doRequest(url, headersGet, null, requestType.get);
  hideLoading(refLoading)
  return handleResp(response, autoShowMsg, success, failure, refLoading);
}

export async function dele(
  url, {body = {}, headers, success, failure, autoShowMsg = true, refLoading = null} = {}) {
  showLoading(refLoading)
  const headersGet = getHeaders(headers);
  let response = await doRequest(url, headersGet, body, requestType.delete);
  hideLoading(refLoading)
  return handleResp(response, autoShowMsg, success, failure, refLoading);
}

export async function upload(
  url, formData, {success, failure, autoShowMsg = true, refLoading = null} = {}) {
  showLoading(refLoading)
  let headers = await getHeaders(null);
  headers['Content-Type'] = 'multipart/form-data';

  let response;
  try {
    console.log(url)
    console.log(formData)
    response = await client.put(url, formData, {
      headers,
      timeout: TIMEOUT_CONNECT,
      responseType: 'json',
    });
  } catch (error) {
    response = await error.response;
  }
  console.log('[API] [response] upload ' + url, response)
  hideLoading(refLoading)
  return handleResp(response, autoShowMsg, success, failure, refLoading);
}

export async function upload2(
  url, formData, {success, failure, autoShowMsg = true, refLoading = null} = {}) {
  showLoading(refLoading)
  let headers = await getHeaders(null);
  headers['Content-Type'] = 'multipart/form-data';

  let response;
  try {
    console.log(url)
    console.log(formData)
    response = await client.post(url, formData, {
      headers,
      timeout: TIMEOUT_CONNECT,
      responseType: 'json',
    });
  } catch (error) {
    response = await error.response;
  }
  hideLoading(refLoading)
  return handleResp(response, autoShowMsg, success, failure, refLoading);
}

export async function uploadFile(
  url, {
    body,
    headers,
    success,
    failure,
    autoShowMsg = true,
    refLoading = null,
  } = {}) {
  showLoading(refLoading)
  let response;
  try {
    response = await client.put(url, body, {
      headers,
      timeout: TIMEOUT_CONNECT,
    });
  } catch (error) {
    console.log('[API] [ERROR] call API upload ' + url, error);
    response = await error.response;
  }
  console.log('[API] [response] upload ' + url, response);

  hideLoading(refLoading)
  return handleResp(response, autoShowMsg, success, failure, refLoading);
}

async function handleResp(response, autoShowMsg, success, failure) {
  if (!response || response.status === 500) {
    let err = '';
    console.log('handleResp >>>>>>>>>>>', response)
    if (response && response.error) {
      err = response.error;
    }
    if (failure) {
      failure(err);
    }
    return failureResponse(err, response);
  }

  const httpStatusCode = response.status;
  let result = response.data;

  if (httpStatusCode < 200 || httpStatusCode > 299) {
    if (httpStatusCode === 403 || httpStatusCode === 401) {

      if (failure) {
        failure('403,401');
      }

      return failureResponse('TOKEN_EXPIRED_MSG', response);
    }

    const err = checkFailure(result);

    if (err.includes('KWS-4001')) {
      console.log('error KWS-4001');
    }

    if (failure) {
      failure(err);
    }

    return failureResponse(err, response);
  }

  const headers = await response.headers;
  if (result && typeof (result) === 'object') {
    result.headers = headers;
  }


  if (success) {
    success(result);
  }

  return successResponse(result, response);
}


function checkFailure(result) {
  let meta;
  if (result && result.code) {
    meta = result;
  } else if (result) {
    meta = result.meta;
  }

  if (!meta || !meta.code) {
    return 'UNEXPECTED_ERROR_MSG';
  }

  return 'UNEXPECTED_ERROR_MSG';
}

export default client;
