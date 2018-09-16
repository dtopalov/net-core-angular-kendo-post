import { Component } from '@angular/core';
import { DataService } from './data.service';
import { map } from 'rxjs/operators/map';
import { GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { DataSourceRequestState, DataResult } from '@progress/kendo-data-query';

@Component({
    selector: 'app-fetch-data',
    templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
    public products: GridDataResult;
    public state: DataSourceRequestState = {
        skip: 0,
        take: 1
    };

    constructor(private dataService: DataService) {
        this.dataService.fetch(this.state).subscribe(r => this.products = r);

    }

    public dataStateChange(state: DataStateChangeEvent): void {
        this.state = state;
        this.dataService.fetch(state)
            .subscribe(r => this.products = r);
    }
}
