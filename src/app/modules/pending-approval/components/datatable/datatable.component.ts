import { OnInit, Component } from '@angular/core';
import { ShipmentModel } from 'src/app/shared/models/shipment.model'; 
import { ShipmentService } from 'src/app/shared/services/shipment.service';
import { Observable } from 'rxjs';


@Component({
    selector: 'pa-datatable',
    templateUrl: './datatable.component.html',
    styleUrls: ['datatable.component.scss']
})
export class DatatableComponent implements OnInit {

    shipments: ShipmentModel[];
    shipments$: Observable<ShipmentModel[]>;
    
    constructor(private shipmentService: ShipmentService) {}
    
    ngOnInit() {
        this.getShipments();
    }

    getShipments() {
        const query:string = '';
        const pathParams = { rows_per_page: 50, start: 0 };
        this.shipmentService.initPendingApprovalshipments(query, pathParams);
        this.shipments$ = this.shipmentService.getPendingApprovalShipments()
        this.shipments$.subscribe(resp => {
        // this.shipments$.subscribe(response => { 
            this.shipments = resp;
            // console.log('shipments', response.shipments);
            // console.log('pagination', response.pagination);
            console.log('response on dt', resp);
        }, (error) => {
            console.log('Request error detected ' + error.message);
        });
        console.log('dataQuery', this.shipments$);

        

    }
}