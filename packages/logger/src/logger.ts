import { codeFrameColumns } from '@babel/code-frame';
import * as chalk from 'chalk';
import logDiff, { DiffOptions } from 'jest-diff';
import LinesAndColumns from 'lines-and-columns';
import * as path from 'path';

import {
  BettererLog,
  BettererLogger,
  BettererLoggerCodeInfo,
  BettererLoggerMessageFactory,
  BettererLoggerMessageType,
  BettererLoggerResults
} from './types';

const DEFAULT_DIFF_OPTIONS: DiffOptions = {
  aAnnotation: 'Expected',
  bAnnotation: 'Result'
};

const LOGO = chalk.yellowBright(`
   \\ | /     _          _   _                     
 '-.ooo.-'  | |__   ___| |_| |_ ___ _ __ ___ _ __ 
---ooooo--- | '_ \\ / _ \\ __| __/ _ \\ '__/ _ \\ '__|
 .-'ooo'-.  | |_) |  __/ |_| ||  __/ | |  __/ |   
   / | \\    |_.__/ \\___|\\__|\\__\\___|_|  \\___|_|   
 `);

let silent = false;

export function muteΔ(): void {
  silent = true;
}

export function unmuteΔ(): void {
  silent = false;
}

export const brΔ = createMessageLogger(BettererLoggerMessageType.raw, () => raw(''));

export const codeΔ = createRawLogger(BettererLoggerMessageType.code, codeMessageFactory);

export const debugΔ = createMessageLogger(
  BettererLoggerMessageType.debug,
  createLogger(chalk.bgBlue.white(' debg '), chalk.bgBlack(' 🤔 '))
);

export const diffΔ = createRawLogger(BettererLoggerMessageType.diff, diffMessageFactory);

export const errorΔ = createMessageLogger(
  BettererLoggerMessageType.error,
  createLogger(chalk.bgRedBright.white(' erro '), chalk.bgBlack(' 🔥 '))
);

export const logoΔ = createRawLogger(BettererLoggerMessageType.logo, logoMessageFactory);

export const infoΔ = createMessageLogger(
  BettererLoggerMessageType.info,
  createLogger(chalk.bgWhiteBright.black(' info '), chalk.bgBlack(' 💬 '))
);

export const rawΔ = createMessageLogger(BettererLoggerMessageType.raw, raw);

export const successΔ = createMessageLogger(
  BettererLoggerMessageType.success,
  createLogger(chalk.bgGreenBright.black(' succ '), chalk.bgBlack(' ✅ '))
);

export const warnΔ = createMessageLogger(
  BettererLoggerMessageType.warn,
  createLogger(chalk.bgYellowBright.black(' warn '), chalk.bgBlack(' 🚨 '))
);

export function logΔ(...results: BettererLoggerResults): void {
  results.forEach((result) => result.log());
}

const IS_JS_REGEXP = /.t|jsx?$/;
const ERROR_BLOCK = chalk.bgRed('  ');
const NEW_LINE = '\n';

const HEADING = chalk.bgBlack.yellowBright.bold(` ☀️  betterer `);
const SPACER = chalk.bgBlack.yellowBright(' - ');

function createLogger(name: string, icon: string): BettererLog {
  return function (...messages: Array<string>): void {
    raw(`${HEADING}${name}${icon}${SPACER}`, ...messages.map((m) => chalk.whiteBright(m)));
  };
}
function createRawLogger<T extends Array<unknown>>(
  type: BettererLoggerMessageType,
  messageFactory: BettererLoggerMessageFactory<T>
) {
  return function (...args: T) {
    const messages = messageFactory(...args);
    return {
      type,
      messages,
      log() {
        if (!silent) {
          messages.map((message) => raw(message));
        }
      }
    };
  };
}

function createMessageLogger(type: BettererLoggerMessageType, log: BettererLog): BettererLogger<Array<string>> {
  return function (...messages: Array<string>) {
    return {
      type,
      messages,
      log() {
        if (!silent) {
          messages.forEach((message) => log(message));
        }
      }
    };
  };
}

function codeMessageFactory(codeInfo: BettererLoggerCodeInfo) {
  const { filePath, fileText, message } = codeInfo;
  const options = {
    highlightCode: !!IS_JS_REGEXP.exec(path.extname(filePath))
  };

  const lc = new LinesAndColumns(fileText);
  const startLocation = codeInfo;
  const startIndex = lc.indexForLocation(startLocation) || 0;
  const endLocation = lc.locationForIndex(startIndex + codeInfo.length) || startLocation;

  const start = {
    line: startLocation.line + 1,
    column: startLocation.column + 1
  };
  const end = {
    line: endLocation.line + 1,
    column: endLocation.column + 1
  };

  const codeFrame = codeFrameColumns(fileText, { start, end }, options);
  const codeMessage = chalk.bgBlack.white(message.trim());
  return [`${NEW_LINE}${ERROR_BLOCK} ${codeMessage.split(NEW_LINE).join(`\n${ERROR_BLOCK} `)}\n\n${codeFrame}`, ''];
}

function diffMessageFactory(expected: unknown, result: unknown, options: DiffOptions = DEFAULT_DIFF_OPTIONS) {
  return ['', logDiff(expected, result, options) || '', ''];
}

function logoMessageFactory() {
  return [LOGO];
}

function raw(...args: Array<string>): void {
  // eslint-disable-next-line no-console
  console.log(...args);
}
