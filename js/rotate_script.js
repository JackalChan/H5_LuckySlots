var restaurants;

// var colors = ["#FFF", "#3AB745", "#029990", "#3501CB",
// "#2E2C75", "#673A7E", "#CC0071", "#F80120",
// "#F35B20", "#FB9A00", "#FFCC00", "#FEF200"];
//var colors = ["#FC7EA3", "#F7F4A5", "#FC7EA3", "#F7F4A5", "#FC7EA3", "#F7F4A5", "#FC7EA3", "#F7F4A5", "#FC7EA3", "#F7F4A5"];
var colors = ["#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff"];
// var restaurants = ["雞肉飯1", "肯德基2", "麥當勞3", "Pizza",
// "雞肉飯4", "肯德基5", "麥當勞6", "肯德基7",
// "肯德基8", "麥當勞9", "盧肉販1", "盧肉販2"];

var startAngle = 0;
var arc = Math.PI / 5;
var spinTimeout = null;

var spinArcStart = 10;
var spinTime = 0;
var spinTimeTotal = 0;
var wheelStop = false;
var ctx;

window.onload = function() {
  initEvent();
  menuList.load();

  initBar();
  initSheet();
  initTran();

  getMenuList();
  loadOptionImages();
  initLightbox();

  setVolume("audio-bgm", 0.3);
  playSound("audio-bgm");
}
var menusName=[];
function getMenuList(){
  $("#selectMenu").empty();
    for(i in menuList.menus){
      menusName[i]=menuList.menus[i].name;
      console.log(menusName[i]);
      $("#selectMenu").prepend("<option value="+i+">"+menusName[i]+"</option>");
      
    }
    restaurants = menuList.menus[i].items;

    draw();
}

$('#selectMenu').change(function(){
    console.log($( "select option:selected" ).attr('value'));
    var number=$( "select option:selected" ).attr('value');
    restaurants = menuList.menus[number].items;
    draw();
});

function draw() {
  drawRouletteWheel();
}

function drawRouletteWheel() {
  var canvas = document.getElementById("wheelcanvas");
  if (canvas.getContext) {
    var outsideRadius = 200;
    var textRadius = 160;
    var insideRadius = 25;
    
    ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,500,500);
    
    
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    
    ctx.font = 'bold 1.8vw Arial';
    
    // ctx.fillStyle = "#F00";
    // ctx.beginPath();
    // ctx.arc(250, 250, outsideRadius+40, 0, Math.PI*2, false);
    // ctx.fill();

    // ctx.fillStyle = "#FEFF01";
    // ctx.beginPath();
    // ctx.arc(250, 250, outsideRadius+10, 0, Math.PI*2, false);
    // ctx.fill();

    for(var i = 0; i < 10; i++) {
      var angle = startAngle + i * arc;
      
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(250 + Math.cos(angle)*225, 250 - Math.sin(angle)*225, 5, 0, Math.PI*2, false);
      ctx.fill();

      ctx.fillStyle = colors[i];
      ctx.beginPath();
      ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
      ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
      ctx.stroke();
      ctx.fill();
      
      ctx.save();
      //ctx.shadowOffsetX = -1;
      //ctx.shadowOffsetY = -1;
      //ctx.shadowBlur    = 0;
      ctx.shadowColor   = "rgb(220,220,220)";
      ctx.fillStyle = "black";
      ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius, 250 + Math.sin(angle + arc / 2) * textRadius);
      
      //ctx.rotate( Math.PI*0.5);

      var text = restaurants[i%restaurants.length]; 
      //console.log(text);
      for(j=0;j<text.length;j++)
      {
        ctx.save();
        var x = 250 + Math.cos(angle + arc / 2) * textRadius;
        var y = 250 + Math.sin(angle + arc / 2) * textRadius;
        //console.log(x-250,-y+250);
        //console.log(text[j]);
        //ctx.rotate(Math.atan((x-250)/(-y+250)));
        ctx.rotate(angle + arc / 2 + Math.PI / 2);
        ctx.fillText(text[j], -ctx.measureText(text).width / 6, 20*j );
        ctx.restore();
      }
      //ctx.rotate( Math.PI*0.5);
      //ctx.translate(100,300);
      ctx.restore();
    }

    //Arrow
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
    ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
    ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
    ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
    ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
    ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
    ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
    ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
    ctx.fill();
  }
}

function spin() {
  wheelStop = false;
  spinAngleStart = Math.random() * 10 + 10;
  spinTime = 0;
  spinTimeTotal = 4800;
  rotateWheel();
  playSound('audio-pull');
  playSound('audio-spin');
}

function rotateStop() {
  wheelStop = true;
  console.log('msg')
} 

function rotateWheel() {
  if(wheelStop) {
    spinTime += 10;
    if(spinTime >= spinTimeTotal) {
      stopRotateWheel();
      sheetDown();
      playSound('audio-print');
      return;
    }
  }
  var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
  startAngle += (spinAngle * Math.PI / 180);
  drawRouletteWheel();
  spinTimeout = setTimeout('rotateWheel()', 30);
}

function stopRotateWheel() {
  clearTimeout(spinTimeout);
  var degrees = startAngle * 180 / Math.PI + 90;
  var arcd = arc * 180 / Math.PI;
  var index = Math.floor((360 - degrees % 360) / arcd);
  ctx.save();
  ctx.font = 'bold 30px sans-serif';
  var text = restaurants[index%restaurants.length];
  //ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 10);
  ctx.restore();

  console.log(story1Img[text]);
  
  if(story1Img[text]) {
    var lightbox = document.getElementById('lightbox');
    var boxImage = document.getElementById('boxImage');
    boxImage.src = story1Img[text];
    lightbox.classList.remove('lightbox-hide');
    lightbox.classList.add('lightbox-show');
  }

  document.getElementById('ripper').innerHTML = text;
}

function easeOut(t, b, c, d) {
  var ts = (t/=d)*t;
  var tc = ts*t;
  return b+c*(tc + -3*ts + 3*t);
}

function playSound(id) {
  var a = document.getElementById(id);
  if(!a.paused) {
    a.pause();
    a.currentTime = 0;
  }
  a.play();
}
function setVolume(id, volume) {
  var a = document.getElementById(id);
  a.volume = volume;
}

var story1Img = [];
function loadOptionImages() {
  story1Img ['比基尼'] = 'images/pedro/bikini.png';
  story1Img ['丁字褲'] = 'images/pedro/gstring.png';
  story1Img['印度阿三'] = 'images/pedro/india.png';
  story1Img['蘇格蘭裙'] = 'images/pedro/scotland.png';
}
