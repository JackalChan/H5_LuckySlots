function Data()
{
// -------------test--------------
  this.lists = [ {'name': 'dinner', items: ['hamburger', 'rice'] }, {'name': 'winner', items: ['a', 'b', 'c']} ];
  this.select = this.lists[0].items;
  this.catidx = 0;
// -------------test--------------

}

// add name
Data.prototype.addItem = function(name)
{
  this.select.push(name);
  this.savelists();
}

// remove item array[idx]
Data.prototype.removeItem = function(idx)
{
  this.select.splice(idx, 1);
  this.savelists();
}

// set array[idx] as name
Data.prototype.modifyItem = function(idx, name)
{
  this.select[idx] = name;
  this.savelists();
}

Data.prototype.selectCategory = function(idx)
{
  this.catidx = idx;
  this.select = this.lists[idx].items;
}

Data.prototype.loadlists = function()
{
  this.lists = JSON.parse(localStorage['lists']);
}

Data.prototype.savelists = function()
{
  localStorage['lists'] = JSON.stringify(this.lists);
}

Data.prototype.setlists = function()
{
  // for test
  this.lists = [ {'name': 'dinner', items: ['hamburger', 'rice'] }, {'name': 'winner', items: ['a', 'b', 'c']} ];
  savelists();
}

Data.prototype.getItemLists = function()
{
  return this.select;
}

Data.prototype.getCategory = function()
{
  var arr = [];
  this.lists.forEach(function(a)
      {
        arr.push(a.name);
      });
  return arr;
}

Data.prototype.getCatIdx = function()
{
  return this.catidx;
}

var datas = new Data();

function initItem()
{
  datas.loadlists();
  datas.selectCategory(0);
  displayItemList();
  displayCategory();
  resizeBudy();
}

function resizeBudy()
{
  console.log('o');
  var h = window.outerHeight * 0.97;
  var w = window.outerWidth * 0.97;
  var el = document.getElementById('mainitem').style;
  el.width = w.toString() + 'px';
  el.height = h.toString() + 'px';
}

function displayCategory()
{
  var cat = datas.getCategory();
  var len = cat.length;
  var catidx = datas.getCatIdx();
  if(catidx >= 0 && len > 0)
  {
    var precatidx = catidx - 1;
    if(precatidx < 0)
    {
      precatidx += len;
    }
    var sufcatidx = catidx + 1;
    if(sufcatidx == len)
    {
      sufcatidx -= len;
    }
    var ids = 'category';
    var el = document.getElementById('m' + ids);
    el.innerHTML = cat[catidx];
    el = document.getElementById('l' + ids);
    el.innerHTML = cat[precatidx];
    el = document.getElementById('r' + ids);
    el.innerHTML = cat[sufcatidx];
  }
}

function onSelectCategory(idx)
{
  displayItemList();
}

function displayItemList()
{
  var ellist = document.getElementById('itemlist');
  var result = '';
  var i = 0;
  datas.getItemLists().forEach(function(a)
      {
        result += '<div class="oneitem"><span contenteditable onblur="onModifyItem(event, ' + i + ')">' + a + '</span><span class="deleteitem" onclick="onRemoveItem(' + i + ')">X</span></div>';
        i++;
      });
  ellist.innerHTML = result;
}

function onModifyItem(event, idx)
{
  var el = event.target;
  datas.modifyItem(idx, el.innerHTML);
  displayItemList();
}

function onRemoveItem(idx)
{
  datas.removeItem(idx);
  displayItemList();
}

function onAddItem()
{
  var el = document.getElementById('newitem');
  var s = el.innerHTML;
  if(s != '')
  {
    datas.addItem(s);
    el.innerHTML = '';
    displayItemList();
  }
}

var presst = null;
var leftpos = 0;
function preCategory()
{
  console.log('i');
  preset = setTimeout(preCategory, 300);
  leftpos++;
  var ids = 'category';
  var els = ['l', 'm', 'r'];
  els.forEach(function(a)
      {
        var name = a + ids;
        var el = document.getElementById(name).style;
        el.left = '-' + leftpos + '%';
      });
}

function stopSelect()
{
  clearTimeout(preset);
}
