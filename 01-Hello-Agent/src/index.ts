import { LoadEnvironmetVariables } from "./loadEnv";
import { selectProviderAndStart } from "./provider";

async function main() {
  LoadEnvironmetVariables();

  try {
    const result = await selectProviderAndStart();
    process.stdout.write(JSON.stringify(result, null, 2) + "\n");
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(message);
    process.exit(1);
  }
}

main();
