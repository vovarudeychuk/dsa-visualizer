import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'arrays-and-hashing',
    loadChildren: () => import('./components/visualization/arrays-and-hashing/arrays-and-hashing.routes')
      .then(m => m.ARRAYS_AND_HASHING_ROUTES)
  },
  {
    path: 'two-pointers',
    loadComponent: () => import('./components/visualization/two-pointers/two-pointers.component')
      .then(m => m.TwoPointersComponent)
  },
  {
    path: 'binary-search',
    loadComponent: () => import('./components/visualization/binary-search/binary-search.component')
      .then(m => m.BinarySearchComponent)
  },
  {
    path: 'sliding-window',
    loadComponent: () => import('./components/visualization/sliding-window/sliding-window.component')
      .then(m => m.SlidingWindowComponent)
  },
  {
    path: 'linked-list',
    loadComponent: () => import('./components/visualization/linked-list/linked-list.component')
      .then(m => m.LinkedListComponent)
  },
  {
    path: 'stack',
    loadComponent: () => import('./components/visualization/stack/stack.component')
      .then(m => m.StackComponent)
  },
  {
    path: 'trees',
    loadComponent: () => import('./components/visualization/trees/trees.component')
      .then(m => m.TreesComponent)
  },
  {
    path: 'tries',
    loadComponent: () => import('./components/visualization/tries/tries.component')
      .then(m => m.TriesComponent)
  },
  {
    path: 'intervals',
    loadComponent: () => import('./components/visualization/intervals/intervals.component')
      .then(m => m.IntervalsComponent)
  },
  {
    path: 'greedy',
    loadComponent: () => import('./components/visualization/greedy/greedy.component')
      .then(m => m.GreedyComponent)
  },
  {
    path: 'advanced-graphs',
    loadComponent: () => import('./components/visualization/advanced-graphs/advanced-graphs.component')
      .then(m => m.AdvancedGraphsComponent)
  },
  {
    path: '2d-dp',
    loadComponent: () => import('./components/visualization/two-d-dp/two-d-dp.component')
      .then(m => m.TwoDDpComponent)
  },
  {
    path: 'bit-manipulation',
    loadComponent: () => import('./components/visualization/bit-manipulation/bit-manipulation.component')
      .then(m => m.BitManipulationComponent)
  }
];