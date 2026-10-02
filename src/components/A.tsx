import type { ComponentProps } from "react";

/**
 * Plain anchor used instead of next/link (06-u09): the site is a static export that works without JS,
 * and next/link ships a client chunk (about 7 KB gz) on every page just for prefetch and soft navigation.
 */
export default function A(props: ComponentProps<"a">) {
  return <a {...props} />;
}
