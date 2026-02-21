/** @format */

import {
  getInitialValidationState,
  validateRequired,
} from "./utils";

describe("getInitialValidationState", () => {
  test("creates false for all primitive fields", () => {
    const input = {
      phone: "",
      age: 22,
    };

    const result = getInitialValidationState(input);

    expect(result).toEqual({
      phone: false,
      age: false,
    });
  });

  test("ignores id, name and email", () => {
    const input = {
      id: 1,
      name: "Munna",
      email: "test@gmail.com",
      phone: "123",
    };

    const result = getInitialValidationState(input);

    expect(result).toEqual({
      phone: false,
    });
  });

  test("handles nested objects", () => {
    const input = {
      address: {
        city: "",
        state: "",
      },
    };

    const result = getInitialValidationState(input);

    expect(result).toEqual({
      address: {
        city: false,
        state: false,
      },
    });
  });

  test("does not mutate original object", () => {
    const input = {
      phone: "",
    };

    getInitialValidationState(input);

    expect(input).toEqual({
      phone: "",
    });
  });

  test("returns empty object for empty input", () => {
    expect(getInitialValidationState({})).toEqual({});
  });
});

describe("validateRequired", () => {
  test("returns error for empty string", () => {
    expect(validateRequired("")).toBe(" is required");
  });

  test("returns error for spaces only", () => {
    expect(validateRequired("   ")).toBe("    is required");
  });

  test("returns empty string for valid input", () => {
    expect(validateRequired("Munna")).toBe("");
  });

  test("trims before validation", () => {
    expect(validateRequired("  test  ")).toBe("");
  });
});