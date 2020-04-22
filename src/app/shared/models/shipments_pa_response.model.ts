import { ShipmentModel } from './shipment.model';

export class ShipmentsPendingApprovalResponse {
    shipments_found: boolean;
    sort_by: string;
    sort_order: string;
    rows_per_page: number;
    start: number;
    shipments?: ShipmentModel[];
    total_shipments: number;
}