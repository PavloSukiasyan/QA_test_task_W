import fs from 'fs';

export function fileExist(path: string): boolean {
  return fs.existsSync(path);
}

export function readFile(path: string): string {
  return fs.readFileSync(path, 'utf8');
}
