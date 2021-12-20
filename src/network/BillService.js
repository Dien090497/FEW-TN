import {get, post, put} from './http/HttpClient';

import {order} from './http/ApiUrl';

export function getListOrder(
  params,
  {success, failure, refLoading} = {},
) {
  return get(order, {
    params,
    success,
    failure,
    refLoading
  });
}

export function getDetailOrder(
  id_bill ,params,
  {success, failure, refLoading} = {},
) {
  const url = [order,'detail-order',id_bill].join('/');
  return get(url, {
    params,
    success,
    failure,
    refLoading
  });
}

export function updateOrder(
  body,
  {success, failure, refLoading = null} = {},
) {
  const url = [order,'update-order'].join('/');
  return put(url, {
    body,
    success,
    failure,
    refLoading
  });
}

export function updateOrderAddress(
  id_bill,body,
  {success, failure, refLoading = null} = {},
) {
  const url = [order,'update-order','address',id_bill].join('/');
  return put(url, {
    body,
    success,
    failure,
    refLoading
  });
}

export function updateQnt(
  body,
  {success, failure, refLoading = null} = {},
) {
  const url = [order,'qnt'].join('/');
  return post(url, {
    body,
    success,
    failure,
    refLoading
  });
}




