// constants/routes.ts
export const ADMIN_ROUTES = ['/admin'];

export const isAdminRoute = (pathname: string) => {
  return ADMIN_ROUTES.some(route => pathname.startsWith(route));
};