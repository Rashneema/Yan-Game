
var bg,backgroundimg
var sprite;

var jerryImgRight,jerryImgLeft,jerryImgUp,jerry

var tom, tomImgLeft,tomImgRight;

var cheese,cheeseImg,cheeseGrp,cheesecount=0

var heart,lifes=3

var level=0

var level2bg

var fireImg, fireSp, fireGrp

var bg_sound,eating_sound;

var catImg,cat

function preload() {
    backgroundimg = loadImage('assets/kitchenbg.jpg')

    jerryImgRight = loadAnimation("assets/jerry1.png","assets/jerry2.png","assets/jerry3.png","assets/jerry4.png")
    jerryImgLeft = loadAnimation("assets/jerryl1.png","assets/jerryl2.png","assets/jerryl3.png","assets/jerryl4.png")

    cheeseImg = loadImage("assets/cheese.png")

 
      tomImgLeft=loadAnimation("assets/tom1.png",'assets/tom2.png','assets/tom3.png','assets/tom4.png');


      tomImgRight=loadAnimation("assets/tom1r.png",'assets/tom2r.png','assets/tom3r.png','assets/tom4r.png');

    heart = loadImage("assets/heart.png")

    level2bg = loadImage("assets/level2bg.jpg")

    fireImg = loadImage("assets/firecracker.png")

    bg_sound=loadSound("assets/bg_sound.mp3")
    eating_sound = loadSound("assets/eating_sound.mp3")

    catImg = loadAnimation("assets/cata.png","assets/catb.png","assets/catc.png","assets/catd.png")
    
}

function setup() {
    createCanvas(windowWidth,windowHeight)

    jerry = createSprite(200,height-50)
    jerry.addAnimation("runningRight",jerryImgRight)
    jerry.addAnimation("runningLeft",jerryImgLeft)

    tom=createSprite(width-100,height-100);
    tom.addAnimation('tomLeft',tomImgLeft);
    tom.addAnimation('tomRight',tomImgRight);
    tom.scale=1.5

    tom.visible = false
    jerry.visible = false

    cheeseGrp = createGroup()

    fireGrp = createGroup()

    catGrp = createGroup()

 
    bg_sound.play()
    
    
}

function draw() {

  if(level==0){
    background(backgroundimg)
    start()
  }


  if(!bg_sound.isPlaying()){
    bg_sound.play()
  }
   

  if(level==1){

    background(backgroundimg)

    tom.visible = true
    jerry.visible = true
    move()

    if(cheesecount!=13){
      spawnCheese()
    }


    if(cheesecount==2){
   
      tom.visible=false
      jerry.visible=false
      level1complete();
    }


  }

  if(level==2){
    background(level2bg)
    tom.visible = true
    jerry.visible = true
    move()
   
    
    if(cheesecount!=23){
      spawnCheese()
    }

    spawnfire()
    spawnCats()
    
  }

 





jerry.collide(cheeseGrp,(j,chs)=>{
    chs.remove()
    eating_sound.play()
    cheesecount += 1
})

if(tom.isTouching(jerry)){
    lifes -= 1
    jerry.x = 200
    jerry.y = height-50
}

if(lifes == 0){
    tom.remove()
    jerry.remove()
    cheeseGrp.destroyEach()
    gameOver()
}


  image(cheeseImg,width - 180,70,120,70)
    textSize(30)
    fill ("black")
    text(cheesecount,width - 130,125)

    for(i = 0; i < lifes; i++){
        image(heart,30+(i*70),50,40,40)
    }

    drawSprites()
}



function spawnCheese(){
  if(frameCount % 200 === 0){
    cheese = createSprite(random(0,width),random(0,height))
    cheese.addImage(cheeseImg)
    cheese.scale = 0.09
    cheeseGrp.add(cheese)
    cheese.lifetime = 3000
  }
}

function spawnfire(){
  if(frameCount % 200 === 0){
    fireSp = createSprite(random(0,width),random(0,height))
    fireSp.addImage(fireImg)
    fireSp.scale = 0.18
    fireGrp.add(fireSp)
    fireSp.lifetime = 1000
  }
}

function spawnCats(){
  if(frameCount % 200 === 0){
    cat = createSprite(random([0,width]),random(0, height))
    cat.addAnimation("running cat",catImg)
    cat.scale = 2
    catGrp.add(cat)
    cat.lifetime = 1000

    if(cat.position.x<=width/2){
      cat.velocityX =5
   
    cat.mirrorX(cat.mirrorX() * -1);
  }  
  else{
      cat.velocityX =-5
     
  }
  }
}

function gameOver(){
  swal(
    {
      title: `Tom caught Jerry!`, 
      text: "Thanks for playing!!",
      imageUrl:"assets/tomLaugh.jpg",
      imageSize:"300x300",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}

function start(){
  swal(
    {
      title: `Welcome to\n Tom Chase Jerry!`, 
      text: "A 2 player game-Tom and Jerry.\nRules:\n1.Press arrows to move Jerry\n2.Press AWSD to move Tom\n3.Jerry should eat 10 cheese to win the level.\nStay away from Tom!!\n4.Tom wins if Jerry loses 3 lives",
      imageUrl:"assets/titleImage.webp",
      imageSize:"300x300",
      confirmButtonText: "Let's Start"
    },
    function(isConfirm) {
      if (isConfirm) {
      level = 1
      }
    }
  );
}

function level1complete(){
  swal(
    {
      title: `You Win Jerry!\nWell done!!!`, 
      text: "Eat 20 cheese to win the game\n collect bombs \n press on Tom to blast",
      imageUrl:"assets/happyJerry.jpg",
      imageSize:"300x300",
      confirmButtonText: "Play Level 2 "
    },
    function(isConfirm) {
      if (isConfirm) {
        cheesecount = 0
        lifes=3
        level = 2
        jerry.x = 200
        jerry.y = height-50
        tom.x = width-100
        tom.y = height-100

        jerry.changeAnimation("runningRight")
        tom.changeAnimation("tomLeft")

       
      }
    }
  );
}

function move(){
  if(keyDown(RIGHT_ARROW)){
    jerry.changeAnimation("runningRight")
    jerry.rotation = 0
    jerry.x+=5
}

if(keyDown(LEFT_ARROW)){
    jerry.rotation=0
    jerry.changeAnimation("runningLeft")
   
    jerry.x-=5
   
} 

if(keyDown(UP_ARROW)){
    jerry.changeAnimation("runningRight")
  
    jerry.rotation=300
    jerry.y-=5
   
}

if(keyDown(DOWN_ARROW)){
    jerry.changeAnimation("runningRight")
    jerry.rotation=100
    jerry.y+=5
   
}


if(keyDown('d')){
    tom.changeAnimation("tomRight")
    tom.rotation = 0

    tom.x+=5
}

if(keyDown('a')){
    tom.rotation=0
    tom.changeAnimation("tomLeft")
   
    tom.x-=5
} 

if(keyDown('w')){
    tom.changeAnimation("tomLeft")
  
    tom.rotation=100
    tom.y-=5
}

if(keyDown('s')){
    tom.changeAnimation("tomLeft")
    tom.rotation=290
    tom.y+=5
}

}