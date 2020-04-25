import { Component, OnInit } from '@angular/core';
import { ShipmentService } from 'src/app/shared/services/shipment.service';
import { Observable } from 'rxjs';
import { ShipmentModel } from 'src/app/shared/models/shipment.model';

@Component({
    selector: 'pa-top-rows-per-page',
    templateUrl: './top-rows-per-page.component.html',
    styleUrls: []
})
export class TopRowsPerPageComponent implements OnInit {
    
    pagerNumber: string = this.shipmentService.defaultTopPagerNumber;
    pagesNumber: String[] = ['10', '50', '100', '250', '500'];
    topSearchString: string = '';
    shipments$: Observable<ShipmentModel[]>;
    pagination$;
    
    constructor(private shipmentService: ShipmentService) {}

    ngOnInit() {
        console.log('Init top rows per page component')
        this.getShipments(this.shipmentService.defaultTopPagerNumber); //FIX reduce this extra call loading the var fro service
    }

    getShipments(topPagerNumber) {
        this.shipmentService.topSearchString.subscribe( str => {
            this.topSearchString = str;
        })
        const pathParams = { rows_per_page: topPagerNumber, start: 0 };
        this.shipmentService.initPendingApprovalshipments(this.topSearchString, pathParams);
        this.shipments$ = this.shipmentService.getPendingApprovalShipments();

        this.pagination$ = this.shipmentService.getPendingApprovalPagination(); 
    }

    changePagerNumber(val) {
        this.pagerNumber = val;
        console.log('new pager number ' + this.pagerNumber);
        this.shipmentService.setTopPagerNumber(this.pagerNumber);
        this.getShipments(this.pagerNumber);
    }
}