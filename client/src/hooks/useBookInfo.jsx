import { useState, useEffect } from "react";
import  DOMAIN  from "../config/config";

export default function useBookDetails(id) {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
        try {
          console.log("Fetching book");
        const response = await fetch(`${DOMAIN}/api/v1/book/${id}`);
        const bookRes = await response.json();
        console.log(bookRes);

        setBook(bookRes.book);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  return { book, loading, error };
}