// Gallery-owned (D-80). The theme lives in src/app/globals.css as CSS variables switched by
// prefers-color-scheme, so it works without JavaScript and without a flash. Nothing is injected at runtime.
// The generated overlay and toast providers are left out until a component needs them.
import React from 'react';

export function GluestackUIProvider({ children }: { children?: React.ReactNode }) {
  return <>{children}</>;
}
// Note: every other file in src/components/ui carries a per-file `@jsxImportSource nativewind` pragma
// (needed for className on react-native views). It is per file, not in tsconfig, so pages that do not
// import a gluestack component pay no JavaScript for it. This provider stays pragma-free on purpose.
