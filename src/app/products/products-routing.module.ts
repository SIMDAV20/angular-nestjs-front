import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductsComponent } from './create-products/create-products.component';
import { ProductsComponent } from './products.component';
import { EditProductsComponent } from './edit-products/edit-products.component';

const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'products/create', component: CreateProductsComponent },
  { path: 'products/edit/:id', component: EditProductsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
