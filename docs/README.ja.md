# Load Workspace Rules

Load Workspace Rules は、agent bootstrap 時に設定された workspace markdown rule files を読み込む OpenClaw internal hook です。

Built-in bootstrap filename allowlist に含まれない重要な workspace rules を扱う場合に便利です。

## Use Cases

- `SECURITY.md` などの security または policy files を読み込む
- `STYLE.md` などの style または behavior guides を読み込む
- workspace-specific rules を main agent bootstrap context に入れる

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

- workspace-relative paths のみ受け付けます
- absolute paths を拒否します
- `..` path traversal を拒否します
- missing or unreadable files はスキップします
- 同名の loaded bootstrap file を置き換え、重複を避けます

## Limitations

Subagent bootstrap behavior には追加の filters がある場合があります。Subagent に必ず適用する rules は、その subagent が既に読み込む files にも置いてください。

## License

MIT. See [LICENSE](../LICENSE).
