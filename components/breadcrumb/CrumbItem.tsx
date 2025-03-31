"use client";
import React, { useEffect, useState } from "react";
import {
  BreadcrumbSeparator,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbLink
} from "../ui/breadcrumb";
import { usePathname } from "next/navigation";

const CrumbItem = () => {
  const pathname = usePathname();
  const [crumbs, setCrumbs] = useState<Array<{ name: string; path: string }>>(
    []
  );

  useEffect(() => {
    const paths = pathname.split("/").filter((p) => p);

    const crumbsArray = paths.map((path, index) => {
      const formattedName = path
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

      const href = `/${paths.slice(0, index + 1).join("/")}`;

      return { name: formattedName, path: href };
    });

    setCrumbs(crumbsArray);
  }, [pathname]);

  if (crumbs.length === 0) return null;

  return (
    <>
      {crumbs.map((crumb, index) => {
        const isLast = index === crumbs.length - 1;

        return (
          <React.Fragment key={crumb.path}>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              {isLast ? (
                <BreadcrumbPage>{crumb.name}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={crumb.path}>{crumb.name}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        );
      })}
    </>
  );
};

export default CrumbItem;
