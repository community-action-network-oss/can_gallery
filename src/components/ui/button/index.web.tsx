// Web variant (D-80): a link-shaped button in the gallery world: solid cobalt, square 2px corners, no shadow.
// Native Button (Pressable) stays in ./index.tsx.
import React from 'react';
import NextLink from 'next/link';
import { tva } from '@gluestack-ui/utils/nativewind-utils';

const buttonStyle = tva({
  base: 'inline-flex items-center justify-center min-h-11 px-5 rounded-sm border-2 font-semibold no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
  variants: {
    variant: {
      solid: 'bg-primary-500 border-primary-500 text-typography-0 hover:bg-typography-950 hover:border-typography-950 hover:text-background-0',
      quiet: 'bg-transparent border-primary-500 text-primary-600 hover:bg-background-50',
    },
  },
  defaultVariants: { variant: 'solid' },
});

type Props = Omit<React.ComponentProps<typeof NextLink>, 'href'> & { href: string; variant?: 'solid' | 'quiet' };

export function ButtonLink({ href, variant, className, ...props }: Props) {
  return <NextLink href={href} className={buttonStyle({ variant, class: className as string })} {...props} />;
}
