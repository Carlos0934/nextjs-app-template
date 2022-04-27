import { PlaywrightTestConfig } from '@playwright/test'
const config: PlaywrightTestConfig = {
  use: {
    headless: true,
  },
  testMatch: ['e2e/**/*.spec.tsx'],
}
export default config
