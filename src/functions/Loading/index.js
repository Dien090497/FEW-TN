import React, {Component } from 'react';
import swal from 'sweetalert2';
require("bootstrap/dist/css/bootstrap.css");

export default class Loading extends Component {
  constructor(props) {
    super(props);
    this.state ={
      show: false,
    }
  }

  open = () => {
    swal.fire({
      title: 'Đang tải',
      html: 'Vui lòng đợi một xiu!',
      timerProgressBar: true,
      didOpen: () => {
        swal.showLoading()
      },
      showConfirmButton: false,
      allowOutsideClick: false
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })
  }

  hide = () =>{
    swal.close()
  }

  render(){
    return (
      <div>
      </div>
    );
  }
}

