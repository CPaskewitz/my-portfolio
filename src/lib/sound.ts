/**
 * Opt-in interface sound, synthesised with Web Audio (no audio files, ~0 KB).
 * Off by default; the choice is remembered per browser. Every press of a button or link
 * plays a soft tick while sound is on; the command palette and transmissions get their own.
 */

type Listener = (on: boolean) => void;
const KEY = 'core-sound';
const listeners = new Set<Listener>();
let ctx: AudioContext | null = null;

function readStored(): boolean {
  try {
    return localStorage.getItem(KEY) === 'on';
  } catch {
    return false;
  }
}

let on = typeof window !== 'undefined' ? readStored() : false;

export const isSoundOn = () => on;

export function setSoundOn(value: boolean) {
  on = value;
  try {
    localStorage.setItem(KEY, value ? 'on' : 'off');
  } catch {
    /* storage unavailable: keep the in-memory value */
  }
  listeners.forEach((l) => l(on));
  if (on) play('open');
}

export function subscribeSound(l: Listener) {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}

type Cue = 'tick' | 'open' | 'close' | 'transmit';

const cues: Record<Cue, { freq: [number, number]; dur: number; type: OscillatorType; gain: number }> = {
  tick: { freq: [1800, 1200], dur: 0.04, type: 'square', gain: 0.025 },
  open: { freq: [420, 880], dur: 0.14, type: 'sine', gain: 0.06 },
  close: { freq: [880, 380], dur: 0.12, type: 'sine', gain: 0.05 },
  transmit: { freq: [300, 1400], dur: 0.35, type: 'triangle', gain: 0.05 },
};

export function play(cue: Cue) {
  if (!on) return;
  try {
    ctx ??= new AudioContext();
    const c = cues[cue];
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = c.type;
    osc.frequency.setValueAtTime(c.freq[0], t);
    osc.frequency.exponentialRampToValueAtTime(c.freq[1], t + c.dur);
    g.gain.setValueAtTime(c.gain, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + c.dur);
    osc.connect(g).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + c.dur + 0.02);
  } catch {
    /* audio unavailable */
  }
}

/** One delegated listener: a tick on every button/link press while sound is on. */
export function installClickSounds() {
  document.addEventListener('click', (e) => {
    if (!on) return;
    const target = (e.target as Element | null)?.closest('a, button, [role="button"]');
    if (target) play('tick');
  });
}
