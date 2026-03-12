import dotenv from "dotenv";

let loaded = false;

export function LoadEnvironmetVariables(): void {
  if (loaded) return;
  dotenv.config;

  loaded = true;
}
