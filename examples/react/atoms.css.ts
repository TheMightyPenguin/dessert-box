import { createTheme } from "@vanilla-extract/css";
import { createAtomicStyles, createAtomsFn } from "@vanilla-extract/sprinkles";

export const [themeClass, vars] = createTheme({
  color: {
    blue50: "#eff6ff",
    blue100: "#dbeafe",
    blue200: "#bfdbfe",
    yellow: "#aaff00",
  },
  font: {
    body: "arial",
  },
  fontSize: {
    small: "12px",
    medium: "16px",
    large: "24px",
    extraLarge: "32px",
  },
  fontWeight: {
    "400": "400",
    "600": "600",
  },
  space: {
    none: "0",
    small: "4px",
    medium: "8px",
    large: "16px",
    extraLarge: "32px",
  },
});

const layoutStyles = createAtomicStyles({
  conditions: {
    mobile: {},
    tablet: { "@media": "screen and (min-width: 768px)" },
    desktop: { "@media": "screen and (min-width: 1024px)" },
  },
  defaultCondition: "mobile",
  properties: {
    display: ["none", "block", "flex"],
    flexDirection: ["row", "column"],
    paddingTop: vars.space,
    paddingBottom: vars.space,
    paddingLeft: vars.space,
    paddingRight: vars.space,
    margin: vars.space,
    width: ["16px", "100%"],
    fontSize: vars.fontSize,
    fontWeight: vars.fontWeight,
    // etc.
  },
  shorthands: {
    padding: ["paddingTop", "paddingBottom", "paddingLeft", "paddingRight"],
    paddingX: ["paddingLeft", "paddingRight"],
    paddingY: ["paddingTop", "paddingBottom"],
  },
});

const colorStyles = createAtomicStyles({
  properties: {
    color: vars.color,
    background: vars.color,
    // etc.
  },
});

export const atoms = createAtomsFn(layoutStyles, colorStyles);
