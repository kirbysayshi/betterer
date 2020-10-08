import {
  BettererContext,
  BettererFilePaths,
  BettererReporter,
  BettererRuns,
  BettererSummary
} from '@betterer/betterer';
import React from 'react';
import { render, Instance } from 'ink';
import { End, Runs, Start, Watch } from './components';

let app: Instance;
export const watchReporter: BettererReporter = {
  contextStart(context: BettererContext): void {
    app = render(
      <Watch context={context}>
        <Start />
      </Watch>
    );
  },

  async contextEnd(context: BettererContext, summary: BettererSummary): Promise<void> {
    app.rerender(
      <Watch>
        <End context={context} summary={summary} />
      </Watch>
    );
    app.unmount();
    await app.waitUntilExit();
  },

  runsStart(runs: BettererRuns, filePaths: BettererFilePaths): void {
    app.rerender(
      <Watch>
        <Runs runs={runs} filePaths={filePaths} running />
      </Watch>
    );
  },

  runsEnd(runs: BettererRuns, filePaths: BettererFilePaths): void {
    app.rerender(
      <Watch>
        <Runs runs={runs} filePaths={filePaths} />
      </Watch>
    );
  }
};
