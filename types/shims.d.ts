declare module "canvas-confetti" {
  type Options = {
    particleCount?: number;
    spread?: number;
    startVelocity?: number;
    scalar?: number;
    colors?: string[];
  };
  const confetti: (opts?: Options) => void;
  export default confetti;
}

declare module "howler" {
  export class Howl {
    constructor(opts: { src: string[]; volume?: number });
    load(): void;
    play(): number;
    stop(id?: number): void;
  }
}
