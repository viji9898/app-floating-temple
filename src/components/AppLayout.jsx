export default function AppLayout({ children, className = "" }) {
  return (
    <main className={`app-shell screen screen-enter ${className}`.trim()}>
      {children}
    </main>
  );
}
