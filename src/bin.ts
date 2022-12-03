import yargs from 'yargs'
import lastCjsVersion, { execInstallCommand, majorVersionOf } from './index'

yargs
  .help()
  .alias({ h: 'help', v: 'version' })
  .option('major', {
    alias: 'm',
    description: 'major version only',
    type: 'boolean',
    default: false,
  })
  .command(
    '$0 <pkg>',
    'get last cjs version of package',
    (yargs) => {
      return yargs.positional('pkg', {
        description: 'package name',
        type: 'string',
      })
    },
    async (argv) => {
      const name = argv.pkg
      let v = await lastCjsVersion(name)
      if (argv.major) {
        v = majorVersionOf(v)
      }

      console.log(v)
    }
  )
  .command(
    'add <pkg..>',
    'add/install pkg',
    (yargs) =>
      yargs.alias({ install: 'add' }).array('pkg').positional('pkg', {
        array: true,
        type: 'string',
        description: 'package identifier to install',
      }),
    async (argv) => {
      const names = argv.pkg
      const versions = await Promise.all(names.map((name) => lastCjsVersion(name)))
      const packages = names.reduce((packages, name, index) => {
        packages[name] = versions[index]
        return packages
      }, {})

      return execInstallCommand(packages, argv.major)
    }
  ).argv
