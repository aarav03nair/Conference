import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  registrationNumber = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.registrationNumber).subscribe(user => {
      if (user) {
        this.router.navigate(['/select-slots']);
      }
    });
  }
}
