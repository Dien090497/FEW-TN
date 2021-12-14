import {upload, get, post} from './http/HttpClient';
import {news} from './http/ApiUrl';

export function getNewsApi(
  params,
  {success, failure, refLoading} = {},
) {
  return get(news,{
    params,
    success,
    failure,
    refLoading
  });
}

export function getInfoNewsApi(
  params,
  {success, failure, refLoading} = {},
) {
  return get([news,params].join('/'),{
    success,
    failure,
    refLoading
  });
}

export function addNewsApi(
  data,
  {success, failure, refLoading} = {},
) {
  const formData = new FormData();
  formData.append('title',data.title)
  formData.append('content',data.content)
  formData.append('imageNews',data.imageNews)
  const url =[news,'add-news'].join('/')
  return upload(url, formData, {
    success,
    failure,
    refLoading
  });
}

export function editNewsApi(
  data,
  {success, failure, refLoading} = {},
) {
  console.log(data)
  const formData = new FormData();
  formData.append('id_news',data.id_news)
  formData.append('title',data.title)
  formData.append('content',data.content)
  formData.append('publication_date',data.publication_date)
  if (data.imageNews) {formData.append('imageNews',data.imageNews)}
  const url =[news,'edit-news'].join('/')
  return upload(url, formData, {
    success,
    failure,
    refLoading
  });
}

export function deleteNewsApi(
  id_news,
  {success, failure, refLoading} = {},
) {
  return post([news,'delete',id_news].join('/'),{
    success,
    failure,
    refLoading
  });
}




