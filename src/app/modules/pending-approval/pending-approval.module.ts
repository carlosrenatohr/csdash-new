import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { PendingApprovalRoutes } from './pending-approval.routing';
import { PendingApprovalContainer } from './containers/pending-approval/pending-approval.container';
import { DatatableComponent } from './components/datatable/datatable.component';
import { TopSearchBarComponent } from './components/top-search-bar/top-search-bar.component';
import { TopRowsPerPageComponent } from './components/top-rows-per-page/top-rows-per-page.component';
import { BottomButtonActionsComponent } from './components/bottom-button-actions/bottom-button-actions.component';
import { PaginationComponent } from './components/pagination/pagination.component';


@NgModule({
    imports: [
        RouterModule.forChild(PendingApprovalRoutes),
        SharedModule,
        PaginationModule.forRoot()
        // CommonModule

    ],
    declarations: [
        PendingApprovalContainer,
        DatatableComponent,
        TopSearchBarComponent,
        TopRowsPerPageComponent,
        BottomButtonActionsComponent, 
        PaginationComponent,
    ],
    exports: [],
    providers: [
        
    ]
})

export class PendingApprovalModule {}