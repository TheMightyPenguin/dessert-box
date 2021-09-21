import { extractAtomsFromProps, composeClassNames } from "@dessert-box/core";

describe("@dessert-box/core", () => {
  describe("composeClassNames", () => {
    it("should not include falsy values", () => {
      // @ts-ignore
      expect(composeClassNames("hello", false, undefined, "", 0, "world")).toBe(
        "hello world"
      );
    });

    it("should skip empty strings", () => {
      expect(composeClassNames("hello", " ", " ", "world")).toBe("hello world");
    });

    it("should strip whitespaces", () => {
      expect(composeClassNames(" hello  ", "  world  ")).toBe("hello world");
    });
  });

  describe("extractAtomsFromProps", () => {
    function createMockAtoms() {
      const atoms = () => "mock";
      atoms.properties = new Set(["padding", "color"]);
      return atoms;
    }

    it("hasAtomProps should be true if it has valid atoms", () => {
      const atoms = createMockAtoms();
      const onClick = () => {};
      const { hasAtomProps } = extractAtomsFromProps(
        { padding: "small", onClick },
        atoms
      );
      expect(hasAtomProps).toBeTruthy();
    });

    it("hasAtomProps should be false if it does not have valid atoms", () => {
      const atoms = createMockAtoms();
      const onClick = () => {};
      const { hasAtomProps } = extractAtomsFromProps({ onClick }, atoms);
      expect(hasAtomProps).toBeFalsy();
    });

    it("atomProps should contain atoms", () => {
      const atoms = createMockAtoms();
      const onClick = () => {};
      const { atomProps } = extractAtomsFromProps(
        { padding: "small", onClick, color: "red" },
        atoms
      );
      expect(atomProps).toEqual({
        padding: "small",
        color: "red",
      });
    });

    it("otherProps should contain the non-atoms props", () => {
      const atoms = createMockAtoms();
      const onClick = () => {};
      const { otherProps } = extractAtomsFromProps(
        { padding: "small", onClick, color: "red" },
        atoms
      );
      expect(otherProps).toEqual({ onClick });
    });
  });
});
