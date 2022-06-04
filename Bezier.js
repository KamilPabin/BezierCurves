const P0cf = t => {
    return -1 * t ** 3 + 3 * t ** 2 - 3 * t + 1;
}

const P1cf = t => {
    return 3 * t * (t ** 2 - 2 * t + 1)
}

const P2cf = t => {
    return 3 * t ** 2 * (-1 * t + 1)
}

const P3cf = t => {
    return t * t * t
}

const P0 = {
    x: 100,
    y: 200
}

const P1 = {
    x: 300,
    y: 600
}

const P2 = {
    x: 2000,
    y: 100
}

const P3 = {
    x: 900,
    y: 1200
}

function draw() {
    var canvas = document.getElementById('bezier_canvas');

    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        ctx.beginPath();
        ctx.moveTo(P0.x, P0.y);
        for (let t = 0; t < 1; t = t + 0.001) {
            var point = newPoint(t)
            console.log(point)
            ctx.lineTo(point.x, point.y)
        }
        ctx.stroke()
        ctx.closePath()
    }
}

function newPoint(t) {
    return {
        x: P0.x * P0cf(t) + P1.x * P1cf(t) + P2.x * P2cf(t) + P3.x * P3cf(t),
        y: P0.y * P0cf(t) + P1.y * P1cf(t) + P2.y * P2cf(t) + P3.y * P3cf(t)
    }
}

draw()
