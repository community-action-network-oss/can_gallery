// Badge (D-80): a plain, server-rendered label. The word always carries the meaning; colour only supports it.
// Square 2px corners. No react-native-web, no client JS.
import React from 'react';
import { tva } from '@gluestack-ui/utils/nativewind-utils';

const badgeStyle = tva({
  base: 'inline-block rounded-sm px-2 text-sm font-semibold leading-6 whitespace-nowrap align-middle',
  variants: {
    tone: {
      planned: 'bg-[var(--can-status-paused-bg)] text-[color:var(--can-status-paused-fg)]',
      fictional: 'bg-[var(--can-status-transitional-bg)] text-[color:var(--can-status-transitional-fg)]',
    },
  },
});

export function Badge({ tone, className, children }: { tone: 'planned' | 'fictional'; className?: string; children: React.ReactNode }) {
  return <span className={badgeStyle({ tone, class: className })}>{children}</span>;
}
