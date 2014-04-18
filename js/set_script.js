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
		}
		else {
			var tmp = new MENU();
			tmp.exist = true;
			tmp.name = '今日運勢！';
			tmp.items = ['大吉', '吉', '小吉', '凶', '大凶'];
			
			var tmp2 = new MENU();
			tmp2.exist = true;
			tmp2.name = '中午吃什麼？';
			tmp2.items = ['高雄空廚-葷', '高雄空廚-素'];
			
			this.menus.push(tmp2);
			this.menus.push(tmp);
			
			localStorage.setItem("LuckyShots", JSON.stringify(menuList));
		}
		this.update();
	},

	// add a menu
	add: function() {
		this.load();
		nowMenu = new MENU();
		nowMenu.clearScene();
		this.show('item');
	},

	modify: function(index) {
		this.load();
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
		var mainContainer = document.getElementById('main-container');
		var menuContainer = document.getElementById('menu-container');
		var itemContainer = document.getElementById('item-container');
		if(str == 'menu') {
			mainContainer.style.display = 'none';
			menuContainer.style.display = 'block';
			itemContainer.style.display = 'none';
		}
		else if(str == 'item') {
			mainContainer.style.display = 'none';
			menuContainer.style.display = 'none';
			itemContainer.style.display = 'block';
		}
		else if(str == 'main') {
			mainContainer.style.display = 'block';
			menuContainer.style.display = 'none';
			itemContainer.style.display = 'none';
		}
		this.update();
	},

	clear: function() {

	},

	back: function() {

	}
}

function initEvent() {
	var addItemText = document.getElementById('add-item-text');
	 // addItemButton.onclick = function() {
	 //  nowMenu.addItem(addItemText.value);
	 //  addItemText.value = '';
	 // }
	 addItemText.onkeyup = function(e) {
	  if (e.keyCode == 13) {
	   nowMenu.addItem(addItemText.value);
	   addItemText.value = '';
	  }
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
			del.setAttribute("class", "deleteButton");
			row.setAttribute("class","listText");
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

		getMenuList();
	}

	this.deleteMenu = function() {
		console.log(this);
		var id = menuList.menus.indexOf(this);
		if(id<0) {
			this.back();
			return;
		}
		menuList.menus.splice(id, 1);
		localStorage.setItem("LuckyShots", JSON.stringify(menuList));
		this.back();

		getMenuList();
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