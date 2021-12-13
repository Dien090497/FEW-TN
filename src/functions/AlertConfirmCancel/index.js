import React, {Component } from 'react';
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';
require("bootstrap/dist/css/bootstrap.css");

const SweetAlert = withSwalInstance(swal);

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
      preConfirm(inputValue) {
        action();
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

