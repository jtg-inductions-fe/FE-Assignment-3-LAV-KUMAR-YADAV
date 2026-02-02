import tsconfigPaths from 'vite-tsconfig-paths';
import type { Plugin } from 'vitest/config';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    plugins: [tsconfigPaths() as Plugin],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './src/vitest.setup.ts',
        coverage: {
            enabled: true,
        },
    },
});
