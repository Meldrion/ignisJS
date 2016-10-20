function fixCoords(x1, y1, x2, y2) {

    var swap;

    if (x2 < x1) {
        swap = x2;
        x2 = x1;
        x1 = swap;
        x2 += 1;
    } else {
        x2 += 1;
    }

    if (y2 < y1) {
        swap = y2;
        y2 = y1;
        y1 = swap;
        y2 += 1;
    } else {
        y2 += 1;
    }

    return {x1: x1, y1: y1, x2: x2, y2: y2};

}