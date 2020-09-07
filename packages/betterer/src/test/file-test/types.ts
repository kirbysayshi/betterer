import { BettererDiff } from '../../results';
import { MaybeAsync } from '../../types';
import { BettererFilePaths } from '../../watcher';

export type BettererFileIssueSerialised = [line: number, column: number, length: number, message: string, hash: string];
export type BettererFileIssuesMapSerialised = Record<string, ReadonlyArray<BettererFileIssueSerialised>>;

export type BettererFileDiff = {
  fixed?: BettererFileIssues;
  existing?: BettererFileIssues;
  new?: BettererFileIssues;
};
export type BettererFilesDiff = Record<string, BettererFileDiff>;
export type BettererFileTestDiff = BettererDiff<BettererFiles, BettererFilesDiff>;

export type BettererFileTestFunction = (filePaths: BettererFilePaths, files: BettererFiles) => MaybeAsync<void>;

export type BettererFileGlobs = ReadonlyArray<string | ReadonlyArray<string>>;
export type BettererFilePatterns = ReadonlyArray<RegExp | ReadonlyArray<RegExp>>;

export type BettererFile = {
  readonly absolutePath: string;
  readonly hash: string;
  readonly issues: BettererFileIssues;
  readonly key: string;
  addIssues(issues: BettererFileIssues): void;
  addIssue(start: number, end: number, message: string, hash?: string): void;
  addIssue(line: number, col: number, length: number, message: string, hash: string): void;
  addIssue(startLine: number, startCol: number, endLine: number, endCol: number, message: string, hash?: string): void;
};

export type BettererFileIssue = {
  readonly line: number;
  readonly column: number;
  readonly length: number;
  readonly message: string;
  readonly hash: string;
};

export type BettererFileIssues = ReadonlyArray<BettererFileIssue>;

export type BettererFiles = {
  addFile(absolutePath: string, fileText: string): BettererFile;
  getIssues(absolutePath: string): BettererFileIssues;
};
