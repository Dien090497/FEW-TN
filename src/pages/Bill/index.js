import React, {useEffect, useRef, useState} from 'react';
import './styles.css'
import { useHistory } from "react-router-dom";
import Pagination from "react-js-pagination";
import {getListOrder} from "../../network/BillService";
import Moment from 'moment';
import AlertConfirm from "../../functions/AlertConfirm";
import Loading from "../../functions/Loading";
import {Images} from "../../assets/Images";
require("bootstrap/dist/css/bootstrap.css");

function Bill() {
    const history = useHistory();
    const refAlert = useRef();
    const refLoading = useRef();
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [count, setCount] = useState(0);
    const [data, setData] = useState([]);

    useEffect(()=>{
        getListOrder({
            page: page,
            size: size
        },{
            success: res =>{
                setCount(res.data.count)
                setData(res.data.order)
            },
            failure: err =>{
                refAlert.current.open('Xóa thất bại! Vui lòng thử lại',Images.warning);
            },
            refLoading
        })
    },[page])

    return (
        <div className='mainBill' style={{height: window.innerHeight - 80}}>
            <div className='viewMainBill'>
                <div className='viewHeaderBill'>
                    <h1>QUẢN LÝ ĐƠN HÀNG</h1>
                    <table>
                        <tr style={{height: 54}}>
                            <th className='th'>Trạng thái</th>
                            <th className='th'>Mã đơn hàng</th>
                            <th className='th'>Tên khách hàng</th>
                            <th className='th'>Ngày đặt</th>
                            <th className='th'>Chi tiết</th>
                        </tr>

                        {data && data.length > 0 && data.map((obj,i)=>{
                            return(
                              <tr style={{height: 80}}>
                                  {obj.status === '0' ?
                                    <th className='th' style={{color: '#000000'}}>Đang xử lý </th> : obj.status === '1' ?
                                      <th className='th' style={{color: '#006dff'}}>Đang giao hàng</th> : obj.status === '2' ?
                                        <th className='th' style={{color: '#18ff00'}}>Đã giao</th> :
                                        <th className='th' style={{color: '#ff0000'}}>Đã hủy</th>}
                                  <th className='th'>{'HD'+obj.id_bill}</th>
                                  <th className='th'>{obj.name}</th>
                                  <th className='th'>{Moment(obj.create_at).format('DD-MM-YYYY')}</th>
                                  <th className='detailText th' onClick={()=>{
                                      history.push({
                                          pathname: '/detail-bill',
                                          state: { route: obj},
                                      })
                                  }}><p>Xem chi tiết</p></th>
                              </tr>
                            )
                        })}
                    </table>
                    <div className='page'>
                        <Pagination
                            activePage={page+1}
                            itemsCountPerPage={size}
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
            </div>
            <AlertConfirm ref={refAlert}/>
            <Loading ref={refLoading}/>
        </div>
    );
}

export default Bill;
