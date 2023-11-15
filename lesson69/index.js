import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const book = 'The Wind in the Willows (introductory fragment).txt';

const readStream = fs.createReadStream(path.join(__dirname, '/files', book), { highWaterMark: 1024 });
const writeStream = fs.createWriteStream(path.join(__dirname, '/files', 'book_copy.txt'));

// завдання 1
readStream.on('data', (chunk) => {
  const random = Math.random();
  const message = 'Introductory fragment, copying is prohibited!\n';
  const modifiedChunk = random < 0.5 ? message + chunk : chunk + message;
  writeStream.write('\n---CHUNK START---\n');
  writeStream.write(modifiedChunk);
  writeStream.write('\n---CHUNK END---\n');
});

// завдання 2
function log(...values) {
  values.forEach(value => process.stdout.write(`${value}\n`));
}
log('lesson69');

//завдання 3
const ask = (question) => {
  return new Promise((resolve, reject) => {
    process.stdout.write(question);

    const onData = (data) => {
      const answer = data.toString().trim().toLowerCase();
      if (['y', 'yes', 'Y', 'YES', 'n', 'no', 'N', 'NO'].includes(answer)) {
        process.stdin.removeListener('data', onData);
        resolve(answer);
      } else {
        reject(new Error('Invalid response format'));
      }
    };

    process.stdin.on('data', onData);
  });
};

(async () => {
  try {
    const scss = await ask('Do you want to use SCSS? (Y/N): ');
    const eslint = await ask('Do you want to use ESLint? (Y/N): ');

    console.log('\nYour answers:');
    console.log('SCSS:', scss);
    console.log('ESLint:', eslint);
  } catch (error) {
    console.error(error.message);
  } finally {
    process.exit();
  }
})();