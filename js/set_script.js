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
			

			var story1 = new MENU();
			story1.exist = true;
			story1.name = '上班穿什麼？';
			story1.items = ['丁字褲', '比基尼', '蘇格蘭裙', '印度阿三'];

			var story2 = new MENU();
			story2.exist = true;
			story2.name = '午餐訂什麼？';
			story2.items = ['空廚-葷', '空廚-素'];

			var story3 = new MENU();
			story3.exist = true;
			story3.name = '旅遊景點去哪裡？';
			story3.items = ['桃園縣芝巴里', '香港龜頭嶺', '日本觸摸', '美國雙蛋', '日本鼻毛', 
											'雲林灣龜頭', '雲林林北村', '雲林龜仔頭', '台東大鳥'];

			var story4 = new MENU();
			story4.exist = true;
			story4.name = '誰會拿到冠軍？';
			story4.items = ['退回空廚', '逐條審查'];
			
			var story5 = new MENU();
			story5.exist = true;
			story5.name = '我的夢中情人？';
			story5.items = ['傑夫', '洛伊德', '湯泥', '湯米', '泰瑞', 
											'阿明', '傑摳兒', '榮哥', '歐神', '妮基'];

			// this.menus.push(tmp2);
			// this.menus.push(tmp);

			this.menus.push(story5);
			this.menus.push(story4);
			this.menus.push(story3);
			this.menus.push(story2);
			this.menus.push(story1);

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

	show: function(str) {/*
		var mainContainer = document.getElementById('main-container');
		var menuContainer = document.getElementById('menu-container');
		var itemContainer = document.getElementById('item-container');
		if(str == 'menu') {
			//mainContainer.style.display = 'none';
			mainContainer.setAttribute("class", "container main-container-hide");
			menuContainer.style.display = 'block';
			itemContainer.style.display = 'none';
		}
		else if(str == 'item') {
			//mainContainer.style.display = 'none';
			mainContainer.setAttribute("class", "container main-container-hide");
			menuContainer.style.display = 'none';
			itemContainer.style.display = 'block';
		}
		else if(str == 'main') {
			//mainContainer.style.display = 'flex';
			mainContainer.setAttribute("class", "container main-container-show");
			menuContainer.style.display = 'none';
			itemContainer.style.display = 'none';
		}*/
    idxtran.show(str);
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
	// 	nowMenu.addItem(addItemText.value);
	// 	addItemText.value = '';
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
			var del = document.createElement('div');
			text.innerHTML = this.items[i];
			
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
