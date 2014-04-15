var nowMenu;
var menuList = {

	menus: [],

	// load whole menulist from localstorage
	load: function() {
		if(localStorage.getItem("LuckyShots")!=null) {
			var data = JSON.parse(localStorage.getItem("LuckyShots")).menus;
			for(var i in data) {
				this.menus[i] = new MENU();
				this.menus[i].exist = true;
				this.menus[i].name = data[i].name;	
				this.menus[i].items = data[i].items;
			}
			console.log(this.menus);
		}
		this.update();
	},

	// add a menu
	add: function() {
		nowMenu = new MENU();
		nowMenu.clearScene();
		this.show('item');
	},

	modify: function(index) {
		nowMenu = this.menus[index];
		nowMenu.clearScene();
		nowMenu.update();
		nowMenu.showName();
		this.show('item');
	},

	// update page
	update: function() {
		var list = document.getElementById('menu-list');

		// delete all menus in page
		while(list.hasChildNodes()) {
			list.removeChild(list.lastChild);
		}
		// append all menus in page
		for(var i in this.menus) {
			var row = document.createElement('div');
			row.innerHTML = this.menus[i].name;
			row.setAttribute("onclick", "menuList.modify("+i+")");
			list.appendChild(row);
		}
	},

	show: function(str) {
		var menuContainer = document.getElementById('menu-container');
		var itemContainer = document.getElementById('item-container');
		if(str == 'menu') {
			menuContainer.style.display = 'block';
			itemContainer.style.display = 'none';
		}
		else if(str == 'item') {
			menuContainer.style.display = 'none';
			itemContainer.style.display = 'block';
		}
		this.update();
	},

	clear: function() {

	},

	back: function() {

	}
}

window.onload = function() {
	initEvent();
	menuList.load();
}

function initEvent() {
	var addItemButton = document.getElementById('add-item-button');
	var addItemText = document.getElementById('add-item-text');
	addItemButton.onclick = function() {
		nowMenu.addItem(addItemText.value);
		addItemText.value = '';
	}
}

/* Object */
function MENU() {
	
	this.exist = false;
	this.name = 'test';
	this.items = [];

	this.addItem = function(itemName) {
		if(itemName == '') {
			alert('Please input item name');
			return;
		}
		this.items.push(itemName);
		this.update();
	}

	this.deleteItem = function(index) {
		this.items.splice(index, 1);
		this.update();
	}

	this.showName = function() {
		document.getElementById('menu-title').value = this.name;
	}

	this.update = function() {
		var list = document.getElementById('item-list');

		// delete all items in page
		while(list.hasChildNodes()) {
			list.removeChild(list.lastChild);
		}
		// append all items in page
		for(var i in this.items) {
			var row = document.createElement('div');
			var text = document.createElement('span');
			var del = document.createElement('button');
			text.innerHTML = this.items[i];
			del.innerHTML = "X"
			del.setAttribute("onclick", "nowMenu.deleteItem("+i+")");
			row.appendChild(text);
			row.appendChild(del);
			list.appendChild(row);
		}	
	}

	// save current menu to localstorage
	this.saveMenu = function() {
		this.name = document.getElementById('menu-title').value;
		if(this.name == '') {
			alert('Please input title');
			return;
		}
		// if this is a new menu, then push 
		if(this.exist == false) {
			this.exist = true;
			menuList.menus.push(this);
		}
		localStorage.setItem("LuckyShots", JSON.stringify(menuList));
		menuList.show('menu');
	}

	this.deleteMenu = function() {
		var id = menuList.menus.indexOf(this);
		menuList.menus.splice(id, 1);
		localStorage.setItem("LuckyShots", JSON.stringify(menuList));
		this.back();
	}

	this.back = function() {
		this.clearScene();
		menuList.show('menu');
	}

	this.clearScene = function() {
		var list = document.getElementById('item-list');
		var text = document.getElementById('add-item-text');
		var title = document.getElementById('menu-title');

		while(list.hasChildNodes()) {
			list.removeChild(list.lastChild);
		}
		text.value = '';
		title.value = '';
	}

	// 這個object被當成字串時要回傳的值，用來處理menus.join
	// this.toString = function() {
	// 	return this.title;
	// }
}