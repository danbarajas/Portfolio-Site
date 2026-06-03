import { tags } from '../data/vars.ts';

function hexToRgb(hex) {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return [r, g, b];
}

function rgbToHsl(rgb) {
    let [r, g, b] = rgb;
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function getYIQ(rgb) {
    const [r, g, b] = rgb;
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq;
}

function hslToString(hsl) {
    const [h, s, l] = hsl;
    return `hsl(${h}, ${s}%, ${l}%)`;
}

function yiqAdjust(hsl, yiq) {
    let [h, s, l] = hsl;

    if (yiq >= 128) {
        l = Math.max(0, l - (yiq - 128) * 4);
    } else {
        l = Math.min(100, l + (128 - yiq) * 4);
    }
    return [h, s, l];
}

function ProjectTag({ tag }) {
    let mainColor = tags.find((t) => t.name === tag)?.color ?? null;

    let style;
    if (mainColor === null) {
        style = {
            "--main-color": "var(--primary-light-muted)",
            "--sec-color": "color-mix(in srgb, var(--primary-light-muted) 20%, black)"
        };
    } else {
        let rgb = hexToRgb(mainColor);
        let yiq = getYIQ(rgb);
        let hsl = rgbToHsl(rgb);
        let secColor = hslToString(yiqAdjust(hsl, yiq));

        style = {
            "--main-color": mainColor,
            "--sec-color": secColor
        };
    }

    return (
        <div className="text-sm md:text-base font-medium bg-(--main-color) text-(--sec-color) rounded-full px-3 pb-1 pt-0.5 leading-none select-none hover:shadow-[0_2px_5px_2px] shadow-(color:--main-color)/60 hover:scale-105 hover:-translate-y-px transition-all" 
                style={style}>
            {tag}
        </div>
    );
}
export default ProjectTag;