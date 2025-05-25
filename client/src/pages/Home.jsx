import React from "react";
import useFetchBooks from "../hooks/useFetchBooks";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// const genres = [
//   "All Genres", "Fiction", "Non-Fiction", "Fantasy", "Science Fiction",
//   "Mystery", "Romance", "Biography", "History", "Self-Help"
// ];

const genres = [];
// const testimonials = [
//   {
//     name: "Sarah Johnson",
//     comment: "BookNest helped me discover my new favorite author! The reviews are so helpful.",
//     avatar: "👩"
//   },
//   {
//     name: "Michael Chen",
//     comment: "I've doubled my reading since joining this community. The recommendations are spot on!",
//     avatar: "👨"
//   },
//   {
//     name: "Priya Patel",
//     comment: "As a busy mom, I love the quick but insightful reviews that help me choose books wisely.",
//     avatar: "👩‍👧"
//   }
// ];
const testimonials = [];

const BookReviewPage = () => {
  const { books, loading, error, filter, setFilter } = useFetchBooks();
  const featuredBooks = books;
  const [activeGenre, setActiveGenre] = React.useState("All Genres");
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredBooks = featuredBooks.filter((book) => {
    const matchesGenre =
      activeGenre === "All Genres" || book.genre === activeGenre;
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6 pb-16">
      <header className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold text-indigo-800 drop-shadow-md mb-4"
        >
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
            📚 Booklytic
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl mt-2 text-indigo-600 max-w-2xl mx-auto"
        >
          Your cozy corner to explore, review, and discuss books with fellow
          bibliophiles
        </motion.p>
      </header>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="max-w-6xl mx-auto mb-12"
      >
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search books or authors..."
                className="w-full p-3 pl-10 rounded-full border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="absolute left-3 top-3 text-indigo-400">🔍</span>
            </div>
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition-colors shadow-md">
              Search
            </button>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => setActiveGenre(genre)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeGenre === genre
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <span className="mr-2">🌟</span>{" "}
          {activeGenre === "All Genres" ? "Featured Books" : activeGenre}
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBooks.map((book, i) => (
            <motion.div
              key={book._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-6 text-center">
                <span className="text-8xl block mb-4">
                  {book.cover ||
                    [
                      "📚",
                      "📖",
                      "📗",
                      "📘",
                      "📙",
                      "📚",
                      "📚",
                      "📖",
                      "📗",
                      "📘",
                      "📙",
                      "📚",
                    ][i]}
                </span>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-indigo-800">
                    {book.title}
                  </h3>
                  <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                    {book.genre}
                  </span>
                </div>
                <p className="text-indigo-600 mb-3">by {book.author}</p>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {book.description}
                </p>
                <div className="flex items-center justify-between">
                  {/* <div className="flex items-center">
                    <span className="text-yellow-500 text-lg mr-1">
                      {"★".repeat(Math.floor(book.rating))}
                      {"☆".repeat(5 - Math.floor(book.rating))}
                    </span>
                    <span className="text-gray-500 text-sm ml-1">
                      ({book.rating.toFixed(1)})
                    </span>
                  </div> */}
                  <Link
                    to={`/book/${book._id}`}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm hover:bg-indigo-700 transition-colors flex items-center"
                  >
                    Read Review
                    <span className="ml-1">→</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <section className="max-w-6xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-indigo-800 mb-8 text-center flex justify-center items-center">
          <span className="mr-2">💬</span> What Readers Say
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">{testimonial.avatar}</span>
                <h4 className="font-bold text-indigo-700">
                  {testimonial.name}
                </h4>
              </div>
              <p className="text-gray-600 italic">"{testimonial.comment}"</p>
              <div className="mt-4 flex">{"⭐".repeat(5)}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-4 flex items-center justify-center">
            <span className="mr-3">📬</span> Join Our Reading Community
          </h2>
          <p className="mb-6 text-indigo-100 max-w-2xl mx-auto">
            Get weekly book recommendations, exclusive reviews, and join our
            vibrant community of book lovers.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 p-3 rounded-full text-gray-800 focus:outline-none"
            />
            <button className="bg-white text-indigo-600 font-bold px-6 py-3 rounded-full hover:bg-indigo-100 transition-colors">
              Subscribe
            </button>
          </div>
        </motion.div>
      </section>

      <footer className="mt-16 text-center text-indigo-700 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="bg-white p-6 rounded-xl shadow-sm"
        >
          <div className="flex justify-center space-x-6 mb-4">
            <a href="#" className="text-2xl hover:text-indigo-500">
              📱
            </a>
            <a href="#" className="text-2xl hover:text-indigo-500">
              🐦
            </a>
            <a href="#" className="text-2xl hover:text-indigo-500">
              📷
            </a>
            <a href="#" className="text-2xl hover:text-indigo-500">
              📘
            </a>
          </div>
          <p className="mb-2">© 2025 BookNest | Crafted with ❤️ by Rahbar</p>
          <div className="flex justify-center space-x-4 text-sm">
            <a href="#" className="hover:text-indigo-900">
              About
            </a>
            <a href="#" className="hover:text-indigo-900">
              Privacy
            </a>
            <a href="#" className="hover:text-indigo-900">
              Terms
            </a>
            <a href="#" className="hover:text-indigo-900">
              Contact
            </a>
          </div>
        </motion.div>
      </footer>
    </div>
  );
};
export default BookReviewPage;
