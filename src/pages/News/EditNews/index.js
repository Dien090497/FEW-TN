import React, {useEffect, useRef, useState} from 'react';
import './styles.css'
import {useHistory, useLocation} from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {editNewsApi, getInfoNewsApi} from "../../../network/NewsService";
import {hostUrl} from "../../../network/http/ApiUrl";
import Moment from "moment";
import AlertConfirm from "../../../functions/AlertConfirm";
import Loading from "../../../functions/Loading";
import {Images} from "../../../assets/Images";

function EditNews() {

    const history = useHistory();
    const location = useLocation();
    const refAlert = useRef();
    const refLoading = useRef();
    const [image, setImage] = useState({});
    const [idNews, setIdNews] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [date, setDate] = useState(new Date().toISOString());

    console.log(location.pathname);

    useEffect(()=>{
        const id_news = location.pathname.split('/')[2]
        if (!id_news) return history.push('/news')
        getInfoNewsApi(id_news,{
            success: res =>{
                setTitle(res.data.title);
                setContent(res.data.content);
                setDate(res.data.publication_date);
                setImage({preview: [hostUrl,res.data.image].join('/')});
                setIdNews(id_news)
            },
            refLoading
        })

        return()=>{
            image && URL.revokeObjectURL(image.preview);
        }
    },[])

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
        data.publication_date = Moment(data).format('YYYY-MM-DD');
        data.id_news = idNews;
        if (image.size ){data.imageNews = image}
        editNewsApi(data,{
            success: res =>{
                refAlert.current.open('Sửa thành công!',Images.success,()=>{
                    history.goBack()
                })
            },
            failure: err =>{
                refAlert.current.open('Thêm thất bại!',Images.error,()=>{

                })
            },
            refLoading
        },)
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
                                src={image.preview}
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
                                />
                            </div>
                        </div>
                        <div style={{width: '100%'}} className='viewContent'>
                            <input
                                className='textInput'
                                type="text" name="impot_price"
                                placeholder={"Nhập tiêu đề"}
                                required={true}
                                value={title}
                                onChange={(t)=>{
                                    setTitle(t.target.value)
                                }}
                            />
                            <div className='viewInputDate'>
                                <DatePicker
                                    selected={new Date()}
                                    locale={'vi'}
                                    onSelect={(t) =>{
                                        console.log(t)
                                    }} //when day is clicked
                                    onChange={(t) =>{
                                        setDate(t.toISOString())
                                        console.log(t)
                                    }} //only when value has changed
                                />
                            </div>
                            <textarea rows={10} className='txtTitleAddNews'
                                      required={true}
                                      value={content}
                                      onChange={(t)=>{
                                          setContent(t.target.value)
                                      }}/>
                        </div>
                    </div>
                    <input type="submit" value={'Thêm'} className='btnEditNews'/>
                </form>
            </div>
            <Loading ref={refLoading}/>
            <AlertConfirm ref={refAlert}/>
        </div>
    );
}

export default EditNews;
