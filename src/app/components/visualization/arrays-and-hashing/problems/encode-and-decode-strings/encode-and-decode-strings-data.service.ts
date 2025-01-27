import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ProblemData } from '../../../../shared/problem/problem.interface';
import { ENCODE_DECODE_STRINGS_DATA } from './encode-and-decode-strings.data';

@Injectable({
  providedIn: 'root'
})
export class EncodeDecodeStringsDataService {
  constructor(private http: HttpClient) {}

  getProblemData(): Observable<ProblemData> {
    return of(ENCODE_DECODE_STRINGS_DATA);
  }
} 