export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publicationDate: string;
}

export interface BookInput {
  title: string;
  author: string;
  isbn: string;
  publicationDate: string;
}
