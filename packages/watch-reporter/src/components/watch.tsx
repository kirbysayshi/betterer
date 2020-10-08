import { BettererContext } from '@betterer/betterer';
import React, { FC, useEffect, useRef, useState } from 'react';
import { Box, useApp, useInput, useStdin } from 'ink';
import useStdoutDimensions from 'ink-use-stdout-dimensions';

import { Config } from './config';
import { Logo } from './logo';
import { WatchState } from '../state';

const LOGO_HEIGHT = 7;

export type WatchProps = {
  context?: BettererContext;
};

export const Watch: FC<WatchProps> = function Watch({ children, context }) {
  const app = useApp();

  const currentContext = useRef<BettererContext | void>(context);
  useEffect(() => {
    if (context) {
      currentContext.current = context;
    }
  }, [context]);

  const [columns, rows] = useStdoutDimensions();
  const finalWidth = Math.max(columns, 50);
  const finalHeight = Math.max(rows, 20);

  const [state, setState] = useState<WatchState>(WatchState.pending);

  const { isRawModeSupported } = useStdin();

  const useInputHook = isRawModeSupported ? useInput : () => {};
  useInputHook((input, key) => {
    if (key.return) {
      setState(WatchState.pending);
      return;
    }

    if (key.escape) {
      quit(app);
      return;
    }

    if (state !== WatchState.pending) {
      return;
    }

    // Don't exit on 'q' if the user is editing filters or ignores:
    if (input === 'q') {
      quit(app);
    }

    if (input === 'f') {
      setState(WatchState.editFilters);
    }
    if (input === 'i') {
      setState(WatchState.editIgnores);
    }
  });

  return (
    <Box flexDirection="column" minWidth={finalWidth} minHeight={finalHeight}>
      <Box height={LOGO_HEIGHT}>
        <Logo />
      </Box>
      {currentContext.current && <Config context={currentContext.current} state={state} />}
      <Box>{children}</Box>
    </Box>
  );
};

function quit(app: ReturnType<typeof useApp>): void {
  app.exit();
  process.exitCode = 0;
  // Send SIGINT so the file watcher terminates:
  process.kill(process.pid, 'SIGINT');
}
