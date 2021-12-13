import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from "prop-types";
import React, { Component }  from 'react';

const ReactNotification = ({title, body}) =>{
    toast.info(<Display />);

    function Display(){
        return(
            <div>
                <h4>{title}</h4>
                <p>{body}</p>
            </div>
        )
    }

    return <ToastContainer />;
};

ReactNotification.prototype ={
    title: PropTypes.string,
    body: PropTypes.string,
}

export default ReactNotification;