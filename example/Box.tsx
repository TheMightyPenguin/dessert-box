import { createBox } from "../dist/index";
import { atoms } from "./atoms.css";

export const { Box, createVariants } = createBox({ atoms });

export default Box;
