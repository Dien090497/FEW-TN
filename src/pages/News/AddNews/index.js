import React, {useEffect, useState} from 'react';
import './styles.css'
import { useHistory } from "react-router-dom";

function News() {
    const history = useHistory();
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
        console.log('123')
        e.preventDefault();
        history.push('/news')
    }

    console.log('image')
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
                              src={image ? image.preview : require('../../../assets/image/bg_img.png')}
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
                                    setTitle(t)
                                }}
                            />
                            <textarea rows={10} className='txtTitleAddNews'
                                      onChange={(t)=>{
                                          setContent(t)
                                      }}/>
                        </div>
                    </div>
                    <input type="submit" value={'Thêm'} className='btn'/>
                </form>
            </div>
        </div>
    );
}

export default News;
