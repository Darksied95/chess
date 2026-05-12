import React from 'react';
import { motion } from 'framer-motion';
import { type PlayerStats } from '../data/tournament';

interface StandingsTableProps {
  standings: PlayerStats[];
  gamesPlayed: number;
  totalGames: number;
  disqualifiedPlayers?: Set<string>;
}

export function StandingsTable({
  standings,
  gamesPlayed,
  totalGames,
  disqualifiedPlayers = new Set(),
}: StandingsTableProps) {
  const maxPts = 14; // 14 games total per player

  // Partition: active players first, DQ'd players at the bottom
  const active = standings.filter((p) => !disqualifiedPlayers.has(p.name));
  const disqualified = standings.filter((p) => disqualifiedPlayers.has(p.name));
  const ordered = [...active, ...disqualified];

  // Leader is always the top active player, never a DQ'd player
  const leader = active[0];

  return (
    <div className="w-full lg:w-[420px] lg:sticky lg:top-8">
      <div className="font-mono text-base tracking-[0.2em] uppercase text-chess-light-green mb-6 flex items-center gap-3">
        Standings
        <div className="flex-1 h-px bg-chess-green/30" />
      </div>

      <div className="bg-chess-darker/50 border border-chess-green/20 rounded-lg overflow-hidden backdrop-blur-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-chess-green/40 bg-chess-darker">
              <th className="font-mono text-[10px] tracking-widest uppercase text-chess-light-green py-3 px-4 text-center font-semibold w-10">
                #
              </th>
              <th className="font-mono text-[10px] tracking-widest uppercase text-chess-light-green py-3 px-2 font-semibold">
                Player
              </th>
              <th
                className="font-mono text-[10px] tracking-widest uppercase text-chess-light-green py-3 px-2 text-center font-semibold"
                title="Played"
              >
                P
              </th>
              <th
                className="font-mono text-[10px] tracking-widest uppercase text-chess-light-green py-3 px-2 text-center font-semibold"
                title="Wins"
              >
                W
              </th>
              <th
                className="font-mono text-[10px] tracking-widest uppercase text-chess-light-green py-3 px-2 text-center font-semibold"
                title="Draws"
              >
                D
              </th>
              <th
                className="font-mono text-[10px] tracking-widest uppercase text-chess-light-green py-3 px-2 text-center font-semibold"
                title="Losses"
              >
                L
              </th>
              <th className="font-mono text-[10px] tracking-widest uppercase text-chess-light-green py-3 px-4 text-right font-semibold">
                Pts
              </th>
            </tr>
          </thead>
          <tbody>
            {ordered.map((r, i) => {
              const isDQ = disqualifiedPlayers.has(r.name);

              // Rank only counts among active players
              const rank = isDQ ? null : active.indexOf(r) + 1;
              const isTop = !isDQ && rank === 1 && r.pts > 0;
              const barW = isDQ ? 0 : Math.round((r.pts / maxPts) * 100);

              let rankDisplay: React.ReactNode = rank;
              if (isDQ) {
                rankDisplay = (
                  <span
                    className="text-red-400/70 text-xs font-mono tracking-widest"
                    title="Disqualified"
                  >
                    DQ
                  </span>
                );
              } else if (rank === 1) {
                rankDisplay = (
                  <span className="text-chess-light-green text-lg leading-none">♚</span>
                );
              } else if (rank === 2) {
                rankDisplay = (
                  <span className="text-gray-300 text-base leading-none">♛</span>
                );
              } else if (rank === 3) {
                rankDisplay = (
                  <span className="text-amber-600 text-base leading-none">♜</span>
                );
              }

              return (
                <motion.tr
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={r.name}
                  className={[
                    'border-b border-chess-green/10 last:border-0 transition-colors',
                    isTop ? 'bg-chess-light-green/10' : '',
                    isDQ ? 'opacity-40 bg-red-900/5' : 'hover:bg-chess-light-green/5',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {/* Rank */}
                  <td className="py-3 px-4 text-center font-mono text-base text-chess-muted">
                    {rankDisplay}
                  </td>

                  {/* Name — struck out if DQ'd */}
                  <td
                    className={[
                      'py-3 px-2 font-crimson text-xl italic whitespace-nowrap',
                      isDQ
                        ? 'line-through decoration-red-400/70 decoration-2 text-chess-muted'
                        : 'text-chess-cream',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    {r.name}
                  </td>

                  {/* Played */}
                  <td className="py-3 px-2 text-center font-mono text-base text-chess-muted">
                    {isDQ ? '—' : r.played}
                  </td>

                  {/* Wins */}
                  <td className="py-3 px-2 text-center font-mono text-base text-chess-light-green">
                    {isDQ ? '—' : r.w}
                  </td>

                  {/* Draws */}
                  <td className="py-3 px-2 text-center font-mono text-base text-yellow-500/80">
                    {isDQ ? '—' : r.d}
                  </td>

                  {/* Losses */}
                  <td className="py-3 px-2 text-center font-mono text-base text-red-400/80">
                    {isDQ ? '—' : r.l}
                  </td>

                  {/* Points + bar */}
                  <td className="py-3 px-4 text-right">
                    <div
                      className={[
                        'font-mono text-[15px] font-medium mb-1',
                        isDQ ? 'line-through text-chess-muted' : 'text-chess-cream',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    >
                      {isDQ ? '—' : r.pts % 1 === 0 ? r.pts : r.pts.toFixed(1)}
                    </div>
                    <div className="w-full h-[3px] bg-chess-green/20 rounded-full overflow-hidden flex justify-end">
                      {!isDQ && (
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${barW}%` }}
                          transition={{
                            duration: 1,
                            delay: 0.2 + i * 0.05,
                            ease: 'easeOut',
                          }}
                          className="h-full bg-chess-light-green rounded-full"
                        />
                      )}
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Summary footer */}
      <div className="mt-6 p-4 bg-chess-darker/50 border border-chess-green/20 rounded-lg font-mono text-base text-chess-muted leading-relaxed tracking-wide backdrop-blur-sm">
        <div className="flex justify-between mb-1">
          <span className="text-chess-light-green">Leader:</span>
          <span className="text-chess-cream">
            {leader
              ? `${leader.name} · ${
                  leader.pts % 1 === 0 ? leader.pts : leader.pts.toFixed(1)
                } pts`
              : 'No active players'}
          </span>
        </div>
        <div className="flex justify-between mb-1">
          <span className="text-chess-light-green">Games played:</span>
          <span className="text-chess-cream">
            {gamesPlayed} of {totalGames}
          </span>
        </div>
        <div className="flex justify-between mb-1">
          <span className="text-chess-light-green">Remaining:</span>
          <span className="text-chess-cream">{totalGames - gamesPlayed} games</span>
        </div>
        {disqualified.length > 0 && (
          <div className="flex justify-between mt-2 pt-2 border-t border-chess-green/10">
            <span className="text-red-400/70">Disqualified:</span>
            <span className="text-chess-muted text-right">
              {disqualified.map((p) => p.name).join(', ')}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
