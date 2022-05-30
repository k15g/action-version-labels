import * as core from '@actions/core'
import * as strftime from 'strftime'
import { specs } from './specs'
import { strMap } from './types'

export function run(env: strMap): strMap {
    // Make sure variable 'GITHUB_REF' is present
    if (!('GITHUB_REF' in env)) {
        core.setFailed('Unable to find environment variable \'GITHUB_REF\'.')
        return {}
    }

    const { GITHUB_REF } = env
    const match = env['INPUT_MATCH'] || '^refs/tags/v'

    core.info(`Received reference '${GITHUB_REF}'`)

    // Check ref matches
    const matches = GITHUB_REF.match(new RegExp(match))

    if (!matches)
        core.info(`Using default values`)

    // Get timestamp
    var timestamp = new Date(new Date().getTime() + (new Date().getTimezoneOffset() * 60 * 1000))

    // Prepare values
    var values = {
        timestamp: strftime(env['INPUT_TIMESTAMP_PATTERN'] || '%Y%m%d%H%M%Sz', timestamp)
    }

    // Detect prefix
    var prefixes = ('INPUT_PREFIX' in env && env['INPUT_PREFIX'] != '') ? [env['INPUT_PREFIX'].toUpperCase()] : []

    // Prepare result to return
    var result: strMap = {}

    specs.forEach(({ label, value, regex, replace }) => {
        // Update spec based on inputs
        value = env[`INPUT_${label}_DEFAULT`] || value
        regex = env[`INPUT_${label}_REGEX`] || regex
        replace = env[`INPUT_${label}_REPLACE`] || replace

        // Trigger
        if (matches)
            value = GITHUB_REF.replace(new RegExp(regex), replace)

        // Replace 
        Object.entries(values).forEach(entry => {
            value = value.replace(`%${entry[0]}%`, entry[1])
        });

        // Define export label
        var export_label = [...prefixes, label].join('_')

        // Publish identifier
        core.exportVariable(export_label, value)
        core.info(`Setting ${export_label} to '${value}'`)

        // Save result
        result[label] = value
    })

    // Return result
    return result
}