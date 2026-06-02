# Load Workspace Rules

Load Workspace Rules is an OpenClaw internal hook that loads configured workspace markdown rule files during agent bootstrap.

It is useful when a workspace keeps important rules outside the built-in bootstrap filename allowlist.

## Documentation

- English: this file
- Traditional Chinese: [docs/README.zh-TW.md](docs/README.zh-TW.md)
- Simplified Chinese: [docs/README.zh-CN.md](docs/README.zh-CN.md)
- Japanese: [docs/README.ja.md](docs/README.ja.md)
- Korean: [docs/README.ko.md](docs/README.ko.md)

## Use Cases

- Loading security or policy files such as `SECURITY.md`
- Loading style or behavior guides such as `STYLE.md`
- Keeping workspace-specific rules visible to the main agent bootstrap context

## Configuration

```json
{
  "hooks": {
    "internal": {
      "entries": {
        "load-workspace-rules": {
          "enabled": true,
          "paths": ["SECURITY.md", "IRONRULES.md", "STYLE.md"]
        }
      }
    }
  }
}
```

## Safety

- Accepts only workspace-relative paths
- Rejects absolute paths
- Rejects `..` path traversal
- Skips missing or unreadable files
- Replaces already-loaded bootstrap files with the same name to avoid duplication

## Limitations

Subagent bootstrap behavior may have additional filters outside this hook. Rules that must always apply to subagents should also live in files those subagents already load.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT. See [LICENSE](LICENSE).
