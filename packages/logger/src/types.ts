import { DiffOptions } from 'jest-diff';

export enum BettererLoggerMessageType {
  code,
  debug,
  diff,
  error,
  info,
  logo,
  raw,
  success,
  warn
}

export type BettererLog = (...messages: Array<string>) => void;
export type BettererLoggerMessageFactory<T extends Array<unknown>> = (...args: T) => Array<string>;
export type BettererLoggerResult = { type: BettererLoggerMessageType; messages: Array<string>; log(): void };
export type BettererLoggerResults = Array<BettererLoggerResult>;
export type BettererLogger<T extends Array<unknown>> = (...args: T) => BettererLoggerResult;

export type BettererLoggerCodeInfo = {
  message: string;
  filePath: string;
  fileText: string;
  line: number;
  column: number;
  length: number;
};

export type BettererLoggerDiffOptions = DiffOptions;
