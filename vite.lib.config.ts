import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'node:path';

// Library build — produces the dist/ output consumed by other apps as a
// local package dependency (npm `file:` install). Run with:
//   npm run build:lib
export default defineConfig({
  plugins: [
    react(),
    dts({
      entryRoot: 'src',
      tsconfigPath: './tsconfig.app.json',
      include: ['src/components/**/*.ts', 'src/components/**/*.tsx', 'src/index.ts'],
      exclude: ['src/components/**/*.stories.tsx', 'src/components/**/*.test.tsx', 'src/components/**/*.test.ts'],
      insertTypesEntry: true,
      rollupTypes: false,
    }),
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    cssCodeSplit: false,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'SakaniDesignSystem',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', 'recharts', 'lucide-react'],
      output: {
        preserveModules: false,
        assetFileNames: (info) => (info.name === 'style.css' ? 'style.css' : (info.name ?? 'assets/[name][extname]')),
      },
    },
  },
});
