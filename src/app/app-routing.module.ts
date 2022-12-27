import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NopagefoundComponent } from './otherpages/nopagefound/nopagefound.component';
import { ProductsRoutingModule } from './products/products-routing.module';

const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  // { path: 'products', component: ProductsComponent }, 
  { path: '**', component: NopagefoundComponent },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ProductsRoutingModule],  
  exports: [RouterModule]
})
export class AppRoutingModule { }
