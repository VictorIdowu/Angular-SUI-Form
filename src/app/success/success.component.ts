import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './success.component.html',
  styleUrl: './success.component.css',
})
export class SuccessComponent {
  constructor(private router: Router) {}

  handleBack() {
    this.router.navigate(['/form']);
  }
}
