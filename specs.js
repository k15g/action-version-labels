"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.specs = void 0;
exports.specs = [
    {
        label: 'CHANNEL',
        value: 'edge',
        regex: '^refs/tags/v([0-9]+)\..+$',
        replace: 'v$1',
    },
    {
        label: 'LABEL',
        value: 'dev',
        regex: '^refs/tags/(.+)$',
        replace: '$1'
    },
    {
        label: 'VERSION',
        value: 'dev-%timestamp%',
        regex: '^refs/tags/v(.+)$',
        replace: '$1'
    }
];
