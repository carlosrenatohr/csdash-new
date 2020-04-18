import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { PendingApprovalRoutes } from './pending-approval.routing';
import { PendingApprovalContainer } from './containers/pending-approval/pending-approval.container';
import { DatatableComponent } from './components/datatable/datatable.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { TopSearchBarComponent } from './components/top-search-bar/top-search-bar.component';
import { TopRowsPerPageComponent } from './components/top-rows-per-page/top-rows-per-page.component';
import { BottomButtonActions } from './components/bottom-button-actions/bottom-button-actions.component';


@NgModule({
    imports: [
        RouterModule.forChild(PendingApprovalRoutes),
        SharedModule,
        // CommonModule

    ],
    declarations: [
        PendingApprovalContainer,
        DatatableComponent,
        TopSearchBarComponent,
        TopRowsPerPageComponent,
        BottomButtonActions
    ],
    exports: [],
    providers: [
        
    ]
})

export class PendingApprovalModule {}