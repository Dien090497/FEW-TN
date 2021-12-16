import React, {Component } from 'react';
import Swal from 'sweetalert2';
require("bootstrap/dist/css/bootstrap.css");

export default class AlertInput extends Component {
  constructor(props) {
    super(props);
    this.state ={
      show: false,
    }
  }

  open = (title,config) => {
    Swal.fire({
      title: title,
      padding: '3em',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Lưu',
      cancelButtonText: 'Đóng',
      confirmButtonColor: 'red',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        config(login)
      },
    })
  }

  render(){
    return (
      <div>
      </div>
    );
  }
}

