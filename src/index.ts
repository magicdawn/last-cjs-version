/* eslint-disable @typescript-eslint/no-explicit-any */

import { commandSync } from 'execa'
import got from 'got'
import ProxyAgent from 'proxy-agent'
import { PackageJson } from 'type-fest'

const agent = new ProxyAgent()
const request = got.extend({
  agent: { http: agent, https: agent },
  timeout: 30e3,
})

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
      const vb = a.split('.').map((v) => Number(v))

      if (va[0] > vb[0]) return -1
      if (va[1] > vb[1]) return -1
      if (va[2] > vb[2]) return -1

      return 1
    })

  // console.log(versionsArr)

  for (const v of versionsArr) {
    const meta = versions[v]
    if (meta.type === 'module') continue
    return v
  }

  return versionsArr.at(-1)
}
