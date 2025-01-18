import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface AlgorithmLink {
  name: string;
  route?: string; // Made optional since some items won't have routes yet
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    RouterLink,
    RouterLinkActive
  ],
  template: `
    <mat-nav-list>
      <!-- <h3 matSubheader>DSA Techniques</h3> -->
      <a mat-list-item 
         *ngFor="let item of algorithmLinks" 
         [routerLink]="item.route ? [item.route] : []" 
         [class.no-route]="!item.route"
         routerLinkActive="active">
        {{item.name}}
      </a>
    </mat-nav-list>
  `,
  styles: [`
    .active {
      background: rgba(0, 0, 0, 0.04);
    }
    h3 {
      padding: 16px;
      margin: 0;
      color: rgba(0, 0, 0, 0.54);
    }
    .no-route {
      color: rgba(0, 0, 0, 0.38);
      cursor: default;
      pointer-events: none;
    }
  `]
})
export class SidebarComponent {
  algorithmLinks: AlgorithmLink[] = [
    { name: 'Arrays & Hashing', route: '/arrays-and-hashing' },
    { name: 'Two Pointers', route: '/two-pointers' },
    { name: 'Binary Search', route: '/binary-search' },
    { name: 'Sliding Window', route: '/sliding-window' },
    { name: 'Linked List', route: '/linked-list' },
    { name: 'Stack', route: '/stack' },
    { name: 'Trees', route: '/trees' },
    { name: 'Tries', route: '/tries' },
    { name: 'Intervals', route: '/intervals' },
    { name: 'Greedy', route: '/greedy' },
    { name: 'Advanced Graphs', route: '/advanced-graphs' },
    { name: '2-D DP', route: '/2d-dp' },
    { name: 'Bit Manipulation', route: '/bit-manipulation' }
  ];
}