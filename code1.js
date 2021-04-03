var canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var draw = canvas.getContext('2d')
let list = []
let press = false

class triangle {
    constructor(tx, ty, preX, preY, clr) {
        this.tx = tx;
        this.ty = ty;
        this.preX = preX;
        this.preY = preY;
        this.clr = clr;
    }
    drawing(draw) {
        draw.beginPath();
        draw.lineTo(this.tx, this.ty);
        draw.lineTo(this.tx - ((this.tx - this.preX) * 2), this.ty);
        draw.lineTo(this.preX, this.preY);
        draw.fillStyle = this.clr
        draw.strokeStyle = this.clr
        draw.stroke();
        draw.fill();
    }
    update(tx, ty, preX, preY) {
        this.tx = tx;
        this.ty = ty;
        this.preX = preX;
        this.preY = preY;
    }
}

color = ["Blue ", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow "];
let preX = null;
let preY = null;
let select = null;
let index=null;
let tempx=null;
let tempy=null;
let move=null;

function is_inside(x, y) {
    for (var i = 0; i < list.length; i++) {
        let rx = list[i].tx;
        let ry = list[i].ty;
        let lx = list[i].tx - ((list[i].tx - list[i].preX) * 2);
        let ly = list[i].ty;
        let px = list[i].preX;
        let py = list[i].preY;
        let main = Math.abs((px * (ry - ly) + rx * (ly - py) + lx * (py - ry)) / 2)
        sub1 = Math.abs(x * (py - ry) + px * (ry - y) + rx * (y - py)) / 2
        sub2 = Math.abs(x * (ry - ly) + rx * (ly - y) + lx * (y - ry)) / 2
        sub3 = Math.abs(x * (py - ly) / 2 + px * (ly - y) / 2 + lx * (y - py) / 2)
        if(move==true){
            select=select;
            index=index;
            return true;
    }
        else if(main == sub1 + sub2 + sub3){
            select = list[i]
            index=i
            return true
        }
    }
}

function is_drag(x, y) {
    if (x != preX || y != preY) {
        return true
    }
    else { return false }
}

canvas.addEventListener('mousedown', function (event) {
    press = true;
    move=false;
    preX = event.x;
    preY = event.y;
    tempx=event.x;
    tempy=event.y;
})

canvas.addEventListener('mouseup', function (event) {
    if (is_drag(event.x, event.y) && move==false) {
        if (!(is_inside(preX,preY))) {
            draw.clearRect(0,0,innerWidth,innerHeight)
            clr = color[Math.floor(Math.random() * color.length)]
            list.push(new triangle(event.x, event.y, preX, preY, clr));
            for(var i=0; i<list.length;i++){
                list[i].drawing(draw)
            }
            console.log(list)
        }
    }
    press = false
})

canvas.addEventListener('mousemove', function (event) {
    if (is_drag(event.x, event.y) && press == true && is_inside(event.x, event.y)) {
        move=true;
        console.log('moving');
        let chx=event.x-tempx;
        let chy=event.y-tempy;
        tempx=event.x;
        tempy=event.y;
        a=list[index].tx+chx;
        b=list[index].ty+chy;
        c=list[index].preX+chx;
        d=list[index].preY+chy;
        list[index].update(a,b,c,d);
        draw.clearRect(0,0,innerWidth,innerHeight);
        for(var i=0; i<list.length;i++){
            list[i].drawing(draw);
        }
    }
    else{
        move=false;
    }
}
)
canvas.addEventListener('dblclick', function(event){ 
    if (is_inside(event.x, event.y)){
        console.log('dbclick');
        list.splice(index,1)
        draw.clearRect(0,0,innerWidth,innerHeight)
        for(var i=0; i<list.length;i++){
            list[i].drawing(draw)
        }
    }
  });

function reset() {
    draw.clearRect(0, 0, canvas.width, canvas.height)
    list = []
}