// https://github.com/stevancorre/psychowiki-bot/blob/30381d2389/tsup.config.dev.ts
// https://jsmanifest.com/create-a-modern-typescript-javascript-library/
import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['src/index.ts'],
	format: ['cjs', 'esm'],
	dts: true,
	splitting: true,
	clean: true,
	sourcemap: true,
	onSuccess: 'node dist/index.js'
});
