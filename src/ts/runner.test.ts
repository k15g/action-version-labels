import { run } from './runner'

test('Testing defaults', () => {
    var result = run({
        GITHUB_REF: 'refs/heads/main',
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

test('Return \'latest\' as channel for custom configuration', () => {
    var result = run({
        GITHUB_REF: 'refs/tags/22.1.0-b1',
        INPUT_CHANNEL_REPLACE: 'latest',
        INPUT_CHANNEL_REGEX: '.*',
        INPUT_MATCH: '^refs/tags/',
        INPUT_VERSION_REGEX: '^refs/tags/(.+)$',
        INPUT_LABEL_REGEX: '^refs/tags/([0-9]+\.[0-9]+)\..+',
    })

    expect(result['CHANNEL']).toBe('latest')
    expect(result['LABEL']).toBe('22.1')
    expect(result['VERSION']).toBe('22.1.0-b1')
})