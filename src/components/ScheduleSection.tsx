import { type Game, DAY_NAMES } from '../data/tournament';

interface ScheduleSectionProps {
  games: Game[];
  disqualifiedPlayers?: Set<string>;
}

const GAME_TIMES = ['8:00 PM', '8:20 PM', '8:40 PM', '9:00 PM'];

export function ScheduleSection({
  games,
  disqualifiedPlayers = new Set(),
}: ScheduleSectionProps) {
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
              {Array.from({ length: 7 }).map((_, d) => {
                const dayGames = games.filter((g) => g.week === week && g.dayIdx === d);
                const dayNum = week === 1 ? d + 1 : d + 8;

                return (
                  <div
                    key={d}
                    className="grid grid-cols-1 md:grid-cols-[140px_1fr] border-b border-chess-green/20 last:border-0"
                  >
                    {/* Day label */}
                    <div className="p-4 md:border-r border-chess-green/20 flex flex-row md:flex-col items-center md:items-start justify-between md:justify-center bg-chess-darker/50">
                      <span className="font-playfair text-lg font-bold text-chess-cream">
                        {DAY_NAMES[d]}
                      </span>
                      <span className="font-mono text-base text-chess-muted mt-1">
                        Day {dayNum}
                      </span>
                    </div>

                    {/* Games */}
                    <div className="p-3 flex flex-col gap-1.5">
                      {dayGames.map((g, i) => {
                        const gameTime = GAME_TIMES[i] ?? '';
                        const isWin = g.result === '1-0' || g.result === '0-1';
                        const isDraw = g.result === '½-½';

                        const whiteIsDQ = disqualifiedPlayers.has(g.white);
                        const blackIsDQ = disqualifiedPlayers.has(g.black);

                        // Only apply forfeit styling on days that were actually played
                        const whiteForfeited = whiteIsDQ;
                        const blackForfeited = blackIsDQ;

                        // Winner logic is unaffected — the result is real
                        const whiteWon = g.result === '1-0';
                        const blackWon = g.result === '0-1';

                        return (
                          <div
                            key={g.id}
                            className={[
                              'flex items-center gap-3 p-2 rounded text-xl border-l-2 transition-colors hover:bg-chess-light-green/5',
                              isWin
                                ? 'border-chess-light-green'
                                : isDraw
                                  ? 'border-yellow-500/70'
                                  : 'border-transparent',
                            ].join(' ')}
                          >
                            {/* Time */}
                            <span className="font-mono text-xs text-chess-muted w-16 shrink-0">
                              {gameTime}
                            </span>

                            {/* White player */}
                            <span
                              className={[
                                'flex-1 text-right truncate transition-all',
                                whiteForfeited
                                  ? 'line-through decoration-red-400/80 decoration-2 text-chess-muted/50'
                                  : whiteWon
                                    ? 'font-bold text-chess-light-green'
                                    : 'text-chess-cream',
                              ].join(' ')}
                            >
                              {g.white}
                            </span>

                            {/* W badge */}
                            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-chess-board-light text-[#3a2a10] font-semibold tracking-wider">
                              W
                            </span>

                            {/* Result — always shown as-is, the win is legitimate */}
                            <span
                              className={`font-mono text-sm font-medium w-12 text-center ${
                                g.result ? 'text-chess-light-green' : 'text-chess-muted'
                              }`}
                            >
                              {g.result ? g.result.replace('-', ' – ') : '·'}
                            </span>

                            {/* B badge */}
                            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#222] text-chess-board-light border border-[#444] font-semibold tracking-wider">
                              B
                            </span>

                            {/* Black player */}
                            <span
                              className={[
                                'flex-1 text-left truncate transition-all',
                                blackForfeited
                                  ? 'line-through decoration-red-400/80 decoration-2 text-chess-muted/50'
                                  : blackWon
                                    ? 'font-bold text-chess-light-green'
                                    : 'text-chess-cream',
                              ].join(' ')}
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
