import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterLink, MatButtonModule],
  templateUrl: './main.html',
  styleUrls: ['./main.css'],
})
export class Main {}
