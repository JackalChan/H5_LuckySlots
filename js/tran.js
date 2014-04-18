function Tran()
{
  this.mainContainer = document.getElementById('main-container');
  this.itemContainer = document.getElementById('item-container');
  this.menuContainer = document.getElementById('menu-container');
  this.arr = [this.mainContainer, this.itemContainer, this.menuContainer];

  this.mainContainer.style.display = 'block';
  this.mainContainer.style.width = '100%';
  this.mainContainer.style.height = '100%';
  this.itemContainer.style.display = 'block';
  this.itemContainer.style.width = '100%';
  this.itemContainer.style.height = '100%';
  this.menuContainer.style.display = 'block';
  this.menuContainer.style.width = '100%';
  this.menuContainer.style.height = '100%';

  this.mainContainer.style.position = 'absolute';
  this.itemContainer.style.position = 'absolute';
  this.menuContainer.style.position = 'absolute';

  this.mainContainer.style.zIndex = 999;
  this.itemContainer.style.zIndex = -999;
  this.itemContainer.style.opacity = 0;
  this.menuContainer.style.zIndex = -999;
  this.menuContainer.style.opacity = 0;
}

Tran.prototype.show = function(str)
{
  var hide = null;
  var display = null;

  if(str == 'menu')
  {
    display = this.menuContainer;
  }
  else if(str == 'item')
  {
    display = this.itemContainer;
  }
  else if(str == 'main')
  {
    display = this.mainContainer;
  }
  var a = this.arr;
  a.forEach(function(el)
      {
        if(el.style.zIndex == 999)
        {
          hide = el;
        }
      })
  hide.style.zIndex = -100;
  hide.style.opacity = 0;
  hide.className = hide.className.replace(' tran_display', '') + ' tran_hide';
  display.style.zIndex = 999;
  display.style.opacity = 1;
  display.className = display.className.replace(' tran_hide', '') + ' tran_display';
}

var idxtran;
function initTran()
{
  idxtran = new Tran();
}
