import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ProblemData } from '../../../../shared/problem/problem.interface';
import { VALID_ANAGRAM_DATA } from './valid-anagram.data';

@Injectable({
  providedIn: 'root'
})
export class ValidAnagramDataService {
  constructor(private http: HttpClient) {}

  getProblemData(): Observable<ProblemData> {
    return of(VALID_ANAGRAM_DATA);
  }
} 