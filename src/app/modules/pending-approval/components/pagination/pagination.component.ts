import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { ShipmentService } from 'src/app/shared/services/shipment.service';
import { ShipmentModel } from 'src/app/shared/models/shipment.model';
import { Observable } from 'rxjs';
import { PageChangedEvent } from 'ngx-bootstrap/pagination/public_api';
import { EventEmitter } from 'protractor';


@Component({
    selector: 'pa-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['pagination.component.scss'] 
})
export class PaginationComponent implements OnInit, OnDestroy {

    public currentPage: number;
    public showPagination: boolean = false;
    public pagination;
    private paginationStart: number = 0;
    public paginationData = {
        maxSize: 10,
        boundaryLinks: true,
        itemsPerPage: 50, 
        directionLinks: true,
        rotate: true
    };
    topSearchString: string = '';
    pagination$: Observable<any>;
    shipments$: Observable<ShipmentModel[]>
    topSearchString$: Observable<string>;

    constructor(private shipmentService: ShipmentService) {}

    ngOnInit() {
        this.getPaginationData();
    }

    getPaginationData() {
        this.pagination$ = this.shipmentService.getPendingApprovalPagination();
        this.pagination$.subscribe(pagination => {
            console.log('pagination on component pages', pagination);
            this.pagination = {...pagination, ...this.paginationData};
            console.log('global obj page', this.pagination);
            this.showPagination = true; 
        })
        //
        this.shipmentService.topSearchString.subscribe( str => {
            this.topSearchString = str;
        })
    }

    pageChanged(event: PageChangedEvent) {
        console.log('Page Change event', event); 
        this.currentPage = event.page;
        //
        const pathParams = { rows_per_page: this.paginationData.itemsPerPage, start: ((this.paginationStart) + (+this.currentPage * (this.paginationData.itemsPerPage))) };
        this.shipmentService.initPendingApprovalshipments(this.topSearchString, pathParams);
        this.shipments$ = this.shipmentService.getPendingApprovalPagination()
        this.shipments$.subscribe(resp => {
            this.pagination = resp;
            console.log('response on pagination', resp);
            // 
        });
    }

    getTotalPages(ev) {
        console.log('Total Pages changed: ' + ev);
    }

    ngOnDestroy() {
        // this.pagination$.unsubscribe();
        // this.shipments$.complete();
    }

}