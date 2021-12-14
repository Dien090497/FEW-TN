import React, {useEffect, useRef, useState} from 'react';
import './styles.css'
import {useHistory} from "react-router-dom";
import {addProductApi, getInfo} from "../../../network/ProductService";
import AlertConfirm from "../../../functions/AlertConfirm";
import Loading from "../../../functions/Loading";
import {Images} from "../../../assets/Images";

function AddProduct() {
    const history = useHistory();
    const refAlert = useRef();
    const refLoading = useRef();
    const [info, setInfo] = useState({})
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [importPrice, setImportPrice] = useState(0);
    const [sale, setSale] = useState(0);
    const [style, setStyle] = useState('0');
    const [category, setCategory] = useState('0');
    const [brand, setBrand] = useState('0');
    const [description, setDescription] = useState('');
    const [size, setSize] = useState([]);
    const [qnt, setQnt] = useState([]);
    const [avatar, setAvatar] = useState([]);
    const [countQnt, setCountQnt] = useState([]);


    useEffect(()=>{
        getInfo({
            success: res =>{
                setInfo(res.data);
            },
            refLoading
        })
        return()=>{
            avatar.length>0 && URL.revokeObjectURL(avatar.preview);
        }
    },[])
    const onChangePicture = e => {
        if (e.target.files.length > 0){
            const newAvatar = []
            for (var i = 0 ; i<e.target.files.length; i++){
                const file = e.target.files[i]
                file.preview  = URL.createObjectURL(file)
                newAvatar.push(file)
                console.log(URL.createObjectURL(file))
            }
            setAvatar(newAvatar)
        }
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        // history.push('/')
        const data ={}
        data.name = name
        data.export_price = Number(price);
        data.impot_price = Number(importPrice);
        data.sale = Number(sale);
        data.id_category = parseInt(category);
        data.id_style = parseInt(style);
        data.id_brand = parseInt(brand);
        data.pictureProduct = avatar;
        data.description = description;
        data.size = size;
        data.qnt = qnt;
        addProductApi(data,{
            success: res =>{
                refAlert.current.open('Thêm thành công',Images.success,()=>{
                    history.goBack()
                })

            },
            failure: err =>{
                refAlert.current.open('Thêm thất bại',Images.error,()=>{})
            },
            refLoading
        })
    }

    return (
        <div className='mainAddProduct' >
            <div className='viewMainAddProduct'>
                <h1>THÊM SẢN PHẨM</h1>
                <form encType={'multipart/form-data'} onSubmit={handleSubmit}>
                    <div className='viewForm'>
                        <div style={{flex: 1, padding: 20}} className='columnForm'>
                            <label className='label'>Tên sản phẩm</label>
                            <input
                                className='textInput'
                                type="text" name="name"
                                placeholder={"Nhập tên sản phẩm"}
                                defaultValue={name}
                                required={true}
                                onChange={v=> setName(v.target.value)}
                            />
                            <label className='label'>Giá bán</label>
                            <input
                                className='textInput'
                                type="number" name="export_price"
                                placeholder={"Nhập giá bán"}
                                aria-valuemin={1}
                                step={1}
                                required={true}
                                onChange={v=> setPrice(parseInt(v.target.value))}
                            />
                            <label className='label'>Giá nhập</label>
                            <input
                                className='textInput'
                                type="number" name="impot_price"
                                placeholder={"Nhập giá nhập"}
                                step={1}
                                required={true}
                                aria-valuemin={1}
                                onChange={v=> setImportPrice(Number(v.target.value))}
                            />
                            <label className='label'>Khuyến mãi</label>
                            <input
                                className='textInput'
                                type="number" name="sale"
                                placeholder={"Nhập khuyến mãi (%)"}
                                aria-valuemax={100}
                                aria-valuemin={0}
                                step={0.01}
                                required={true}
                                onChange={v=> setSale(Number(v.target.value))}
                            />
                            <label className='label'>Loại</label>
                            <select
                                className='textInput'
                                name="id_category"
                                required={true}
                                defaultValue={category}
                                onChange={v=> setCategory(v.target.value)}
                            >
                                <option selected value="">Chọn...</option>
                                {info.category && info.category.length > 0 && info.category.map((obj,i)=>{
                                    return <option value={obj.id_category.toString()}>{obj.name_category}</option>
                                })}
                            </select>
                            <label className='label'>Mùa</label>
                            <select
                                className='textInput'
                                name="id_style"
                                required={true}
                                defaultValue={style}
                                onChange={v=> setStyle(v.target.value)}
                            >
                                <option selected value="">Chọn...</option>
                                {info.style && info.style.length > 0 && info.style.map((obj,i)=>{
                                    return <option value={obj.id_style.toString()}>{obj.style_name}</option>
                                })}
                            </select>
                        </div>
                        <div style={{flex: 1, padding: 20}} className='columnForm'>
                            <label className='label'>Thương hiệu</label>
                            <select
                                className='textInput'
                                name="id_brand"
                                required={true}
                                defaultValue={brand}
                                onChange={v=> setBrand(v.target.value)}
                            >
                                <option selected value="">Chọn...</option>
                                {info.brand && info.brand.length > 0 && info.brand.map((obj,i)=>{
                                    return <option value={obj.id_brand.toString()}>{obj.brand_name}</option>
                                })}
                            </select>
                            <label htmlFor='file' className='label'>Ảnh</label>
                            <div className='viewFileInput'>
                                {avatar.length > 0 && avatar.map((obj, i) => {
                                    return (<img key={i} src={obj.preview} className='imagePreview'/>)
                                })}
                                <label htmlFor='file' className='labelFile'>Chọn ảnh</label>
                                <input
                                    id={'file'}
                                    className='inputImage'
                                    type="file" name="pictureProduct"
                                    placeholder={"Nhập địa chỉ email"}
                                    accept="image/*"
                                    multiple={true}
                                    required={true}
                                    onChange={onChangePicture}
                                />

                            </div>
                            <label className='label'>Thông tin chi tiết</label>
                            <textarea
                                className='textInput'
                                name="description"
                                placeholder={"Nhập mô tả"}
                                rows={3}
                                defaultValue={description}
                                onChange={v=> setDescription(v.target.value)}
                            />
                            <label className='label'>Số lượng</label>
                            <div className='viewQnt'>
                                <div className='viewQnt2'>
                                    <div className='titleQnt' style={{flex: 1,}}>
                                        <p>Size</p>
                                    </div>
                                    <div className='titleQnt' style={{flex: 2}}>
                                        <p>Số lượng</p>
                                    </div>
                                </div>
                                {countQnt.length > 0 && countQnt.map((obj, i) => {
                                    return (
                                        <div className='viewQnt2' key={i}>
                                            <div className='inputQnt' style={{flex: 1}}>
                                                <input
                                                    className='textInput'
                                                    type="text" name="size"
                                                    placeholder={"Nhập mã size"}
                                                    required={true}
                                                    onChange={v=>{
                                                        const newSize = Object.assign([],size);
                                                        newSize[i] = v.target.value;
                                                        setSize(newSize)
                                                    }}
                                                />
                                            </div>
                                            <div className='inputQnt' style={{flex: 2}}>
                                                <input
                                                    required={true}
                                                    className='textInput'
                                                    type="number" name="qnt"
                                                    placeholder={"Nhập số lượng"}
                                                    onChange={v=> {
                                                        const newQnt = Object.assign([],qnt);
                                                        newQnt[i] = parseInt(v.target.value);
                                                        setQnt(newQnt)
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )
                                })}
                                <div>
                                    <img src={require('../../../assets/image/remove.svg').default} width={40} height={40}
                                         onClick={() => {
                                             if (countQnt <= 0) return;
                                             const newCountQnt = Object.assign([], countQnt);
                                             newCountQnt.splice(0, 1);
                                             setCountQnt(newCountQnt)
                                         }}/>
                                    <img src={require('../../../assets/image/add2.svg').default} width={40} height={40}
                                         onClick={() => {
                                             const newCountQnt = Object.assign([], countQnt);
                                             newCountQnt.push('item');
                                             setCountQnt(newCountQnt)
                                         }}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <input type="submit" value={'Thêm'} className='btnAddProduct'/>
                </form>
            </div>
            <AlertConfirm ref={refAlert}/>
            <Loading ref={refLoading}/>
        </div>
    );
}

export default AddProduct;
