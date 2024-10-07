import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private expressApiUrl = 'http://172.171.137.22:3000/api/grades'; // Adjust the URL as necessary
  private flaskApiUrl = 'http://172.171.139.151:5000/api/generate'; // Adjust the URL as necessary

  constructor(private http: HttpClient) {}

  // ExpressJS API Methods
  getAllGrades(): Observable<any> {
    return this.http.get(this.expressApiUrl);
  }

  getGradeById(id: number): Observable<any> {
    return this.http.get(`${this.expressApiUrl}/${id}`);
  }

  addGrade(grade: any): Observable<any> {
    return this.http.post(this.expressApiUrl, grade);
  }

  updateGrade(id: number, grade: any): Observable<any> {
    return this.http.put(`${this.expressApiUrl}/${id}`, grade);
  }

  deleteGrade(id: number): Observable<any> {
    return this.http.delete(`${this.expressApiUrl}/${id}`);
  }

  // Flask API Method
  generateText(query: string): Observable<any> {
    return this.http.post(this.flaskApiUrl, { query });
  }
}