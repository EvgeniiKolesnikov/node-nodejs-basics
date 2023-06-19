import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Worker } from 'node:worker_threads';
import { cpus } from 'node:os';

// main.js - implement function that creates number of worker threads (equal to the number of host machine logical CPU cores) from file worker.js and able to send data to those threads and to receive result of the computation from them. You should send incremental number starting from 10 to each worker. For example: on host machine with 4 cores you should create 4 workers and send 10 to first worker, 11 to second worker, 12 to third worker, 13 to fourth worker. After all workers will finish, function should log array of results into console. The results are array of objects with 2 properties:
// status - 'resolved' in case of successfully received value from worker or 'error' in case of error in worker
// data - value from worker in case of success or null in case of error in worker

export const performCalculations = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const incrementalNumber = 10;

  const workers = new Array(cpus().length).fill(null).map((_, i) => {
    return new Promise((res) => {
      const worker = new Worker(`${__dirname}/worker.js`, {
        workerData: i + incrementalNumber,
      });
      worker.once('message', (data) => res({ status: 'resolved', data: data }));
      worker.once('error', () => res({ status: 'error', data: null }));
    });
  });

  return Promise.all(workers).then((resultArray) => console.log(resultArray));
};

performCalculations();
