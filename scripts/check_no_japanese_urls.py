#!/usr/bin/env python3
import re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"
if not DIST.exists():
    print("SKIP: dist not found. run npm run build first")
    sys.exit(0)

bad = []
for p in DIST.rglob("*.html"):
    rel = p.relative_to(DIST).as_posix()
    if "/members/" in rel and re.search(r"[\u3040-\u30ff\u4e00-\u9fff]", rel):
        bad.append(rel)

if bad:
    print("FAILED: Japanese paths found in dist")
    for b in bad[:50]:
        print(" -", b)
    sys.exit(2)

print("OK: no Japanese member URLs in dist")
