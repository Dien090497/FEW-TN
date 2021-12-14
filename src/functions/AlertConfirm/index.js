import React, {Component } from 'react';
import * as IoIcons from "react-icons/io";
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';
require("bootstrap/dist/css/bootstrap.css");

const SweetAlert = withSwalInstance(swal);

export default class AlertConfirm extends Component {
    constructor(props) {
        super(props);
        this.state ={
            show: false,
        }
    }

    open = (text, icon, history) => {
        // swal.fire({
        //     title: 'AE Shop',
        //     text: text,
        //     icon: type,
        //     confirmButtonColor: 'red'
        // })
        swal.fire({
            title: 'AE Shop',
            text: text,
            imageUrl: icon,
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom image',
            confirmButtonColor: 'red',
            preConfirm(inputValue) {
                if (history()) return history()
            }
        })
    }

    render(){
        return (
            <div>
                <SweetAlert
                    show={this.state.show}
                />
            </div>
        );
    }
}

