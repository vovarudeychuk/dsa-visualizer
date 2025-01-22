import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ProblemData } from '../../../../shared/problem/problem.interface';
import { TOP_K_FREQUENT_DATA } from './top-k-frequent-elements.data';

@Injectable({
  providedIn: 'root'
})
export class TopKFrequentDataService {
  constructor(private http: HttpClient) {}

  getProblemData(): Observable<ProblemData> {
    return of(TOP_K_FREQUENT_DATA);
  }
} 