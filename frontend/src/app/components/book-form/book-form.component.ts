import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Book, BookInput } from '../../models/book.model';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss'
})
export class BookFormComponent implements OnInit {
  @Input() book: Book | null = null;
  @Output() save = new EventEmitter<BookInput>();
  @Output() cancel = new EventEmitter<void>();

  title = '';
  author = '';
  isbn = '';
  publicationDate = '';

  ngOnInit(): void {
    const b = this.book;
    if (b) {
      this.title = b.title;
      this.author = b.author;
      this.isbn = b.isbn;
      this.publicationDate =
        typeof b.publicationDate === 'string' && b.publicationDate.includes('T')
          ? b.publicationDate.split('T')[0]
          : (b.publicationDate as string);
    }
  }

  onSubmit(): void {
    const t = this.title.trim();
    const a = this.author.trim();
    const i = this.isbn.trim();
    const p = this.publicationDate;
    if (!t || !a || !i || !p) return;
    this.save.emit({ title: t, author: a, isbn: i, publicationDate: p });
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
