/**
 * Unit tests for Common Utilities
 */

import {
  debounce,
  throttle,
  deepClone,
  formatNumber,
  formatDate,
  truncate,
  isEmpty,
  getRandomItem,
  shuffle,
  groupBy,
  unique,
  capitalize,
  camelToKebab,
  kebabToCamel,
  formatFileSize,
} from "../common-utils";

describe("Common Utilities", () => {
  describe("debounce", () => {
    it("should debounce function calls", (done) => {
      let callCount = 0;
      const debouncedFn = debounce(() => {
        callCount++;
      }, 100);

      debouncedFn();
      debouncedFn();
      debouncedFn();

      expect(callCount).toBe(0);

      setTimeout(() => {
        expect(callCount).toBe(1);
        done();
      }, 150);
    });
  });

  describe("throttle", () => {
    it("should throttle function calls", (done) => {
      let callCount = 0;
      const throttledFn = throttle(() => {
        callCount++;
      }, 100);

      throttledFn();
      throttledFn();
      throttledFn();

      expect(callCount).toBe(1);

      setTimeout(() => {
        throttledFn();
        expect(callCount).toBe(2);
        done();
      }, 150);
    });
  });

  describe("deepClone", () => {
    it("should deep clone objects", () => {
      const original = { a: 1, b: { c: 2 } };
      const cloned = deepClone(original);

      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);
      expect(cloned.b).not.toBe(original.b);
    });

    it("should deep clone arrays", () => {
      const original = [1, [2, 3], { a: 4 }];
      const cloned = deepClone(original);

      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);
      expect(cloned[1]).not.toBe(original[1]);
    });
  });

  describe("formatNumber", () => {
    it("should format numbers with commas", () => {
      expect(formatNumber(1000)).toBe("1,000");
      expect(formatNumber(1234567)).toBe("1,234,567");
    });
  });

  describe("formatDate", () => {
    it("should format dates", () => {
      const date = new Date("2024-01-15");
      const formatted = formatDate(date);
      expect(formatted).toContain("2024");
    });
  });

  describe("truncate", () => {
    it("should truncate long strings", () => {
      expect(truncate("Hello World", 5)).toBe("Hello...");
      expect(truncate("Short", 10)).toBe("Short");
    });
  });

  describe("isEmpty", () => {
    it("should check if value is empty", () => {
      expect(isEmpty(null)).toBe(true);
      expect(isEmpty(undefined)).toBe(true);
      expect(isEmpty("")).toBe(true);
      expect(isEmpty("   ")).toBe(true);
      expect(isEmpty([])).toBe(true);
      expect(isEmpty({})).toBe(true);
      expect(isEmpty("text")).toBe(false);
      expect(isEmpty([1])).toBe(false);
      expect(isEmpty({ a: 1 })).toBe(false);
    });
  });

  describe("getRandomItem", () => {
    it("should get random item from array", () => {
      const array = [1, 2, 3, 4, 5];
      const item = getRandomItem(array);
      expect(array).toContain(item);
    });

    it("should return undefined for empty array", () => {
      expect(getRandomItem([])).toBeUndefined();
    });
  });

  describe("shuffle", () => {
    it("should shuffle array", () => {
      const array = [1, 2, 3, 4, 5];
      const shuffled = shuffle(array);
      expect(shuffled).toHaveLength(array.length);
      expect(shuffled).not.toEqual(array); // Very unlikely to be same
    });
  });

  describe("groupBy", () => {
    it("should group array by key", () => {
      const array = [
        { category: "A", value: 1 },
        { category: "B", value: 2 },
        { category: "A", value: 3 },
      ];

      const grouped = groupBy(array, "category");
      expect(grouped.A).toHaveLength(2);
      expect(grouped.B).toHaveLength(1);
    });
  });

  describe("unique", () => {
    it("should remove duplicates", () => {
      expect(unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
      expect(unique(["a", "b", "a"])).toEqual(["a", "b"]);
    });
  });

  describe("capitalize", () => {
    it("should capitalize first letter", () => {
      expect(capitalize("hello")).toBe("Hello");
      expect(capitalize("HELLO")).toBe("Hello");
      expect(capitalize("")).toBe("");
    });
  });

  describe("camelToKebab", () => {
    it("should convert camelCase to kebab-case", () => {
      expect(camelToKebab("camelCase")).toBe("camel-case");
      expect(camelToKebab("myVariableName")).toBe("my-variable-name");
    });
  });

  describe("kebabToCamel", () => {
    it("should convert kebab-case to camelCase", () => {
      expect(kebabToCamel("kebab-case")).toBe("kebabCase");
      expect(kebabToCamel("my-variable-name")).toBe("myVariableName");
    });
  });

  describe("formatFileSize", () => {
    it("should format file sizes", () => {
      expect(formatFileSize(1024)).toBe("1 KB");
      expect(formatFileSize(1048576)).toBe("1 MB");
      expect(formatFileSize(0)).toBe("0 Bytes");
    });
  });
});
