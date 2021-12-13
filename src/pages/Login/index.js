import React, {useRef, useState} from 'react';
import  './styles.css'
import PropTypes from "prop-types";
import DataLocal from "../../functions/dataLocal";
import {loginAPI} from "../../network/AuthService";
import Loading from '../../functions/Loading'
const logo = require('../../assets/image/logo.png')

function Login({setToken}) {
    const refLoading = useRef();
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const handleSubmit = async e => {
        e.preventDefault();

        loginAPI({
            email: email,
            password: password
        },{
            success: res =>{
                    DataLocal.saveToken(res.data.token);
                    DataLocal.saveIdAdmin(res.data.id_admin);
                    return setToken(res.data.token);
            },
            failure: e=>{
                alert('Sai Tài khoản hoặc mật khẩu!')
            },refLoading
        })
    }

    console.log(logo)

    return (
        <div className='main' style={{width: 'auto', height: window.innerHeight}}>
            <div className='viewMain'>
                <div style={{display:'flex', height: '100%'}}>
                    <div style={{ height: '100%'}}>
                        <img src={logo.default} className='imageLogo' alt=''/>
                    </div>
                    <div className='viewFormLogin'>
                        <h1 className='text'>Đăng nhập tài khoản của bạn</h1>
                        <form className='form' onSubmit={handleSubmit} encType ="application/x-www-form-urlencoded">
                            <label className='label'>Email:</label>
                            <input
                                className='textInput'
                                type="text" name="email"
                                placeholder={"Nhập địa chỉ email"}
                                onChange={v=> setEmail(v.target.value)}
                            />
                            <label className='label'>Mật khẩu:</label>
                            <input
                                className='textInput'
                                type="password" name="password"
                                placeholder={'Nhập mật khẩu'}
                                onChange={v=> setPassword(v.target.value)}
                            />
                            <input type='submit' className='btnLoin' value={'Đăng nhập'} />
                        </form>

                    </div>
                    </div>
                </div>
            <Loading ref={refLoading}/>
        </div>
    );
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default Login;
