import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BookInfo from "./pages/BooksInfo";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import CreateBook from "./pages/admin/CreateBook";

const App = () => {
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/">
          <Route path="/" element={<Home />} />
          <Route path="/book/:id" element={<BookInfo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/createBook" element={<CreateBook />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
