#!/usr/bin/env node

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

'use strict';

const path = require('path');
const { spawn } = require('child_process');

function usage(exitCode = 0) {
	const msg = [
		'vscode-eslint (LSP server)',
		'',
		'Usage:',
		'  vscode-eslint --stdio',
		'',
		'Options:',
		'  --stdio     Use stdio transport (LSP over JSON-RPC on stdin/stdout)',
		'  -h, --help  Show this help',
	].join('\n');
	if (exitCode === 0) {
		process.stdout.write(msg + '\n');
	} else {
		process.stderr.write(msg + '\n');
	}
	process.exit(exitCode);
}

const args = process.argv.slice(2);
if (args.includes('-h') || args.includes('--help')) {
	usage(0);
}

const wantsStdio = args.includes('--stdio');
if (!wantsStdio) {
	process.stderr.write('error: missing required --stdio\n\n');
	usage(2);
}

// Run the bundled server produced by server/webpack.config.js
const serverEntry = path.resolve(__dirname, '..', 'server', 'out', 'eslintServer.js');

const child = spawn(process.execPath, [serverEntry], {
	stdio: 'inherit'
});

child.on('exit', (code, signal) => {
	if (signal) {
		process.exitCode = 1;
		return;
	}
	process.exitCode = code ?? 0;
});
