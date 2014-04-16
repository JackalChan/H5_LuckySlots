function Bar(obj)
{
  this.presspos = -1;
  this.size = 400;
  this.toppercent = -60;
  this.downpercent = -10;
  this.nowpercent = -60;
  this.hidetoppercent = -45;
  this.hidedownpercent = -20;
  this.polestatus = 1; // 1: up, 2: down, 3: hide
  this.obj = obj;
}

Bar.prototype.startMoveBar = function(pos)
{
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
    
    if(newp != this.nowpercent)
    {
      this.obj.setTop(newp);
      this.changePoleStatus(newp);
      this.nowpercent = newp;
      this.startMoveBar(pos);
    }
  }
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
  this.presspos = -1;
}

Bar.prototype.setTotalSize = function(size)
{
  this.size = size.replace('px', '');
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

function pressBar(event)
{
  var el = event.currentTarget;
  obar.startMoveBar(event.clientY);
}

function moveBar(event)
{
  var el = event.currentTarget;
  obar.moveBar(event.clientY);
}

function releaseBar(event)
{
  obar.endMoveBar();
}

function init()
{
  var el = document.getElementById('startroll');
  obar = new Bar(new EleBar(el, document.getElementById('startpole')));
  el.addEventListener('mousedown', pressBar, false);
  window.addEventListener('mousemove', moveBar, false);
  window.addEventListener('mouseup', releaseBar, false);
  el = document.getElementById('startbox');
  var cs = document.defaultView.getComputedStyle(el, null);
  obar.setTotalSize(cs.getPropertyValue('height'));
}
