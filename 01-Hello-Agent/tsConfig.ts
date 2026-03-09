export default {
  compilerOptions: {
    target: "ES2022",
    module: "esNext",
    moduleResolution: "Bundler",
    strict: true,
    esModuleInterop: true,
    resolveJsonModule:true,
    forceConsistentCasingInFileNames: true,
    skipLibCheck: true,
    noEmit:true,
    outDir: "dist",
    rootDir: "src"
  },
  include: ["src/**/*"],
  exclude: ["node_modules", "dist"]
};