import type {FormDeepStylesType} from "../../../types/DeepStylesTypes/FormDeepStylesType.ts";
import type {InputDeepStylesType} from "../../../types/DeepStylesTypes/InputDeepStylesType.ts";
import {colors} from "../../../theme/colors.ts";
import type {CSSProperties} from "react";
import {header3} from "../../../theme/headerStyles.ts";
import {text3} from "../../../theme/textStyles.ts";

export const loginFormStyles: FormDeepStylesType = {
    help: {
        padding: "5px 20px",
        ...text3
    },
    root: {
        height: 520,
        width: 440
    }
}

export const otpFormStyles: FormDeepStylesType = {
    help: {
        textAlign: "center",
        margin: "5px 0 0 0 ",
        ...text3
    },
    root: {
        height: 520,
        width: 440
    }
}

export const loginFormStyle: CSSProperties = {
    height: "100%",
}
export const loginFormItemStyles:CSSProperties = {
    margin: "0",
}

export const inputErrorStyles: InputDeepStylesType = {
    root: {
        borderColor: colors.inputBorder,
    },
    prefix: {
        color: colors.destructive,
    }
}

export const optStyles = {
    input: {
        width: "42px",
        height: "48px",
        borderRadius: "4px",
        ...header3
    }
}