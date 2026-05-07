import React from 'react';
interface HeaderProps {
  gamesPlayed: number;
  totalGames: number;
}
export function Header({ gamesPlayed, totalGames }: HeaderProps) {
  return (
    <header className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-chess-green/30 px-6 py-8 lg:px-12 bg-chess-darker/50 backdrop-blur-sm">
      <div className="flex items-center gap-5">
        <div className="text-5xl lg:text-6xl leading-none drop-shadow-[0_0_15px_rgba(129,182,76,0.3)] text-chess-light-green">
          ♚
        </div>
        <div>
          <h1 className="font-playfair text-3xl lg:text-4xl font-black tracking-wide text-chess-cream leading-tight">
            Lagos Chess Invitational
          </h1>
          <p className="font-mono text-base lg:text-sm text-chess-light-green tracking-[0.15em] uppercase mt-1.5 font-medium">
            Round Robin · May 2026
          </p>
        </div>
      </div>

      <div className="font-mono text-base lg:text-sm text-chess-muted text-left md:text-right tracking-wider">
        <strong className="block text-chess-light-green text-sm lg:text-base mb-1 font-semibold">
          {gamesPlayed} / {totalGames} games played
        </strong>
        <span>2 weeks · 4 games/day</span>
      </div>
    </header>
  );
}
