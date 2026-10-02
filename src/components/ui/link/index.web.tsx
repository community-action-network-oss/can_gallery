// Web variant (D-80): a plain anchor through next/link, no react-native-web, no client JS of its own.
// The native source in ./index.tsx stays for a future native target.
import React from 'react';
import NextLink from '../../A';
import { tva } from '@gluestack-ui/utils/nativewind-utils';

const linkStyle = tva({
  base: 'underline underline-offset-4 decoration-1 text-primary-600 dark:text-primary-500 hover:decoration-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
  variants: {
    // quiet: navigation links, underline only on hover
    quiet: { true: 'inline-flex items-center min-h-11 px-2 text-typography-950 decoration-transparent hover:decoration-current hover:text-primary-600' },
  },
});

type Props = Omit<React.ComponentProps<typeof NextLink>, 'href'> & { href: string; quiet?: boolean };

const Link = React.forwardRef<HTMLAnchorElement, Props>(function Link({ className, quiet, href, ...props }, ref) {
  const cls = linkStyle({ quiet: !!quiet, class: className as string });
  // external or hash-only targets are plain anchors; internal routes use next/link
  if (/^(https?:|#|mailto:)/.test(href)) return <a ref={ref} href={href} className={cls} {...(props as object)} />;
  return <NextLink ref={ref} href={href} className={cls} {...props} />;
});
Link.displayName = 'Link';
export { Link };
