export interface NavigationLink {
  label: string;
  route: string;
}

export const PRIMARY_NAV_LINKS: readonly NavigationLink[] = [
  { label: 'HOME', route: '/home' },
  { label: 'WOMEN', route: '/women' },
  { label: 'MEN', route: '/men' },
  { label: 'KIDS', route: '/kids' },
  { label: 'ACCESSORIES', route: '/accessories' },
];

export const HIDDEN_LAYOUT_ROUTES = ['/login', '/register', '/forgot-password'] as const;
