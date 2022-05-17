import { run } from './runner'

test('Testing defaults', () => {
    var result = run({
        GITHUB_REF: 'main',
    })

    expect(result['CHANNEL']).toBe('edge')
    expect(result['LABEL']).toBe('dev')
})

test('Testing release', () => {
    var result = run({
        GITHUB_REF: 'refs/tags/v1.2.3',
    })

    expect(result['CHANNEL']).toBe('v1')
    expect(result['LABEL']).toBe('v1.2.3')
    expect(result['VERSION']).toBe('1.2.3')
})

test('Return \'latest\' as channel', () => {
    var result = run({
        GITHUB_REF: 'refs/tags/v1.2.3',
        INPUT_CHANNEL_REPLACE: 'latest',
    })

    expect(result['CHANNEL']).toBe('latest')
    expect(result['LABEL']).toBe('v1.2.3')
    expect(result['VERSION']).toBe('1.2.3')
})