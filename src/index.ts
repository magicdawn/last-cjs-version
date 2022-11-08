/* eslint-disable @typescript-eslint/no-explicit-any */

import { commandSync } from 'execa'
import got from 'got'
import ProxyAgent from 'proxy-agent'
import { PackageJson } from 'type-fest'
import preferredPM from 'preferred-pm'
import { type PackageManager } from '@lerepo/detect-package-manager' // detect function is broken, see https://github.com/lerepo/workspace-tools/issues/1

const agent = new ProxyAgent()
const request = got.extend({
  agent: { http: agent, https: agent },
  timeout: 30e3,
})

export default async function lastCjsVersion(pkg: string) {
  let registry = 'https://registry.npmjs.org'
  const configedRegistry = commandSync('npm config get registry')
  if (configedRegistry.stdout.trim()) {
    registry = configedRegistry.stdout.trim()
  }

  if (!registry.endsWith('/')) registry += '/'
  const url = `${registry}${pkg}`

  const json = await request.get(url).json()
  const versions = (json as any).versions as Record<string, PackageJson>

  const versionsArr = Object.keys(versions)
    .filter((v) => /^\d+\.\d+\.\d+$/.test(v))
    .sort((a, b) => {
      const va = a.split('.').map((v) => Number(v))
      const vb = b.split('.').map((v) => Number(v))

      if (va[0] > vb[0]) return -1
      if (va[0] === vb[0] && va[1] > vb[1]) return -1
      if (va[0] === vb[0] && va[1] === vb[1] && va[2] > vb[2]) return -1

      return 1
    })
  // console.log(url, versionsArr)

  for (const v of versionsArr) {
    const meta = versions[v]
    if (meta.type === 'module') continue
    return v
  }

  return versionsArr.at(-1)
}

export function majorVersionOf(version: string) {
  return version.split('.')?.[0] ?? ''
}

export async function execInstallCommand(pkg: string, version: string, major: boolean) {
  const versionPart = major ? majorVersionOf(version) : `^${version}`
  const pkgDef = `${pkg}@${versionPart}`

  const cmds: Record<PackageManager, string> = {
    pnpm: `pnpm add ${pkgDef}`,
    yarn: `yarn add ${pkgDef}`,
    npm: `npm install ${pkgDef}`,
  }

  // decide package manager
  const found: PackageManager = (await preferredPM(process.cwd()))?.name || 'npm'
  const cmd = cmds[found]
  console.log('[last-cjs-version] detected package manager: %s', found)
  console.log('[last-cjs-version] executing: %s\n', cmd)
  commandSync(cmd, { stdio: 'inherit' })
}
