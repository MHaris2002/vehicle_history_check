import { describe, it, expect } from "vitest";
import { formatReg, isPlausiblePlate, linkifyHtml } from "./format";

describe("formatReg", () => {
  it("uppercases and strips non-alphanumeric characters", () => {
    expect(formatReg("ab12 cde")).toBe("AB12CDE");
  });

  it("removes hyphens and symbols", () => {
    expect(formatReg("ab-12-cde!")).toBe("AB12CDE");
  });

  it("truncates to 8 characters", () => {
    expect(formatReg("abcdefghijk")).toBe("ABCDEFGH");
  });
});

describe("isPlausiblePlate", () => {
  it("accepts a valid-looking plate", () => {
    expect(isPlausiblePlate("AB12CDE")).toBe(true);
  });

  it("rejects an empty string", () => {
    expect(isPlausiblePlate("")).toBe(false);
  });

  it("rejects plates longer than 8 characters", () => {
    expect(isPlausiblePlate("AB12CDEFG")).toBe(false);
  });

  it("rejects plates with invalid characters", () => {
    expect(isPlausiblePlate("AB12-DE")).toBe(false);
  });
});

describe("linkifyHtml", () => {
  it("converts markdown-style links into real anchor tags", () => {
    const input = "Check [this source](https://example.com) for details.";
    const output = linkifyHtml(input);
    expect(output).toContain('href="https://example.com"');
    expect(output).toContain("this source</a>");
    expect(output).toContain("<a ");
  });

  it("converts raw URLs into clickable links", () => {
    const input = "Visit https://example.com for more info.";
    const output = linkifyHtml(input);
    expect(output).toContain('href="https://example.com"');
    expect(output).toContain("<a ");
  });

  it("returns an empty string when given nothing", () => {
    expect(linkifyHtml("")).toBe("");
    expect(linkifyHtml(null)).toBe("");
  });

  it("adds target and rel attributes to links", () => {
    const output = linkifyHtml("[link](https://example.com)");
    expect(output).toContain('target="_blank"');
    expect(output).toContain('rel="noopener noreferrer"');
  });
});