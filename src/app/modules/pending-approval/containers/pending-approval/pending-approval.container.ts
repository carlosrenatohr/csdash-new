import { OnInit, Component } from '@angular/core';


@Component({
    selector: 'ccsp-pending-approval-container',
    templateUrl: './pending-approval.container.html',
    styleUrls: ['pending-approval.container.scss']
})

export class PendingApprovalContainer implements OnInit {

    ngOnInit() {
        console.log('Pending Approval');
    }
} 