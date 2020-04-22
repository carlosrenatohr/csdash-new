import { Component, OnInit } from '@angular/core';
import { ShipmentService } from 'src/app/shared/services/shipment.service';
import { ShipmentModel } from 'src/app/shared/models/shipment.model';
import { Observable } from 'rxjs';


@Component({
    selector: 'pa-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['pagination.component.scss'] 
})
export class PaginationComponent implements OnInit {
    public currentPage: number;
    public showPagination: boolean = false;
    public pagination;
    private paginationStart: number = 0;
    public paginationData = {
        maxSize: 5,
        boundaryLinks: true,
        itemsPerPage: 50
    };
    pagination$: Observable<any>;

    constructor(private shipmentService: ShipmentService) {}
    ngOnInit() {
        this.getPaginationData();
    }

    getPaginationData() {
        this.shipmentService.paginatorSource$.subscribe(pagination => {
            console.log('pagination on component pages', pagination);
            // this.pagination = pagination
            this.pagination = {...pagination, ...this.paginationData};
            this.showPagination = true; 
        })
    }

    pageChanged(event) {
        console.log(event.page);
        this.currentPage = event.page;
        //
        const pathParams = { rows_per_page: this.paginationData.itemsPerPage, start: ((this.paginationStart + 1) + (+this.currentPage * (this.paginationData.itemsPerPage))) };
        this.shipmentService.initPendingApprovalshipments('', pathParams);
        this.pagination$ = this.shipmentService.getPendingApprovalPagination()
        this.pagination$.subscribe(resp => {
        // this.shipments$.subscribe(response => { 
            this.pagination = resp;
            // console.log('shipments', response.shipments);
            // console.log('pagination', response.pagination);
            console.log('response on pagination', resp);
        });
    }

    setPage() {
        this.currentPage = 91;
    }
}