import AppLayout from '../components/AppLayout.jsx'
import PrimaryAction from '../components/PrimaryAction.jsx'

export default function Prepare() {
  return (
    <AppLayout className="prepare-screen">
      <div className="statement prepare-copy">
        <p>Find somewhere<br />comfortable.</p>
        <p>Put on your<br />headphones.</p>
        <span aria-hidden="true">↓</span>
      </div>
      <PrimaryAction to="/feel">CONTINUE</PrimaryAction>
    </AppLayout>
  )
}
