import { useMemo } from 'react';
import { ChessStrip } from './components/ChessStrip';
import { Header } from './components/Header';
import { ScheduleSection } from './components/ScheduleSection';
import { StandingsTable } from './components/StandingsTable';
import { generateGames, calculateStandings } from './data/tournament';
export function App() {
  const games = useMemo(() => generateGames(), []);
  const standings = useMemo(() => calculateStandings(games), [games]);
  const totalGames = games.length;
  const gamesPlayed = games.filter((g) => g.result !== null).length;
  return (
    <div className="min-h-screen flex flex-col relative z-10">
      <ChessStrip />
      <Header gamesPlayed={gamesPlayed} totalGames={totalGames} />

      <main className="flex-1 max-w-[1400px] w-full mx-auto p-6 lg:p-12 flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
        <ScheduleSection games={games} disqualifiedPlayers={new Set(['Awaji'])} />
        <StandingsTable
          standings={standings}
          gamesPlayed={gamesPlayed}
          totalGames={totalGames}
          disqualifiedPlayers={new Set(['Awaji'])}
        />
      </main>
    </div>
  );
}
