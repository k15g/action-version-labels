import * as core from '@actions/core'
import * as strftime from 'strftime'

const { GITHUB_REF } = process.env
const match = process.env['INPUT_MATCH'] || '^refs/tags/v'
const prefixes = core.getInput('prefix') != '' ? [core.getInput('prefix').toUpperCase()] : []

// Get timestamp
var timestamp = new Date(new Date().getTime() + (new Date().getTimezoneOffset() * 60 * 1000))

// Prepare values
var values = {
    timestamp: strftime(process.env['INPUT_TIMESTAMP_PATTERN'] || '%Y%m%d%H%M%Sz', timestamp)
}

// Trigger
handle('CHANNEL', 'edge', '^refs/tags/v([0-9]+)\..+$', 'v$1')
handle('LABEL', 'dev', '^refs/tags/(.+)$', '$1')
handle('VERSION', 'dev-%timestamp%', '^refs/tags/v(.+)$', '$1')


function handle(label: string, default_value: string, default_regex: string, default_replace: string) {
    // Set default
    var value = process.env[`INPUT_${label}_DEFAULT`] || default_value
    var regex = process.env[`INPUT_${label}_REGEX`] || default_regex
    var replace = process.env[`INPUT_${label}_REPLACE`] || default_replace

    // Potentially perform replace
    if (GITHUB_REF.match(new RegExp(match)))
        value = GITHUB_REF.replace(new RegExp(regex), replace)

    // Replace 
    value = value_replaces(value)

    // Publish identifier
    core.exportVariable([...prefixes, label].join('_'), value)

    return value
}

function value_replaces(value: string): string {
    Object.entries(values).forEach(entry => {
        value = value.replace(`%${entry[0]}%`, entry[1])
    });

    return value
}