var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

//переменные спавна противников
var spawn = 0;
var spawnrate = 200;
var shottime = 100;
var enArr = [];
var enemyshots = [];
var urshots = [];


var pressed = new Set();

var urblt = new Image();
var nmy = new Image();
var plane = new Image();
var bg = new Image();
var enemybulet = new Image();

urshots[0] =
    {
        x: 0,
        y: 0
    }

enArr[0] = {
    x: getRandomInRange(5, cvs.width - nmy.width - 5),
    y: getRandomInRange(10, cvs.height - nmy.height - 450),
    shot: 0
}

enemyshots[0] =
    {
        x: cvs.width,
        y: cvs.height
    }

urblt.src = "img/ublt.png";
enemybulet.src = "img/nmblt.png";
plane.src = "img/player.png";
nmy.src = "img/enemy.png";
bg.src = "img/bg.png";


//местонахождение самолетика?
var xPos = (cvs.width - plane.width) / 2;
var yPos = cvs.height - plane.height - 20;
var spd = 5.8;
var frate = 5;
var score = 0;


//прослушка управвления
document.addEventListener("keydown", function (event) {
    if (event.code == 'ArrowLeft') { pressed.add(event.code);; }
    if (event.code == 'ArrowRight') { pressed.add(event.code);; }
    if (event.code == 'ArrowUp') { pressed.add(event.code);; }
    if (event.code == 'ArrowDown') { pressed.add(event.code);; }
    if (event.code == 'Space') { pressed.add(event.code);; }
});

document.addEventListener('keyup', function (event) {
    pressed.delete(event.code);
});



// генерация случайного числа в диапозоне
function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}



//основной цикл
function draw() {
    ctx.drawImage(bg, 0, 0);
    ctx.drawImage(plane, xPos, yPos);

    frate += 1;
    spawn += 1;


    for (let i = 0; i < urshots.length; i++) {
        ctx.drawImage(urblt, urshots[i].x, urshots[i].y)
        urshots[i].y -= 6;
        if (urshots[i].y < 0 - urblt.height) { urshots.shift(urshots[i]) }
    }


    for (let i = 0; i < enArr.length; i++) {
        ctx.drawImage(nmy, enArr[i].x, enArr[i].y)
        enArr[i].shot += 1;

        if (enArr[i].shot >= shottime) {
            enemyshots.push(
                {
                    x: enArr[i].x + nmy.width / 2,
                    y: enArr[i].y,
                });
            enArr[i].shot = 0;
        }

        for (let j = 0; j < urshots.length; j++) {
            if ((urshots[j].x + urblt.width / 2 > enArr[i].x)
                && (urshots[j].x + urblt.width / 2 < enArr[i].x + nmy.width)
                && (urshots[j].y < enArr[i].y + nmy.width)
                && (urshots[j].y > enArr[i].y)) {
                enArr.splice(i, 1);
                urshots.splice(j, 1);
                score += 1;
                break;
            }
        }
    }

    if (spawn === spawnrate) {
        if (!(spawnrate == 35)) { spawnrate -= 5 }
        spawn = 0;
        enArr.push({
            x: getRandomInRange(5, cvs.width - nmy.width - 5),
            y: getRandomInRange(10, cvs.height - nmy.height - 450),
            shot: getRandomInRange(0, 99)
        });
    }

    for (let i = 0; i < enemyshots.length; i++) {
        ctx.drawImage(enemybulet, enemyshots[i].x, enemyshots[i].y);
        enemyshots[i].y += 6;
        if ((enemyshots[i].x + enemybulet.width / 2 > xPos+25)
            && (enemyshots[i].x + enemybulet.width / 2 < xPos + plane.width-25)
            && (enemyshots[i].y + enemybulet.height / 2 < yPos + plane.height)
            && (enemyshots[i].y + enemybulet.height / 2 > yPos)) {
            location.reload();
        }
        if (enemyshots[i].y > cvs.height + enemybulet.height) { enemyshots.shift(enemyshots[i]) }
    }
    if (pressed.has('ArrowLeft')) {
        xPos -= spd;
        if (xPos <= 10) { xPos += spd }
    }

    if (pressed.has('ArrowRight')) {
        xPos += spd
        if (xPos >= cvs.width - plane.width - 10) { xPos -= spd }
    }

    if (pressed.has('ArrowUp')) {
        yPos -= spd;
        if (yPos <= cvs.height - plane.height - 310) { yPos += spd }
    }

    if (pressed.has('ArrowDown')) {
        yPos += spd;
        if (yPos >= cvs.height - plane.height - 5) { yPos -= spd }
    }
    if (pressed.has('Space') && frate >= 25) {
        frate = 0;
        urshots.push({
            x: xPos + plane.width / 2,
            y: yPos
        });
    }
    ctx.fillStyle = "#ff0000";
    ctx.font = "25px Verdana";
    ctx.fillText("Подбито: " + score, 10, cvs.height - 20);
    requestAnimationFrame(draw);
}
bg.onload = draw;