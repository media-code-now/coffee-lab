"use client";

import { useMDXComponent } from "next-contentlayer/hooks";
import type { MDXComponents } from "mdx/types";
import { Callout, InlineCallout } from "@/components/Callouts";
import OpenImage from "@/components/OpenImage";

const defaultComponents: MDXComponents = {
  Callout,
  InlineCallout,
  OpenImage
};

export function MDXContent({
  code,
  components
}: {
  code: string;
  components?: MDXComponents;
}) {
  const Component = useMDXComponent(code);

  return (
    <Component
      components={{
        ...defaultComponents,
        ...components
      }}
    />
  );
}
