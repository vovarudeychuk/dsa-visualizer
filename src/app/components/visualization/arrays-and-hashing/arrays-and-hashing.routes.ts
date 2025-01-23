import { Routes } from '@angular/router';
import { ArraysAndHashingComponent } from './arrays-and-hashing.component';

export const ARRAYS_AND_HASHING_ROUTES: Routes = [
    {
        path: '',
        component: ArraysAndHashingComponent
    },
    {
        path: 'contains-duplicate',
        loadComponent: () => import('./problems/contains-duplicate/contains-duplicate.component')
            .then(m => m.ContainsDuplicateComponent)
    },
    {
        path: 'valid-anagram',
        loadComponent: () => import('./problems/valid-anagram/valid-anagram.component')
            .then(m => m.ValidAnagramComponent)
    },
    {
        path: 'two-sum',
        loadComponent: () => import('./problems/two-sum/two-sum.component')
            .then(m => m.TwoSumComponent)
    },
    {
        path: 'group-anagrams',
        loadComponent: () => import('./problems/group-anagrams/group-anagrams.component')
            .then(m => m.GroupAnagramsComponent)
    },
    {
        path: 'top-k-frequent-elements',
        loadComponent: () => import('./problems/top-k-frequent-elements/top-k-frequent-elements.component')
            .then(m => m.TopKFrequentElementsComponent)
    },
    {
        path: 'encode-and-decode-strings',
        loadComponent: () => import('./problems/encode-and-decode-strings/encode-and-decode-strings.component')
            .then(m => m.EncodeAndDecodeStringsComponent)
    },
    {
        path: 'product-of-array-except-self',
        loadComponent: () => import('./problems/product-of-array-except-self/product-of-array-except-self.component')
            .then(m => m.ProductOfArrayExceptSelfComponent)
    },
    {
        path: 'valid-sudoku',
        loadComponent: () => import('./problems/valid-sudoku/valid-sudoku.component')
            .then(m => m.ValidSudokuComponent)
    },
    {
        path: 'longest-consecutive-sequence',
        loadComponent: () => import('./problems/longest-consecutive-sequence/longest-consecutive-sequence.component')
            .then(m => m.LongestConsecutiveSequenceComponent)
    }
];
