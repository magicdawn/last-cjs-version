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
        .alias({ h: 'help', v: 'version' })
    },
    async (argv) => {
      const name = argv.pkg
      const v = await lastCjsVersion(name)
      console.log(v)
    }
  )
  .help().argv
