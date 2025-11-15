export const animationConfig = {
  smoothness: '0.3s',
  pulseDuration: '2s',
  pulseEnabled: true,
};

export function updateSmoothness(value: string) {
  document.documentElement.style.setProperty('--smoothness', value);
}

export function updatePulseDuration(value: string) {
  document.documentElement.style.setProperty('--pulse-duration', value);
}

export function initializeAnimationConfig() {
  updateSmoothness(animationConfig.smoothness);
  updatePulseDuration(animationConfig.pulseDuration);
}

// Initialize config on app load
if (typeof document !== 'undefined') {
  initializeAnimationConfig();
}
