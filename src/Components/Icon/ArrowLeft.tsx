import type {IconType} from "../../types/IconType.ts";

export const ArrowLeft = ({color="black", size=40, fillColor="none", width=1.5}: IconType) => {
    return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill={fillColor} xmlns="http://www.w3.org/2000/svg">
            <path d="M26.2498 4.7998L12.9598 18.6598C12.1098 19.5398 12.1098 20.9398 12.9598 21.8198L26.2498 35.6398" stroke={color} stroke-width={width} stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
}