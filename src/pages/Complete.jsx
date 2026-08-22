import AppLayout from '../components/AppLayout.jsx'
import PrimaryAction from '../components/PrimaryAction.jsx'

export default function Complete() {
  return (
    <AppLayout className="complete-screen">
      <div className="statement complete-copy">
        <h1>Carry this<br />with you.</h1>
        <span aria-hidden="true">↓</span>
        <p>Your next journey<br />will be here when<br />you're ready.</p>
      </div>
      <PrimaryAction to="/feel">HOME →</PrimaryAction>
    </AppLayout>
  )
}
