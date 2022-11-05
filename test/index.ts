import 'should'
import lastCjsVersion from '../src'

describe('basic test', () => {
  it('it works', async () => {
    ;(await lastCjsVersion('execa'))?.should.startWith('5.')
    ;(await lastCjsVersion('got'))?.should.startWith('11.')
  })
})
