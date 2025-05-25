import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Book, Image, Upload, X } from "react-feather";
import DOMAIN from "../../config/config";

const CreateBook = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    genre: "",
    publishedYear: "",
    isbn: "",
  });
  const [coverPreview, setCoverPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const genres = [
    "Fiction",
    "Non-Fiction",
    "Fantasy",
    "Science Fiction",
    "Mystery",
    "Romance",
    "Biography",
    "History",
    "Self-Help",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setCoverPreview(null);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.author.trim()) newErrors.author = "Author is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.genre) newErrors.genre = "Genre is required";
    if (!formData.publishedYear)
      newErrors.publishedYear = "Published year is required";
    else if (isNaN(formData.publishedYear))
      newErrors.publishedYear = "Year must be a number";
    if (!formData.isbn.trim()) newErrors.isbn = "ISBN is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      // Simulate API call
      try {
        await fetch(`${DOMAIN}/api/v1/book`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        })
          .then(async (res) => await res.json())
          .then((res) => {
            console.log(res);
          });
      } catch (error) {
        console.error("Error creating book:", error);
        setErrors({ submit: "Failed to create book. Please try again." });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-indigo-600 hover:text-indigo-800 mr-4"
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
            Back
          </button>
          <h1 className="text-3xl font-bold text-indigo-800">Add New Book</h1>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Cover Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Book Cover
              </label>
              <div className="flex items-center">
                {coverPreview ? (
                  <div className="relative">
                    <img
                      src={coverPreview}
                      alt="Book cover preview"
                      className="h-40 w-32 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">
                        Upload cover image
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Title *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Book className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-2 rounded-lg border ${
                    errors.title ? "border-red-300" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                  placeholder="Book title"
                />
              </div>
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            {/* Author */}
            <div>
              <label
                htmlFor="author"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Author *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="author"
                  name="author"
                  type="text"
                  value={formData.author}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-2 rounded-lg border ${
                    errors.author ? "border-red-300" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                  placeholder="Author name"
                />
              </div>
              {errors.author && (
                <p className="mt-1 text-sm text-red-600">{errors.author}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                className={`block w-full px-3 py-2 rounded-lg border ${
                  errors.description ? "border-red-300" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                placeholder="Brief description of the book"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Genre and Published Year */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Genre */}
              <div>
                <label
                  htmlFor="genre"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Genre *
                </label>
                <select
                  id="genre"
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  className={`block w-full px-3 py-2 rounded-lg border ${
                    errors.genre ? "border-red-300" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                >
                  <option value="">Select a genre</option>
                  {genres.map((genre) => (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
                {errors.genre && (
                  <p className="mt-1 text-sm text-red-600">{errors.genre}</p>
                )}
              </div>

              {/* Published Year */}
              <div>
                <label
                  htmlFor="publishedYear"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Published Year *
                </label>
                <input
                  id="publishedYear"
                  name="publishedYear"
                  type="text"
                  value={formData.publishedYear}
                  onChange={handleChange}
                  className={`block w-full px-3 py-2 rounded-lg border ${
                    errors.publishedYear ? "border-red-300" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                  placeholder="e.g. 2023"
                />
                {errors.publishedYear && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.publishedYear}
                  </p>
                )}
              </div>
            </div>

            {/* ISBN */}
            <div>
              <label
                htmlFor="isbn"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                ISBN *
              </label>
              <input
                id="isbn"
                name="isbn"
                type="text"
                value={formData.isbn}
                onChange={handleChange}
                className={`block w-full px-3 py-2 rounded-lg border ${
                  errors.isbn ? "border-red-300" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                placeholder="International Standard Book Number"
              />
              {errors.isbn && (
                <p className="mt-1 text-sm text-red-600">{errors.isbn}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating Book...
                  </span>
                ) : (
                  "Add Book to Collection"
                )}
              </button>
              {errors.submit && (
                <p className="mt-2 text-sm text-red-600 text-center">
                  {errors.submit}
                </p>
              )}
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

// Mock User icon component since we're not importing the entire react-feather
const User = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    ></path>
  </svg>
);

export default CreateBook;
