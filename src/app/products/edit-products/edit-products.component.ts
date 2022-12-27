import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { ProductsService } from 'src/app/services/products.service';
import { Iproduct } from '../../interface/iproduct';
import { functions } from 'src/app/helpers/functions';
import { alerts } from 'src/app/helpers/alerts';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.scss']
})
export class EditProductsComponent implements OnInit {

  arrStatus = [
    'In Stock',
    'No Stock',
  ]

  public f = this.form.group({
    name:['', { validators: [Validators.required, Validators.pattern('[,\\a-zA-ZáéíóúñÁÉÍÓÚÑ,0-9 ]*') ] } ],
    cat_name:['', { validators: [Validators.required, Validators.pattern('[,\\a-zA-ZáéíóúñÁÉÍÓÚÑ ]*') ] } ],
    brand_name:['', { validators: [Validators.required, Validators.pattern('[,\\a-zA-ZáéíóúñÁÉÍÓÚÑ ]*') ] } ],
    status:['', { validators: [Validators.required] } ],
  })

  get name() { return this.f.controls.name }
  get cat_name() { return this.f.controls.cat_name }
  get brand_name() { return this.f.controls.brand_name }
  get status() { return this.f.controls.status }

  formSubmitted = false;

  isLoading: boolean = false;

  productId: string = '';

  constructor(
    private form: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( (params: any)=> { 
      this.productId = params.id;
      this.productsService.getItem(params.id).subscribe((resp:any) => {
        const { brand, category, name, status } = resp;
        
        this.name.setValue(name);
        this.cat_name.setValue(category.name);
        this.brand_name.setValue(brand.name);
        this.status.setValue(status);
        
      });

    })
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

    this.productsService.patchItem(this.productId, dataProduct).subscribe(
      resp => {
        this.isLoading = false;
        alerts.basicAlert("Éxito", "El producto a sido actualizado", "success");
        this.router.navigateByUrl('/products');
      },
      error => {
        this.isLoading = false;
        alerts.basicAlert("Error", "El producto no ha sido actualizado", "error");
      },
    )
  }

   // Validacion del form
  invalidField(field:string) {
    return functions.invalidField(field, this.f, this.formSubmitted)
  }

}
