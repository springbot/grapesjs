const fs = require("fs");
const path = ".env";

if (!fs.existsSync(path)) {
  console.log("\nMISSING AUTH TOKEN: Copy .example.env to .env and replace with valid auth token.\n");
  process.exit(1);
}
