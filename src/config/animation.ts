export const animationConfig = {
  smoothness: '0.3s',
};

export function updateSmoothness(value: string) {
  document.documentElement.style.setProperty('--smoothness', value);
}

// Initialize smoothness on app load
if (typeof document !== 'undefined') {
  updateSmoothness(animationConfig.smoothness);
}
