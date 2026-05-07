export function ChessStrip() {
  // 40 squares for the strip
  const squares = Array.from({
    length: 40,
  });
  return (
    <div className="flex h-2 w-full">
      {squares.map((_, i) => (
        <span
          key={i}
          className={`flex-1 ${i % 2 === 0 ? 'bg-chess-board-light' : 'bg-chess-board-dark'}`}
        />
      ))}
    </div>
  );
}
