import React, {useEffect, useRef, useState} from 'react';
import './styles.css'
import {Redirect, useHistory} from "react-router-dom";
import Pagination from "react-js-pagination";
import {deleteNewsApi, getNewsApi} from "../../network/NewsService";
import Loading from "../../functions/Loading";
import AlertConfirm from "../../functions/AlertConfirm";
import AlertConfirmCancel from "../../functions/AlertConfirmCancel";
import {Images} from "../../assets/Images";
import {hostUrl} from "../../network/http/ApiUrl";
import Moment from "moment";

function News() {
    const history = useHistory();
    const refLoading = useRef();
    const refAlert = useRef();
    const refAlert2 = useRef();
    const [news, setNews] = useState([])
    const [page, setPage] = useState(0)
    const [size, setSize] = useState(10)
    const [count, setCount] = useState(5)

    useEffect(()=>{
      getNewsApi({
        page: page,
        size: size
      },{
        success: res =>{
          setNews(res.data.news)
          setCount(res.data.count)
        },
        failure: err=>{
          refAlert.current.open('Lỗi Server! Vui lòng thử lại',Images.warning,()=>{});
        },
        refLoading
      })
    },[page])

  const deleteNews = (id_news) =>{
      refAlert2.current.open('Bạn có muốn xóa?',Images.question,()=>{
        deleteNewsApi(id_news,{
          success: res=>{
            refAlert.current.open('Xóa thành công!',Images.success,()=>{
              history.go(0)
            });
          },
          failure: err =>{
            refAlert.current.open('Xóa thất bại!',Images.warning,()=>{});
          }
        })
      })
  }

    return (
        <div className='mainNews'>
            <div className='viewMainNews'>
                <div className='viewHeaderNews'>
                    <h1>DANH SÁCH TIN TỨC</h1>
                    <img src={require('../../assets/image/ic_add_product.png').default}
                         style={{width: 60, height: 60}}
                         onClick={()=>{
                             history.push('/add-news')
                         }}/>
                </div>
                <div className='content'>
                    {news.length > 0 && news.map((obj,i)=>{
                        return(
                            <div className='viewItem'>
                                <img src={[hostUrl,obj.image].join('/')} width={80} height={80} style={{borderRadius: '10px'}}/>
                                <div className='itemTitle'>
                                    <h4>{obj.title}</h4>
                                    <p>{Moment(obj.publication_date).format('DD/MM/YYYY')}</p>
                                </div>
                                <div className='viewSetting'>
                                    <img src={require('../../assets/image/ic_edit_news.png').default} width={60} height={60}
                                         onClick={() => {
                                           history.push({
                                             pathname: '/edit-news/'+obj.id_news,
                                           })
                                         }}/>
                                    <img src={require('../../assets/image/ic_remove_news.png').default} width={60} height={60}
                                         onClick={() => {
                                            deleteNews(obj.id_news)
                                         }}/>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className='page'>
                    <Pagination
                        activePage={page+1}
                        itemsCountPerPage={size}
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
          <Loading ref={refLoading}/>
          <AlertConfirm ref={refAlert}/>
          <AlertConfirmCancel ref={refAlert2}/>
        </div>
    );
}

export default News;
