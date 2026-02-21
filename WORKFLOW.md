# Workflow (Mac / Ubuntu / OpenClaw)

## Single source of truth
- `main`: source of truth (edit here)
- `gh-pages`: deploy artifact only (do not edit directly)

## Daily flow
1. `git switch main && git pull --rebase`
2. `git switch -c <env>/<task>` (ex: `mac/top-copy-fix`)
3. edit files
4. `npm run verify`
5. commit/push
6. PR to `main`
7. deploy `main` to `gh-pages`

## Safety checks
- IDs must be ASCII slug (`a-z0-9-`)
- No Japanese member URLs in dist
- Keep `data/会員情報/*.md` + `data/members.generated.json` in sync
