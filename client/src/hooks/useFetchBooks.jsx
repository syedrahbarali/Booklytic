import { useState, useEffect } from 'react';

const useFetchBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({
    genre: 'All Genres',
    searchQuery: ''
  });

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);

      // Replace with your actual API endpoint
      const response = await fetch(`${import.meta.env.VITE_APP_DOMAIN}/api/v1/book?page=1`);
      const bookResponse = await response.json();
      console.log(bookResponse) 
      setBooks(bookResponse.books)

      if (!bookResponse.ok) {
        throw new Error('Failed to fetch books');
      } 
    } catch (err) {
      setError(err.message);
      console.error('Error fetching books:', err.message  );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const filteredBooks = books.filter(book => {
    const matchesGenre = filter.genre === 'All Genres' || book.genre === filter.genre;
    const matchesSearch = book.title.toLowerCase().includes(filter.searchQuery.toLowerCase()) || 
                         book.author.toLowerCase().includes(filter.searchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  return {
    books: filteredBooks,
    loading,
    error,
    filter,
    setFilter,
    refetch: fetchBooks
  };
};

export default useFetchBooks;