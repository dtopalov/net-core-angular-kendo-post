import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import {
    toDataSourceRequestString,
    translateDataSourceResultGroups,
    translateAggregateResults,
    DataResult,
    DataSourceRequestState,
    toDataSourceRequest
} from '@progress/kendo-data-query';

import { GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
    private BASE_URL: string = 'api/Products';

    constructor(private http: HttpClient) { }

    public fetch(state: DataSourceRequestState): Observable<any> {
        const queryStr = `${toDataSourceRequestString(state)}`; //serialize the state
        const hasGroups = state.group && state.group.length;

        const obj = toDataSourceRequest(state);
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        };

        return this.http
            .post(`${this.BASE_URL}`, queryStr, httpOptions) //send the state to the server         
            .map((res:any) => // process the response
                (<GridDataResult>{
                    //if there are groups convert them to compatible format
                    data: hasGroups ? translateDataSourceResultGroups(res.Data) : res.Data,
                    total: res.Total,
                    // convert the aggregates if such exists
                    //aggregateResult: translateAggregateResults(aggregateResults)
                })
            )
    }
}
