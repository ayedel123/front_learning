import "./Post.css"

export default function Post({ props }) {
  return (
    <div className="Post">
      {props.title}
      {props.body}
    </div>
  );
}
