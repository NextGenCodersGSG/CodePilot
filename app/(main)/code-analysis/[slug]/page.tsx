"use client";
import { useSidebar } from "@/providers/SidebarContext";
import React, { useEffect, useState } from "react";

interface IParams {
  params: Promise<{ slug: string }>;
}

const Page = ({ params }: IParams) => {
  const { sidebarProjects } = useSidebar();
  const [slug, setSlug] = useState<string | null>(null);

  useEffect(() => {
    params.then((resolvedParams) => {
      setSlug(resolvedParams.slug);
    });
  }, [params]);
  console.log(sidebarProjects);
  

  

  return (
    <div>
      {slug}
    </div>
  );
};

export default Page;
