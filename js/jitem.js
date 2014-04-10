// -------------test--------------
var lists = [ {'name': 'dinner', items: ['hambuger', 'rice'] }, {'name': 'winner', items: ['a', 'b', 'c']} ];
var select = lists[0];
// -------------test--------------

// add name
function addItem(name)
{
  select.push(name);
  savelists();
}

// remove item array[idx]
function removeItem(idx)
{
  select.splice(idx, 1);
  savelists();
}

function selectCategory(idx)
{
  select = lists[idx];
}

function loadlists()
{
  lists = JSON.parse(localStorage['lists']);
}

function savelists()
{
  localStorage['lists'] = JSON.stringify(lists);
}

function setlists()
{
  // for test
  lists = [ {'name': 'dinner', items: ['hambuger', 'rice'] }, {'name': 'winner', items: ['a', 'b', 'c']} ];
  savelists();
}

function onSelectCategory(idx)
{
}
