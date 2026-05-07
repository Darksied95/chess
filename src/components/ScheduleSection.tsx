import { type Game, DAY_NAMES } from '../data/tournament';
interface ScheduleSectionProps {
  games: Game[];
}
export function ScheduleSection({ games }: ScheduleSectionProps) {
  const weeks = [1, 2];
  return (
    <div className="flex-1">
      <div className="font-mono text-base tracking-[0.2em] uppercase text-chess-light-green mb-6 flex items-center gap-3">
        Match Schedule
        <div className="flex-1 h-px bg-chess-green/30" />
      </div>

      <div className="space-y-12">
        {weeks.map((week) => (
          <div key={week} className="space-y-6">
            <h2 className="font-playfair text-xl font-bold text-chess-muted tracking-widest uppercase border-b border-chess-green/20 pb-3">
              Week {week}
            </h2>

            <div className="space-y-0 border border-chess-green/20 rounded-lg overflow-hidden bg-chess-darker/30">
              {Array.from({
                length: 7,
              }).map((_, d) => {
                const dayGames = games.filter((g) => g.week === week && g.dayIdx === d);
                const dayNum = week === 1 ? d + 1 : d + 8;
                return (
                  <div
                    key={d}
                    className="grid grid-cols-1 md:grid-cols-[140px_1fr] border-b border-chess-green/20 last:border-0"
                  >
                    <div className="p-4 md:border-r border-chess-green/20 flex flex-row md:flex-col items-center md:items-start justify-between md:justify-center bg-chess-darker/50">
                      <span className="font-playfair text-lg font-bold text-chess-cream">
                        {DAY_NAMES[d]}
                      </span>
                      <span className="font-mono text-base text-chess-muted mt-1">
                        Day {dayNum}
                      </span>
                    </div>

                    <div className="p-3 flex flex-col gap-1.5">
                      {dayGames.map((g) => {
                        const isWin = g.result === '1-0' || g.result === '0-1';
                        const isDraw = g.result === '½-½';
                        return (
                          <div
                            key={g.id}
                            className={`flex items-center gap-3 p-2 rounded hover:bg-chess-light-green/5 transition-colors text-base border-l-2 ${isWin ? 'border-chess-light-green' : isDraw ? 'border-yellow-500/70' : 'border-transparent'}`}
                          >
                            <span
                              className={`flex-1 text-right truncate ${g.result === '1-0' ? 'font-bold text-chess-light-green' : 'text-chess-cream'}`}
                            >
                              {g.white}
                            </span>

                            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-chess-board-light text-[#3a2a10] font-semibold tracking-wider">
                              W
                            </span>

                            <span
                              className={`font-mono text-sm font-medium w-12 text-center ${g.result ? 'text-chess-light-green' : 'text-chess-muted'}`}
                            >
                              {g.result ? g.result.replace('-', ' – ') : '·'}
                            </span>

                            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#222] text-chess-board-light border border-[#444] font-semibold tracking-wider">
                              B
                            </span>

                            <span
                              className={`flex-1 text-left truncate ${g.result === '0-1' ? 'font-bold text-chess-light-green' : 'text-chess-cream'}`}
                            >
                              {g.black}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
