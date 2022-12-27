import Swal, { SweetAlertIcon } from "sweetalert2";

export class alerts {

  // Funcion para alerta basica
  static basicAlert(title:string, text:string, icon:SweetAlertIcon ) {
    Swal.fire(title, text, icon)
  }

  // Funcion para alerta de confirmacion
  static confirmAlert(title:string, text:string, icon:SweetAlertIcon, confirmButtonText:string) {
    return Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmButtonText
    })
  }

  // Funcion para alerta basica
  static saveAlert(title:string, text:string, icon:SweetAlertIcon ) {
    return Swal.fire(title, text, icon) // uso return para luego usar un then al momento de llamarlo
  }

  // Funcion para loading
  static showLoading(params?: any) {
    return Swal.fire({
      title: 'Cargando...',
      html: 'Por favor espere...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading(params)
      }
    });
  }

  static close() {
    return Swal.close();
  }
}
