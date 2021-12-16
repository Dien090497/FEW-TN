import React, {useEffect, useRef, useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import * as IoIcons from "react-icons/io";
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import AlertConfirm from "../../../functions/AlertConfirm";
import Loading from "../../../functions/Loading";
import {styles} from "./styles";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import '../../Product/styles.css'
import {getCategoryApi, getRangePrice, searchNameApi, searchNameRangeApi} from "../../../network/SearchService";
import {deleteProductAPI} from "../../../network/ProductService";
import {Images} from "../../../assets/Images";

require("bootstrap/dist/css/bootstrap.css");

function Product() {
    const history = useHistory();
    const refAlert = useRef();
    const refLoading = useRef();
    const [data, setData] = useState([]);
    const [name, setName] = useState('%20');
    const [category, setCategory] = useState([]);
    const [range, setRange] = useState([0,0]);
    const [rangeView, setRangeView] = useState([0,100]);
    const [sort, setSort] = useState(0);
    const [size, setSize] = useState([null,null,null,null,null,null]);

    useEffect(()=>{
        getRangePrice({
            success: res=>{
                setRangeView([res.data.min,res.data.max])
            },
            refLoading
        })
        getCategoryApi({
            success: res=>{
                res.map((obj)=>{
                    obj.checked = false
                })
                setCategory(res)
            }
        })
    },[])

    const actionSearch = () =>{
        const id_category = []
        category.map( obj =>{
            obj.checked ? id_category.push(obj.id_category) : null
        })
        const data ={
            price: sort,
            size: size.filter(item => item != null),
            id_category: id_category,
            max: range[1],
            min: range[0],
        }
        searchNameRangeApi(name,data,{
            success: res=>{
                setData(res.data)
            },
            refLoading
        })
    }

    const deleteProduct = (idProduct) =>{
        deleteProductAPI(idProduct,{
            success: res =>{
                console.log(res.data.message)
                if (res.data.message && res.data.message === 'forbidden') return refAlert.current.open('Không thể xóa sản phẩm này',Images.error,()=>{});
                refAlert.current.open('Xóa thàn công',Images.success,()=>{
                    actionSearch()
                });
            },
            failure: err =>{
                refAlert.current.open('Xóa thất bại! Vui lòng thử lại',Images.warning,()=>{});
            },
            refLoading
        })
    }

    return (
        <div className='mainProduct' >
            <div className='viewMainProduct'>
                <div style={styles.header}>
                    <IoIcons.IoIosArrowBack size={30}  className='iconProduct' onClick={()=>{
                        history.goBack();
                    }}/>
                    <h3 style={styles.textHerder}>Tìm kiếm sản phẩm</h3>
                </div>
                <div style={styles.viewInput} >
                    <input style={styles.input} type="text" onChange={(v)=> setName(v.target.value)}/>
                    <div className='iconProduct' style={styles.btnSearch} onClick={actionSearch}>
                        <IoIcons.IoMdSearch size={30} />
                    </div>
                </div>
                <div style={styles.filter}>
                    <div style={styles.filterBox}>
                        <p style={styles.textTitleFilter}>Giá</p>
                        <div style={styles.viewPriceFilter}>
                            <p style={styles.textPrice}>{range[0]+'$'}</p>
                            <Nouislider
                                style={styles.slider}
                                start={[range[0],range[1]]}
                                connect
                                orientation="horizontal"
                                behaviour="tap"
                                range={{
                                    min: rangeView[0],
                                    max: rangeView[1]
                                }}
                                step={1}
                                onUpdate={()=>{

                                }}
                                onChange={(v)=>{
                                    setRange([parseInt(v[0]),parseInt(v[1])])
                                }}
                            />
                            <p style={styles.textPrice}>{range[1]+'$'}</p>
                        </div>
                        <div style={styles.radio}>
                            <input type="radio" value="option1" checked={sort === 0} onClick={()=> setSort(0)}/> - Tăng
                        </div>
                        <div style={styles.radio}>
                            <input type="radio" value="option2" checked={sort === 1} onClick={() =>setSort(1)} /> - Giảm
                        </div>
                    </div>
                    <div style={styles.filterBox}>
                        <p style={styles.textTitleFilter}>Khích thước</p>
                        <div style={styles.radio} >
                            <input type="radio" value="option1" checked={!!size[0]} onClick={() => {
                            const newSize = Object.assign([],size)
                            newSize[0] ? newSize[0] = null  : newSize[0] = 'S';
                            setSize(newSize)
                        }} /> - S
                        </div>
                        <div style={styles.radio} >
                            <input type="radio" value="option2" checked={!!size[1]} onClick={() => {
                            const newSize = Object.assign([],size)
                            newSize[1] ? newSize[1] = null  : newSize[1] = 'M';
                            setSize(newSize)
                        }} /> - M
                        </div>
                        <div style={styles.radio} >
                            <input type="radio" value="option1" checked={!!size[2]} onClick={() => {
                            const newSize = Object.assign([],size)
                            newSize[2] ? newSize[2] = null  : newSize[2] = 'L';
                            setSize(newSize)
                        }} /> - L
                        </div>
                        <div style={styles.radio} >
                            <input type="radio" value="option2" checked={!!size[3]} onClick={() => {
                            const newSize = Object.assign([],size)
                            newSize[3] ? newSize[3] = null  : newSize[3] = 'XL';
                            setSize(newSize)
                        }} /> - XL
                        </div>
                        <div style={styles.radio} >
                            <input type="radio" value="option2" checked={!!size[4]} onClick={() => {
                            const newSize = Object.assign([],size)
                            newSize[4] ? newSize[4] = null  : newSize[4] = 'XXL';
                            setSize(newSize)
                        }} /> - XXL
                        </div>
                        <div style={styles.radio} >
                            <input type="radio" value="option2" checked={!!size[5]} onClick={() => {
                            const newSize = Object.assign([],size)
                            newSize[5] ? newSize[5] = null  : newSize[5] = '3XL';
                            setSize(newSize)
                        }} /> - 3XL
                        </div>
                    </div>
                    <div style={styles.filterBox}>
                        <p style={styles.textTitleFilter}>Loại</p>
                        {category.length>0 && category.map((obj,i)=>{
                            return(
                                <div key={i} style={styles.radio}>
                                    <input type="radio" value="option2" checked={obj.checked}  onClick={() => {
                                        const newCategory = Object.assign([],category)
                                        newCategory[i].checked = !newCategory[i].checked
                                        setCategory(newCategory)
                                    }} /> - {obj.name_category}
                                </div>
                            )
                        })}
                    </div>
                </div>
                <h4 style={styles.textSearch}>Kết quả tìm kiếm</h4>
                <table>
                    <tbody>
                    <tr style={{height: 54}}>
                        <th className='th'>Tên sản phẩm</th>
                        <th className='th'>Giá bán</th>
                        <th className='th'>Giá Nhập</th>
                        <th className='th'>Thương hiệu</th>
                        <th className='th'>Thao tác</th>
                    </tr>
                    {data.length>0 && data.map((obj,i)=>{
                        return(
                            <tr key={i} style={{height: 80}}>
                                <th className='th'>{obj.name}</th>
                                <th className='th'>{obj.export_price + '$'}</th>
                                <th className='th'>{obj.impot_price + '$'}</th>
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
                </div>
            </div>
            <AlertConfirm ref={refAlert}/>
            <Loading ref={refLoading}/>
        </div>
    );
}

export default Product;
