import "./App.css";
import React, { useEffect, useState } from "react";
import PostsGrid  from "./components/posts_grid/PostsGrid";


function App() {
  const [posts, setPosts] = useState(null);

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

  const currentDate = new Date();
  return (<div className="App">

  <PostsGrid props={posts}/>

  </div>);
}

export default App;
