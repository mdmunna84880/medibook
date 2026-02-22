/** @format */

import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { validateMinDate, validateDepartment } from "./utils";

describe("validateMinDate", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-01T10:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("rejects empty value", () => {
    const result = validateMinDate("");

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain("Date is required.");
  });

  test("rejects invalid date string", () => {
    const result = validateMinDate("invalid-date");

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain("Enter a valid date.");
  });

  test("rejects today's date", () => {
    const result = validateMinDate("2026-01-01");

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain(
      "Date must be a future date (not today).",
    );
  });

  test("rejects past date", () => {
    const result = validateMinDate("2025-12-31");

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain(
      "Date must be a future date (not today).",
    );
  });

  test("accepts a valid future date", () => {
    const result = validateMinDate("2026-01-02");

    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual([]);
    expect(result.message).toBe("Date is valid.");
  });
});

describe("validateDepartment", () => {
  test("rejects empty department", () => {
    const result = validateDepartment("");

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain("Department is required.");
  });

  test("rejects single character department", () => {
    const result = validateDepartment("C");

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain(
      "Department must be at least 2 characters.",
    );
  });

  test("rejects invalid characters", () => {
    const result = validateDepartment("Cardiology123");

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain(
      "Department contains invalid characters. Only letters, spaces, '&' and '-' are allowed.",
    );
  });

  test("trims and accepts valid department", () => {
    const result = validateDepartment("  Cardiology  ");

    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual([]);
    expect(result.message).toBe("Department is valid.");
  });

  test("accepts department with & and hyphen", () => {
    const result = validateDepartment("ENT & Head-Neck");

    expect(result.isValid).toBe(true);
  });
});