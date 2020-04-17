import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { PendingApprovalRoutes } from './pending-approval.routing';
import { PendingApprovalContainer } from './containers/pending-approval/pending-approval.container';
import { DatatableComponent } from './components/datatable/datatable.component';
import { HttpClientModule} from '@angular/common/http'
import { ShipmentService } from 'src/app/shared/services/shipment.service';

@NgModule({
    imports: [
        RouterModule.forChild(PendingApprovalRoutes),
        HttpClientModule

    ],
    declarations: [
        PendingApprovalContainer,
        DatatableComponent
    ],
    exports: [],
    providers: [
        ShipmentService,
        
    ]
})

export class PendingApprovalModule {}