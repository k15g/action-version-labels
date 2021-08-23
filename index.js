"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core = require("@actions/core");
const strftime = require("strftime");
const { GITHUB_REF } = process.env;
const match = process.env['INPUT_MATCH'] || '^refs/tags/v';
const prefixes = core.getInput('prefix') != '' ? [core.getInput('prefix').toUpperCase()] : [];
var timestamp = new Date(new Date().getTime() + (new Date().getTimezoneOffset() * 60 * 1000));
var values = {
    timestamp: strftime(process.env['INPUT_TIMESTAMP_PATTERN'] || '%Y%m%d%H%M%Sz', timestamp)
};
handle('CHANNEL', 'edge', '^refs/tags/v([0-9]+)\..+$', 'v$1');
handle('LABEL', 'dev', '^refs/tags/(.+)$', '$1');
handle('VERSION', 'dev-%timestamp%', '^refs/tags/v(.+)$', '$1');
function handle(label, default_value, default_regex, default_replace) {
    var value = process.env[`INPUT_${label}_DEFAULT`] || default_value;
    var regex = process.env[`INPUT_${label}_REGEX`] || default_regex;
    var replace = process.env[`INPUT_${label}_REPLACE`] || default_replace;
    if (GITHUB_REF.match(new RegExp(match)))
        value = GITHUB_REF.replace(new RegExp(regex), replace);
    value = value_replaces(value);
    core.exportVariable([...prefixes, label].join('_'), value);
    return value;
}
function value_replaces(value) {
    Object.entries(values).forEach(entry => {
        value = value.replace(`%${entry[0]}%`, entry[1]);
    });
    return value;
}
