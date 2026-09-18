import type {CSSProperties} from "react";
import {colors} from "./colors.ts";


const shared :CSSProperties = {
    fontWeight: "semibold",
    margin: "0",
    color: colors.darkText,

}

export const header1: CSSProperties = {
    letterSpacing: "-2%",
    fontSize: "40px",
    ...shared
}

export const header2: CSSProperties = {
    letterSpacing: "-1.5%",
    fontSize: "32",
    ...shared
}

export const header3: CSSProperties = {
    letterSpacing: "-1.5%",
    fontSize: "24px",
    ...shared
}