var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;
var background_sound = new Audio('background_sound.mp3');
var end_sound = new Audio('end.mp3');
var jump_sound = new Audio('jump.mp3');

/*var img_background=[]
var img_background1= new Image();
img_background1.src ='bd1.png';
var img_background19= new Image();
img_background19.src ='bd19.png';
img_background=[img_background1,img_background19];*/
var img_background = new Image();
img_background.src ='bd4.png';
var back ={
    x:100,
    y:100,
    width :canvas.width/1,
    height:canvas.height/1,
    Image_index:0,
draw(p){
    ctx.drawImage(img_background,this.x, this.y, this.width, this.height);
    //ctx.fillStyle = 'green';
    //ctx.fillRect(this.x, this.y, this.width, this.height);
}
}
back.draw();

var img_user=[]
var img_user1= new Image();
img_user1.src ='cup1.png';
var img_user2 = new Image();
img_user2.src='cup2.png';
var img_user3 = new Image();
img_user3.src='cup3.png';
var img_user4= new Image();
img_user4.src='cup4.png';
var img_user5= new Image();
img_user5.src='cup5.png';
var img_user6= new Image();
img_user6.src='cup6.png';
var img_user7= new Image();
img_user7.src='cup7.png';
var img_user8= new Image();
img_user8.src='cup8.png';
var img_user9= new Image();
img_user9.src='cup9.png';
img_user=[img_user1,img_user2,img_user3,img_user4,img_user5,img_user6,img_user7,img_user8,img_user9];

var user = {
    x:30,
    y:500,
    width:100,
    height:100,
    Image_index:0,

    draw(a){
        //ctx.fillStyle = 'green';
        //ctx.fillRect(this.x, this.y, this.width, this.height);
  
        if(a%5==0){//5프레임 마다(0,1,2,3,4이후 1씩 Img_index증가)
            this.Image_index=(this.Image_index+1)%4;
        }
      ctx.drawImage(img_user[a%9],this.x,this.y,this.width,this.height);
      //ctx.drawImage(img_user[this.ing_index],this.x, this.y, this.width, this.height);
      /*  if(user.y<250){//점프모양 고정
            ctx.drawImage(img_user[0],this.x, this.y, this.width, this.height);
        }
        else{
            ctx.drawImage(img_user[this.ing_index],this.x, this.y, this.width, this.height);
        }*/
    }
}
user.draw(0);
var bombSpeed = 5;
var img_bomb = new Image();
img_bomb.src = "bomb.png";

class Bomb{
    constructor(){
        this.x = 1500;
        this.y = 500;
        this.width = 20;
        this.height = 20;
        this.speed = bombSpeed;
    }

    draw(){
        //ctx.fillStyle="red";
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(img_bomb, this.x, this.y);
    }
}


//var bomb = new Bomb();
//bomb.draw();

var timer = 0;
var bombs = [];
var jumpingTimer = 0; //60프레임 세주는 변수
var animation;


function frameSecond(){
    //배경추가
    animation = requestAnimationFrame(frameSecond);
    ctx.clearRect(0,0, canvas.width, canvas.height);
    back.draw();
    timer++;
    gameScore();
    

    background_sound.play(); //배경음악 재생

    if(timer%60==0){
        var bomb = new Bomb();
        bombs.push(bomb);
    }
   
    bombs.forEach((b,i,o)=>{
        if(b.x<0){
            o.splice(i,1);
        }
        b.x=b.x-10;
        
        //bomb점수추가
        bomb_gameScore(b.x);

        collision(user,b);
        b.draw()
    })
    

   
    if(jumping ==true){
        user.y=user.y-5;
        jumpingTimer++;
    }
    if(jumpingTimer>30){
        jumping = false;
        jumpingTimer = 0;
    }
    if(jumping ==false ){
        user.y=user.y+2;
    }
    user.draw(timer);
}

frameSecond();

function collision(user, bomb){
    var x_diff = bomb.x - (user.x+user.width);
    var y_diff = bomb.y - (user.y+user.height);
    if(x_diff<0 && y_diff<0){
        //ctx.clearRect(0,0, canvas.width, canvas.height);
        cancelAnimationFrame(animation);
        ctx.fillStyle = "red";
        ctx.font = '60px 궁서체';
        ctx.fillText('GAME OVER', canvas.width/2, canvas.height/9);
        ctx.font ='60px 맑은고딕';
        ctx.fillStyle='black';
        ctx.fillText('점프게임:',canvas.width/5, canvas.height/10);
        background_sound.pause();
        end_sound.play();
    }
}


var jumping = false;
document.addEventListener('keydown', function(e){
    if(e.code =="Space"){
        jumping = true;
       jump_sound.play();


    }
})

function gameScore(){
    ctx.font ='20px 맑은고딕';
    ctx.fillStyle='black';
    ctx.fillText('시간:'+Math.round(timer/100),10,30);
}

var score = 0;
function bomb_gameScore(x){
    ctx.font = '20px 맑은 고딕';
    ctx.fillStyle = 'black';

    if(x==0){
        score++;
    }
    ctx.fillText('SCORE : '+score, 10,60);
}
document.addEventListener('keydown', function(e){
    var moveAmount = 10; // 한번에 움직일 픽셀 수
    if(e.key.toLowerCase() === 'a'){
        user.x -= moveAmount; // 'a'키를 누르면 왼쪽으로 이동
    }
    if(e.key.toLowerCase() === 'd'){
        user.x += moveAmount; // 'd'키를 누르면 오른쪽으로 이동
    }
    if(e.key.toLowerCase() === 's'){
        user.y += moveAmount; // 'a'키를 누르면 왼쪽으로 이동
    }
})
