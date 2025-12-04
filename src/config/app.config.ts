// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  ENDPOINTS: {
    TASKS: '/tasks',
  },
} as const;

// UI Configuration
export const UI_CONFIG = {
  ANIMATIONS: {
    TRANSITION_FAST: 'transition-all duration-200 ease-out',
    TRANSITION_NORMAL: 'transition-all duration-300 ease-in-out',
    TRANSITION_SLOW: 'transition-all duration-500 ease-in-out',
  },
  GLASS_MORPHISM: {
    BACKDROP: 'backdrop-blur-xl bg-white/15 dark:bg-white/10',
    BORDER: 'border border-white/25 dark:border-white/15',
  },
} as const;
