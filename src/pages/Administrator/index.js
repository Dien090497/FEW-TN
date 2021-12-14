import React, {useEffect, useRef} from 'react';
import './styles.css'
import {styles} from "./styles";
import AlertConfirm from "../../functions/AlertConfirm";
import AlertConfirmCancel from "../../functions/AlertConfirmCancel";
import Loading from "../../functions/Loading";
import {useHistory} from "react-router-dom";

import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';
import {Images} from "../../assets/Images";
import { changePasswordApi} from "../../network/ServiceAdministrator";
import DataLocal from "../../functions/dataLocal";
require("bootstrap/dist/css/bootstrap.css");

const SweetAlert = withSwalInstance(swal);


function Account() {
    const refAlert = useRef();
    const refAlert2 = useRef();
    const refLoading = useRef();
    const history = useHistory();

    useEffect(()=>{

    },[])

  const changePassword = () =>{
    swal.fire({
      title: 'Nhập mật khẩu cũ',
      padding: '3em',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Lưu',
      cancelButtonText: 'Đóng',
      confirmButtonColor: 'red',
      showLoaderOnConfirm: true,
      preConfirm: (password) => {
        refAlert2.current.open('Xác nhận',Images.question,()=>{
          changePasswordApi({
            id_admin: parseInt(DataLocal.id_admin),
            password: password
          },{
            success: res =>{
              DataLocal.removeToken()
              refAlert.current.open('Đổi mật khẩu thành công',Images.success,()=>{})
            },
            failure: err =>{
              refAlert.current.open('Đổi mật khẩu thất bại',Images.error,()=>{})
            },
            refLoading
          })
        })
      },
    })
  }

    return (
        <div st='mainAccount' style={{height: window.innerHeight - 80}}>
            <div className='viewMainAccount'>
                <div className='viewHeaderAccount'>
                    <h1>CHỈNH SỬA THÔNG TIN NGƯỜI DÙNG</h1>
                </div>
                <div style={styles.viewMainAccount}>
                    <div style={styles.btn} onClick={()=>{
                      changePassword()
                    }}>Đổi mật khẩu</div>
                    <div style={styles.btn} onClick={()=>{
                      history.push('/administrator')
                    }}>Thay đổi quyền admin</div>
                    <div style={styles.btn} onClick={()=>{
                      history.push('/')
                    }}>Hủy</div>
                </div>
            </div>
            <SweetAlert/>
            <AlertConfirm ref={refAlert}/>
            <AlertConfirmCancel ref={refAlert2}/>
            <Loading ref={refLoading}/>
        </div>
    );
}

export default Account;
