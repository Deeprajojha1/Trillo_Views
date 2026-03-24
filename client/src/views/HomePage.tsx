// Landing screen.
export function HomePage({ onStart }: { onStart: () => void }) {
  return (
    <div className="home-page">
      <div className="home-card">
        <h1>Project Tracker</h1>
        <p>
          Same data, three views. Custom drag and drop. Virtual scrolling. Real-time simulation.
        </p>
        <button type="button" onClick={onStart}>
          Open Board
        </button>
      </div>
    </div>
  )
}
