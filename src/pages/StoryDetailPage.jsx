import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function StoryDetailPage() {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [tab, setTab] = useState("summary");

  useEffect(() => {
    fetch(`https://mxpertztestapi.onrender.com/api/sciencefiction/${id}`)
      .then((res) => res.json())
      .then((data) => setStory(data))
      .catch((err) => console.error("Error loading story:", err));
  }, [id]);

  const styles = {
    wrapper: {
      minHeight: "100vh",
      backgroundColor: "#1f2937",
      color: "white",
      padding: "20px"
    },
    img: {
      width: "100%",
      maxHeight: "300px",
      objectFit: "cover",
      borderRadius: "10px",
      marginBottom: "20px"
    },
    heading: {
      fontSize: "2rem",
      fontWeight: "bold",
      marginBottom: "20px"
    },
    buttonRow: {
      display: "flex",
      gap: "10px",
      marginBottom: "20px"
    },
    button: {
      backgroundColor: "#2563eb",
      padding: "10px 20px",
      borderRadius: "8px",
      border: "none",
      color: "white",
      cursor: "pointer"
    }
  };

  if (!story) return <div style={{ color: "white", padding: "20px" }}>Loading...</div>;

  return (
    <div style={styles.wrapper}>
      <img
        src={`https://ik.imagekit.io/dev24/${story.Image}`}
        alt="story"
        style={styles.img}
      />
      <h1 style={styles.heading}>{story.Title}</h1>

      <div style={styles.buttonRow}>
        <button onClick={() => setTab("summary")} style={styles.button}>Summary</button>
        <button onClick={() => setTab("details")} style={styles.button}>Details</button>
        <button onClick={() => setTab("notes")} style={styles.button}>Notes</button>
      </div>

      <div>
        {tab === "summary" && <p>{story.ShortDescription}</p>}
        {tab === "details" && <p>{story.Description || "No extra details."}</p>}
        {tab === "notes" && <p>Author: {story.Author || "Unknown"}</p>}
      </div>
    </div>
  );
}
