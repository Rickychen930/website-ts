module.exports = {
  "*.{ts,tsx}": (filenames) => {
    const filtered = filenames.filter((f) => !f.includes("backend/dist/"));
    return filtered.length > 0
      ? [
          `eslint --fix ${filtered.join(" ")}`,
          `prettier --write ${filtered.join(" ")}`,
        ]
      : [];
  },
  "*.{js,jsx}": (filenames) => {
    const filtered = filenames.filter((f) => !f.includes("backend/dist/"));
    return filtered.length > 0
      ? [
          `eslint --fix ${filtered.join(" ")}`,
          `prettier --write ${filtered.join(" ")}`,
        ]
      : [];
  },
  "*.{css,scss,sass}": ["stylelint --fix", "prettier --write"],
  "*.{json,md,yml,yaml}": ["prettier --write"],
};
