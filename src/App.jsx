import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import StoryDetailPage from "./pages/StoryDetailPage";
import GenrePage from "./pages/GenrePage";

function App() {
  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "auto" }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/story/:id" element={<StoryDetailPage />} />
        <Route path="/genre" element={<GenrePage />} />
      </Routes>
    </div>
  );
}

export default App;
