import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GradesComponent } from './grades/grades.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,GradesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-app';
}
