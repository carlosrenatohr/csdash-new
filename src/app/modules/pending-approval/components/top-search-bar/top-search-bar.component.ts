import { OnInit, Component } from '@angular/core';
import { ShipmentService } from 'src/app/shared/services/shipment.service';
import { ShipmentModel } from 'src/app/shared/models/shipment.model';
import { Observable } from 'rxjs';

@Component({
    selector: 'pa-top-search-bar',
    templateUrl: './top-search-bar.component.html', 
    styleUrls: ['top-search-bar.component.scss']
})

export class TopSearchBarComponent implements OnInit {
    searchStr: string = '';
    shipments: ShipmentModel[];
    shipments$: Observable<ShipmentModel[]>;

    constructor(private shipmentService: ShipmentService) {}
    
    ngOnInit() {
        console.log('init top search bar')
        this.getShipments();
    }

    searchBy() {
        console.log('input.text', this.searchStr);
        this.shipmentService.setTopSearchString(this.searchStr);
        this.getShipments();
    }

    getShipments() {
        const pathParams = { rows_per_page: this.shipmentService.defaultTopPagerNumber, start: 0 };
        this.shipmentService.initPendingApprovalshipments(this.searchStr, pathParams);
        this.shipments$ = this.shipmentService.getPendingApprovalShipments();
    }



}