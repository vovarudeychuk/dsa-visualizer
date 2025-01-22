import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ProblemData } from '../../../../shared/problem/problem.interface';
import { GROUP_ANAGRAMS_DATA } from './group-anagrams.data';

@Injectable({
  providedIn: 'root'
})
export class GroupAnagramsDataService {
  constructor(private http: HttpClient) {}

  getProblemData(): Observable<ProblemData> {
    return of(GROUP_ANAGRAMS_DATA);
  }
} 