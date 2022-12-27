import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Iproduct } from '../interface/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getData(currentPage: number, pageSize: number) {
    return this.http.get(`${environment.urlBase}/product?page=${currentPage}&limit=${pageSize}`);
  }

  getDataSearch(search: string) {
    console.log({ search });
    
    return this.http.get(`${environment.urlBase}/product/search/${search}`);
  }

  getItem(product_id: string) {
    return this.http.get(`${environment.urlBase}/product/${product_id}`);
  }

  postItem(data: Iproduct) {
    return this.http.post(`${environment.urlBase}/product`, {...data});
  }

  patchItem(product_id: string, data: Iproduct) {

    return this.http.patch(`${environment.urlBase}/product/${product_id}`, {...data});
  }

  deleteItem(product_id: string) {
    return this.http.delete(`${environment.urlBase}/product/${product_id}`);
  }
}
