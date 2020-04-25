import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable} from 'rxjs';
import { ShipmentModel}  from 'src/app/shared/models/shipment.model';
import { ShipmentsPendingApprovalResponse } from '../models/shipments_pa_response.model';

@Injectable({ providedIn: 'root'})

export class ShipmentService {

    private baseurl = environment.url + '';
    private paginatorSource$ = new BehaviorSubject<any>({});
    paginatorSource: ShipmentsPendingApprovalResponse;
    private pendingApprovalShipmentsSource$: BehaviorSubject<ShipmentModel[]> =
         <BehaviorSubject<ShipmentModel[]>> new BehaviorSubject(new Array<ShipmentModel>());
    pendingApprovalShipmentsSource: ShipmentModel[];
    private topSearchStringSource$: BehaviorSubject<string> = new BehaviorSubject<string>(''); 
    public topSearchString: Observable<string> = this.topSearchStringSource$.asObservable();
    public defaultTopPagerNumber: string = '10';
    private topPagerNumberSource$: BehaviorSubject<string> = new BehaviorSubject<string>(this.defaultTopPagerNumber); 
    public topPagerNumber: Observable<string> = this.topPagerNumberSource$.asObservable();
    
    constructor(private http: HttpClient) {}

    initPendingApprovalshipments(search?: string, queryParams?: any) { 
        search = (search) ? search.trim() : '';
        const params = search ? { params: new HttpParams().set('q', search) } : {};
        const headers = new HttpHeaders({})
        const path = 'shipments/pending_approval_json/';
        let pathParams = '';
        if (queryParams) {
            pathParams += ((queryParams.hasOwnProperty('rows_per_page')) ? queryParams.rows_per_page : this.defaultTopPagerNumber) + '/';
            pathParams += ((queryParams.hasOwnProperty('sort_by')) ? queryParams.sort_by : 'date_created') + '/';
            pathParams += ((queryParams.hasOwnProperty('sort_order')) ? queryParams.sort_by : 'ASC') + '/';
            pathParams += ((queryParams.hasOwnProperty('start')) ? queryParams.start : '0') + '/';
        }
        this.http.get(
            this.baseurl + path + pathParams,
            {...params, ...headers, responseType: 'json'}
            
        ).pipe(map((data: ShipmentsPendingApprovalResponse) => {
            const shipmentsArray: ShipmentModel[] = [];
            // const shipmentsObj = {...Object.entries(data)};
            if (data.hasOwnProperty('shipments_found') && data.shipments_found) {
                const {shipments, shipments_found,  ...pagination } = data;     
                for (const key in shipments) {
                    shipmentsArray.push({ ...shipments[key] }); 
                }
                return {
                    'shipments': shipmentsArray,
                    'pagination': pagination
                };
            }
        }))
        .subscribe(response => {
            this.pendingApprovalShipmentsSource$.next(response.shipments);
            this.pendingApprovalShipmentsSource = response.shipments;
            this.paginatorSource$.next(response.pagination);
            this.paginatorSource = response.pagination;
        });
        
    }

    getPendingApprovalShipments(): Observable<ShipmentModel[]> {
        return this.pendingApprovalShipmentsSource$.asObservable();
    }

    getPendingApprovalPagination(): Observable<ShipmentModel[]> {
        return this.paginatorSource$.asObservable();
    }

    setTopSearchString(currentStr: string) {
        this.topSearchStringSource$.next(currentStr);
    }
    
    setTopPagerNumber(currentStr: string) {
        this.defaultTopPagerNumber = currentStr;
        this.topPagerNumberSource$.next(currentStr);
    }
}