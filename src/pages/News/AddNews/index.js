import React, {useEffect, useRef, useState} from 'react';
import './styles.css'
import { useHistory } from "react-router-dom";
import {Images} from "../../../assets/Images";
import {addNewsApi} from "../../../network/NewsService";
import AlertConfirm from "../../../functions/AlertConfirm";
import Loading from "../../../functions/Loading";

function News() {
    const history = useHistory();
    const refAlert = useRef();
    const refLoading = useRef();
    const [image, setImage] = useState();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(()=>{
        return()=>{
            image && URL.revokeObjectURL(image.preview);
        }
    })

    const onChangePicture = e => {
        if (e.target.files[0]) {
            const file = e.target.files[0]
            file.preview = URL.createObjectURL(file)
            setImage(file)
        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        const data ={}
        data.title = title
        data.content = content;
        data.imageNews = image;
        addNewsApi(data,{
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
        <div className='mainAddNews'>
            <div className='viewMainAddNews'>
                <div className='viewHeaderAddNews'>
                    <h1>THÊM TIN TỨC</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='viewTitle'>
                        <div className='btnUploadImage'>
                          <img
                              src={image ? image.preview : require('../../../assets/image/bg_img.png').default}
                              width={160} />
                            <div>
                                <label htmlFor='file' className='labelFile'>Chọn ảnh</label>
                                <input
                                    id={'file'}
                                    className='inputImage'
                                    type="file" name="pictureNewtTitle"
                                    accept="image/*"
                                    onChange={onChangePicture}
                                    required={true}
                                />
                            </div>
                        </div>
                        <div style={{width: '100%'}} className='viewContent'>
                            <input
                                className='textInput'
                                type="text" name="title"
                                placeholder={"Nhập tiêu đề"}
                                required={true}
                                onChange={(t)=>{
                                    setTitle(t.target.value)
                                }}
                            />
                            <textarea rows={10} className='txtTitleAddNews'
                                      name='content'
                                      required={true}
                                      onChange={(t)=>{
                                          setContent(t.target.value)
                                      }}/>
                        </div>
                    </div>
                    <input type="submit" value={'Thêm'} className='btnAddNews'/>
                </form>
            </div>
            <Loading ref={refLoading}/>
            <AlertConfirm ref={refAlert}/>
        </div>
    );
}

export default News;
