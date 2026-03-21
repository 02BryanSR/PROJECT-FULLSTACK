import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, MatButtonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {}
