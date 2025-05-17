import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StoryCard from "../components/storyCard";

export default function HomePage() {
  const [stories, setStories] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://mxpertztestapi.onrender.com/api/sciencefiction")
      .then((res) => res.json())
      .then((data) => {
        setStories(data);
        setFiltered(data);
      })
      .catch((err) => console.error("Error fetching stories:", err));
  }, []);

  useEffect(() => {
    if (filter === "All") setFiltered(stories);
    else setFiltered(stories.filter((story) => story.Status === filter));
  }, [filter, stories]);

  const styles = {
    wrapper: {
      minHeight: "100vh",
      width: "100vw",
      background: "linear-gradient(to bottom right, #0f172a, #1e3a8a)",
      color: "white",
      padding: "0 20px",
      boxSizing: "border-box"
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px 0",
      borderBottom: "1px solid rgba(255,255,255,0.1)"
    },
    navLeft: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "#60a5fa"
    },
    navRight: {
      display: "flex",
      gap: "20px",
      alignItems: "center",
      fontSize: "0.95rem",
      cursor: "pointer"
    },
    signOutBtn: {
      padding: "8px 16px",
      background: "linear-gradient(to right, #38bdf8, #818cf8)",
      borderRadius: "20px",
      border: "none",
      color: "white",
      cursor: "pointer",
      fontWeight: "bold"
    },
    heading: {
      textAlign: "center",
      fontSize: "2.5rem",
      fontWeight: "bold",
      margin: "30px 0"
    },
    gradientHeading: {
      background: "linear-gradient(to right, #f472b6, #3b82f6, #10b981)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent"
    },
    buttonRow: {
      display: "flex",
      justifyContent: "center",
      gap: "15px",
      marginBottom: "40px"
    },
    button: {
      padding: "10px 20px",
      borderRadius: "20px",
      border: "none",
      cursor: "pointer",
      fontWeight: "bold"
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "20px",
      paddingBottom: "40px"
    }
  };

  return (
    <div style={styles.wrapper}>
      <header style={styles.header}>
        <div style={styles.navLeft}>BrainyLingo</div>
        <div style={styles.navRight}>
          <span>Home</span>
          <span>Leaderboard</span>
          <span>Daily Quiz</span>
          <span onClick={() => navigate("/genre")}>Genre</span>
          <button style={styles.signOutBtn}>Sign Out</button>
        </div>
      </header>

      <h1 style={{ ...styles.heading, ...styles.gradientHeading }}>
        The <span style={{ color: "#60a5fa" }}>Lost City</span> of Future Earth
      </h1>

      <div style={styles.buttonRow}>
        <button
          style={{ ...styles.button, backgroundColor: "#2563eb", color: "white" }}
          onClick={() => setFilter("New")}
        >
          New
        </button>
        <button
          style={{ ...styles.button, backgroundColor: "#facc15", color: "black" }}
          onClick={() => setFilter("In Progress")}
        >
          In Progress
        </button>
        <button
          style={{ ...styles.button, backgroundColor: "#22c55e", color: "black" }}
          onClick={() => setFilter("Completed")}
        >
          Completed
        </button>
        <button
          style={{ ...styles.button, backgroundColor: "#6366f1", color: "white" }}
          onClick={() => setFilter("All")}
        >
          All
        </button>
      </div>

      <div style={styles.grid}>
        {filtered.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
    </div>
  );
}
