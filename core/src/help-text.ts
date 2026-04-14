/** Full help for `do help` / empty invocation — VA1 pure TypeScript (locked). */
export const VA1_HELP = `do — uDos VA1 (Pure TypeScript)

Usage:
  do <command> [options]

VAULT:
  do init                 Initialize vault
  do list                 List vault contents
  do open <file>          Open in $EDITOR
  do edit <file>          Edit in terminal
  do delete <file>        Move to .compost/
  do restore <id>         Restore from compost
  do search <query>       Search vault

MARKDOWN:
  do md format <file>     Format markdown
  do md lint <file>       Check syntax
  do md toc <file>        Generate table of contents

FRONTMATTER:
  do fm add <file> --tag <tag>   Add frontmatter tag
  do fm list <file>       List frontmatter fields
  do fm edit <file>       Edit frontmatter

TEMPLATES:
  do template list        List templates
  do template apply <name> Apply template
  do template show <name> Show template

FEEDS (read-only):
  do feed list            List feed sources
  do feed view <name>     View feed items
  do feed export <name>   Export as JSON

SPOOLS:
  do spool list           List spools
  do spool info <name>    Show metadata
  do spool extract <name> Extract contents

PUBLISHING:
  do publish build        Build static site
  do publish preview      Preview locally
  do publish status       Show status
  do publish deploy       Deploy to GitHub Pages only (gh-pages)

GITHUB:
  do github clone <repo>  Clone vault/repo from GitHub
  do github pull          Pull from origin
  do github push          Commit + push local changes
  do github status        Git status summary
  do github sync          Pull then push
  do github fork [repo]   Fork repo with gh
  do github release <tag> Create GitHub release
  do github configure     Save github defaults
  do issue create --title <t> [--body]
  do issue list [--limit]
  do pr create [--title|--body|--base]
  do pr list [--limit]
  do pr checkout <id>
  do pr review <id>
  do pr approve <id>
  do pr merge <id>
  do submit [path] [--target code|docs]
  do review [path] [--target code|docs] [--pr <id>]
  do approve [path] [--target code|docs] [--pr <id>]
  do wp sync|publish|review (A1 stubs)

SYNC:
  do sync status          WP cloud sync status (stub; Universe/uDos.space)
  do sync pull            WP cloud pull (stub; Universe/uDos.space)
  do sync push            WP cloud push (stub; Universe/uDos.space)

WORKFLOW:
  do workflow list
  do workflow create <name> --step 'action'
  do workflow run <name>
  do workflow schedule <name> --cron '0 2 * * *'
  do workflow status <name>
  do workflow logs <name>
  do workflow webhook add <name> --url <url>
  do workflow webhook list
  do workflow queue list

A2 SERVER / BRIDGE:
  do a2 configure --url <url> [--api-key]
  do a2 status
  do a2 server start|stop|status|logs
  do a2 server configure --port 8080
  do workflow server start|status
  do beacon scan

USXD:
  do usxd list            List theme packs (templates/usxd/)
  do usxd apply <name>    Apply theme to vault
  do usxd show            Show active theme
  do usxd serve [--file|--dir] [--port]   USXD-Express preview (live reload)
  do usxd export [--file|--dir] -o <dir> [--format html|png]
                           Export markdown surfaces (png is [A2 stub])
  do usxd render <file> [--mode] Terminal render from markdown surface
  do usxd edit [file]     Preview (prefers ~/vault/surfaces)
  do usxd validate <file> Validate usxd + optional grid fences in .md

GRID (OBF — see docs/specs/obf-grid-spec.md):
  do grid render <file> [--mode]   Render grid (ANSI)
  do grid export <file> --format ascii|obf|…
  do grid validate <file>          Check dimensions
  do grid edit <file>              Open in $EDITOR (creates stub if missing)
  do grid resize <file> --size WxH Resize grid
  do grid rotate <file> --degrees 90|180|270
  do grid flip <file> [--horizontal|--vertical]
  do grid layer add <file> --name <name>
  do grid layer list <file>
  do grid layer show <file> --layer <index>
  do grid layer merge <file> --layers 0,1,2

OBF UI BLOCKS:
  do obf render <file>             Render obf CARD/COLUMNS blocks to terminal

FONT:
  do font install [retro] Download/cache bundle (CDN or cdn/fonts/seed/)
  do font list            List cache + active font
  do font activate <name> Set active font for publish preview/build
  do font preview <name>  Cache path + teletext strip (terminal)

UTILITY:
  do status               System status
  do doctor               Health check
  do cleanup              Clean cache
  do version              Show version
  do tour                 Quickstart walkthrough
  do update               Rebuild / relink via sonic-express
  do uninstall            Remove global do (see --delete-vault)
  do help                 Show this help

VA2 adds: uCode execution, TUI, uCoin, device scanning, 3D worlds, AR portals, trading, multiplayer.
`;
