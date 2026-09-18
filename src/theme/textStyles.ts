import type {CSSProperties} from "react";
import {colors} from "./colors.ts";


const shared = {
    color: colors.darkText
}


/*
* 18px
*/
export const text1Bold: CSSProperties = {
    fontWeight: 'bold',
    letterSpacing: '2%',
    lineHeight: '28px',
    fontSize: '18px',
    ...shared
}
/*
* 18px
*/
export const text1: CSSProperties = {
    fontWeight: 'regular',
    letterSpacing: '2%',
    lineHeight: '28px',
    fontSize: '18px',
    ...shared

}
/*
* 16px
*/
export const text2Bold: CSSProperties = {
    fontWeight: 'bold',
    letterSpacing: '2%',
    fontSize: '16px',
    ...shared

}
/*
* 16px
*/
export const text2: CSSProperties = {
    fontWeight: 'regular',
    letterSpacing: '2%',
    fontSize: '16px',
    ...shared

}

/*
* 14px
*/
export const text3: CSSProperties = {
    fontWeight: 'regular',
    letterSpacing: '2%',
    fontSize: '14px',
    ...shared

}

