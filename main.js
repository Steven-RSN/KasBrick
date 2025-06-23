const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


let color=['green','yellow','orange','red']

let rectangleOrange = {
    x: 300,
    y: 550,
    width: 60,
    height: 10,
    color: 'orange',
    border: '1px solid red'
};

let rectangleRouge = {
    width: 50,
    height: 20,
    color: '#ff003c93'
};


function drawWall(rect) {
    let taille=Math.floor( canvas.width / (rectangleRouge.width+2))
    let sizeWall = taille*(rectangleRouge.width+2)
    let spacing= (canvas.width-sizeWall)/2
    console.log(spacing)
    let x = spacing;
    console.log(taille)
    console.log(x)
    let y = 4;
    let space = 2;

    for (let i = 0; i < taille ; i++) {
        

        ctx.fillStyle = rect.color;
   
        ctx.fillRect(x, y, rect.width, rect.height);
        x=x+rect.width +space
    }

}
drawWall(rectangleRouge)

function dessinerRectangle(rect) {
    ctx.fillStyle = rect.color;
    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
}

dessinerRectangle(rectangleOrange);
dessinerRectangle(rectangleRouge);

let balle = {
    x: rectangleOrange.x+(rectangleOrange.width/2),        
    y: rectangleOrange.y-(rectangleOrange.height/2),        
    rayon: 5,
    couleur: 'lightgrey'
};


function drawBalle(b) {
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.rayon, 0, Math.PI * 2); 
    ctx.fillStyle = b.couleur;
    ctx.fill();
    ctx.closePath();
}

drawBalle(balle);