import { useParams, useNavigate } from "react-router-dom";
import useFetchReviews from "../hooks/useFetchReviews";
import { useState } from "react";
import { motion } from "framer-motion";

export default function BookDetailsComponent() {
  const [userReview, setuserReview] = useState("");
  const [userRating, setuserRating] = useState(0);
  // const [reviews, setReviews] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  // const { book, loading } = useBookDetails(params.id);
  const { reviews, loading, averageRating } = useFetchReviews(params.id);
  const book = reviews.length ? reviews[0].bookId : null;
  const user = reviews.length ? reviews[0].userId._id : null;
  console.log(reviews);

  const handleSubmitReview = () => {
    if (userReview.trim() === "") {
      alert("Please write your review before submitting!");
      return;
    }

    const newReview = {
      id: Date.now(),
      text: userReview,
      rating: userRating,
      date: new Date().toLocaleDateString(),
      user,
    };
    console.log(newReview);
    setuserReview([...reviews, newReview]);
    setuserRating(0);
  };

  return (
    <>
      {loading ? (
        <div>Loading</div>
      ) : (
        <div className="min-h-screen bg-gradient-to-r from-yellow-50 via-pink-50 to-purple-50 p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-purple-600 hover:text-purple-800 mb-6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Back to Books
            </button>

            {/* Book Details Section */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-shrink-0">
                  <div className="w-48 h-64 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center text-8xl shadow-md">
                    {book?.cover || "📘"}
                  </div>
                </div>

                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold text-purple-900 mb-2">
                    {book.title}
                  </h1>
                  <p className="text-xl text-purple-700 mb-4">
                    by {book.author}
                  </p>

                  <div className="flex items-center mb-4">
                    <div className="text-yellow-500 text-2xl mr-2">
                      {"★".repeat(Math.floor(averageRating))}
                      {"☆".repeat(5 - Math.floor(reviews.rating))}
                    </div>
                    <span className="text-gray-600">
                      ({averageRating.toFixed(1)})
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                    <div>
                      <p className="text-gray-500">Genre</p>
                      <p className="font-medium">{book.genre || "Unknown"}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Published</p>
                      <p className="font-medium">
                        {book.createdAt.split("T")[0]}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Pages</p>
                      <p className="font-medium">{book.pages}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Publisher</p>
                      <p className="font-medium">{book.addedBy.className}</p>
                    </div>
                  </div>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    {book.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
              <h2 className="text-2xl font-bold text-purple-800 mb-6">
                Reader Reviews
              </h2>

              {reviews.length > 0 ? (
                <div className="space-y-6">
                  {reviews?.map((rev) => (
                    <div
                      key={rev._id}
                      className="border-b border-gray-100 pb-6 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center mb-2">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                          {rev.userId.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{rev.user}</p>
                          <p className="text-sm text-gray-500">
                            {rev.createdAt.split("T")[0]}
                          </p>
                        </div>
                      </div>
                      <div className="text-yellow-500 mb-2">
                        {"★".repeat(rev.rating)}
                        {"☆".repeat(5 - rev.rating)}
                      </div>
                      <p className="text-gray-700">{rev.text}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">
                  No reviews yet. Be the first to review!
                </p>
              )}
            </div>

            {/* Review Form */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-purple-800 mb-4">
                Write a Review
              </h2>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Your Rating</label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setuserRating(star)}
                      className={`text-3xl ${
                        star <= userRating ? "text-yellow-500" : "text-gray-300"
                      }`}
                    >
                      {star <= userRating ? "★" : "☆"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="review" className="block text-gray-700 mb-2">
                  Your Review
                </label>
                <textarea
                  id="review"
                  className="w-full border border-purple-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  rows="5"
                  value={userReview}
                  onChange={(e) => setuserReview(e.target.value)}
                  placeholder="Share your thoughts about this book..."
                ></textarea>
              </div>

              <button
                onClick={handleSubmitReview}
                disabled={!userReview.trim() || userRating === 0}
                className={`px-6 py-3 rounded-full font-medium ${
                  !userReview?.trim() || userRating === 0
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700 text-white"
                }`}
              >
                Submit Review
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
