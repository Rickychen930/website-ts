module.exports = {
  "*.{ts,tsx}": (filenames) => {
    const filtered = filenames.filter((f) => !f.includes("backend/dist/"));
    if (filtered.length === 0) return [];
    
    // Process files in batches to avoid memory issues
    const batchSize = 10;
    const commands = [];
    for (let i = 0; i < filtered.length; i += batchSize) {
      const batch = filtered.slice(i, i + batchSize);
      commands.push(`eslint --fix ${batch.join(" ")}`);
    }
    commands.push(`prettier --write ${filtered.join(" ")}`);
    return commands;
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
