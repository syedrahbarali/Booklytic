import  {Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BookInfo from "./pages/BooksInfo";

const App = () => {
  return <div>
    <Routes>
      <Route path="/">
        <Route path="/" element={<Home />} />
        <Route path="/book/:id" element={<BookInfo/>} />
      </Route>
    </Routes>
  </div>;
};

export default App;
  