import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'node:path';

// Library build — produces the dist/ output published to npm as
// @sakaniui/react. Run with:
//   npm run build:lib
//
// Two entry points, published as two subpaths:
//   .        -> src/index.ts   (stable, fully-configurable components)
//   ./glass-icons -> src/glass-icons/index.ts (glass versions of the icon set)
//   ./sicons      -> src/sicons/index.ts (Sakani's own icon set: Line and Solid)
//   ./blocks -> src/blocks/index.ts (copy-paste composition examples --
//     kept out of the main entry so importing them is an explicit,
//     separate choice, matching how they're already split out in Storybook)
export default defineConfig({
  plugins: [
    react(),
    dts({
      entryRoot: 'src',
      tsconfigPath: './tsconfig.app.json',
      include: [
        'src/components/**/*.ts', 'src/components/**/*.tsx', 'src/index.ts',
        'src/blocks/**/*.ts', 'src/blocks/**/*.tsx',
        'src/glass-icons/**/*.ts', 'src/glass-icons/**/*.tsx',
        'src/sicons/**/*.ts', 'src/sicons/**/*.tsx',
      ],
      exclude: [
        'src/components/**/*.stories.tsx', 'src/components/**/*.test.tsx', 'src/components/**/*.test.ts',
        'src/blocks/**/*.stories.tsx', 'src/blocks/**/*.test.tsx', 'src/blocks/**/*.test.ts',
        // Experimental/broken alternate file, not part of the real
        // blocks/index.ts export graph -- see ChatInterfaceBlock/index.ts.
        'src/blocks/**/*-simple.tsx', 'src/blocks/**/*.backup',
      ],
      insertTypesEntry: true,
      rollupTypes: false,
    }),
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    cssCodeSplit: false,
    lib: {
      entry: {
        index: path.resolve(__dirname, 'src/index.ts'),
        blocks: path.resolve(__dirname, 'src/blocks/index.ts'),
        // 1,626 generated icon modules: a separate entry so the main bundle
        // doesn't carry them, and each export is pure so apps keep only the
        // icons they import.
        'glass-icons': path.resolve(__dirname, 'src/glass-icons/index.ts'),
        sicons: path.resolve(__dirname, 'src/sicons/index.ts'),
      },
      name: 'SakaniDesignSystem',
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => `${entryName}.${format === 'es' ? 'mjs' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', 'recharts', 'lucide-react'],
      output: {
        preserveModules: false,
        // Was a fallback to info.name, which Vite derives from
        // package.json's "name" field by default -- so the emitted CSS
        // filename silently changed (sakani-design-system.css -> react.css)
        // the moment the package was renamed to @sakaniui/react, breaking
        // package.json's exports["./style.css"] pointer. Forced to a fixed
        // name for CSS specifically; everything else (the JPG avatars a few
        // blocks import directly) keeps its own hashed name instead of also
        // being swept into "style.css".
        assetFileNames: (info) => {
          const name = info.name ?? (info as { names?: string[] }).names?.[0] ?? '';
          return name.endsWith('.css') ? 'style.css' : 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
});
