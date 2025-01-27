import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ProblemData } from '../../../../shared/problem/problem.interface';
import { CONTAINS_DUPLICATE_DATA } from './contains-duplicate.data';

@Injectable({
    providedIn: 'root'
})
export class ContainsDuplicateDataService {
    constructor(private http: HttpClient) { }

    getProblemData(): Observable<ProblemData> {
        // For now, return static data
        // Later, replace with API call
        return of(CONTAINS_DUPLICATE_DATA);

        // Future API implementation:
        // return this.http.get<ProblemData>('/api/problems/contains-duplicate');
    }
} 