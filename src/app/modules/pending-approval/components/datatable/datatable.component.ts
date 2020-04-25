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

    shipments$: Observable<ShipmentModel[]>;
    customCandies: Number[];
        
    constructor(private shipmentService: ShipmentService) {}
    
    ngOnInit() {
        this.getShipments();
        this.customCandies = Array(20).fill(1).map((x,i)=>i); 
    }

    getShipments() {
        const query:string = '';
        const pathParams = { rows_per_page: this.shipmentService.defaultTopPagerNumber, start: 0 };
        this.shipmentService.initPendingApprovalshipments(query, pathParams);
        this.shipments$ = this.shipmentService.getPendingApprovalShipments();
    }
}