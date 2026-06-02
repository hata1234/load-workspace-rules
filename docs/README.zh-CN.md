# Load Workspace Rules

Load Workspace Rules 是一个 OpenClaw internal hook，用于在 agent bootstrap 时加载指定的 workspace markdown rule files。

当 workspace 的重要规则不在内建 bootstrap filename allowlist 内时，这个 hook 会很有用。

## 用途

- 加载 `SECURITY.md` 这类 security 或 policy files
- 加载 `STYLE.md` 这类 style 或 behavior guides
- 让 workspace-specific rules 进入 main agent bootstrap context

## 配置

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

## 安全设计

- 只接受 workspace-relative paths
- 拒绝 absolute paths
- 拒绝 `..` path traversal
- 缺文件或不可读时跳过
- 替换同名已加载 bootstrap file，避免重复

## 限制

Subagent bootstrap behavior 可能有额外 filter。必须始终应用到 subagent 的规则，也应放在 subagent 已经会加载的文件中。

## 许可证

MIT. See [LICENSE](../LICENSE).
