"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core = require("@actions/core");
const strftime = require("strftime");
const { GITHUB_REF } = process.env;
var timestamp = new Date(new Date().getTime() + (new Date().getTimezoneOffset() * 60 * 1000));
var channel = process.env['default_channel'] || 'edge';
var label = process.env['default_label'] || 'dev';
var version = process.env['default_version'] || `dev-${strftime('%Y%m%d%H%M%Sz', timestamp)}`;
if (GITHUB_REF.startsWith('refs/tags/v')) {
    channel = GITHUB_REF.replace('refs/tags/', '').replace(/\.\d+/g, '');
    version = GITHUB_REF.replace('refs/tags/v', '');
    label = GITHUB_REF.replace('refs/tags/', '');
}
core.exportVariable('CHANNEL', channel);
core.exportVariable('LABEL', label);
core.exportVariable('VERSION', version);
