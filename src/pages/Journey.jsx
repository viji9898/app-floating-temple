import { useParams } from "react-router-dom";
import AppLayout from "../components/AppLayout.jsx";
import BackButton from "../components/BackButton.jsx";
import PrimaryAction from "../components/PrimaryAction.jsx";
import { findJourney } from "../data/journeys.js";

export default function Journey() {
  const { slug } = useParams();
  const journey = findJourney(slug);

  if (!journey) {
    return (
      <AppLayout className="message-screen">
        <p className="statement">Journey not found.</p>
        <PrimaryAction to="/">RETURN HOME →</PrimaryAction>
      </AppLayout>
    );
  }

  return (
    <AppLayout className="journey-detail-screen">
      <BackButton to={`/journeys/${journey.feelings[0]}`} />
      <div className="journey-detail">
        <h1 className="statement">{journey.title}</h1>
        <p className="eyebrow">{journey.durationLabel}</p>
        <p className="body-copy">{journey.instruments.join(" + ")}</p>
        <p className="statement journey-description">{journey.description}</p>
      </div>
      <PrimaryAction to={`/journey/${journey.slug}/play`}>
        BEGIN JOURNEY
      </PrimaryAction>
    </AppLayout>
  );
}
