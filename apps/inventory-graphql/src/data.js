const DATA = {
  books: [
    { id: '1', title: 'The Fellowship of the Ring' },
    { id: '2', title: 'The Two Towers' },
    { id: '3', title: 'The Return of the King' },
  ],
};

export async function getAllBooks() {
  return DATA.books;
}
