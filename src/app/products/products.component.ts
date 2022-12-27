import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { ProductsService } from 'src/app/services/products.service';
import { Iproduct } from '../interface/iproduct';
import {alerts} from "src/app/helpers/alerts";
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { functions } from '../helpers/functions';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'category', 'brand', 'status', 'actions'];

  dataSource: MatTableDataSource<Iproduct> = new MatTableDataSource();

  products: Iproduct[] = [];

  isLoading = false;
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  search: string = ''

  searchChanged = new Subject<string>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private productsService: ProductsService
  ) {
    this.searchChanged
      .pipe(
        debounceTime(800))
      .subscribe(() => {

        this.isLoading = true;
        this.productsService.getDataSearch(functions.createUrl(this.search)).subscribe(( resp: any ) => {
          this.products = resp.data;

          this.totalRows = resp.total;

          this.paginator.pageIndex = this.currentPage;
          this.paginator.length = this.totalRows;

          this.dataSource = new MatTableDataSource(this.products);
          
          this.isLoading = false;

        });
      })  
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.isLoading = true;
    this.productsService.getData(this.currentPage + 1, this.pageSize).subscribe((resp: any) => {

      this.products = resp.data;

      this.totalRows = resp.total;

      this.paginator.pageIndex = this.currentPage;
      this.paginator.length = this.totalRows;

      this.dataSource = new MatTableDataSource(this.products);
      
      this.isLoading = false;
    });
  };

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getData();
  }

  afterSearch() {
    if (this.search.length) {
      this.searchChanged.next();
    } else {
      this.getData();
    }
  }

  deleteProduct(product_id: string) {
    alerts
      .confirmAlert(
        '¿Está usted seguro?',
        'El registro no se podrá recuperar',
        'warning',
        '¡Si, borralo!'
      )
      .then(async ({ isConfirmed }: { isConfirmed: boolean}) => {
          if (isConfirmed) {
            alerts.showLoading();
            this.productsService.deleteItem(product_id).subscribe(
              (resp) => {
                alerts.close();
                alerts.basicAlert('Éxito', 'Producto eliminado correctamente', 'success');
                this.getData();
              },
              (error) => {
                console.log(error);
                alerts.close();
                alerts.basicAlert('Error', error.response, 'error');
              },
            );
          }
      });
  }

}
