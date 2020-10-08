import { BettererFilePaths, BettererRun, BettererRuns } from '@betterer/betterer';
import {
  quoteΔ,
  testBetterΔ,
  testCompleteΔ,
  testExpiredΔ,
  testFailedΔ,
  testNewΔ,
  testSameΔ,
  testSkippedΔ,
  testUpdatedΔ,
  testWorseΔ
} from '@betterer/reporter';
import { Box, Text } from 'ink';
import Spinner from 'ink-spinner';
import React, { FC, useEffect, useState } from 'react';

import { filesChecked, filesChecking } from '../messages';

const MIN_RUNNING = 500;

export type RunsProps = {
  filePaths: BettererFilePaths;
  runs: BettererRuns;
  running?: true;
};

export const Runs: FC<RunsProps> = function Runs(props) {
  const [minRunning, setMinRunning] = useState<boolean>(true);
  const finalRunning = props.running || minRunning;

  useEffect(() => {
    if (props.running) {
      setMinRunning(true);
      return;
    }

    const timeout = setTimeout(() => setMinRunning(false), MIN_RUNNING);
    return () => clearTimeout(timeout);
  }, [props.running]);

  return (
    <Box flexDirection="column" width="100%">
      {finalRunning ? <RunsStart {...props} /> : <RunsEnd {...props} />}
    </Box>
  );
};

const RunsStart: FC<RunsProps> = function RunsStart({ filePaths }) {
  return (
    <Box>
      <Spinner></Spinner>
      <Text> {filesChecking(filePaths.length)}</Text>
    </Box>
  );
};

const RunsEnd: FC<RunsProps> = function RunsEnd({ runs, filePaths }) {
  return (
    <>
      <Text>{filesChecked(filePaths.length)}</Text>
      <Box flexDirection="column" paddingTop={1} paddingLeft={2} width="100%">
        {filePaths.map((filePath) => (
          <Text key={filePath}>{filePath}</Text>
        ))}
      </Box>
      <Box flexDirection="column" paddingTop={1} width="100%">
        {runs.map((run) => (
          <Status key={run.name} run={run}></Status>
        ))}
      </Box>
    </>
  );
};

type StatusProps = {
  run: BettererRun;
};

const Status: FC<StatusProps> = ({ run }) => {
  const { expected, result } = run;
  const name = quoteΔ(run.name);
  if (run.isBetter) {
    return (
      <>
        <Text>{testBetterΔ(name)}</Text>
        <Text color="greenBright">
          Expected: {expected.value} Result: {result.value}
        </Text>
      </>
    );
  }
  if (run.isComplete) {
    return <Text>{testCompleteΔ(name)}</Text>;
  }
  if (run.isExpired) {
    return <Text>{testExpiredΔ(name)}</Text>;
  }
  if (run.isFailed) {
    return <Text>{testFailedΔ(name)}</Text>;
  }
  if (run.isNew) {
    return <Text>{testNewΔ(name)}</Text>;
  }
  if (run.isSame) {
    return <Text>{testSameΔ(name)}</Text>;
  }
  if (run.isSkipped) {
    return <Text>{testSkippedΔ(name)}</Text>;
  }
  if (run.isUpdated) {
    return (
      <>
        <Text>{testUpdatedΔ(name)} </Text>
        <Text color="yellowBright">
          Expected: {expected.value} Result: {result.value}
        </Text>
      </>
    );
  }
  if (run.isWorse) {
    return (
      <>
        <Text>{testWorseΔ(name)} </Text>
        <Text color="redBright">
          Expected: {expected.value} Result: {result.value}
        </Text>

        <Box flexDirection="column" paddingY={1}>
          {run.diff.log().map((message) => (
            <Text>{message.messages}</Text>
          ))}
        </Box>
      </>
    );
  }
  throw new Error();
};

// Hack
// Hack
// Hack
