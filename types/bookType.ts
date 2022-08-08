export interface NaverBookType {
  image: string;
  title: string;
  author: string;
  publisher: string;
  pubdate: string;
  isbn: string;
  description: string;
}

export interface BookType extends NaverBookType {
  id: number;
  createdAt: string;
}
