import React, { FC } from 'react';
import { Text } from 'ink';

import { watchStart } from '../messages';

export type StartProps = {};

export const Start: FC<StartProps> = function Start() {
  return <Text>{watchStart()}</Text>;
};
