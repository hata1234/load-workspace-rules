# Load Workspace Rules

OpenClaw hook that loads additional workspace rule files such as `SECURITY.md`, `IRONRULES.md`, and `STYLE.md` during agent bootstrap.

Languages: [繁體中文](#繁體中文) | [English](#english) | [简体中文](#简体中文) | [日本語](#日本語) | [한국어](#한국어)

## 繁體中文

### 用途

Load Workspace Rules 是一個 OpenClaw internal hook，用來載入 OpenClaw 內建 bootstrap allowlist 沒有涵蓋的 workspace markdown 檔案。

常見用途：

- `SECURITY.md`: 安全規則
- `IRONRULES.md`: 不可違反的操作鐵律
- `STYLE.md`: 回覆風格
- 其他你希望 main agent 在啟動時讀到的 workspace rule files

### 為什麼需要

OpenClaw 內建的 bootstrap-extra-files 會限制可載入檔名。某些重要規則檔即使列在 config 裡，也可能因 basename whitelist 被丟掉。

這個 hook 會在 `agent:bootstrap` 時讀取指定的 workspace-relative files，並直接加入 `context.bootstrapFiles`。

### 設定

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

### 安全設計

- 只接受 workspace-relative paths
- 拒絕 absolute paths
- 拒絕 `..` path traversal
- 缺檔或讀不到時靜默略過
- 會替換同名已載入 bootstrap file，避免重複

### 限制

Subagent sessions 可能有另一層 hardcoded bootstrap filter，只允許特定檔案，例如 `AGENTS.md` 和 `TOOLS.md`。因此這個 hook 主要保護 main session。Subagent 必須遵守的規則，仍應放在 `AGENTS.md` 或 `TOOLS.md`。

## English

### Purpose

Load Workspace Rules is an OpenClaw internal hook that loads workspace markdown rule files not covered by the built-in bootstrap allowlist.

Typical files:

- `SECURITY.md`: safety rules
- `IRONRULES.md`: hard operational rules
- `STYLE.md`: response style
- other workspace rule files that should be visible to the main agent

### Why It Exists

OpenClaw's bundled bootstrap-extra-files path can reject files by basename allowlist. This hook reads configured workspace-relative files during `agent:bootstrap` and pushes them into `context.bootstrapFiles`.

### Configuration

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

### Safety

- Accepts only workspace-relative paths
- Rejects absolute paths
- Rejects `..` path traversal
- Silently skips missing or unreadable files
- Replaces already-loaded bootstrap files with the same name

### Limitation

Subagent sessions may have a separate hardcoded bootstrap filter. Rules that subagents must follow should still live in `AGENTS.md` or `TOOLS.md`.

## 简体中文

### 用途

Load Workspace Rules 是一个 OpenClaw internal hook，用来加载内建 bootstrap allowlist 没覆盖的 workspace markdown 规则文件。

常见文件：

- `SECURITY.md`: 安全规则
- `IRONRULES.md`: 操作铁律
- `STYLE.md`: 回复风格
- 其他希望 main agent 启动时读到的规则文件

### 配置

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

### 安全设计

只接受 workspace-relative paths，拒绝 absolute paths 和 `..` path traversal。缺失或不可读的文件会静默跳过。

### 限制

Subagent sessions 可能还有另一层 hardcoded bootstrap filter。Subagent 必须遵守的规则仍应放在 `AGENTS.md` 或 `TOOLS.md`。

## 日本語

### 目的

Load Workspace Rules は、OpenClaw の built-in bootstrap allowlist に含まれない workspace markdown rule files を読み込む internal hook です。

代表的なファイル:

- `SECURITY.md`: 安全ルール
- `IRONRULES.md`: 操作上の絶対ルール
- `STYLE.md`: 応答スタイル
- main agent に起動時から見せたいその他の rule files

### 設定

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

### 安全設計

workspace-relative paths のみを受け付け、absolute paths と `..` path traversal は拒否します。存在しない、または読めないファイルは静かにスキップします。

### 制限

Subagent sessions には別の hardcoded bootstrap filter が存在する場合があります。Subagent が必ず従うべきルールは `AGENTS.md` または `TOOLS.md` に置いてください。

## 한국어

### 목적

Load Workspace Rules는 OpenClaw의 built-in bootstrap allowlist에 포함되지 않는 workspace markdown rule files를 읽어오는 internal hook입니다.

대표 파일:

- `SECURITY.md`: 안전 규칙
- `IRONRULES.md`: 반드시 지켜야 하는 운영 규칙
- `STYLE.md`: 응답 스타일
- main agent가 시작 시점에 읽어야 하는 기타 rule files

### 설정

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

### 안전 설계

workspace-relative paths만 허용하며 absolute paths와 `..` path traversal을 거부합니다. 파일이 없거나 읽을 수 없으면 조용히 건너뜁니다.

### 제한

Subagent sessions에는 별도의 hardcoded bootstrap filter가 있을 수 있습니다. Subagent가 반드시 따라야 하는 규칙은 `AGENTS.md` 또는 `TOOLS.md`에 넣어야 합니다.
