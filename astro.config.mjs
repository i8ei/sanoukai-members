import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://i8ei.github.io',
  base: '/sanoukai-members',
  integrations: [tailwind()],
});
