/* eslint-disable @typescript-eslint/no-explicit-any */

import { assert } from 'console'
import { commandSync } from 'execa'
import got from 'got'
import preferredPM from 'preferred-pm'
import ProxyAgent from 'proxy-agent'
import { PackageJson } from 'type-fest'
import { formatCmd } from './utils'

type PackageManager = 'pnpm' | 'yarn' | 'npm'

const agent = new ProxyAgent()
const request = got.extend({
  agent: { http: agent, https: agent },
  timeout: 30e3,
})

export default lastCjsVersion

export async function lastCjsVersion(pkg: string) {
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

export async function execInstallCommand(packages: Record<string, string>, major: boolean) {
  assert(Object.keys(packages).length > 0)

  const pkgDefs = []
  for (const [pkg, version] of Object.entries(packages)) {
    const versionPart = major ? majorVersionOf(version) : `^${version}`
    const pkgDef = `${pkg}@${versionPart}`
    pkgDefs.push(pkgDef)
  }

  const pkgDefStr = pkgDefs.join(' ')
  const cmds: Record<PackageManager, string> = {
    pnpm: `pnpm add ${pkgDefStr}`,
    yarn: `yarn add ${pkgDefStr}`,
    npm: `npm install ${pkgDefStr}`,
  }

  // decide package manager
  const found: PackageManager = (await preferredPM(process.cwd()))?.name || 'npm'
  const cmd = cmds[found]

  console.log('[last-cjs-version] detected package manager: %s', found)
  console.log(formatCmd(cmd))

  commandSync(cmd, { stdio: 'inherit' })
}
