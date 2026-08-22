import AppLayout from "../components/AppLayout.jsx";
import PrimaryAction from "../components/PrimaryAction.jsx";

export default function Landing() {
  return (
    <AppLayout className="landing-screen">
      <h1 className="wordmark">
        FLOATING
        <br />
        TEMPLE
      </h1>
      <div className="landing-intro statement">
        <p>
          Close your eyes.
          <br />
          Breathe.
          <br />
          Listen.
        </p>
        <span className="short-rule" aria-hidden="true">
          —
        </span>
        <p className="body-copy">
          Immersive journeys
          <br />
          through breath and sound
          <br />
          by Tereza Dos Santos.
        </p>
      </div>
      <PrimaryAction to="/prepare">BEGIN</PrimaryAction>
    </AppLayout>
  );
}
