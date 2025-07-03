import { spawnSync } from 'child_process';
import { GenerateDatFileResponse, MapGenerationParams, MapGenerationResult } from './types';

export const generateDatFile = (params: MapGenerationParams | any): GenerateDatFileResponse => {
  let result: MapGenerationResult = {} as any;
  params.stats = true;
  try {
    const pythonScriptPath = './lib/python/mapgen.py';
    const args = Object.keys(params).reduce((acc, key) => {
      if (params[key] !== undefined) {
        acc.push(`-${key}`, String(params[key]));
      }
      return acc;
    }, [] as string[]);

    const pythonExecutable = process.env.PYTHON_EXECUTABLE || process.env.PYTHON || (process.platform === 'win32' ? 'python' : 'python3');

    const pythonProcess = spawnSync(pythonExecutable, [pythonScriptPath, ...args]);

    if (pythonProcess.status === 1) {
      result = parseStructuredText(pythonProcess.stdout.toString());

      return { generated: true, result };
    } else {
      if (pythonProcess.error) {
        console.error('Python script failed with an error:', pythonProcess.error);
      } else {
        console.error(`Python script exited with code ${pythonProcess.status}`);
      }
      return { generated: false, result };
    }
  } catch (error) {
    console.error('Error during Python script execution:', error);
    return { generated: false, result };
  }
};

function parseStructuredText(text: any) {
  const result = {} as any;
  const lines = text.split('\n');
  lines.forEach(
    (line: {
      includes: (arg0: string) => any;
      split: (arg0: string) => {
        (): any;
        new (): any;
        map: { (arg0: (part: any) => any): [any, any]; new (): any };
      };
    }) => {
      if (line.includes(':')) {
        const [key, value] = line.split(':').map(part => part.trim());
        if (key && value !== undefined) {
          const cleanKey = key.replace(/[^a-zA-Z0-9]/g, '');
          result[cleanKey] = isNaN(Number(value)) ? value : Number(value);
        }
      }
    }
  );
  return result;
}
