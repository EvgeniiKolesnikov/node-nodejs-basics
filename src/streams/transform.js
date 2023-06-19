import { stdin, stdout } from 'node:process';
import { pipeline } from 'node:stream/promises';
import { Transform } from 'node:stream';
import { EOL } from 'node:os';

// transform.js - implement function that reads data from process.stdin, reverses text using Transform Stream and then writes it into process.stdout

export const transform = async () => {
  const reverseData = new Transform({
    transform(chunk, encoding, callback) {
      callback(
        null,
        String(chunk).replace(EOL, '').split('').reverse().join('') + EOL
      );
    },
  });

  await pipeline(stdin, reverseData, stdout);
};

transform();
