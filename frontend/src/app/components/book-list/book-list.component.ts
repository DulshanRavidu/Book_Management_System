import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { BookFormComponent } from '../book-form/book-form.component';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, FormsModule, BookFormComponent],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit {
  books = signal<Book[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);
  editingBook = signal<Book | null>(null);
  showForm = signal(false);
  searchQuery = signal('');

  filteredBooks = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    const list = this.books();
    if (!q) return list;
    return list.filter(b =>
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q) ||
      b.isbn.toLowerCase().includes(q)
    );
  });

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.loading.set(true);
    this.bookService.getAll().subscribe({
      next: (data) => {
        this.books.set(data);
        this.loading.set(false);
        this.error.set(null);
      },
      error: () => {
        this.error.set('Failed to load books. Make sure the API is running.');
        this.loading.set(false);
      }
    });
  }

  onAdd(): void {
    this.editingBook.set(null);
    this.showForm.set(true);
  }

  onEdit(book: Book): void {
    this.editingBook.set({ ...book });
    this.showForm.set(true);
  }

  onSave(book: { id?: number; title: string; author: string; isbn: string; publicationDate: string }): void {
    const editing = this.editingBook();
    if (editing) {
      this.bookService.update(editing.id, book).subscribe(result => {
        if (result) {
          this.books.update(list =>
            list.map(b => (b.id === editing.id ? { ...result } : b))
          );
          this.closeForm();
        }
      });
    } else {
      this.bookService.create(book).subscribe(result => {
        if (result) {
          this.books.update(list => [...list, result]);
          this.closeForm();
        }
      });
    }
  }

  onDelete(book: Book): void {
    if (confirm(`Delete "${book.title}" by ${book.author}?`)) {
      this.bookService.delete(book.id).subscribe(success => {
        if (success) {
          this.books.update(list => list.filter(b => b.id !== book.id));
        }
      });
    }
  }

  closeForm(): void {
    this.showForm.set(false);
    this.editingBook.set(null);
  }

  onSearchChange(value: string): void {
    this.searchQuery.set(value);
  }
}
