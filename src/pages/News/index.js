import React, {useState} from 'react';
import './styles.css'
import { useHistory } from "react-router-dom";
import Pagination from "react-js-pagination";

function News() {
    const history = useHistory();
    const [news, setNews] = useState([1,2,3,4,5,6,7,8])
    const [page, setPage] = useState(1)

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
                                <img src={require('../../assets/image/logo.png').default} width={80} height={80}/>
                                <div className='itemTitle'>
                                    <h4>Giảm giá 40% cho tất cả các mặt hàng từ 12/09 đến 14/09</h4>
                                    <p>31/08/2021</p>
                                </div>
                                <div className='viewSetting'>
                                    <img src={require('../../assets/image/ic_edit_news.png').default} width={60} height={60}
                                         onClick={() => {
                                             history.push('/edit-news')
                                         }}/>
                                    <img src={require('../../assets/image/ic_remove_news.png').default} width={60} height={60}
                                         onClick={() => {

                                         }}/>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className='page'>
                    <Pagination
                        activePage={page}
                        itemsCountPerPage={10}
                        totalItemsCount={100}
                        pageRangeDisplayed={5}
                        onChange={(p)=>{
                            setPage(p)
                        }}
                        itemClass="page-item"
                        linkClass="page-link"
                    />
                </div>
            </div>
        </div>
    );
}

export default News;
