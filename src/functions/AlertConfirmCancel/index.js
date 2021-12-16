import React, {Component } from 'react';
import swal from 'sweetalert2';
require("bootstrap/dist/css/bootstrap.css");

export default class AlertConfirmCancel extends Component {
  constructor(props) {
    super(props);
    this.state ={
      show: false,
    }
  }

  open = (text, type, action) => {
    swal.fire({
      title: text,
      icon: type,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: 'Dồng ý',
      cancelButtonText: 'Hủy',
      cancelButtonColor: 'gray',
      confirmButtonColor: 'red',
      padding: 40,
      preConfirm(inputValue) {
        if (action()) return action();
      }
    })
  }

  render(){
    return (
      <div>
      </div>
    );
  }
}

