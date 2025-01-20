import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ProblemData } from '../../../../shared/problem/problem.interface';
import { TWO_SUM_DATA } from './two-sum.data';

@Injectable({
  providedIn: 'root'
})
export class TwoSumDataService {
  constructor(private http: HttpClient) {}

  getProblemData(): Observable<ProblemData> {
    // For now, return static data
    // Later, replace with API call
    return of(TWO_SUM_DATA);
    
    // Future API implementation:
    // return this.http.get<ProblemData>('/api/problems/two-sum');
  }
} 