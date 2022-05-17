import { Spec } from "./types";

export const specs: Spec[] = [
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
]