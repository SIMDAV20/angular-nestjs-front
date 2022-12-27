import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { ProductsService } from 'src/app/services/products.service';
import { Iproduct } from '../../interface/iproduct';
import { functions } from 'src/app/helpers/functions';
import { alerts } from 'src/app/helpers/alerts';
import { Router } from '@angular/router';



@Component({
  selector: 'app-create-products',
  templateUrl: './create-products.component.html',
  styleUrls: ['./create-products.component.scss']
})
export class CreateProductsComponent implements OnInit {

  arrStatus = [
    'In Stock',
    'No Stock',
  ]

  public f = this.form.group({
    name:['', { validators: [Validators.required, Validators.pattern('[,\\a-zA-ZáéíóúñÁÉÍÓÚÑ,0-9 ]*') ] } ],
    cat_name:['', { validators: [Validators.required, Validators.pattern('[,\\a-zA-ZáéíóúñÁÉÍÓÚÑ ]*') ] } ],
    brand_name:['', { validators: [Validators.required, Validators.pattern('[,\\a-zA-ZáéíóúñÁÉÍÓÚÑ ]*') ] } ],
    status:['In Stock', { validators: [Validators.required] } ],
  })

  get name() { return this.f.controls.name }
  get cat_name() { return this.f.controls.cat_name }
  get brand_name() { return this.f.controls.brand_name }
  get status() { return this.f.controls.status }

  formSubmitted = false;

  isLoading = false;

  constructor(
    private form: FormBuilder,
    private productsService: ProductsService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  saveProduct() {
    this.formSubmitted = true;

    if (this.f.invalid) return;

    const dataProduct: Iproduct = {
      name: (this.f.controls.name.value).toLowerCase(),
      slug: functions.createUrl((this.f.controls.name.value).toLowerCase()),
      status: (this.f.controls.status.value),
      category: {
        name: (this.f.controls.cat_name.value),
        slug: functions.createUrl((this.f.controls.cat_name.value).toLowerCase()),
      },
      brand: {
        name: (this.f.controls.brand_name.value),
        slug: functions.createUrl((this.f.controls.brand_name.value).toLowerCase()),
      },
    }    

    this.productsService.postItem(dataProduct).subscribe(
      resp => {
        this.isLoading = false;
        alerts.basicAlert("Éxito", "El producto a sido guardado", "success");
        this.router.navigateByUrl('/products');
      },
      error => {
        this.isLoading = false;
        alerts.basicAlert("Error", "El producto no ha sido guardado", "error");
      },
    )
  }

   // Validacion del form
  invalidField(field:string) {
    return functions.invalidField(field, this.f, this.formSubmitted)
  }

}
