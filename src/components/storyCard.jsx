import { useNavigate } from "react-router-dom";

export default function StoryCard({ story }) {
  const navigate = useNavigate();

  const status = story.Status || "New";
  const badgeStyle = {
    New: { backgroundColor: "#2563eb", color: "white" },
    "In Progress": { backgroundColor: "#facc15", color: "black" },
    Completed: { backgroundColor: "#22c55e", color: "black" }
  };

  const container = {
    cursor: "pointer",
    backgroundColor: "white",
    color: "black",
    borderRadius: "15px",
    overflow: "hidden",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    transition: "0.3s"
  };

  const imageStyle = {
    width: "100%",
    height: "150px",
    objectFit: "cover"
  };

  const content = {
    padding: "15px"
  };

  const titleStyle = {
    fontWeight: "bold",
    fontSize: "1.2rem",
    marginBottom: "10px"
  };

  const badge = {
    fontSize: "0.85rem",
    fontWeight: "bold",
    padding: "5px 10px",
    borderRadius: "20px",
    display: "inline-block"
  };

  return (
    <div style={container} onClick={() => navigate(`/story/${story.id}`)}>
      <img
        src={`https://ik.imagekit.io/dev24/${story.Image}`}
        alt="story"
        style={imageStyle}
      />
      <div style={content}>
        <h3 style={titleStyle}>{story.Title}</h3>
        <span style={{ ...badge, ...badgeStyle[status] }}>{status}</span>
      </div>
    </div>
  );
}
