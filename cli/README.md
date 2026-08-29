# @sakaniui/cli

Copies a [Sakani](https://github.com/samzydd/Sakani-design-system) **Block**'s
source files into your own project, the same way you'd copy them by hand
from GitHub.

This is **not** how you install components (Button, Input, Sidebar, ...) —
those come from `npm install @sakaniui/react` and stay a real managed
dependency, so token updates and re-theming keep working everywhere. Blocks
are different on purpose: they're composition examples meant to be copied
and edited, so this CLI just automates that copy.

## Usage

```bash
# List every available block
npx @sakaniui/cli list

# Copy one into ./src/blocks/<BlockName>
npx @sakaniui/cli add data-table-block

# Copy into a custom folder instead
npx @sakaniui/cli add data-table-block --dir components/data-table
```

Requires [`@sakaniui/react`](https://www.npmjs.com/package/@sakaniui/react)
to already be installed in your project — every block imports its pieces
(`Button`, `Input`, ...) from it. If it's missing, `add` will tell you.

Once a block is copied, it's yours — edit it however you like. Nothing
about it stays connected back to this CLI or to future Sakani releases.
