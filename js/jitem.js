function Data()
{
// -------------test--------------
  this.lists = [ {'name': 'dinner', items: ['hambuger', 'rice'] }, {'name': 'winner', items: ['a', 'b', 'c']} ];
  this.select = this.lists[0].items;
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

Data.prototype.selectCategory = function(idx)
{
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
  this.lists = [ {'name': 'dinner', items: ['hambuger', 'rice'] }, {'name': 'winner', items: ['a', 'b', 'c']} ];
  savelists();
}

Data.prototype.getItemLists = function()
{
  return this.select;
}

var datas;
function onSelectCategory(idx)
{
  datas = new Data();
  var ellist = document.getElementById('itemlist');
  var result = '';
  console.log(datas.select);
  datas.select.forEach(function(a)
      {
        result += '<div contenteditable>' + a + '</div>';
      });
  ellist.innerHTML = result;
}
