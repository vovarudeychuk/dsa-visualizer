import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ProblemData } from '../../../../shared/problem/problem.interface';
import { PRODUCT_EXCEPT_SELF_DATA } from './product-of-array-except-self.data';

@Injectable({
  providedIn: 'root'
})
export class ProductExceptSelfDataService {
  constructor(private http: HttpClient) {}

  getProblemData(): Observable<ProblemData> {
    return of(PRODUCT_EXCEPT_SELF_DATA);
  }
} 