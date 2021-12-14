import React, {useEffect, useRef, useState} from 'react';
import './styles.css'
import { useHistory } from "react-router-dom";
import Pagination from "react-js-pagination";
import {deleteProductAPI, getListProduct, getSize} from "../../network/ProductService";
import * as IoIcons from "react-icons/io";
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import AlertConfirm from "../../functions/AlertConfirm";
import Loading from "../../functions/Loading";
import {Images} from "../../assets/Images";
import {hostUrl} from "../../network/http/ApiUrl";

require("bootstrap/dist/css/bootstrap.css");

function Product() {
    const history = useHistory();
    const refAlert = useRef();
    const refLoading = useRef();
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [count, setCount] = useState(0);
    const [data, setData] = useState([]);

    useEffect(()=>{
        listProduct()
    },[page])

    const deleteProduct = (idProduct) =>{
        deleteProductAPI(idProduct,{
            success: res =>{
                if (res.data.message === 'forbidden') return refAlert.current.open('Không thể xóa sản phẩm này',Images.error,()=>{});
                refAlert.current.open('Xóa thàn công',Images.success,()=>{});
                listProduct()
            },
            failure: err =>{
                refAlert.current.open('Xóa thất bại! Vui lòng thử lại',Images.warning,()=>{});
            },
            refLoading
        })
    }

    const listProduct = (p) =>{
        getListProduct({
            page: page,
            size: pageSize
        },{
            success: res =>{
                if (res.data.products.length>0){
                    const idProducts =[];
                    res.data.products.map((obj,i)=>{
                        idProducts.push(obj.id_product);
                    })
                    getSize(idProducts,{
                        success: resSize=>{
                            res.data.products.map((obj,i)=>{
                                const size =[]
                                for (const objElement of resSize.data) {
                                    if (obj.id_product === objElement.id_product){
                                        size.push(objElement)
                                    }
                                }
                                res.data.products[i].size = size;
                            })
                            setCount(res.data.count)
                            setData(res.data.products);
                        },
                        failure: err =>{
                            refAlert.current.open('Lỗi Server! Vui lòng thử lại',Images.warning,()=>{});
                        },
                        refLoading
                    })
                }
            },
            failure: err =>{
                refAlert.current.open('Lỗi Server! Vui lòng thử lại',Images.warning,()=>{});
            },
            refLoading
        })
    }

    return (
        <div className='mainProduct' >
            <div className='viewMainProduct'>
                <div className='viewHeaderProduct'>
                    <h1>DANH SÁCH SẢN PHẨM</h1>
                    <a href=""><IoIcons.IoIosAddCircle size={'60px'} color={'red'} onClick={()=>{
                        history.push('/add-product')
                    }}/></a>
                </div>
                <table>
                    <tbody>
                    <tr style={{height: 54}}>
                        <th className='th'>Tên sản phẩm</th>
                        <th className='th'>Hình ảnh</th>
                        <th className='th'>Giá bán</th>
                        <th className='th'>Giá Nhập</th>
                        <th className='th'>Số lượng</th>
                        <th className='th'>Thương hiệu</th>
                        <th className='th'>Thao tác</th>
                    </tr>
                    {data.length>0 && data.map((obj,i)=>{
                        return(
                          <tr key={i} style={{height: 80}}>
                              <th className='th'>{obj.name}</th>
                              <th className='th'><img src={hostUrl+'/'+obj.src[0]} alt="" width={60} height={60}/></th>
                              <th className='th'>{obj.export_price + '$'}</th>
                              <th className='th'>{obj.impot_price + '$'}</th>
                              <th className='th'>
                                  <div className='size'>
                                      {obj.size.length > 0 && obj.size.map((objSize, j) => {
                                          return (<p key={j} className='textSize'>{objSize.size_name + ' : ' + objSize.qnt}</p>)
                                      })}
                                  </div>
                              </th>
                              <th className='th'>{obj.brand_name}</th>
                              <th className='th'>
                                  <div className='viewActionProduct'>
                                      <FaIcons.FaEdit color={'#41b700'} className='iconActionProduct' size={'30px'} onClick={()=>{
                                          history.push({
                                              pathname: '/edit-product',
                                              state: { route: obj}
                                          })
                                      }}/>
                                      <MdIcons.MdDeleteForever color={'#ff0000'} className='iconActionProduct' size={'30px'}onClick={()=>{
                                          deleteProduct(obj.id_product);
                                      }}/>
                                  </div>
                              </th>
                          </tr>
                        )
                    })}
                    </tbody>
                </table>
                <div className='page'>
                    <Pagination
                        activePage={page+1}
                        itemsCountPerPage={pageSize}
                        totalItemsCount={count}
                        pageRangeDisplayed={5}
                        onChange={(p)=>{
                            setPage(p-1)
                        }}
                        itemClass="page-item"
                        linkClass="page-link"
                    />
                </div>
            </div>
            <AlertConfirm ref={refAlert}/>
            <Loading ref={refLoading}/>
        </div>
    );
}

export default Product;
