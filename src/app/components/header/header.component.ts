import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {

  constructor(private router: Router) {}

  navigateTo(destination: string | string[]): void {
    if (typeof destination === 'string' && destination.startsWith('http')) {
      window.open(destination, '_blank');
    } else {
      this.router.navigate(Array.isArray(destination) ? destination : [destination]);
    }
  }
}
