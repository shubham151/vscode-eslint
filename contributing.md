# VSCode ESLint

[![Build Status](https://travis-ci.org/Microsoft/vscode-eslint.svg?branch=master)](https://travis-ci.org/Microsoft/vscode-eslint)

Extension to integrate [ESLint](http://eslint.org/) into VS Code.

## Development setup
- Use git with symbolic link support enabled. You can enable this with `git config core.symlinks true`.
- Run `npm ci`
- Open VS Code
- Run the `watch` task to compile the client and server
- To run/debug the extension use the `Launch Extension` launch configuration

## Release and npm publish automation
- Add a repository secret named `NPM_TOKEN` (npm automation token).
- Push regular changes to the default branch.
- `Release Please` opens/updates a release PR with version and changelog changes.
- Merge the release PR to create a GitHub release and tag.
- The `Publish to npm` workflow runs `npm ci`, `npm run compile --if-present`, tests (if present), build (if present), and then `npm publish`.
