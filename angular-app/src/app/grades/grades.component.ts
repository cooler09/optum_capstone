import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ApiService } from '../api.service';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css'],
  imports: [CommonModule, FormsModule], // Add FormsModule here
  standalone: true
})
export class GradesComponent implements OnInit {
  grades: any[] = [];
  generatedText: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getAllGrades();
  }

  getAllGrades(): void {
    this.apiService.getAllGrades().subscribe((data) => {
      this.grades = data;
    });
  }

  addGrade(grade: any): void {
    this.apiService.addGrade(grade).subscribe(() => {
      this.getAllGrades();
    });
  }

  editGrade(grade: any): void {
    grade.editing = true;
  }

  saveGrade(grade: any): void {
    this.apiService.updateGrade(grade.id, grade).subscribe(() => {
      grade.editing = false;
      this.getAllGrades();
    });
  }

  deleteGrade(id: number): void {
    this.apiService.deleteGrade(id).subscribe(() => {
      this.getAllGrades();
    });
  }

  generateText(query: string): void {
    this.apiService.generateText(query).subscribe((data) => {
      this.generatedText = data.generated_text;
    });
  }
}