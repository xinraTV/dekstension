import { cpSync, readFileSync, writeFileSync } from 'fs'

cpSync('src/icons', 'dist/icons', { force: true, recursive: true })

const packageJson = JSON.parse(readFileSync('package.json'))
const manifest = readFileSync('src/manifest.json', 'utf-8')
const processedManifest = manifest.replace(/__VERSION__/g, packageJson.version)
writeFileSync('dist/manifest.json', processedManifest)
