#!/usr/bin/env python3
import os
from datetime import datetime, timezone
from pathlib import Path

root = Path(__file__).resolve().parents[1]
changelog = root / "CHANGELOG.md"

sha = os.getenv("GITHUB_SHA", "")[:7]
msg = os.getenv("GITHUB_EVENT_HEAD_COMMIT_MESSAGE", "").strip()
actor = os.getenv("GITHUB_ACTOR", "github-actions")

if not msg:
    msg = os.getenv("COMMIT_MSG", "update")

stamp = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
line = f"- {stamp} | {sha} | {actor} | {msg}"

if changelog.exists():
    txt = changelog.read_text()
else:
    txt = "# CHANGELOG\n\n"

if sha and sha in txt:
    print("already recorded")
    raise SystemExit(0)

if "# CHANGELOG" not in txt:
    txt = "# CHANGELOG\n\n" + txt

txt = txt.rstrip() + "\n" + line + "\n"
changelog.write_text(txt)
print("changelog updated")
