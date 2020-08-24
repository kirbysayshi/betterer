import * as path from 'path';

export function isFunction<T>(value: unknown): value is T {
  return typeof value === 'function';
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isUndefined(value: unknown): value is undefined {
  return typeof value === 'undefined';
}

export function getNormalisedPath(filePath: string): string {
  return path.sep === path.posix.sep ? filePath : filePath.split(path.sep).join(path.posix.sep);
}

export function getAbsolutePath(resultsPath: string, filePath: string): string {
  return getNormalisedPath(path.resolve(path.dirname(resultsPath), filePath));
}

export function getRelativePath(resultsPath: string, filePath: string): string {
  return getNormalisedPath(path.relative(path.dirname(resultsPath), filePath));
}

export function flatten<T>(toFlatten: ReadonlyArray<T | ReadonlyArray<T>>): Array<T> {
  const flattened: Array<T> = [];
  toFlatten.forEach((t) => {
    if (isItem<T>(t)) {
      flattened.push(t);
    } else {
      flattened.push(...t);
    }
  });
  return flattened;
}

function isItem<T>(pattern: unknown): pattern is T {
  return !Array.isArray(pattern);
}
