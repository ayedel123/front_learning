import "./PostsGrid.css";
import Post from "../post/Post";

export default function PostsGrid({ props }) {
  if (!Array.isArray(props) || props.length === 0) {
    return <div>No posts available.</div>;
  }

  return (
    <div className="PostsGrid">
      {props.map((item, index) => (
        <div key={index}>
          <Post props={item} />
        </div>
      ))}
    </div>
  );
}
