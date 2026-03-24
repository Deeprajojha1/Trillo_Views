// Landing screen.
export function HomePage({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="max-w-[520px] rounded-[24px] border border-black/10 bg-white p-10 text-left shadow-[0_30px_60px_rgba(32,25,10,0.15)]">
        <h1 className="mb-3 font-['Space_Grotesk'] text-[36px]">Project Tracker</h1>
        <p className="mb-6 leading-relaxed text-[#4b4b4b]">
          Same data, three views. Custom drag and drop. Virtual scrolling.
          Real-time simulation.
        </p>
        <button
          type="button"
          onClick={onStart}
          className="rounded-xl bg-[#1d4ed8] px-5 py-3 font-semibold text-white"
        >
          Open Board
        </button>
      </div>
    </div>
  )
}
