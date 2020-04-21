import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { ShipmentModel}  from 'src/app/shared/models/shipment.model';
import { ShipmentsPendingApprovalResponse } from '../models/shipments_pa_response.model';

@Injectable({ providedIn: 'root'})

export class ShipmentService {

    private baseurl = environment.url + '';
    private pa_paginator;
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
        ).pipe(map((data: ShipmentsPendingApprovalResponse) => {

            const shipmentsArray: ShipmentModel[] = [];
            // const shipmentsObj = {...Object.entries(data)};
            if (data.hasOwnProperty('total_shipments')) {
                const {shipments, ...pagination } = data;    
                console.log('shipm', shipments);  
                console.log('shipm', pagination);  
                this.pa_paginator = pagination;
                for (const key in shipments) {
                    shipmentsArray.push({ ...shipments[key] }); 
                }
            }
            return shipmentsArray;
        }));
    }
    
}