import "./App.css";
import React, { useEffect, useState } from "react";
import PostsGrid from "./components/MainPage/PostsGrid/PostsGrid";
import Header from "./components/MainPage/Header/Header"
import Pagination from "./components/MainPage/Pagination/Pagination";


function App() {
  const [posts, setPosts] = useState(null);
  const POSTS_PER_PAGE = 10;

  useEffect(() => {
    console.log("effect");
    const fetchData = async () => {
      try {
        console.log("url:", process.env.REACT_APP_API_URL);
        const response = await fetch(process.env.REACT_APP_API_URL);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const result = await response.json();
        setPosts(result);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log("Posts updated:", posts);
  }, [posts]);

  return (<div className="App">
    <Header props={"Posts List"} />
    <Pagination posts={posts} postsPerPage={POSTS_PER_PAGE}  />
    <PostsGrid props={{ posts: posts, postsPerPage: POSTS_PER_PAGE }} />
    {/* <Pagination posts={posts} postsPerPage={POSTS_PER_PAGE}  /> */}
  </div>);
}

export default App;
