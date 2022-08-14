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

export interface NaverBookResponseType {
  display: number;
  items: NaverBookType[];
  lastBuildDate: string;
  start: number;
  total: number;
}

export interface V2BookType {
  books: BookType[];
  totalPage: number;
}
