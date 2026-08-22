import { Link, Navigate, useParams } from "react-router-dom";
import AppLayout from "../components/AppLayout.jsx";
import BackButton from "../components/BackButton.jsx";
import PrimaryAction from "../components/PrimaryAction.jsx";
import { feelings } from "../data/feelings.js";
import { journeys } from "../data/journeys.js";

export default function Journeys() {
  const { feeling } = useParams();
  const selectedFeeling = feelings.find((item) => item.id === feeling);
  const recommendations = journeys.filter((journey) =>
    journey.feelings.includes(feeling),
  );

  if (!selectedFeeling) return <Navigate to="/feel" replace />;

  if (!recommendations.length) {
    return (
      <AppLayout className="message-screen">
        <BackButton to="/feel" />
        <div className="statement">
          <p>{selectedFeeling.label}</p>
          <p>
            A journey for this feeling
            <br />
            is on its way.
          </p>
        </div>
        <PrimaryAction to="/feel">CHOOSE AGAIN →</PrimaryAction>
      </AppLayout>
    );
  }

  const [primary, ...others] = recommendations;

  return (
    <AppLayout className="journeys-screen">
      <BackButton to="/feel" />
      <p className="eyebrow">{selectedFeeling.label}</p>
      <span className="down-arrow" aria-hidden="true">
        ↓
      </span>
      <div className="journey-recommendation">
        <p className="journey-title">
          {primary.title} · {primary.durationLabel}
        </p>
        <p className="body-copy">{primary.instruments.join(" + ")}</p>
      </div>
      <span className="down-arrow" aria-hidden="true">
        ↓
      </span>
      <PrimaryAction to={`/journey/${primary.slug}`}>
        BEGIN JOURNEY
      </PrimaryAction>
      {others.length > 0 && (
        <div className="other-journeys">
          <p>OTHER JOURNEYS</p>
          {others.map((journey) => (
            <Link key={journey.id} to={`/journey/${journey.slug}`}>
              {journey.title} · {journey.durationLabel}
            </Link>
          ))}
        </div>
      )}
    </AppLayout>
  );
}
