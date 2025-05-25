import { useState, useEffect } from 'react';
import DOMAIN from '../config/config';

const useFetchReviews = (bookId) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [averageRating, setAverageRating] = useState(0);

  // Fetch reviews for a book
  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${DOMAIN}/api/v1/review?bookId=${bookId}`);
      console.log(response)
      const reviews = await response.json();
      console.log(reviews.reviews)
      setReviews(reviews.reviews);
      
      // Calculate average rating
      if (reviews.reviews.length > 0 ) {
        const avg = reviews.reviews.reduce((sum, review) => sum + review?.rating, 0) / reviews.reviews.length;
        setAverageRating(parseFloat(avg.toFixed(1)));
      } else {  
        setAverageRating(0);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch reviews');
      console.error('Error fetching reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new review
  // const addReview = async (reviewData) => {
  //   try {
  //     const response = await axios.post('/api/reviews', {
  //       bookId,
  //       userId: reviewData.userId,
  //       rating: reviewData.rating,
  //       text: reviewData.text
  //     });

  //     // Update local state with the new review
  //     setReviews(prev => [response.data, ...prev]);
      
  //     // Recalculate average rating
  //     const newTotal = reviews.length + 1;
  //     const newAverage = ((averageRating * reviews.length) + reviewData.rating) / newTotal;
  //     setAverageRating(parseFloat(newAverage.toFixed(1)));
      
  //     return { success: true, review: response.data };
  //   } catch (err) {
  //     const errorMsg = err.response?.data?.message || 'Failed to submit review';
  //     setError(errorMsg);
  //     return { success: false, error: errorMsg };
  //   }
  // };

  // Delete a review
  // const deleteReview = async (reviewId) => {
  //   try {
  //     await axios.delete(`/api/reviews/${reviewId}`);
      
  //     // Find the review to get its rating before deletion
  //     const deletedReview = reviews.find(r => r._id === reviewId);
      
  //     // Update local state
  //     setReviews(prev => prev.filter(r => r._id !== reviewId));
      
  //     // Recalculate average if there are remaining reviews
  //     if (reviews.length > 1) {
  //       const newTotal = reviews.length - 1;
  //       const newAverage = ((averageRating * reviews.length) - deletedReview.rating) / newTotal;
  //       setAverageRating(parseFloat(newAverage.toFixed(1)));
  //     } else {
  //       setAverageRating(0);
  //     }
      
  //     return true;
  //   } catch (err) {
  //     setError(err.response?.data?.message || 'Failed to delete review');
  //     return false;
  //   }
  // };

  useEffect(() => {
    if (bookId) {
      fetchReviews();
    }
  }, [bookId]);

  return {
    reviews,
    averageRating,
    loading,
    error,
    refetchReviews: fetchReviews
  };
};

export default useFetchReviews;