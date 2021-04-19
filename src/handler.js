const { nanoid } = require("nanoid");
const {
  books,
  displayClientBooks,
  filterBookByName,
  filterBookByReading,
  filterBookByFinished,
} = require("./books");

const getAllBookHandler = (request, h) => {
  const { name, reading, finished } = request.query;

  if (name !== undefined) {
    const filterBookName = filterBookByName(name);
    const response = h.response({
      status: "success",
      data: {
        books: displayClientBooks(filterBookName),
      },
    });

    response.code(200);
    return response;
  }

  if (reading !== undefined) {
    const filterBookReading = filterBookByReading(name);
    const response = h.response({
      status: "success",
      data: {
        books: displayClientBooks(filterBookReading),
      },
    });

    response.code(200);
    return response;
  }

  if (finished !== undefined) {
    const filterBookFinished = filterBookByFinished(finished);
    const response = h.response({
      status: "success",
      data: {
        books: displayClientBooks(filterBookFinished),
      },
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: "success",
    data: {
      books: displayClientBooks(),
    },
  });

  response.code(200);
  return response;
};

// eslint-disable-next-line consistent-return
const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (name === undefined) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });

    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });

    response.code(400);
    return response;
  }

  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  try {
    books.push(newBook);

    const isSuccess = books.filter((book) => book.id === id).length > 0;
    if (isSuccess) {
      const response = h.response({
        status: "success",
        message: "Buku berhasil ditambahkan",
        data: {
          bookId: id,
        },
      });

      response.code(201);
      return response;
    }
  } catch (error) {
    const response = h.response({
      status: "error",
      message: "Buku gagal ditambahkan",
    });

    response.code(500);
    return response;
  }
};

const getBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const book = books.filter((item) => item.id === bookId)[0];

  if (book !== undefined) {
    const response = h.response({
      status: "success",
      data: {
        book,
      },
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });
  response.code(404);
  return response;
};

const editBookByIDHandler = (request, h) => {
  const { bookId } = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = books.findIndex((book) => book.id === bookId);

  if (name === undefined) {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    });

    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
    });

    response.code(400);
    return response;
  }

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };
    const response = h.response({
      status: "success",
      message: "Buku berhasil diperbarui",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Gagal memperbarui buku. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

const deleteBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Buku berhasil dihapus",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Buku gagal dihapus. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

module.exports = {
  getAllBookHandler,
  addBookHandler,
  getBookByIdHandler,
  editBookByIDHandler,
  deleteBookByIdHandler,
};
