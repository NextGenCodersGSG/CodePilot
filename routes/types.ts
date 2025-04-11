import { UserRoles } from "@/@types"
import routeAccess from "./pageAccessRights";

export type PageAccessName =
  | "/"
  | "/sign-in"
  | "/sign-up"
  | "/code-analysis"
  | "/dashboard"
  | "/add-developers"
  | "/forbidden"
  | "/unauthorized"
  | "/already-signed-in"
;
export const protectedRoutes: PageAccessName[] = Array.from(routeAccess.keys());

export interface PageAccessRight {
  roles: UserRoles[];
}

export interface RouteConfigs {
  pageAccessName: PageAccessName;
}