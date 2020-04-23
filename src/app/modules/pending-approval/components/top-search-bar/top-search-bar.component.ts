import { OnInit, Component } from '@angular/core';
import { ShipmentService } from 'src/app/shared/services/shipment.service';
import { ShipmentModel } from 'src/app/shared/models/shipment.model';
import { Observable } from 'rxjs';

@Component({
    selector: 'pa-top-search-bar',
    templateUrl: './top-search-bar.component.html', 
    styles: ['top-search.component.scss']
})

export class TopSearchBarComponent implements OnInit {

    searchStr: string = '';
    shipments: ShipmentModel[];
    shipments$: Observable<ShipmentModel[]>;

    constructor(private shipmentService: ShipmentService) {}
    
    ngOnInit() {
        console.log('init top search bar')
    }

    searchBy() {
        console.log('input.text', this.searchStr);
        this.getShipments();
    }

    getShipments() {
        const pathParams = { rows_per_page: 50, start: 0 };
        this.shipmentService.initPendingApprovalshipments(this.searchStr, pathParams);
        this.shipments$ = this.shipmentService.getPendingApprovalShipments()
        this.shipments$.subscribe(resp => {
            this.shipments = resp;
            console.log('response on search component', resp);
        }, (error) => {
            console.log('Request error detected ' + error.message);
        });
    }

}