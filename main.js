const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const score = document.getElementById('score')

 
let count = 0;
let leftDirection = false;
let rightDirection = false;
let speedDirection = 8;

let ballMove = false;

document.addEventListener('keydown', function (e) {

    if (e.key === "ArrowLeft") {
        leftDirection = true;

    } else if (e.key === "ArrowRight") {
        rightDirection = true;
    }

});

document.addEventListener("keyup", function (event) {

    if (event.key === "ArrowLeft") {
        leftDirection = false;

    } else if (event.key === "ArrowRight") {
        rightDirection = false;
    }
});

document.addEventListener('click', function () {
    ballMove = true
})

let color = ['green', 'yellow', 'orange', 'red']

let rectangleOrange = {
    x: 300,
    y: 550,
    width: 60,
    height: 10,
    color: 'orange',
    border: '1px solid red'

};

let rectangleRouge = { //rajoute des vie aux briks connard !
    width: 50,
    height: 20,
    color: '#ff003c93'
};

let brikListe=[];
function drawWall(rect) {
    let taille = Math.floor(canvas.width / (rectangleRouge.width + 2))
    let sizeWall = taille * (rectangleRouge.width + 2)
    let spacing = (canvas.width - sizeWall) / 2
    
    brikListe = []
    //  console.log(spacing)
    let x = spacing;
    // console.log(taille)
    // console.log(x)
    let y = 4;
    let space = 2;

    for (let i = 0; i < taille; i++) {
        brikListe.push({
            X: x,
            Y: y ,
            width: rect.width,
            height: rect.height,
            longeurX: (x+rect.width),
            largeurY: (y+rect.height)
        })

        ctx.fillStyle = rect.color;

        ctx.fillRect(x, y, rect.width, rect.height);
        x = x + rect.width + space

    }

}


function dessinerRectangle(rect) {
    ctx.fillStyle = rect.color;
    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
}



let balle = {
    x: rectangleOrange.x + (rectangleOrange.width / 2),
    y: rectangleOrange.y - (rectangleOrange.height / 2),
    rayon: 5,
    couleur: 'lightgrey',
    directionX: 3,
    directionY: -3,
};


function drawBalle(b) {
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.rayon, 0, Math.PI * 2);
    ctx.fillStyle = b.couleur;
    ctx.fill();
    ctx.closePath();
}


dessinerRectangle(rectangleRouge);

drawWall(rectangleRouge);

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    brikListe.forEach(function(brik) { //solution provisoire a corriger !!
        ctx.fillStyle = rectangleRouge.color;
        ctx.fillRect(brik.X, brik.Y, brik.width, brik.height);
    });

    dessinerRectangle(rectangleOrange);
    drawBalle(balle);

    if (ballMove) {
        balle.x += balle.directionX;
        balle.y += balle.directionY;

        if (balle.x >= rectangleOrange.x &&
            balle.x <= rectangleOrange.x + rectangleOrange.width &&
            balle.y + balle.rayon >= rectangleOrange.y) {
            balle.directionY = -5
        }

        brikListe=brikListe.filter(function(brik) {
           // console.log(brik) 
            const destruction = (
                balle.x + balle.rayon > brik.X &&
                balle.x - balle.rayon < brik.X +brik.width &&
                balle.y + balle.rayon > brik.Y &&
                balle.y - balle.rayon < brik.Y +brik.height);
            
            if(destruction){
                console.log('touché!!!')
                balle.directionY = -balle.directionY;
                count++
                score.textContent=`Score : ${count}`
            }
            return !destruction;
        });

        

        if (balle.x + balle.rayon >= 600) {
            balle.directionX = -4

        } else if (balle.x - balle.rayon <= 0) {
            balle.directionX = 4;
            
        }

        if (balle.y + balle.rayon >= 600) {
            balle.directionY = -4
            console.log("perdu")
            loser()

        } else if (balle.y - balle.rayon <= 0) {
            balle.directionY = 4;
            
        }
    }

    if (leftDirection && rectangleOrange.x > 0) {
        rectangleOrange.x -= speedDirection;
    }
    if (rightDirection && rectangleOrange.x + rectangleOrange.width < canvas.width) {
        rectangleOrange.x += speedDirection;
    }



    requestAnimationFrame(update);
}

function loser(){
    const div =document.createElement('div');
    div.classList.add('pancarte');
    document.body.appendChild(div);

    const h2= document.createElement('h2');

    h2.innerText= 'Perdu fils de pute!🖕 ';
    h2.classList.add('h2');
    div.appendChild(h2);

    const p = document.createElement('p');
    p.classList.add('Pscore');
    p.innerText =`Score : ${count}`; //score.value
    div.appendChild(p);

    const btnRejouer= document.createElement('button');
    btnRejouer.classList.add('btnRejouter');
    btnRejouer.innerText= 'Rejouer';

    btnRejouer.addEventListener('click',function(){
        
       // update();

    })

    div.appendChild(btnRejouer);

    
}


update();

//TODO : Mettre le jeu en pause !!