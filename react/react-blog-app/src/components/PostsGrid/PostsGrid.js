import "./PostsGrid.css";
import Post from "../Post/Post";

export default function PostsGrid({ props }) {
  if (!Array.isArray(props.posts) || props.length === 0) {
    return <div>No posts available.</div>;
  }
  return (
    <div className="PostsGrid">
      {props.posts.slice(0, props.postsPerPage).map((item, index) => (
        <div key={index}>
          <Post props={item} />
        </div>
      ))}
    </div>
  );

  // return (
  //   <div className="PostsGrid">
  //     {props.posts.map((item, index) =>
  //     (
  //       <div key={index}>
  //         <Post props={item} />
  //       </div>)


  //     )}
  //   </div>
  // );
}
