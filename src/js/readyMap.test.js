import readyMap from "./readyMap";

describe("Test readyMap", () => {
  it("readyMap is Function", () => {
    expect(readyMap).toBeInstanceOf(Function);
    expect(readyMap).toBeDefined();
    expect(readyMap).toBeTruthy();
  });
});
