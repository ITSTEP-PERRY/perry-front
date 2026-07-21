import {type ThemeConfig} from "antd";
import {colors} from "./colors.ts";

export const config: ThemeConfig = {
    token: {
        colorPrimary: "#B8EA48",
        fontFamily: "Mulish",
        colorTextLightSolid: colors.darkText,
    },
    components:{
        Button: {
            lineWidth: 2.5,
            defaultHoverColor: colors.darkText,
            defaultActiveColor: colors.darkText,
        }
    }
}

