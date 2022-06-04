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

const resize = e => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    draw()
}

const P0 = {
    name: 'P0',
    x: 100,
    y: 200,
    r: 5
}

const P1 = {
    name: 'P1',
    x: 300,
    y: 600,
    r: 5
}

const P2 = {
    name: 'P2',
    x: 2000,
    y: 100,
    r: 5
}

const P3 = {
    name: 'P3',
    x: 900,
    y: 1200,
    r: 5
}

const POINTS = [P0, P1, P2, P3]

const canvas = document.getElementById('bezier_canvas')
const ctx = canvas.getContext('2d')

let isDragging = false
let draggingPoint

function draw() {

    drawCircle(ctx, P0)
    drawCircle(ctx, P1)
    drawCircle(ctx, P2)
    drawCircle(ctx, P3)

    drawLine(ctx, P0, P1)
    drawLine(ctx, P2, P3)

    ctx.beginPath();
    ctx.moveTo(P0.x, P0.y);
    for (let t = 0; t < 1; t = t + 0.01) {
        const point = newPoint(t)
        ctx.lineTo(point.x, point.y)
    }
    ctx.stroke()
    ctx.closePath()
}

function newPoint(t) {
    return {
        x: P0.x * P0cf(t) + P1.x * P1cf(t) + P2.x * P2cf(t) + P3.x * P3cf(t),
        y: P0.y * P0cf(t) + P1.y * P1cf(t) + P2.y * P2cf(t) + P3.y * P3cf(t)
    }
}

function drawCircle(ctx, p) {
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.fill()
}

function drawLine(ctx, p0, p1) {
    ctx.beginPath()
    ctx.moveTo(p0.x, p0.y)
    ctx.lineTo(p1.x, p1.y)
    ctx.closePath()
    ctx.stroke()
}

canvas.addEventListener('mousedown', e => {
    isDragging = true
    let x = e.offsetX
    let y = e.offsetY
    for (let p of POINTS) {
        if (isOverThePoint(p, x, y)) {
            draggingPoint = p
            return
        }
    }
})

canvas.addEventListener('mouseup', e => {
    isDragging = false
    draggingPoint = undefined
})

canvas.addEventListener('mousemove', e => {
    if (!isDragging || draggingPoint === undefined) {
        return
    }
    draggingPoint.x = e.offsetX
    draggingPoint.y = e.offsetY
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    draw()
})

function isOverThePoint(p, x, y) {
    return x < p.x + 2 * p.r && x > p.x - 2 * p.r && y > p.y - 2 * p.r && y < p.y + 2 * p.r
}

window.addEventListener('resize', resize)
resize()

draw()
