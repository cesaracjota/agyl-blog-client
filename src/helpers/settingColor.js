export const lightenDarkenColor = (colorCode, amount) => {

    let usePound = false;

    if (colorCode[0] === "#") {
        colorCode = colorCode.slice(1);
        usePound = true;
    }
    const num = parseInt(colorCode, 16);
    let r = (num >> 16) + amount;

    if (r > 255) {
        r = 255;
    } else if (r < 0) {
        r = 0;
    }

    let b = ((num >> 8) & 0x00FF) + amount;

    if (b > 255) {
        b = 255;
    } else if (b < 0) {
        b = 0;
    }

    let g = (num & 0x0000FF) + amount;

    if (g > 255) {
        g = 255;
    } else if (g < 0) {
        g = 0;
    }
    let color = (g | (b << 8) | (r << 16)).toString(16);
    while (color.length < 6) {
        color = 0 + color;
    }
    return (usePound ? '#' : '') + color;
}