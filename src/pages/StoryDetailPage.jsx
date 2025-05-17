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
  console.log(story);

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
    },
    paragraph: {
      lineHeight: "1.6",
      fontSize: "1rem"
    },
    sectionImg: {
      width: "100%",
      maxHeight: "250px",
      objectFit: "cover",
      borderRadius: "8px",
      marginBottom: "10px"
    }
  };

  if (!story) {
    return <div style={{ color: "white", padding: "20px" }}>Loading...</div>;
  }

  return (
    <div style={styles.wrapper}>
      <img
  src={
    story.Image
      ? `https://ik.imagekit.io/dev24/${story.Image[story.Image.length - 1]}`
      : "https://via.placeholder.com/600x300?text=No+Image"
  }
  alt="story"
  style={styles.img}
  onError={(e) => {
    e.target.src = "https://via.placeholder.com/600x300?text=No+Image";
  }}
/>

      <h1 style={styles.heading}>{story.Title || "Untitled Story"}</h1>

      <div style={styles.buttonRow}>
        <button onClick={() => setTab("summary")} style={styles.button}>
          Summary
        </button>
        <button onClick={() => setTab("details")} style={styles.button}>
          Details
        </button>
        <button onClick={() => setTab("notes")} style={styles.button}>
          Notes
        </button>
      </div>

      <div style={styles.paragraph}>
        {tab === "summary" && (
          <p>{story.ShortDescription || "No summary available."}</p>
        )}

        {tab === "details" && (
          <div>
            <h3>{story.Storyadvenure?.Storytitle || "No Title Available"}</h3>
            {story.Storyadvenure?.content?.map((section, i) => (
              <div key={i} style={{ marginBottom: "20px" }}>
                {section.Storyimage?.map((img, j) => (
                  <img
                    key={j}
                    src={`https://ik.imagekit.io/dev24/${img[0]}`}
                    alt={`Section ${i + 1}`}
                    style={styles.sectionImg}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/600x300?text=No+Image";
                    }}
                  />
                ))}
                {section.Paragraph?.map((para, k) => (
                  <p key={k} style={{ marginBottom: "10px" }}>
                    {para}
                  </p>
                ))}
              </div>
            ))}
          </div>
        )}

        {tab === "notes" && (
          <p>Author: {story.Author || "Unknown"}</p>
        )}
      </div>
    </div>
  );
}
