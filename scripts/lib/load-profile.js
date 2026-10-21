/**
 * Load the portfolio content (src/data/profile.ts) from plain Node scripts.
 * The file is a typed object literal with only a type import, so transpiling
 * it and evaluating the result in a sandbox is enough — no bundler needed.
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const ts = require("typescript");

const SRC = path.resolve(__dirname, "../../src/data/profile.ts");

const loadProfile = () => {
  const { outputText } = ts.transpileModule(fs.readFileSync(SRC, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  });
  const sandbox = { exports: {}, module: { exports: {} } };
  vm.runInNewContext(outputText, sandbox);
  const profile = sandbox.exports.PROFILE;
  if (!profile || !Array.isArray(profile.projects)) {
    throw new Error("PROFILE not found in src/data/profile.ts");
  }
  return profile;
};

module.exports = { loadProfile };
