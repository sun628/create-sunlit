## Scaffolding Your First Vite Project

> **Compatibility Note:**
> Vite requires [Node.js](https://nodejs.org/en/) version 18+, 20+. However, some templates require a higher Node.js version to work, please upgrade if your package manager warns about it.

With NPM:

```bash
$ npm create sunlit@latest
```

With Yarn:

```bash
$ yarn create sunlit
```

With PNPM:

```bash
$ pnpm create sunlit
```

Then follow the prompts!

You can also directly specify the project name and the template you want to use via additional command line options. For example, to scaffold a Vite + Vue project, run:

```bash
# npm 7+, extra double-dash is needed:
npm create sunlit@latest my-vue-app -

# yarn
yarn create sunlit my-vue-app

# pnpm
pnpm create sunlit my-vue-app


Currently supported template presets include:

- `vue3-ts-base`
- `vue3-ts-map`

You can use `.` for the project name to scaffold in the current directory.
```
