import path from "node:path";
import fs from "node:fs/promises";

const HOOK_KEY = "load-workspace-rules";
const DEFAULT_PATHS = ["SECURITY.md", "IRONRULES.md", "STYLE.md"];

function normalizeStringArray(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((v) => (typeof v === "string" ? v.trim() : ""))
    .filter(Boolean);
}

function resolveHookConfig(cfg, key) {
  const entries = cfg?.hooks?.internal?.entries;
  if (!entries || typeof entries !== "object") return null;
  const entry = entries[key];
  if (!entry || typeof entry !== "object") return null;
  return entry;
}

function resolvePaths(hookConfig) {
  const fromConfig = normalizeStringArray(hookConfig?.paths);
  return fromConfig.length > 0 ? fromConfig : DEFAULT_PATHS;
}

function isSafeRelativePath(rel, workspaceDir) {
  if (rel.includes("..") || path.isAbsolute(rel)) return false;
  const resolved = path.resolve(workspaceDir, rel);
  const resolvedRoot = path.resolve(workspaceDir);
  return (
    resolved === resolvedRoot ||
    resolved.startsWith(resolvedRoot + path.sep)
  );
}

const handler = async (event) => {
  if (event?.type !== "agent" || event?.action !== "bootstrap") return;
  const ctx = event.context;
  if (!ctx || typeof ctx.workspaceDir !== "string") return;
  if (!Array.isArray(ctx.bootstrapFiles)) return;

  const hookConfig = resolveHookConfig(ctx.cfg, HOOK_KEY);
  if (hookConfig?.enabled === false) return;

  const paths = resolvePaths(hookConfig);

  for (const rel of paths) {
    if (!isSafeRelativePath(rel, ctx.workspaceDir)) continue;
    const filePath = path.join(ctx.workspaceDir, rel);
    const name = path.basename(rel);
    try {
      const content = await fs.readFile(filePath, "utf-8");
      const before = ctx.bootstrapFiles.length;
      ctx.bootstrapFiles = ctx.bootstrapFiles.filter(
        (file) => file?.path !== filePath && file?.name !== name,
      );
      const removed = before - ctx.bootstrapFiles.length;
      ctx.bootstrapFiles.push({
        name,
        path: filePath,
        content,
        missing: false,
      });
      console.log(
        `[${HOOK_KEY}] pushed ${name} (${filePath})${removed ? `, replaced ${removed} existing entr${removed === 1 ? "y" : "ies"}` : ""}`,
      );
    } catch {
      // Missing or unreadable files are optional workspace context.
    }
  }
};

export default handler;
