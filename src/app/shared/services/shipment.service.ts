import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { ShipmentModel}  from 'src/app/shared/models/shipment.model';

@Injectable({ providedIn: 'root'})

export class ShipmentService {

    private baseurl = environment.url + '';
    constructor(private http: HttpClient) {
    }

    getPendingApprovalShipments(search: string, queryParams?: {}) {
        const params = new HttpParams();
        params.append('q', search);    
        if (Object.keys(queryParams).length > 0) {}

        console.log(this.baseurl, 'urll');
        return this.http.get(
            this.baseurl + 'shipments/pending_approval_json', 
            {
                headers: new HttpHeaders({}),
                params: params,
                responseType: 'json'
            }
        ).pipe(map(data => {
            const shipmentsArray: ShipmentModel[] = [];
            for (const key in data) {
                shipmentsArray.push({ ...data[key] });
            }
            return shipmentsArray;
        }));
    }
    
}