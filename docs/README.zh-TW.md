# Load Workspace Rules

Load Workspace Rules 是一個 OpenClaw internal hook，用於在 agent bootstrap 時載入指定的 workspace markdown rule files。

當 workspace 的重要規則不在內建 bootstrap filename allowlist 內時，這個 hook 會很有用。

## 用途

- 載入 `SECURITY.md` 這類 security 或 policy files
- 載入 `STYLE.md` 這類 style 或 behavior guides
- 讓 workspace-specific rules 進入 main agent bootstrap context

## 設定

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

## 安全設計

- 只接受 workspace-relative paths
- 拒絕 absolute paths
- 拒絕 `..` path traversal
- 缺檔或讀不到時略過
- 替換同名已載入 bootstrap file，避免重複

## 限制

Subagent bootstrap behavior 可能有額外 filter。必須永遠套用到 subagent 的規則，也應放在 subagent 已經會載入的檔案中。

## 授權

MIT. See [LICENSE](../LICENSE).
