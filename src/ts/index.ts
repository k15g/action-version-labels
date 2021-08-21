import * as core from '@actions/core'
import * as strftime from 'strftime'

const { GITHUB_REF } = process.env

// Get timestamp
var timestamp = new Date(new Date().getTime() + (new Date().getTimezoneOffset() * 60 * 1000))

// Set default
var channel = process.env['default_channel'] || 'edge'
var label = process.env['default_label'] || 'dev'
var version = process.env['default_version'] || `dev-${strftime('%Y%m%d%H%M%Sz', timestamp)}`

// Handle when a tag is referenced
if (GITHUB_REF.startsWith('refs/tags/v')) {
    channel = GITHUB_REF.replace('refs/tags/', '').replace(/\.\d+/g, '')
    version = GITHUB_REF.replace('refs/tags/v', '')
    label = GITHUB_REF.replace('refs/tags/', '')
}

// Publish identifiers
core.exportVariable('CHANNEL', channel)
core.exportVariable('LABEL', label)
core.exportVariable('VERSION', version)
