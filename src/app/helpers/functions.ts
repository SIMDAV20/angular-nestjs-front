import { FormGroup } from '@angular/forms';
import { alerts } from './alerts';

export class functions {
  // Funcion para validar el campo del form

  static invalidField(
    field: string,
    f: FormGroup,
    formSubmitted: boolean
  ): boolean {
    if (formSubmitted && f.controls[field].invalid) {
      return true;
    } else {
      return false;
    }
  }

  static createUrl(value:string) {
    value = value.toString().toLowerCase();
    // value = value.replace(/[ ]/g, "-");
    value = value.replace(/[á]/g, "a");
    value = value.replace(/[é]/g, "e");
    value = value.replace(/[í]/g, "i");
    value = value.replace(/[ó]/g, "o");
    value = value.replace(/[ú]/g, "u");
    value = value.replace(/[ñ]/g, "n");
    value = value.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,'-');
    value = value.replace(/\s+/g, '-')           // Replace spaces with -
    value = value.replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    value = value.replace(/\-\-+/g, '-')         // Replace multiple - with single -
    value = value.replace(/^-+/, '')             // Trim - from start of text
    value = value.replace(/-+$/, '');            // Trim - from end of text
    return value;
  }
}
