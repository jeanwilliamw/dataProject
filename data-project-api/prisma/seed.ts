import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

const seedsDirectory = './prisma/seeds';

const seedFiles = fs.readdirSync(seedsDirectory);

seedFiles.forEach((file) => {
  const filePath = path.join(seedsDirectory, file);

  if (file.endsWith('.ts')) {
    try {
      console.log(`Executing seed script: ${filePath}`);
      execSync(`ts-node ${filePath}`, { stdio: 'inherit' });
    } catch (error) {
      console.error(`Error executing seed script: ${filePath}`);
      console.error(error);
      process.exit(1);
    }
  }
});
