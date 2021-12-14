import {dele, get, upload} from './http/HttpClient';

import {product} from './http/ApiUrl';

export function getListProduct(
    params,
    {success, failure, refLoading} = {},
) {
    return get(product, {
        params,
        success,
        failure,
        refLoading
    });
}

export function getSize(
    idProducts,
    {success, failure, refLoading} = {},
) {
    const url =[product,'size',idProducts.toString()].join('/');
    return get(url, {
        success,
        failure,
        refLoading
    });
}

export function getInfo(
    {success, failure, refLoading} = {},
) {
    const url =[product,'info'].join('/');
    return get(url, {
        success,
        failure, refLoading
    });
}

export function addProductApi(
  data,
  {success, failure, refLoading} = {},
) {
    const formData = new FormData();
    formData.append('name',data.name)
    formData.append('export_price',data.export_price)
    formData.append('impot_price',data.impot_price)
    formData.append('sale',data.sale)
    formData.append('id_category',data.id_category)
    formData.append('id_style',data.id_style)
    formData.append('id_brand',data.id_brand)
    data.pictureProduct.map((obj,i)=>{
        formData.append('pictureProduct',obj)
    })
    formData.append('description',data.description)
    formData.append('size',data.size)
    formData.append('qnt',data.qnt)
    const url =[product,'add-product'].join('/');
    return upload(url,formData ,{
        success,
        failure, refLoading
    });
}

export function editProductApi(
  data,
  {success, failure, refLoading} = {},
) {
    const formData = new FormData();
    formData.append('name',data.name)
    formData.append('export_price',data.export_price)
    formData.append('impot_price',data.impot_price)
    formData.append('sale',data.sale)
    formData.append('id_category',data.id_category)
    formData.append('id_style',data.id_style)
    formData.append('id_brand',data.id_brand)
    if (data.pictureProduct) {
        data.pictureProduct.map((obj,i)=>{
            formData.append('pictureProduct',obj)
        })
    }
    formData.append('description',data.description)
    formData.append('size',data.size)
    formData.append('qnt',data.qnt)
    console.log(data)
    const url =[product,'edit-product',data.id].join('/');
    return upload(url,formData ,{
        success,
        failure, refLoading
    });
}

export function deleteProductAPI(
    idProduct,
    {success, failure, refLoading} = {},
) {
    const url = [product,'delete-product',idProduct].join('/')
    return dele(url, {
        success,
        failure, refLoading
    });
}



