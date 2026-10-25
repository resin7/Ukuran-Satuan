/**
 * Self-contained Web Audio API Sound Effects & Chill Background Music (BGM)
 * 100% self-contained procedural synthesizer — zero external audio files, zero 404 risk, 100% offline.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/* -------------------------------------------------------------------------- */
/* INTERACTIVE SOUND EFFECTS (SFX)                                            */
/* -------------------------------------------------------------------------- */

/**
 * Soft tactile 'pop' sound when buttons are clicked or drag begins
 */
export function playPopSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(440, now);
  osc.frequency.exponentialRampToValueAtTime(750, now + 0.06);

  gain.gain.setValueAtTime(0.18, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.07);
}

/**
 * Gentle 'thud' sound when an item is dropped onto the digital scale plate
 */
export function playDropSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(200, now);
  osc.frequency.exponentialRampToValueAtTime(70, now + 0.14);

  gain.gain.setValueAtTime(0.22, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.15);
}

/**
 * Gentle 'ping' sound when a correct answer or scale target is matched
 */
export function playDingSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(659.25, now); // E5
  osc.frequency.setValueAtTime(987.77, now + 0.06); // B5

  gain.gain.setValueAtTime(0.16, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.31);
}

/**
 * Soft playful boing for gentle retries
 */
export function playGentleBoing() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(280, now);
  osc.frequency.exponentialRampToValueAtTime(180, now + 0.1);
  osc.frequency.exponentialRampToValueAtTime(240, now + 0.22);

  gain.gain.setValueAtTime(0.15, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.25);
}

/**
 * Sparkle celebration fanfare sound effect for quiz & challenge completion
 */
export function playSuccessFanfare() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const chords = [
    { freq: 523.25, time: 0.0, dur: 0.12 }, // C5
    { freq: 659.25, time: 0.1, dur: 0.12 }, // E5
    { freq: 783.99, time: 0.2, dur: 0.14 }, // G5
    { freq: 1046.5, time: 0.32, dur: 0.4 }, // C6
  ];

  const now = ctx.currentTime;
  chords.forEach(({ freq, time, dur }) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now + time);

    gain.gain.setValueAtTime(0.18, now + time);
    gain.gain.exponentialRampToValueAtTime(0.001, now + time + dur);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + time);
    osc.stop(now + time + dur);
  });
}

/* -------------------------------------------------------------------------- */
/* CHILL BACKGROUND MUSIC (BGM) SYSTEM                                        */
/* Soft, calm, warm acoustic / lo-fi ambient loop at low volume (20-30%)      */
/* -------------------------------------------------------------------------- */

let bgmInterval: ReturnType<typeof setInterval> | null = null;
let bgmGainNode: GainNode | null = null;
let isBgmPlaying = false;
let currentBgmStep = 0;

// Chord progression: Cmaj9 -> Am9 -> Fmaj7 -> Gsus4 (warm, peaceful study vibe)
const CHILL_PROGRESSION = [
  // Cmaj9 notes
  [261.63, 329.63, 392.0, 493.88, 587.33], // C4, E4, G4, B4, D5
  // Am9 notes
  [220.0, 261.63, 329.63, 392.0, 493.88],  // A3, C4, E4, G4, B4
  // Fmaj7 notes
  [174.61, 261.63, 329.63, 349.23, 440.0], // F3, C4, E4, F4, A4
  // Gsus4 / G7 notes
  [196.0, 293.66, 392.0, 440.0, 523.25],   // G3, D4, G4, A4, C5
];

// Soft kalimba / acoustic harp melody notes (Hz)
const MELODY_NOTES = [
  523.25, 587.33, 659.25, 783.99, 880.0, 1046.5, 783.99, 659.25
];

function playWarmChillChord(frequencies: number[], durationSec: number) {
  const ctx = getAudioContext();
  if (!ctx || !isBgmPlaying || !bgmGainNode) return;

  const now = ctx.currentTime;

  // Master low-pass filter for cozy lo-fi / acoustic warmth
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(650, now);

  frequencies.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const noteGain = ctx.createGain();

    osc.type = idx === 0 ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(freq, now);

    // Soft gentle attack & long relaxed release
    const attack = 0.4 + idx * 0.05;
    const peakGain = 0.06;
    noteGain.gain.setValueAtTime(0.001, now);
    noteGain.gain.linearRampToValueAtTime(peakGain, now + attack);
    noteGain.gain.exponentialRampToValueAtTime(0.001, now + durationSec);

    osc.connect(noteGain);
    noteGain.connect(filter);

    osc.start(now);
    osc.stop(now + durationSec);
  });

  // Soft high bell / kalimba chime on the chord change
  const bellOsc = ctx.createOscillator();
  const bellGain = ctx.createGain();
  const bellNote = MELODY_NOTES[currentBgmStep % MELODY_NOTES.length];
  bellOsc.type = 'sine';
  bellOsc.frequency.setValueAtTime(bellNote, now + 0.1);

  bellGain.gain.setValueAtTime(0.001, now + 0.1);
  bellGain.gain.linearRampToValueAtTime(0.035, now + 0.18);
  bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

  bellOsc.connect(bellGain);
  bellGain.connect(filter);

  bellOsc.start(now + 0.1);
  bellOsc.stop(now + 1.3);

  filter.connect(bgmGainNode);
}

/**
 * Start or resume procedural chill background music
 */
export function startBGM(volume = 0.25): boolean {
  const ctx = getAudioContext();
  if (!ctx) return false;

  if (isBgmPlaying) return true;

  // Create dedicated master gain for BGM
  bgmGainNode = ctx.createGain();
  bgmGainNode.gain.setValueAtTime(0.001, ctx.currentTime);
  bgmGainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + 1.5); // 1.5s gentle fade in
  bgmGainNode.connect(ctx.destination);

  isBgmPlaying = true;
  currentBgmStep = 0;

  // Play immediately
  const stepDuration = 2.6; // seconds per chord
  const chord = CHILL_PROGRESSION[currentBgmStep % CHILL_PROGRESSION.length];
  playWarmChillChord(chord, stepDuration + 0.4);

  // Interval for continuous looping
  bgmInterval = setInterval(() => {
    if (!isBgmPlaying) return;
    currentBgmStep = (currentBgmStep + 1) % CHILL_PROGRESSION.length;
    const nextChord = CHILL_PROGRESSION[currentBgmStep];
    playWarmChillChord(nextChord, stepDuration + 0.4);
  }, stepDuration * 1000);

  return true;
}

/**
 * Stop procedural chill background music with gentle fade-out
 */
export function stopBGM(): void {
  if (bgmInterval) {
    clearInterval(bgmInterval);
    bgmInterval = null;
  }

  if (bgmGainNode && audioCtx) {
    try {
      const now = audioCtx.currentTime;
      bgmGainNode.gain.setValueAtTime(bgmGainNode.gain.value, now);
      bgmGainNode.gain.linearRampToValueAtTime(0.0001, now + 0.6); // 600ms fade out
      setTimeout(() => {
        bgmGainNode?.disconnect();
        bgmGainNode = null;
      }, 700);
    } catch {
      // Safe fallback
      bgmGainNode = null;
    }
  }

  isBgmPlaying = false;
}

/**
 * Set BGM volume dynamically (between 0.05 and 0.5)
 */
export function setBgmVolume(volume: number) {
  if (bgmGainNode && audioCtx) {
    bgmGainNode.gain.setValueAtTime(
      Math.max(0.05, Math.min(0.5, volume)),
      audioCtx.currentTime
    );
  }
}

/**
 * Check if BGM is currently running
 */
export function getIsBgmPlaying(): boolean {
  return isBgmPlaying;
}
