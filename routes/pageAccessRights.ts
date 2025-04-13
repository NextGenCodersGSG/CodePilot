import { Role } from "@/@types";
import { PageAccessName, PageAccessRight } from "./types";

const routeAccess = new Map<PageAccessName, PageAccessRight>([
  [
    "/code-analysis",
    {
      roles: [Role.User, Role.Developer],
    },
  ],
  [
    "/dashboard",
    {
      roles: [Role.Admin],
    },
  ],
  [
    "/add-developers",
    {
      roles: [Role.Admin],
    },
  ],
]);

export default routeAccess;