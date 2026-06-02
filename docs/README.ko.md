# Load Workspace Rules

Load Workspace Rules는 agent bootstrap 시 설정된 workspace markdown rule files를 읽어오는 OpenClaw internal hook입니다.

Built-in bootstrap filename allowlist에 포함되지 않는 중요한 workspace rules를 다룰 때 유용합니다.

## Use Cases

- `SECURITY.md` 같은 security 또는 policy files 로드
- `STYLE.md` 같은 style 또는 behavior guides 로드
- workspace-specific rules를 main agent bootstrap context에 포함

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

- workspace-relative paths만 허용합니다
- absolute paths를 거부합니다
- `..` path traversal을 거부합니다
- missing or unreadable files는 건너뜁니다
- 같은 이름의 loaded bootstrap file을 교체해 중복을 피합니다

## Limitations

Subagent bootstrap behavior에는 추가 filters가 있을 수 있습니다. Subagent에 반드시 적용되어야 하는 rules는 해당 subagent가 이미 로드하는 files에도 두어야 합니다.

## License

MIT. See [LICENSE](../LICENSE).
