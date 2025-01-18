import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, Event, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';

interface BreadcrumbSegment {
  name: string;
  path: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  template: `
    <span class="home-link" routerLink="/">DSA Visualizer</span>
    <ng-container *ngFor="let segment of breadcrumbs; let last = last">
      <span class="path-separator">/</span>
      <a 
        class="breadcrumb-segment" 
        [routerLink]="segment.path"
        [class.active]="last">
        {{ segment.name }}
      </a>
    </ng-container>
  `,
  styles: [`
    :host {
      display: flex;
      align-items: center;
    }

    .path-separator {
      margin: 0 8px;
      opacity: 0.7;
      color: white;
    }

    .home-link {
      cursor: pointer;
      color: white;
      text-decoration: none;
      &:hover {
        opacity: 0.9;
      }
    }

    .breadcrumb-segment {
      opacity: 0.8;
      text-transform: capitalize;
      color: white;
      text-decoration: none;
      cursor: pointer;

      &:hover {
        opacity: 1;
        text-decoration: underline;
      }

      &.active {
        opacity: 0.8;
        cursor: default;
        &:hover {
          text-decoration: none;
        }
      }
    }
  `]
})
export class BreadcrumbComponent {
  breadcrumbs: BreadcrumbSegment[] = [];

  constructor(private router: Router) {
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd),
      map(event => {
        const pathSegments = event.urlAfterRedirects
          .split('/')
          .filter(segment => segment);
        
        return pathSegments.map((segment, index) => {
          return {
            name: segment.replace(/-/g, ' '),
            path: '/' + pathSegments.slice(0, index + 1).join('/')
          };
        });
      })
    ).subscribe(segments => {
      this.breadcrumbs = segments;
    });
  }
} 