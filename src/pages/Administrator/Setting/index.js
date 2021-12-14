import React, {useEffect, useRef, useState} from 'react';
import AlertConfirm from "../../../functions/AlertConfirm";
import AlertConfirmCancel from "../../../functions/AlertConfirmCancel";
import Loading from "../../../functions/Loading";
import {useHistory} from "react-router-dom";
import {getUserApi, updateAdminApi} from "../../../network/ServiceAdministrator";
import * as IoIcons from "react-icons/io";
import Pagination from "react-js-pagination";

import swal from 'sweetalert2';
import {Images} from "../../../assets/Images";
import DataLocal from "../../../functions/dataLocal";
require("bootstrap/dist/css/bootstrap.css");

function Account() {
    const refAlert = useRef();
    const refAlert2 = useRef();
    const refLoading = useRef();
    const history = useHistory();
    const [pageSize, setPageSize] = useState(15);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(0);
    const [isAdmin, setIsAdmin] = useState(true);

    const [users, setUsers] = useState([]);

    useEffect(()=>{
      getUserApi({page:page,size: pageSize},{
        success: res=>{
          console.log(res.data)
          setUsers(res.data.users)
          setCount(res.data.count)
        },
        refLoading
      })
    },[page])

  const changeAdmin = (obj,action) =>{
      const body= {
        id_admin: DataLocal.id_admin,
        action: action,
        id_user: obj.id_user,
        name: obj.name,
        password: obj.password
      }
    updateAdminApi(body,{
      success: res =>{
        if (res.data.message !=='OK') return refAlert.current.open('Bạn không có quyền cập nhật!',Images.warning,()=>{setIsAdmin(false)})
        refAlert.current.open('Cập nhật thành công!',Images.success,()=>{
          history.go(0)
        })
      },
      failure: err =>{
        refAlert.current.open('Cập nhật thất bại',Images.error,()=>{})
      },refLoading
    })
  }

    return (
        <div className='mainAccount' style={{height: window.innerHeight - 80}}>
            <div className='viewMainAccount'>
                <div className='viewHeaderAccount'>
                    <h1>BẢNG PHÂN QUYỀN ADMIN/USER</h1>
                </div>
              <table>
                <tbody>
                <tr style={{height: 54}}>
                  <th className='th'>STT</th>
                  <th className='th'>Username</th>
                  <th className='th'>Quyền</th>
                  <th className='th'>Chỉnh sửa</th>
                  <th className='th'>Ghi chú</th>
                </tr>
                {users.length>0 && users.map((obj,i)=>{
                  return(
                    <tr key={i} style={{height: 54}}>
                      <th className='th'>{i+page*pageSize+1}</th>
                      <th className='th'>{obj.id_user}</th>
                      <th className='th'>{obj.is_admin === 1 ? 'Admin' : 'Người dùng'}</th>
                      <th className='th'>
                        {obj.is_admin === 0 ?
                          <IoIcons.IoIosArrowUp size={30} style={{backgroundColor:'#1af800', borderRadius:20, color:'#fff'}} onClick={()=>{
                            if (!isAdmin) return refAlert.current.open('Bạn không có quyền cập nhật!',Images.warning,()=>{})
                            swal.fire({
                              title: 'Bạn muốn đăng ký admin cho tài khoản này?',
                              showCloseButton: true,
                              showCancelButton: true,
                              focusConfirm: false,
                              confirmButtonText: 'Dồng ý',
                              cancelButtonText: 'Hủy',
                              cancelButtonColor: 'gray',
                              confirmButtonColor: 'red',
                              padding: 40,
                              preConfirm(inputValue) {
                              },
                              didClose(value) {
                                changeAdmin(obj,'up')
                              }
                            })
                          }}/> : <IoIcons.IoIosArrowDown size={30} style={{backgroundColor:'#ff0000', borderRadius:20, color:'#fff'}} onClick={()=>{
                            if (!isAdmin) return refAlert.current.open('Bạn không có quyền cập nhật!',Images.warning,()=>{})
                            swal.fire({
                              title: 'Bạn muốn hủy admin cho tài khoản này?',
                              showCloseButton: true,
                              showCancelButton: true,
                              focusConfirm: false,
                              confirmButtonText: 'Dồng ý',
                              cancelButtonText: 'Hủy',
                              cancelButtonColor: 'gray',
                              confirmButtonColor: 'red',
                              padding: 40,
                              preConfirm(inputValue) {
                              },
                              didClose(value) {
                                changeAdmin(obj,'down')
                              }
                            })
                          }}/>}
                      </th>
                      <th className='th'>

                      </th>
                    </tr>
                  )
                })}
                </tbody>
              </table>
              <div className='page'>
                <Pagination
                  activePage={page +1}
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
            <AlertConfirmCancel ref={refAlert2}/>
            <Loading ref={refLoading}/>
        </div>
    );
}

export default Account;
