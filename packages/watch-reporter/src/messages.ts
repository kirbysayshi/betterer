export function filesChecking(files: number): string {
  return `Checking ${files} ${getFiles(files)}... 🤔`;
}
export function filesChecked(files: number): string {
  return `Checked ${files} ${getFiles(files)}`;
}

export function watchStart(): string {
  return 'Running betterer in watch mode 🎉';
}
export function watchEnd(): string {
  return 'Stopping watch mode 👋';
}

function getFiles(count: number): string {
  return count === 1 ? 'file' : 'files';
}
