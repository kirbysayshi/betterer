import * as assert from 'assert';

import { BettererTestConfig, BettererDiff } from '../test';
import { BettererRun, BettererRuns } from '../context';
import { read } from '../reader';
import { write } from '../writer';
import { parse } from './parser';
import { print } from './printer';
import { BettererResultΩ } from './result';
import { BettererResult, BettererResultValue } from './types';

const RESULTS_HEADER = `// BETTERER RESULTS V2.`;

export class BettererResults {
  constructor(private _resultsPath: string) {}

  public async getResultNames(): Promise<Array<string>> {
    const results = await parse(this._resultsPath);
    return Object.keys(results);
  }

  public async getResult(name: string, test: BettererTestConfig): Promise<BettererResult> {
    const results = await parse(this._resultsPath);
    if (Object.hasOwnProperty.call(results, name)) {
      assert(results[name]);
      const { value } = results[name];
      const parsed = JSON.parse(value) as BettererResultValue;
      return new BettererResultΩ(test.serialiser.deserialise(parsed));
    }
    return new BettererResultΩ();
  }

  public getDiff(run: BettererRun): BettererDiff {
    return run.test.differ(run.expected.result, run.result.result);
  }

  public read(): Promise<string | null> {
    return read(this._resultsPath);
  }

  public async print(runs: BettererRuns): Promise<string> {
    const toPrint = runs.filter((run) => {
      const { isComplete, isNew, isSkipped, isFailed } = run;
      return !(isComplete || (isNew && (isSkipped || isFailed)));
    });
    const printedResults = await Promise.all(
      toPrint.map(async (run) => {
        const { name, test, isFailed, isSkipped, isWorse } = run;
        const toPrint = isFailed || isSkipped || isWorse ? run.expected : run.result;
        const serialised = test.serialiser.serialise(toPrint.result);
        const printedValue = await test.printer(serialised);
        return print(name, printedValue);
      })
    );
    return [RESULTS_HEADER, ...printedResults].join('');
  }

  public write(printed: string): Promise<void> {
    return write(printed, this._resultsPath);
  }
}
