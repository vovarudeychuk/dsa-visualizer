import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ProblemData } from '../../../../shared/problem/problem.interface';
import { LONGEST_CONSECUTIVE_DATA } from './longest-consecutive-sequence.data';

@Injectable({
  providedIn: 'root'
})
export class LongestConsecutiveDataService {
  constructor(private http: HttpClient) {}

  getProblemData(): Observable<ProblemData> {
    return of(LONGEST_CONSECUTIVE_DATA);
  }
} 