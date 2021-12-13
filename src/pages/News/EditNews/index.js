import React, {useEffect, useState} from 'react';
import './styles.css'
import {useHistory} from "react-router-dom";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function EditNews() {

    const history = useHistory();
    const [image, setImage] = useState(require('../../../assets/image/bg_img.png').default);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    // const [date, setDate] = useState(new Date().toISOString());

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
        history.push('/news')
    }

    return (
        <div className='mainEditNews'>
            <div className='viewMainEditNews'>
                <div className='viewHeaderEditNews'>
                    <h1>DANH SÁCH TIN TỨC</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='viewTitle'>
                        <div className='btnUploadImage'>
                            <img
                                src={image.default}
                                width={160} />
                            <div>
                                <label htmlFor='file' className='labelFile'>Chọn ảnh</label>
                                <input
                                    id={'file'}
                                    className='inputImage'
                                    type="file" name="pictureNewtTitle"
                                    accept="image/*"
                                    multiple={true}
                                    onChange={onChangePicture}
                                    required={true}
                                />
                            </div>
                        </div>
                        <div style={{width: '100%'}} className='viewContent'>
                            <input
                                className='textInput'
                                type="text" name="impot_price"
                                placeholder={"Nhập tiêu đề"}
                                required={true}
                                onChange={(t)=>{
                                    setTitle(t.target.value)
                                }}
                            />
                            <div className='viewInputDate'>
                                <DatePicker
                                    selected={new Date()}
                                    onSelect={(t) =>{
                                        console.log(t)
                                    }} //when day is clicked
                                    onChange={(t) =>{
                                        console.log(t)
                                    }} //only when value has changed
                                />
                            </div>
                            <textarea rows={10} className='txtTitleAddNews'
                                      onChange={(t)=>{
                                          setContent(t.target.value)
                                      }}/>
                        </div>
                    </div>
                    <input type="submit" value={'Thêm'} className='btn'/>
                </form>
            </div>
        </div>
    );
}

export default EditNews;
