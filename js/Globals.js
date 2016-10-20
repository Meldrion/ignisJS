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

function addClass(object, className) {
    var classes = object.className.split(" ");
    if (classes.indexOf(className) == -1) {
        object.className += " " + className;
    }
}

function removeClass(object, className) {

    var classes = object.className.split(" ");

    var classString = "";
    classes.forEach(function (theClass) {
        if (theClass != className) {
            classString += " " + theClass;
        }
    });

    object.className = classString;
}

function containsClass(object, className) {
    var classes = object.className.split(" ");
    return classes.indexOf(className) != -1;
}