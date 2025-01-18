import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface AlgorithmLink {
  name: string;
  route: string;
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
    <mat-nav-list class="sidebar-list">
      <h3 matSubheader>DSA Techniques</h3>
      <a mat-list-item 
         *ngFor="let item of algorithmLinks" 
         [routerLink]="item.route" 
         routerLinkActive="active"
         [routerLinkActiveOptions]="{ paths: 'subset', queryParams: 'subset', fragment: 'ignored', matrixParams: 'ignored' }">
        {{item.name}}
      </a>
    </mat-nav-list>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
      background-color: #1e1e1e;
    }

    .sidebar-list {
      padding: 0;
    }

    h3 {
      padding: 16px;
      margin: 0;
      color: rgba(255, 255, 255, 0.7);
    }

    a[mat-list-item] {
      color: rgba(255, 255, 255, 0.7);
      height: 48px;
      
      &:hover {
        background-color: rgba(255, 255, 255, 0.04);
      }

      &.active {
        color: white;
        background-color: rgba(255, 255, 255, 0.04);
        position: relative;

        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: #3f51b5;
        }
      }
    }

    ::ng-deep .mat-mdc-list-item-unscoped-content {
      color: inherit;
    }
  `]
})
export class SidebarComponent {
  algorithmLinks: AlgorithmLink[] = [
    { name: 'Arrays & Hashing', route: 'arrays-and-hashing' },
    { name: 'Two Pointers', route: 'two-pointers' },
    { name: 'Binary Search', route: 'binary-search' },
    { name: 'Sliding Window', route: 'sliding-window' },
    { name: 'Linked List', route: 'linked-list' },
    { name: 'Stack', route: 'stack' },
    { name: 'Trees', route: 'trees' },
    { name: 'Tries', route: 'tries' },
    { name: 'Intervals', route: 'intervals' },
    { name: 'Greedy', route: 'greedy' },
    { name: 'Advanced Graphs', route: 'advanced-graphs' },
    { name: '2-D DP', route: '2d-dp' },
    { name: 'Bit Manipulation', route: 'bit-manipulation' }
  ];
}