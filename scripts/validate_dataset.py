#!/usr/bin/env python3
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data" / "members.generated.json"
if not DATA.exists():
    DATA = ROOT.parent / "members.generated.json"

if not DATA.exists():
    print(f"ERROR: missing {DATA}")
    sys.exit(1)

obj = json.loads(DATA.read_text())
members = obj.get("members", [])

if not isinstance(members, list):
    print("FAILED: members is not a list")
    sys.exit(2)

id_re = re.compile(r"^[a-z0-9-]+$")
ids = {}
errors = []

for idx, m in enumerate(members, start=1):
    if not isinstance(m, dict):
        errors.append(f"row {idx}: member is not an object")
        continue

    name = str(m.get("name") or "").strip()
    mid = str(m.get("id") or "").strip()

    if not name:
        errors.append(f"row {idx}: missing name")
    if not mid:
        errors.append(f"row {idx}: missing id ({name or 'no-name'})")
        continue

    if not id_re.fullmatch(mid):
        errors.append(f"row {idx}: non-ascii id -> {mid}")
    if mid in ids:
        errors.append(f"row {idx}: duplicate id {mid} ({ids[mid]} / {name or 'no-name'})")
    else:
        ids[mid] = name or f"row-{idx}"

    area = m.get("area")
    if area is not None and not isinstance(area, dict):
        errors.append(f"row {idx}: area must be object or null")
    if isinstance(area, dict):
        code = area.get("code")
        if code is not None and str(code).strip() == "":
            errors.append(f"row {idx}: area.code is empty")

    website = (m.get("web_presence") or {}).get("website") if isinstance(m.get("web_presence"), dict) else None
    if website:
        w = str(website).strip()
        if not re.match(r"^https?://[A-Za-z0-9.-]+(?:/.*)?$", w):
            errors.append(f"row {idx}: invalid website format -> {w}")

    products = m.get("products")
    if products is not None and not isinstance(products, list):
        errors.append(f"row {idx}: products must be list or null")

print(f"members={len(members)} ids={len(ids)}")
if errors:
    print("FAILED:")
    for e in errors:
        print(" -", e)
    sys.exit(2)
print("OK: dataset schema + id integrity")
