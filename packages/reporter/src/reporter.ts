import { brΔ, diffΔ, errorΔ, infoΔ, logΔ, logoΔ, successΔ, warnΔ } from '@betterer/logger';
import {
  BettererConfigPartial,
  BettererContext,
  BettererReporter,
  BettererRun,
  BettererSummary
} from '@betterer/betterer';
import { BettererError, logErrorΔ } from '@betterer/errors';

import {
  getTestsΔ,
  testBetterΔ,
  testCheckedΔ,
  testCompleteΔ,
  testExpiredΔ,
  testFailedΔ,
  testNewΔ,
  testObsoleteΔ,
  testRunningΔ,
  testSameΔ,
  testSkippedΔ,
  testUpdatedΔ,
  testWorseΔ,
  unexpectedDiffΔ,
  updateInstructionsΔ
} from './messages';
import { quoteΔ } from './utils';

export const defaultReporter: BettererReporter = {
  configError(_: BettererConfigPartial, error: BettererError): void {
    logErrorΔ(error);
  },
  contextStart(): void {
    logoΔ().log();
  },
  contextEnd(_: BettererContext, summary: BettererSummary): void {
    const better = summary.better.length;
    const failed = summary.failed.length;
    const ran = summary.ran.length;
    const same = summary.same.length;
    const skipped = summary.skipped.length;
    const updated = summary.updated.length;
    const worse = summary.worse.length;

    const { completed, expired, obsolete } = summary;

    infoΔ(testCheckedΔ(getTestsΔ(ran))).log();
    if (expired) {
      expired.forEach((run) => {
        errorΔ(testExpiredΔ(quoteΔ(run.name))).log();
      });
    }
    if (failed) {
      errorΔ(testFailedΔ(getTestsΔ(failed))).log();
    }
    if (summary.new.length) {
      infoΔ(testNewΔ(getTestsΔ(summary.new.length))).log();
    }
    if (obsolete) {
      obsolete.forEach((runName) => {
        errorΔ(testObsoleteΔ(quoteΔ(runName))).log();
      });
    }
    if (better) {
      successΔ(testBetterΔ(getTestsΔ(better))).log();
    }
    if (completed) {
      completed.forEach((run) => {
        successΔ(testCompleteΔ(quoteΔ(run.name))).log();
      });
    }
    if (same) {
      warnΔ(testSameΔ(getTestsΔ(same))).log();
    }
    if (skipped) {
      warnΔ(testSkippedΔ(getTestsΔ(skipped))).log();
    }
    if (updated) {
      infoΔ(testUpdatedΔ(getTestsΔ(updated))).log();
    }
    if (worse) {
      errorΔ(testWorseΔ(getTestsΔ(worse))).log();
      errorΔ(updateInstructionsΔ()).log();
    }

    if (summary.hasDiff) {
      errorΔ(unexpectedDiffΔ()).log();
      brΔ().log();
      diffΔ(summary.expected, summary.result).log();
      brΔ().log();
    }
  },
  contextError(_: BettererContext, error: BettererError): void {
    logErrorΔ(error);
  },
  runStart(run: BettererRun): void {
    const name = quoteΔ(run.name);
    if (run.isExpired) {
      errorΔ(testExpiredΔ(name)).log();
    }
    infoΔ(testRunningΔ(name)).log();
  },
  runEnd(run: BettererRun): void {
    const name = quoteΔ(run.name);
    if (run.isComplete) {
      successΔ(testCompleteΔ(name, run.isNew)).log();
      return;
    }
    if (run.isBetter) {
      successΔ(testBetterΔ(name)).log();
      return;
    }
    if (run.isFailed) {
      errorΔ(testFailedΔ(name)).log();
      return;
    }
    if (run.isNew) {
      successΔ(testNewΔ(name)).log();
      return;
    }
    if (run.isSame) {
      warnΔ(testSameΔ(name)).log();
    }
    if (run.isUpdated) {
      infoΔ(testUpdatedΔ(name)).log();
      brΔ().log();
      logΔ(...run.diff.log());
      brΔ().log();
      return;
    }
    if (run.isWorse) {
      errorΔ(testWorseΔ(name)).log();
      brΔ().log();
      logΔ(...run.diff.log());
      brΔ().log();
    }
  },
  runError(_: BettererRun, error: BettererError) {
    logErrorΔ(error);
  }
};
