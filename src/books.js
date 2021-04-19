const books = [];

const displayClientBooks = (recordBook = books) => {
  const clientBook = recordBook.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));
  return clientBook;
};

const filterBookByName = (name) => {
  const bookFilter = books.filter((book) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    book.name.toLowerCase().includes(name.toLowerCase())
  );
  return bookFilter;
};

const filterBookByReading = (reading) => {
  const readingState = reading === "1";
  const bookFilter = books.filter((book) => book.reading === readingState);
  return bookFilter;
};

const filterBookByFinished = (finished) => {
  const finishedState = finished === "1";
  const bookFilter = books.filter((book) => book.finished === finishedState);
  return bookFilter;
};

module.exports = {
  books,
  displayClientBooks,
  filterBookByName,
  filterBookByReading,
  filterBookByFinished,
};
