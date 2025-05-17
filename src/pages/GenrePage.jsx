import { useEffect, useState } from "react";
import StoryCard from "../components/storyCard";

export default function GenrePage() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetch("https://mxpertztestapi.onrender.com/api/sciencefiction")
      .then((res) => res.json())
      .then((data) => setStories(data))
      .catch((err) => console.error("Error fetching stories:", err));
  }, []);

  const styles = {
    wrapper: {
      minHeight: "100vh",
      width: "100vw",
      background: "linear-gradient(to bottom right, #0f172a, #1e3a8a)",
      color: "white",
      padding: "20px",
      boxSizing: "border-box",
      display: "flex",
      gap: "30px"
    },
    left: {
      flex: 1,
      backgroundColor: "#1f2937",
      borderRadius: "12px",
      padding: "20px"
    },
    right: {
      flex: 2,
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "20px"
    },
    title: {
      fontSize: "1.5rem",
      marginBottom: "10px"
    },
    label: {
      fontWeight: "bold",
      marginTop: "10px"
    },
    image: {
      width: "100%",
      height: "200px",
      objectFit: "cover",
      borderRadius: "10px",
      marginBottom: "15px"
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.left}>
        <h2 style={styles.title}>Word Explorer</h2>

        <p style={styles.label}>Definition:</p>
        <p>Explore the imaginative future of Earth through thrilling science fiction narratives.</p>

        <p style={styles.label}>Synonyms:</p>
        <p>Adventure, Exploration, Sci-fi</p>

        <p style={styles.label}>Antonyms:</p>
        <p>Reality, Present, Non-fiction</p>
      </div>

      <div style={styles.right}>
       {stories.slice(0, 6).map((story) => {
  return (
    <div key={story._id || story.id}>
      <img
        src={
          story.Image?.[0]
            ? `https://ik.imagekit.io/dev24/${story.Image[0]}`
            : "https://via.placeholder.com/600x300?text=No+Image"
        }
        alt="story"
        style={styles.image}
      />
      <h3 >{story.Title}</h3>
    </div>
  );
})}

        
      </div>
    </div>
  );
}
