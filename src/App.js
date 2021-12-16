import React, { useState} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from "./pages/Login";
import DataLocal from "./functions/dataLocal";
import Product from "./pages/Product";
import News from "./pages/News";
import AddProduct from "./pages/Product/AddProduct";
import EditProduct from "./pages/Product/EditProduct";
import SearchProduct from "./pages/Product/SearchProduct";
import Bill from "./pages/Bill";
import Administrator from "./pages/Administrator";
import SettingAdmin from "./pages/Administrator/Setting";
import DetailBill from "./pages/Bill/DetailBill";
import AddNews from "./pages/News/AddNews";
import EditNews from "./pages/News/EditNews";
import {getToken, onMessageListener} from "./firebase";
import ReactNotification from "./notification/ReactNotification";

function App() {
    DataLocal.loadToken();
    DataLocal.loadIdAdmin();

    const [token, setToken] = useState(DataLocal.token);
    const [show, setShow] = useState(false);
    const [notification, setNotification] = useState({title: '', body: ''});
    const [isTokenFound, setTokenFound] = useState(false);

    if(!token) {
        return <Login setToken={setToken} />
    }

    getToken(isTokenFound,setTokenFound);

    onMessageListener().then(payload => {
        setShow(true);
        setNotification({title: payload.notification.title, body: payload.notification.body})
        console.log(payload);
    }).catch(err => console.log('failed: ', err));

  return (
    <>
        <div>
            {show? (
                <ReactNotification title={notification.title} body={notification.body}/>
            ): <></>}
        </div>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Product}/>
          <Route path='/add-product' exact component={AddProduct}/>
          <Route path='/edit-product' exact component={EditProduct}/>
          <Route path='/search-product' exact component={SearchProduct}/>
          <Route path='/bill' component={Bill}/>
          <Route path='/detail-bill' component={DetailBill}/>
          <Route path='/news' component={News}/>
          <Route path='/add-news' component={AddNews}/>
          <Route path='/edit-news' component={EditNews}/>
          <Route path='/setting' component={Administrator}/>
          <Route path='/administrator' component={SettingAdmin}/>
        </Switch>
      </Router>
    </>
  );
}

export default App;
