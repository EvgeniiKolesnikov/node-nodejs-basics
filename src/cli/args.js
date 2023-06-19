// args.js - implement function that parses command line arguments (given in format --propName value --prop2Name value2, you don't need to validate it) and prints them to the console in the format propName is value, prop2Name is value2

export const parseArgs = () => {
  const output = process.argv
    .map((str, i, arr) =>
      str.startsWith('--') ? `${str.slice(2)} is ${arr[i + 1]}` : ''
    )
    .filter((str) => str)
    .join(', ');
  console.log(output);
};

parseArgs();
