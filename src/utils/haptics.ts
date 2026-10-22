/**
 * Mobile Haptic & Micro-interaction feedback helper
 * Uses Web Vibration API and synthesized subtle Web Audio click feedback
 * for high-performance native-feeling touch events.
 */

let audioCtx: AudioContext | null = null;

export function triggerHaptic(type: 'light' | 'medium' | 'success' | 'selection' = 'light') {
  // 1. Hardware vibration on supported mobile devices
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    try {
      if (type === 'light') {
        navigator.vibrate(8);
      } else if (type === 'medium') {
        navigator.vibrate(16);
      } else if (type === 'success') {
        navigator.vibrate([12, 40, 20]);
      } else if (type === 'selection') {
        navigator.vibrate(6);
      }
    } catch {
      // Silently ignore if blocked by browser policy
    }
  }

  // 2. Synthesized acoustic click (subtle high-frequency tick for immediate tactile confirmation)
  try {
    if (typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        if (!audioCtx) {
          audioCtx = new AudioContextClass();
        }
        if (audioCtx.state === 'suspended') {
          audioCtx.resume();
        }
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        
        const freq = type === 'success' ? 880 : type === 'medium' ? 440 : 620;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        
        gain.gain.setValueAtTime(0.015, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.04);
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.start();
        osc.stop(audioCtx.currentTime + 0.04);
      }
    }
  } catch {
    // Ignore audio failures
  }
}
