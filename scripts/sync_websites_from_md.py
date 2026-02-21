#!/usr/bin/env python3
"""
Sync official website URLs from data/会員情報/*.md into data/members.generated.json.
Only explicit official-site lines are considered; unknowns are left untouched.
"""
import json, re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data" / "members.generated.json"
if not DATA.exists():
    DATA = ROOT.parent / "members.generated.json"
MDROOT = ROOT / "data" / "会員情報"
if not MDROOT.exists():
    MDROOT = ROOT.parent / "会員情報"

obj = json.loads(DATA.read_text())
name_to_site = {}

for md in MDROOT.glob("*/*.md"):
    txt = md.read_text(errors="ignore")
    line = ""
    for l in txt.splitlines():
        if "公式Webサイト" in l or "公式サイト" in l:
            line = l
            break
    if not line or "なし" in line:
        continue
    m = re.search(r"((?:https?://)?(?:www\.)?[A-Za-z0-9.-]+\.(?:co\.jp|com|jp|net|org))", line)
    if not m:
        continue
    host = m.group(1)
    host = re.sub(r"^https?://", "", host).strip("（）()、。.,")
    site = f"https://{host}"
    name_to_site[md.stem] = site

updated = 0
for mem in obj.get("members", []):
    n = mem.get("name")
    if n in name_to_site:
        mem.setdefault("web_presence", {})["website"] = name_to_site[n]
        updated += 1

DATA.write_text(json.dumps(obj, ensure_ascii=False, indent=2))
print(f"updated={updated}")
