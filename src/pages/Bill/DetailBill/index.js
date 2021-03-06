import React, {useEffect, useRef, useState} from 'react';
import './styles.css'
import {useHistory, useLocation} from "react-router-dom";
import {getDetailOrder, updateOrder, updateOrderAddress, updateQnt} from "../../../network/BillService";
import AlertConfirm from "../../../functions/AlertConfirm";
import AlertConfirmCancel from "../../../functions/AlertConfirmCancel";
import AlertInput from "../../../functions/AlertInput";
import Loading from "../../../functions/Loading";
import * as FaIcons from 'react-icons/fa';
import {Images} from "../../../assets/Images";

require("bootstrap/dist/css/bootstrap.min.css");

function DetailBill() {
    const history = useHistory();
    const location = useLocation();
    const refAlert = useRef();
    const refAlert2 = useRef();
    const refLoading = useRef();
    const refInput = useRef();
    const [qnt, setQnt] = useState(0)
    const [money, setMoney] = useState(0)
    const [data, setData] = useState({})
    const [products, setProducts] = useState([])
    const [status, setStatus] = useState('')
    const [address, setAddress] = useState('')
    const [color, setColor] = useState('#000000')

    useEffect(()=>{
        setData(location.state.route)
        getDetailOrder(location.state.route.id_bill,{
            page:0,
            size: 100
        },{
            success: res =>{
                let newQnt =0;
                let newMoney =0;
                for (const obj of res.data) {
                    newQnt = newQnt+ obj.amount
                    newMoney = newMoney + obj.amount * obj.prices
                }
                setProducts(res.data);
                setQnt(newQnt)
                setMoney(newMoney)
                const value = location.state.route.status;
                setStatus(res.data[0].status)
                setAddress(res.data[0].delivery_address);
                value === '0' ? setColor('#000000') : value ==='1' ? setColor('#4f99fc') : value === '2' ? setColor('#0f8a00') : setColor('red')

            },
            failure: err =>{
                refAlert.current.open('L???i Server! Vui l??ng th??? l???i',Images.error,()=>{});
            },
            refLoading
        })
    },[])

    const changeStatus = (value) =>{
        if (status==='3') return refAlert.current.open('????n h??ng ???? b??? h???y! Kh??ng ???????c s???a',Images.warning,()=>{});
        if (status==='2') return refAlert.current.open('????n n??y ???? thanh to??n th??nh c??ng! Kh??ng th??? s???a!',Images.success,()=>{});
        refAlert2.current.open('X??c nh???n thay ?????i tr???ng th??i ????n h??ng','warning',()=>{
            updateOrder({
                id_bill: data.id_bill,
                status: value
            },{
                success: res=>{
                    if (value==='3'){
                        products.map((obj,j)=>{
                            updateQnt({
                                type: 'remove',
                                id_product: obj.id_product,
                                size_name: obj.size,
                                qnt: obj.amount
                            },{
                                refLoading
                            })
                        })
                    }
                    value === '0' ? setColor('#000000') : value ==='1' ? setColor('#006dff') : value === '2' ? setColor('#18ff00') : setColor('red')
                    setStatus(value)
                },
                failure: err=>{

                },
                refLoading: refLoading
            })
        });
    }

    const changeAddress = (address) =>{
        updateOrderAddress(data.id_bill,{
            address: address
        },{
            success: res =>{
                setAddress(address)
                refAlert.current.open('C???p nh???t th??nh c??ng',Images.success,()=>{});
            },
            refLoading
        })
        console.log(address)
    }

    const openInputAddress = () =>{
        if (status !== '0') return refAlert.current.open('????n h??ng ??ang ???????c giao, kh??ng th??? thay ?????i d???a ch???',Images.warning,()=>{});
        refInput.current.open('?????a ch??? giao h??ng m???i', (config)=>{
            changeAddress(config)
        });
    }

    return (
      <div className='mainDetailBill' style={{height: window.innerHeight - 80}}>
          <div className='viewMainDetailBill'>
              <div className='viewHeaderDetailBill'>
                  <h1>Chi ti???t ????n h??ng</h1>
                  <div className='header'>
                      <div className='boxViewHeader'>
                          <h4>NG?????I NH???N H??NG</h4>
                          <div className='viewAddress'><p>?????a ch???: {address}</p><FaIcons.FaEdit style={{marginLeft: 15}} size={25} color={'#ff0000'} onClick={openInputAddress}/> </div>
                          <p>S??? ??i???n tho???i: {data.phone_number}</p>
                      </div>
                      <div className='boxViewHeader'>
                          <h4>TR???NG TH??I ????N H??NG</h4>
                          <select
                            required={true}
                            defaultValue={status}
                            value={status}
                            onChange={v=>{
                                changeStatus(v.target.value)
                            }}
                            className='viewStatus'
                            style={{ color: color}}
                          >
                              <option selected value="0" style={{color: '#000000'}}>??ang x??? l??</option>
                              <option selected value="1" style={{color: '#006dff'}}>??ang giao h??ng</option>
                              <option selected value="2" style={{color: '#18ff00'}}>???? giao</option>
                              <option selected value="3" style={{color: 'red'}}>???? h???y</option>
                          </select>
                          <p>Ph????ng th??c thanh to??n: {data.payment_methods ==='0' ? 'Ti???n m???t': 'ATM'}</p>
                      </div>
                  </div>
                  <table>
                      <tbody>
                      <tr className='th' style={{height: 54}}>
                          <th>S???n ph???m</th>
                          <th>????n gi??</th>
                          <th>Size</th>
                          <th>S??? l?????ng</th>
                          <th>Th??nh ti???n</th>
                      </tr>
                      {products.length>0 && products.map((obj,i)=>{
                          return(
                            <tr key={i} style={{height: 54}}>
                                <td>{obj.name}</td>
                                <td>{obj.prices}</td>
                                <td>{obj.size}</td>
                                <td>{obj.amount}</td>
                                <td>{obj.prices*obj.amount +'$'}</td>
                            </tr>
                          )
                      })}
                      <tr className='th' style={{height: 54}}>
                          <th>T???ng {qnt} s???n ph???m</th>
                          <td></td>
                          <td></td>
                          <td></td>
                          <th>Th??nh ti???n: {money}$</th>
                      </tr>
                      </tbody>
                  </table>
              </div>
          </div>
          <AlertConfirm ref={refAlert}/>
          <AlertConfirmCancel ref={refAlert2}/>
          <Loading ref={refLoading}/>
          <AlertInput ref={refInput}/>
      </div>
    );
}

export default DetailBill;
