import "./PostsGrid.css";
import Post from "../Post/Post";
import { useEffect, useState } from "react";

export default function PostsGrid({ props }) {
  const [currentPage, setCurrentPage] = useState(1);

  function handlePaginationEvent(event) {
    console.log("postGrid handle event", event.detail.newPageNumber);
    setCurrentPage(event.detail.newPageNumber);
  }

  useEffect(() => {
    window.addEventListener("pgButtonPressedEvent", handlePaginationEvent);
    return () => {
      window.removeEventListener("pgButtonPressedEvent", handlePaginationEvent);
    };
  }, [currentPage]);

  if (!Array.isArray(props.posts) || props.length === 0) {
    return <div>No posts available.</div>;
  }





  return (
    <div className="PostsGrid">
      {props.posts.slice((currentPage - 1) * props.postsPerPage, (currentPage) * props.postsPerPage).map((item, index) => (
        <div key={index}>
          <Post props={item} />
        </div>
      ))}
    </div>
  );

}
