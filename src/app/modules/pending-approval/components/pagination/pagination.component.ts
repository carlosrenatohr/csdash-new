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
    public paginationData = {
        maxSize: 10,
        boundaryLinks: true,
        itemsPerPage: this.shipmentService.defaultTopPagerNumber, 
        directionLinks: true,
        rotate: true
    };
    topSearchString: string = '';
    pagination$;
    shipments$: Observable<ShipmentModel[]>

    constructor(private shipmentService: ShipmentService) {}

    ngOnInit() {
        this.getPaginationData();
        this.shipmentService.topPagerNumber.subscribe( str => {
            console.log('changes on top page number into pagination ')
            this.paginationData.itemsPerPage = str;
            this.currentPage = 1;
        })
        //
        this.shipmentService.topSearchString.subscribe( str => {
            this.topSearchString = str;
            const pathParams = this.getPathObj(0);
            this.shipmentService.initPendingApprovalshipments(this.topSearchString, pathParams);
        });
    }

    getPaginationData() {
        // const pathParams = { rows_per_page: this.shipmentService.defaultTopPagerNumber, start: 0 };
        const pathParams = this.getPathObj();
        this.shipmentService.initPendingApprovalshipments(this.topSearchString, pathParams);
        this.pagination$ = this.shipmentService.getPendingApprovalPagination();
        this.pagination$.subscribe(pagination => {
            console.log('pagination on component pages', pagination);
            this.pagination = {...pagination, ...this.paginationData};
            console.log('global obj page', this.pagination);
            this.showPagination = true; 
        });
    }

    pageChanged(event: PageChangedEvent) {
        console.log('Page Change event', event); 
        this.currentPage = event.page;
        //
        
        //
        const pathParams = this.getPathObj();
        this.shipmentService.initPendingApprovalshipments(this.topSearchString, pathParams);
        this.shipments$ = this.shipmentService.getPendingApprovalPagination();
        console.log('Page changed on pagination')
    }

    getTotalPages(ev) {
        console.log('Total Pages changed: ' + ev);
    }

    private getPathObj(startFrom?: number) {
        if( !startFrom ) {
             startFrom = (+this.currentPage - 1)  * +this.shipmentService.defaultTopPagerNumber;
        } 
        return { rows_per_page: this.paginationData.itemsPerPage, start: startFrom.toString() };
    }

    ngOnDestroy() {
        this.pagination$.next();
        this.pagination$.complete();
    } 

}