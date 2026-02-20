import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, of, map } from 'rxjs';
import { Book, BookInput } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:5000/api/books';

  constructor(private http: HttpClient) {}

  private normalizeBookDate(book: Book): Book {
    if (typeof book.publicationDate === 'string' && book.publicationDate.includes('T')) {
      return { ...book, publicationDate: book.publicationDate.split('T')[0] };
    }

    return book;
  }

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl).pipe(
      map(books => books.map(book => this.normalizeBookDate(book))),
      catchError(() => of([]))
    );
  }

  getById(id: number): Observable<Book | null> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`).pipe(
      map(book => this.normalizeBookDate(book)),
      catchError(() => of(null))
    );
  }

  create(book: BookInput): Observable<Book | null> {
    return this.http.post<Book>(this.apiUrl, book).pipe(
      map(created => this.normalizeBookDate(created)),
      catchError(() => of(null))
    );
  }

  update(id: number, book: BookInput): Observable<Book | null> {
    return this.http.put<Book>(`${this.apiUrl}/${id}`, book).pipe(
      map(updated => this.normalizeBookDate(updated)),
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
