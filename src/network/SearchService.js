import {upload, get, post} from './http/HttpClient';
import {search, product} from './http/ApiUrl';

export function getRangePrice(
    {success, failure, refLoading} = {},
) {
    return get([search,'range-price'].join('/'),{
        success,
        failure,
        refLoading
    });
}

export function getCategoryApi(
    {success, failure, refLoading} = {},
) {
    return get([product,'category'].join('/'),{
        success,
        failure,
        refLoading
    });
}

export function searchNameApi(
    data,params,
    {success, failure, refLoading} = {},
) {
    return get([search,data.name].join('/'),{
        params,
        success,
        failure,
        refLoading
    });
}

export function searchNameRangeApi(
    name,params,
    {success, failure, refLoading} = {},
) {
    return get([search,'filter/size',name].join('/'),{
        params,
        success,
        failure,
        refLoading
    });
}



