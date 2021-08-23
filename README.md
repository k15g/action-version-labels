# Action: Version labels

```yaml
- name: Prepare version labels
  uses: k15g/action-version-labels@v1
```


## Inputs


### `match`(optional)

```yaml
- name: Prepare version labels
  uses: k15g/action-version-labels@v1
  with:
    match: ^refs/tags/v # default
```


### `prefix`(optional)

```yaml
- name: Prepare version labels
  uses: k15g/action-version-labels@v1
  with:
    prefix: project
```


### `timestamp_*` (optional)


### `channel_*` (optional)

```yaml
- name: Prepare version labels
  uses: k15g/action-version-labels@v1
  with:
    channel_default: edge # default
    channel_regex: ^refs/tags/v([0-9]+)\..+$ # default
    channel_replace: v$1 # default
```


### `label_*` (optional)

```yaml
- name: Prepare version labels
  uses: k15g/action-version-labels@v1
  with:
    label_default: dev # default
    label_regex: ^refs/tags/(.+)$ # default
    label_replace: $1 # default
```


### `version_*` (optional)

```yaml
- name: Prepare version labels
  uses: k15g/action-version-labels@v1
  with:
    version_default: dev-%timestamp% # default
    version_regex: ^refs/tags/v(.+)$ # default
    version_replace: $1 # default
```