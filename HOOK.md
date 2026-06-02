---
name: load-workspace-rules
description: "Load additional workspace markdown files that the built-in basename whitelist rejects."
metadata:
  {
    "openclaw":
      {
        "emoji": "📜",
        "events": ["agent:bootstrap"]
      }
  }
---

# Load Workspace Rules

Extends the bundled `bootstrap-extra-files` behavior by loading configured workspace-root markdown files directly into `context.bootstrapFiles`.

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

Paths must be workspace-relative. Absolute paths and `..` traversal are rejected.
