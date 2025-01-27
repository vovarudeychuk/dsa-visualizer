import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ProblemData } from '../../../../shared/problem/problem.interface';
import { VALID_SUDOKU_DATA } from './valid-sudoku.data';

@Injectable({
  providedIn: 'root'
})
export class ValidSudokuDataService {
  constructor(private http: HttpClient) {}

  getProblemData(): Observable<ProblemData> {
    return of(VALID_SUDOKU_DATA);
  }
} 