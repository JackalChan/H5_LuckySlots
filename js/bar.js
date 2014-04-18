function Bar(obj)
{
  this.presspos = -1;
  this.size = 400;
  this.toppercent = -45;
  this.downpercent = -20;
  this.nowpercent = -45;
  this.hidetoppercent = -40;
  this.hidedownpercent = -30;
  this.polestatus = 1; // 1: up, 2: down, 3: hide
  this.obj = obj;
  this.releasetime;
  this.speed = 3;
}

Bar.prototype.startMoveBar = function(pos)
{
  clearTimeout(this.releasetime);
  this.presspos = pos;
}

Bar.prototype.moveBar = function(pos)
{
  if(this.presspos != -1)
  {
    var newp = (pos - this.presspos) / this.size * 100 + this.nowpercent;
    if(newp < this.toppercent)
    {
      newp = this.toppercent;
    }
    else if(newp > this.downpercent)
    {
      newp = this.downpercent;
    }

    if(this.changeObjPos(newp))
    {
      this.startMoveBar(pos);
    }
  }
}

Bar.prototype.changeObjPos = function(newp)
{
  if(newp != this.nowpercent)
  {
    this.obj.setTop(newp);
    this.changePoleStatus(newp);
    this.nowpercent = newp;
    return true;
  }
  return false;
}

Bar.prototype.changePoleStatus = function(newp)
{
  if(newp <= this.hidedownpercent && newp >= this.hidetoppercent &&
     this.polestatus != 3)
  {
    this.polestatus = 3; // hide
    this.obj.hidePole();
  }
  else if(newp > this.hidedownpercent && this.polestatus != 2)
  {
    this.polestatus = 2;
    this.obj.downPole();
  }
  else if(newp < this.hidetoppercent && this.polestatus != 1)
  {
    this.polestatus = 1;
    this.obj.upPole();
  }
}

Bar.prototype.endMoveBar = function()
{
  if(this.presspos != -1)
  {
    var f = function()
    {
      var newp = this.nowpercent - this.speed;
      console.log(newp);
      if(newp < this.toppercent)
      {
        newp = this.toppercent;
      }
      if(this.changeObjPos(newp))
      {
        if(newp == this.toppercent)
        {
          notifyBarOnTop();
        }
        else
        {
          this.releasetime = setTimeout(f.bind(this), 30, false);
        }
      }
    }
    this.presspos = -1;
    if(this.nowpercent == this.toppercent)
    {
      notifyBarOnTop();
    }
    else
    {
      f.call(this);
    }
  }
}

Bar.prototype.setTotalSize = function(size)
{
  this.size = size.replace('px', '');
}

Bar.prototype.setSpeed = function(val)
{
  this.speed = val;
}

function EleBar(head, pole)
{
  this.head = head;
  this.pole = pole;
}

EleBar.prototype.setTop = function(value)
{
  this.head.style.top = value + '%';
}

EleBar.prototype.hidePole = function()
{
  this.pole.style.visibility = 'hidden';
}

EleBar.prototype.downPole = function()
{
  var e = this.pole;
  e.className = e.className.replace('barpoleup', 'barpoledown');
  e.style.visibility = 'visible';
}

EleBar.prototype.upPole = function()
{
  var e = this.pole;
  e.className = e.className.replace('barpoledown', 'barpoleup');
  e.style.visibility = 'visible';
}

var obar;
var userAgent = navigator.userAgent.match('/Android|iPhone|iPad|iPod/i');
var isTouch = 'ontouchstart' in window;

function pressBar(event)
{
  obar.startMoveBar(getPointY(event));
  spin();
  sheetDelete();
}

function getPointY(event)
{
  if(isTouch)
  {
    return event.touches[0].clientY;
  }
  else
  {
    return event.clientY;
  }
}

function moveBar(event)
{
  event.preventDefault();
  obar.moveBar(getPointY(event));
}

function releaseBar(event)
{
  obar.endMoveBar();
}

function notifyBarOnTop()
{
  console.log('oh ya');
  rotateStop();
}

function initBar()
{
  var el = document.getElementById('startroll');
  obar = new Bar(new EleBar(el, document.getElementById('startpole')));
  obar.setSpeed(1);
  if(isTouch)
  {
    el.addEventListener('touchstart', pressBar, false);
    window.addEventListener('touchmove', moveBar, false);
    window.addEventListener('touchend', releaseBar, false);
  }
  else
  {
    el.addEventListener('mousedown', pressBar, false);
    window.addEventListener('mousemove', moveBar, false);
    window.addEventListener('mouseup', releaseBar, false);
  }
  el = document.getElementById('startbox');
  var cs = document.defaultView.getComputedStyle(el, null);
  obar.setTotalSize(cs.getPropertyValue('height'));
}
