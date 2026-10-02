// Web variant (D-80): a hairline rule, ink-coloured, no react-native-web.
import React from 'react';
import { tva } from '@gluestack-ui/utils/nativewind-utils';

const dividerStyle = tva({ base: 'm-0 border-0 bg-outline-200', variants: { orientation: { horizontal: 'h-px w-full', vertical: 'h-full w-px' } }, defaultVariants: { orientation: 'horizontal' } });

export function Divider({ orientation, className }: { orientation?: 'horizontal' | 'vertical'; className?: string }) {
  return <hr aria-hidden="true" className={dividerStyle({ orientation, class: className })} />;
}
