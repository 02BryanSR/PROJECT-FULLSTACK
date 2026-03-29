export interface NavigationLink {
  label: string;
  route: string;
}

export const PRIMARY_NAV_LINKS: readonly NavigationLink[] = [
  { label: 'HOME', route: '/home' },
  { label: 'WOMEN', route: '/women' },
  { label: 'MEN', route: '/men' },
  { label: 'NI\u00D1OS', route: '/ninos' },
  { label: 'NI\u00D1AS', route: '/ninas' },
  { label: 'ACCESSORIES', route: '/accessories' },
];

export const HIDDEN_LAYOUT_ROUTES = ['/login', '/register', '/forgot-password'] as const;
