export type GameResult = '1-0' | '0-1' | '½-½' | null;

export interface Game {
  id: number;
  week: number;
  dayIdx: number;
  dayNum: number;
  white: string;
  black: string;
  result: GameResult;
}

export interface PlayerStats {
  name: string;
  w: number;
  d: number;
  l: number;
  pts: number;
  played: number;
}

// ─────────────────────────────────────────────────────────────
//  RESULTS — THE ONLY THING YOU NEED TO EDIT
//
//  Keys are game IDs (0–55). Values are the result:
//    '1-0'  → White wins
//    '0-1'  → Black wins
//    '½-½'  → Draw
//    null   → Not played yet (or just leave the key out entirely)
// ─────────────────────────────────────────────────────────────
const RESULTS: Record<number, GameResult> = {
  // Example data to show standings (uncomment to test)
  // 0: '1-0',
  // 1: '½-½',
  // 2: '0-1',
  // 3: '1-0',
  // 4: '1-0',
  // 5: '0-1',
  // 6: '½-½',
  // 7: '1-0',
};

export const PLAYERS = [
  'GM Rajah',
  'Samuel',
  'Tomiwa',
  'ACES',
  'Ohgee',
  'DannyXvibes',
  'Edikan',
  'Awaji',
];

const WEEK1 = [
  [
    ['Samuel', 'Tomiwa'],
    ['ACES', 'Ohgee'],
    ['DannyXvibes', 'Edikan'],
    ['Awaji', 'GM Rajah'],
  ],
  [
    ['Samuel', 'ACES'],
    ['Tomiwa', 'Ohgee'],
    ['DannyXvibes', 'Awaji'],
    ['Edikan', 'GM Rajah'],
  ],
  [
    ['Samuel', 'Ohgee'],
    ['Tomiwa', 'ACES'],
    ['Edikan', 'Awaji'],
    ['DannyXvibes', 'GM Rajah'],
  ],
  [
    ['Samuel', 'DannyXvibes'],
    ['Tomiwa', 'Edikan'],
    ['ACES', 'Awaji'],
    ['Ohgee', 'GM Rajah'],
  ],
  [
    ['Samuel', 'Edikan'],
    ['Tomiwa', 'DannyXvibes'],
    ['Ohgee', 'Awaji'],
    ['ACES', 'GM Rajah'],
  ],
  [
    ['Samuel', 'Awaji'],
    ['Tomiwa', 'GM Rajah'],
    ['ACES', 'DannyXvibes'],
    ['Ohgee', 'Edikan'],
  ],
  [
    ['Samuel', 'GM Rajah'],
    ['Tomiwa', 'Awaji'],
    ['ACES', 'Edikan'],
    ['Ohgee', 'DannyXvibes'],
  ],
];

const WEEK2 = WEEK1.map((day) => day.map(([w, b]) => [b, w]));

export const DAY_NAMES = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export function generateGames(): Game[] {
  const games: Game[] = [];
  let gid = 0;

  [...WEEK1, ...WEEK2].forEach((day, di) => {
    const week = di < 7 ? 1 : 2;
    const dayIdx = di % 7;

    day.forEach(([white, black]) => {
      games.push({
        id: gid,
        week,
        dayIdx,
        dayNum: di + 1,
        white,
        black,
        result: RESULTS[gid] ?? null,
      });
      gid++;
    });
  });

  return games;
}

export function calculateStandings(games: Game[]): PlayerStats[] {
  const stats: Record<string, PlayerStats> = {};

  PLAYERS.forEach((p) => {
    stats[p] = { name: p, w: 0, d: 0, l: 0, pts: 0, played: 0 };
  });

  games.forEach((g) => {
    if (!g.result) return;

    stats[g.white].played++;
    stats[g.black].played++;

    if (g.result === '1-0') {
      stats[g.white].w++;
      stats[g.white].pts += 1;
      stats[g.black].l++;
    } else if (g.result === '0-1') {
      stats[g.black].w++;
      stats[g.black].pts += 1;
      stats[g.white].l++;
    } else {
      stats[g.white].d++;
      stats[g.white].pts += 0.5;
      stats[g.black].d++;
      stats[g.black].pts += 0.5;
    }
  });

  return Object.values(stats).sort((a, b) => b.pts - a.pts || b.w - a.w);
}
