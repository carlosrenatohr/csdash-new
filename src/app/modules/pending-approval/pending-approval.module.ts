import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { PendingApprovalRoutes } from './pending-approval.routing';
import { PendingApprovalContainer } from './containers/pending-approval/pending-approval.container';
import { DatatableComponent } from './components/datatable/datatable.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';



@NgModule({
    imports: [
        RouterModule.forChild(PendingApprovalRoutes),
        SharedModule,
        // CommonModule

    ],
    declarations: [
        PendingApprovalContainer,
        DatatableComponent
    ],
    exports: [],
    providers: [
        
    ]
})

export class PendingApprovalModule {}