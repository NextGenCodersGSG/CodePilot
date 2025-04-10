import { Role } from "@/@types";
import { PageAccessName, PageAccessRight } from "./types";

const routeAccess = new Map<PageAccessName, PageAccessRight>([
  [
    "/code-analysis",
    {
      roles: [Role.User],
    },
  ],
  [
    "/dashboard",
    {
      roles: [Role.Admin],
    },
  ],
]);

export default routeAccess;