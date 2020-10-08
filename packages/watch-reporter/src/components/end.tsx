import { BettererContext, BettererSummary } from '@betterer/betterer';
import React, { FC, useEffect } from 'react';
import { Text, useApp } from 'ink';

import { watchEnd } from '../messages';

export type EndProps = {
  context: BettererContext;
  summary: BettererSummary;
};

export const End: FC<EndProps> = function End() {
  const app = useApp();

  useEffect(() => {
    app.exit();
  }, []);

  return <Text>{watchEnd()}</Text>;
};
