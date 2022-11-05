import yargs from 'yargs'
import lastCjsVersion from './index'

yargs
  .command(
    '$0 <pkg>',
    'get last cjs version of package',
    (yargs) => {
      return yargs
        .positional('pkg', {
          description: 'package name',
          type: 'string',
        })
        .option('major', {
          alias: 'm',
          description: 'major version only',
          type: 'boolean',
          default: false,
        })
    },
    async (argv) => {
      const name = argv.pkg
      let v = await lastCjsVersion(name)

      if (argv.major) {
        v = v.split('.')[0]
      }

      console.log(v)
    }
  )
  .alias({ h: 'help', v: 'version' })

  .help().argv
