export interface BookType {
  image: string;
  title: string;
  author: string;
  publisher: string;
  pubdate: string;
  isbn: string;
  description: string;
}

export interface BookAllType extends BookType {
  id: number;
  createAt: string;
}
