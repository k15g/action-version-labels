"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const core = require("@actions/core");
const strftime = require("strftime");
const specs_1 = require("./specs");
function run(env) {
    if (!('GITHUB_REF' in env)) {
        core.setFailed('Unable to find environment variable \'GITHUB_REF\'.');
        return {};
    }
    const { GITHUB_REF } = env;
    const match = env['INPUT_MATCH'] || '^refs/tags/v';
    core.info(`Received reference '${GITHUB_REF}'`);
    const matches = GITHUB_REF.match(new RegExp(match));
    if (!matches)
        core.info(`Using default values`);
    var timestamp = new Date(new Date().getTime() + (new Date().getTimezoneOffset() * 60 * 1000));
    var values = {
        timestamp: strftime(env['INPUT_TIMESTAMP_PATTERN'] || '%Y%m%d%H%M%Sz', timestamp)
    };
    var prefixes = 'INPUT_PREFIX' in env ? [env['INPUT_PREFIX'].toUpperCase()] : [];
    var result = {};
    specs_1.specs.forEach(({ label, value, regex, replace }) => {
        value = env[`INPUT_${label}_DEFAULT`] || value;
        regex = env[`INPUT_${label}_REGEX`] || regex;
        replace = env[`INPUT_${label}_REPLACE`] || replace;
        if (matches)
            value = GITHUB_REF.replace(new RegExp(regex), replace);
        Object.entries(values).forEach(entry => {
            value = value.replace(`%${entry[0]}%`, entry[1]);
        });
        var export_label = [...prefixes, label].join('_');
        core.exportVariable(export_label, value);
        core.info(`Setting ${export_label} to '${value}'`);
        result[label] = value;
    });
    return result;
}
exports.run = run;
