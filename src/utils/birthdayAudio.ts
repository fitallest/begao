// Web Audio API based synthesized gentle music box melodies
// Independent of external network mp3s, works 100% offline and cross-browser.

type Note = {
  freq: number;
  dur: number; // in beats
};

// Frequencies for notes
const N: Record<string, number> = {
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  F4: 349.23,
  G4: 392.0,
  A4: 440.0,
  B4: 493.88,
  C5: 523.25,
  D5: 587.33,
  E5: 659.25,
  F5: 698.46,
  G5: 783.99,
  A5: 880.0,
  B5: 987.77,
  C6: 1046.5,
  REST: 0,
};

// Happy Birthday melody
const happyBirthdayNotes: Note[] = [
  { freq: N.C4, dur: 0.75 },
  { freq: N.C4, dur: 0.25 },
  { freq: N.D4, dur: 1 },
  { freq: N.C4, dur: 1 },
  { freq: N.F4, dur: 1 },
  { freq: N.E4, dur: 2 },

  { freq: N.C4, dur: 0.75 },
  { freq: N.C4, dur: 0.25 },
  { freq: N.D4, dur: 1 },
  { freq: N.C4, dur: 1 },
  { freq: N.G4, dur: 1 },
  { freq: N.F4, dur: 2 },

  { freq: N.C4, dur: 0.75 },
  { freq: N.C4, dur: 0.25 },
  { freq: N.C5, dur: 1 },
  { freq: N.A4, dur: 1 },
  { freq: N.F4, dur: 1 },
  { freq: N.E4, dur: 1 },
  { freq: N.D4, dur: 1.5 },

  { freq: N.B4, dur: 0.75 },
  { freq: N.B4, dur: 0.25 },
  { freq: N.A4, dur: 1 },
  { freq: N.F4, dur: 1 },
  { freq: N.G4, dur: 1 },
  { freq: N.F4, dur: 2 },
  { freq: N.REST, dur: 1 },
];

// Twinkle Twinkle Little Star
const twinkleNotes: Note[] = [
  { freq: N.C4, dur: 1 }, { freq: N.C4, dur: 1 }, { freq: N.G4, dur: 1 }, { freq: N.G4, dur: 1 },
  { freq: N.A4, dur: 1 }, { freq: N.A4, dur: 1 }, { freq: N.G4, dur: 2 },
  { freq: N.F4, dur: 1 }, { freq: N.F4, dur: 1 }, { freq: N.E4, dur: 1 }, { freq: N.E4, dur: 1 },
  { freq: N.D4, dur: 1 }, { freq: N.D4, dur: 1 }, { freq: N.C4, dur: 2 },
  { freq: N.G4, dur: 1 }, { freq: N.G4, dur: 1 }, { freq: N.F4, dur: 1 }, { freq: N.F4, dur: 1 },
  { freq: N.E4, dur: 1 }, { freq: N.E4, dur: 1 }, { freq: N.D4, dur: 2 },
  { freq: N.REST, dur: 1 },
];

export class BirthdayMusicBox {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timerId: number | null = null;
  private currentNoteIndex = 0;
  private tempo = 110; // BPM
  private volume = 0.25;
  private currentSong: 'birthday' | 'twinkle' = 'birthday';

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
  }

  public getVolume() {
    return this.volume;
  }

  public setSong(song: 'birthday' | 'twinkle') {
    this.currentSong = song;
    this.currentNoteIndex = 0;
  }

  public getSong() {
    return this.currentSong;
  }

  public getIsPlaying() {
    return this.isPlaying;
  }

  public play() {
    this.initContext();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.scheduleNextNote();
  }

  public pause() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  private playTone(freq: number, duration: number) {
    if (!this.ctx || freq <= 0 || this.volume <= 0) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // Music box character: sine + harmonic overtone
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Warm low-pass filter
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1800, this.ctx.currentTime);

      // Bell-like envelope (fast attack, gentle chime decay)
      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(this.volume, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + Math.max(0.1, duration * 0.95));

      // Gentle secondary shimmer chime
      const shimmerOsc = this.ctx.createOscillator();
      const shimmerGain = this.ctx.createGain();
      shimmerOsc.type = 'triangle';
      shimmerOsc.frequency.setValueAtTime(freq * 2, now);
      shimmerGain.gain.setValueAtTime(0.0001, now);
      shimmerGain.gain.exponentialRampToValueAtTime(this.volume * 0.35, now + 0.015);
      shimmerGain.gain.exponentialRampToValueAtTime(0.0001, now + Math.max(0.08, duration * 0.6));

      osc.connect(gain);
      gain.connect(filter);

      shimmerOsc.connect(shimmerGain);
      shimmerGain.connect(filter);

      filter.connect(this.ctx.destination);

      osc.start(now);
      shimmerOsc.start(now);
      osc.stop(now + duration);
      shimmerOsc.stop(now + duration);
    } catch {
      // Audio context may be closed or suspended
    }
  }

  private scheduleNextNote() {
    if (!this.isPlaying) return;

    const notes = this.currentSong === 'birthday' ? happyBirthdayNotes : twinkleNotes;
    const note = notes[this.currentNoteIndex];
    const beatDuration = 60 / this.tempo;
    const noteTime = note.dur * beatDuration;

    if (note.freq > 0) {
      this.playTone(note.freq, noteTime);
    }

    this.currentNoteIndex = (this.currentNoteIndex + 1) % notes.length;

    this.timerId = window.setTimeout(() => {
      this.scheduleNextNote();
    }, noteTime * 1000);
  }
}

export const birthdayAudio = new BirthdayMusicBox();
