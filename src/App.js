import { useContext , useEffect } from "react";
import { AppContext } from "./context/AppContext";
import "./App.css";
import { Routes, Route, useSearchParams } from "react-router-dom";

import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import BlogPage from "./pages/BlogPage";
import TagPage from "./pages/TagPage";

import { useLocation } from "react-router-dom";


// useSearchParams() ==> can access & update query parameters

// useLocation() ==> can access current location


export default function App() {

  // API call on 1st render (to load default posts).

  const {fetchBlogPosts} = useContext(AppContext);

  const [searchParams, setSearchParams] = useSearchParams();

  const location = useLocation();
  console.log("Printing location :-");
  console.log(location);

  // Default Page render -------------
  // Also re-render ==> 
  // whenever url-case changes.. blog/tag/category change (location.pathname), 
  // search-parameter changes (location.search) --------------

  useEffect(() => {
    // Now, the API calls have 3-cases.. so call logically

    // The cases will be retrieved from the url....

    const page = searchParams.get("page") ?? 1;
    // If get() gets a value.. Else default value = 1

    if(location.pathname.includes("tags")) {
      // ==> have to show TagPage

      const tag = location.pathname.split("/").at(-1).replaceAll("-", " ");
      fetchBlogPosts(Number(page), tag);
    }
    else if(location.pathname.includes("categories")) {
      // ==> have to show CategoryPage

      const category = location.pathname.split("/").at(-1).replaceAll("-", " ");
      fetchBlogPosts(Number(page), null, category);
    }
    else {
      // ==> show the general Blog page.

      fetchBlogPosts(Number(page));
    }

  }, [location.pathname, location.search]);

  return (
    <div className="w-full h-full flex flex-col gap-y-1 justify-center items-center">
      

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/blog/:blogId" element={<BlogPage/>} />
        <Route path="/tags/:tag" element={<TagPage/>} />
        <Route path="/categories/:category" element={<CategoryPage/>} />

        {/* :..  ==>  dynamic parameter ==> value is retrieved from this part of url. */}
      </Routes>
    </div>
  );
}