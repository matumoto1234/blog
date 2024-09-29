import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin'
const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Outputs a Single-Page Application (SPA).
  distDir: './dist', // Changes the build output directory to `./dist/`.
}

export default withVanillaExtract(nextConfig)
