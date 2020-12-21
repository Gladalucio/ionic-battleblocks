export class Scoreboard {
  constructor(
    public Hits: number = 0,
    public Misses: number = 0,
    public Streak?: number,
    public HighestStreak?: number,
  ) {}
}
