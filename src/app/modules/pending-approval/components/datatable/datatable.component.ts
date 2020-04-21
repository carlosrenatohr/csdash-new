import { OnInit, Component } from '@angular/core';
import { ShipmentModel } from 'src/app/shared/models/shipment.model'; 
import { ShipmentService } from 'src/app/shared/services/shipment.service';

@Component({
    selector: 'pa-datatable',
    templateUrl: './datatable.component.html',
    styleUrls: ['datatable.component.scss']
})
export class DatatableComponent implements OnInit {

    shipments: ShipmentModel[] = [];
    
    constructor(private shipmentService: ShipmentService) {}
    
    ngOnInit() {
        this.getShipments();
    }

    getShipments() {
        const query:string = '';
        console.log('dataQuery', query);
        this.shipmentService.getPendingApprovalShipments(query, {})
            .subscribe(response => {
                this.shipments = response.shipments;
                console.log('shipments', response.shipments);
                console.log('pagination', response.pagination);
            }, (error) => {
                console.log('Request error detected ' + error.message);
            });
        

    }
}