import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { fork } from 'node:child_process';

// cp.js - implement function spawnChildProcess that receives array of arguments args and creates child process from file script.js, passing these args to it. This function should create IPC-channel between stdin and stdout of master process and child process:

// child process stdin should receive input from master process stdin
// child process stdout should send data to master process stdout

export const spawnChildProcess = async (args) => {
  const __dirname = dirname(fileURLToPath(import.meta.url));

  const child = fork(`${__dirname}/files/script.js`, args, {
    stdio: ['inherit', 'inherit', 'inherit', 'ipc'],
  });
};

spawnChildProcess(['--arg1 value1', '--arg2 value2', '--arg3', 'arg4']);
