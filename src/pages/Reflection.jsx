import { Navigate, useNavigate, useParams } from "react-router-dom";
import AppLayout from "../components/AppLayout.jsx";
import { findJourney } from "../data/journeys.js";

const reflections = ["CALMER", "LIGHTER", "OPEN", "ENERGISED", "SAME"];

export default function Reflection() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const journey = findJourney(slug);

  if (!journey) return <Navigate to="/" replace />;

  const selectReflection = (reflection) => {
    sessionStorage.setItem("floating-temple-reflection", reflection);
    navigate("/complete", { state: { reflection } });
  };

  return (
    <AppLayout className="reflection-screen">
      <div className="statement reflection-intro">
        <p>Welcome back.</p>
        <p>Take your time.</p>
        <span aria-hidden="true">↓</span>
        <h1>How do you feel?</h1>
      </div>
      <div className="feeling-list reflection-list">
        {reflections.map((reflection) => (
          <button
            key={reflection}
            type="button"
            onClick={() => selectReflection(reflection)}
          >
            {reflection}
          </button>
        ))}
      </div>
    </AppLayout>
  );
}
