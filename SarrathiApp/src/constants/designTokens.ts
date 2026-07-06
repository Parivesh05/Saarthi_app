/**
 * uBudy Design Tokens
 * Centralized design system values - colors, gradients, typography, shadows, spacing
 */

export const Colors = {
  // Backgrounds
  appBg: '#EBE8F5',              // Base background (soft lavender)
  appBgGradientStart: '#F0EEF9', // Gradient start (lighter)
  appBgGradientEnd: '#E8E5F3',   // Gradient end (slightly deeper)
  appBgChat: '#F5F5FA',

  // Input Fields
  inputBorder: '#F5F3FA',          // Very subtle border
  inputBorderFocus: '#D4CEED',     // Slightly visible on focus
  inputBg: '#FAFAFA',              // Very light background
  inputBgFocus: '#FFFFFF',         // Clean white on focus

  // Text
  ink: '#211E37',
  ink2: '#4A4763',
  muted: '#8A8AA0',
  muted2: '#9A97AE',
  faint: '#A6A6BC',
  faint2: '#B0AEC2',
  faint3: '#B8B6C8',

  // UI Elements
  card: '#FFFFFF',
  hairline: '#F0EEF7',
  hairline2: '#EFEDF7',
  hairline3: '#ECEAF5',
  pillBg: '#EEEBFA',
  pillText: '#6A5AE0',

  // Accents
  purple: '#6A5AE0',
  blue: '#4A90E2',
  gradientMid: '#5B7CE4',

  // Moods
  moodGreat: '#22B573',
  moodGreatBg: '#E4F6EE',
  moodGood: '#3E8BEE',
  moodGoodBg: '#E6F0FD',
  moodOkay: '#F5A623',
  moodOkayBg: '#FDF1DE',
  moodBad: '#EF5B5B',
  moodBadBg: '#FCE7E7',
  moodAwful: '#E84B8A',
  moodAwfulBg: '#FBE7F0',

  // Other
  streakFlame: '#F5813A',
  streakEmpty: '#F3D9C6',
  success: '#22B573',

  // AI Navy
  aiNavy1: '#141D39',
  aiNavy2: '#1E2A4E',
  aiNavy3: '#2A3A66',
  aiWhiteBtn: '#182140',

  // Team / About
  navy: '#1A2340',
  amber: '#E0902C',

  // Danger
  danger: '#EF5B5B',
  dangerBg: '#FCE7E7',
} as const;

export const Gradients = {
  primaryHero: ['#6A5AE0', '#5B7CE4', '#4A90E2'] as const,
  primaryButton: ['#6A5AE0', '#4A90E2'] as const,
  progress: ['#6A5AE0', '#4A90E2'] as const,
  fab: ['#6A5AE0', '#4A90E2'] as const,
  aiNavy: ['#141D39', '#1E2A4E', '#2A3A66'] as const,
  premiumBadge: ['#F5A623', '#F5813A'] as const,
} as const;

export const Typography = {
  // Font families (platform-specific)
  fredoka: 'Fredoka',
  nunito: 'Nunito',

  // Sizes
  screenTitle: 27,
  bigHeroNumber: 50,
  bigHeroPercent: 22,
  sectionHeading: 18,
  cardTitle: 18,
  cardTitleSmall: 16,
  prompt: 19,
  body: 14,
  bodySm: 13,
  small: 11,
  tag: 11,
  tabLabel: 10.5,
  statusBar: 14,

  // Weights
  w400: '400' as const,
  w600: '600' as const,
  w700: '700' as const,
  w800: '800' as const,

  // Line heights
  relaxed: 1.6,
  comfortable: 1.5,
  normal: 1.4,
} as const;

export const Radii = {
  phoneFrame: 46,
  card: 22,
  cardLg: 24,
  cardXl: 26,
  chip: 12,
  pill: 20,
  button: 16,
  buttonLg: 18,
  buttonXl: 20,
  iconTile: 12,
  iconTileSm: 11,
  iconTileLg: 13,
} as const;

export const Shadows = {
  softCard: {
    shadowColor: '#3C3278',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 20,
    elevation: 4,
  },
  raisedCard: {
    shadowColor: '#3C3278',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 28,
    elevation: 6,
  },
  frame: {
    shadowColor: '#3C3278',
    shadowOpacity: 0.20,
    shadowOffset: { width: 0, height: 34 },
    shadowRadius: 80,
    elevation: 12,
  },
  primaryButton: {
    shadowColor: '#6A5AE0',
    shadowOpacity: 0.34,
    shadowOffset: { width: 0, height: 16 },
    shadowRadius: 32,
    elevation: 8,
  },
  hero: {
    shadowColor: '#6A5AE0',
    shadowOpacity: 0.34,
    shadowOffset: { width: 0, height: 20 },
    shadowRadius: 44,
    elevation: 11,
  },
  fab: {
    shadowColor: '#6A5AE0',
    shadowOpacity: 0.42,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 24,
    elevation: 10,
  },
  aiCard: {
    shadowColor: '#121A36',
    shadowOpacity: 0.44,
    shadowOffset: { width: 0, height: 16 },
    shadowRadius: 34,
    elevation: 11,
  },
  toggleActive: {
    shadowColor: '#3C3278',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 3,
  },
  // Premium enhanced shadows
  floating: {
    shadowColor: '#3C3278',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 24 },
    shadowRadius: 48,
    elevation: 10,
  },
  glow: {
    shadowColor: '#6A5AE0',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 28,
    elevation: 9,
  },
  deepElevation: {
    shadowColor: '#1A1A2E',
    shadowOpacity: 0.22,
    shadowOffset: { width: 0, height: 32 },
    shadowRadius: 64,
    elevation: 15,
  },
} as const;

export const Spacing = {
  sectionGap: 20,
  sectionGapSm: 18,
  contentPadHorizontal: 22,
  contentPadTop: 14,
  contentPadTopSm: 8,
  cardPadding: 20,
  cardPaddingSm: 16,
  cardPaddingLg: 24,
} as const;

export const Heights = {
  statusBar: 46,
  tabBar: 86,
  tabBarChat: 82,
  primaryButton: 58,
  primaryButtonLg: 62,
  secondaryButton: 48,
  secondaryButtonLg: 56,
  input: 56,
  inputLg: 58,
  fabButton: 58,
} as const;

export const Sizes = {
  phoneWidth: 384,
  phoneHeightAuth: 832,
} as const;
