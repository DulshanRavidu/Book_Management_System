import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, of, map } from 'rxjs';
import { Book, BookInput } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:5001/api/books';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl).pipe(
      tap(books => books.forEach(b => {
        if (typeof b.publicationDate === 'string' && b.publicationDate.includes('T')) {
          b.publicationDate = b.publicationDate.split('T')[0];
        }
      })),
      catchError(() => of([]))
    );
  }

  getById(id: number): Observable<Book | null> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`).pipe(
      tap(book => {
        if (typeof book.publicationDate === 'string' && book.publicationDate.includes('T')) {
          book.publicationDate = book.publicationDate.split('T')[0];
        }
      }),
      catchError(() => of(null))
    );
  }

  create(book: BookInput): Observable<Book | null> {
    return this.http.post<Book>(this.apiUrl, book).pipe(
      catchError(() => of(null))
    );
  }

  update(id: number, book: BookInput): Observable<Book | null> {
    return this.http.put<Book>(`${this.apiUrl}/${id}`, book).pipe(
      catchError(() => of(null))
    );
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
