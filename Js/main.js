let readyElements = {
	'#fire': 1,
	'#water': 1,
	'#earth': 1,
}

let safeComb = {
	'#fire#water': '#steam-Пар',
	'#fire#earth': '#stone-Камень',
	'#fire#stone': '#lava-Лава',
	'#water#earth': '#mud-Грязь',
	'#water#stone': '#sand-Песок'
}


function getCoords(elem){
	let box = elem.getBoundingClientRect();

	return {
		top: box.top + pageYOffset,
		left: box.left + pageXOffset
	}
}

class CreateEl{
	constructor(classCSS){
		(CreateEl.checkId[classCSS] == null)?CreateEl.checkId[classCSS] = 0 : null;
		if(CreateEl.checkId[classCSS] == 0 && this.lengthObj(CreateEl.checkId) < 3)
		{
			let spanElem = document.querySelector('.' + classCSS + ' .elem');
			this._elem = document.createElement("div");
			/*this._elem.style.background = url((objSafe.id))*/
			this._elem.style.cursor = "pointer";
			this._elem.style.position = "absolute";
			this._elem.style.height = "83px";
			this._elem.style.width = "85px";
			this._elem.style.left = spanElem.getBoundingClientRect().left - spanElem.offsetWidth / 2.3 + 'px';
			this._elem.style.top = spanElem.getBoundingClientRect().top - spanElem.offsetHeight / 2.3 + 'px';
			this._elem.id = classCSS;
			
			
			this.DaD(this._elem);
			document.body.appendChild(this._elem);
			CreateEl.checkId[classCSS] += 1;
		}
	}
	lengthObj(obj){
		let counter = 0;
		for(let key in obj)
			counter++;
		return counter;
	}
	DaD(elem){
		elem.onmousedown = function(e){

			let coords = getCoords(elem);
			let shiftX = e.pageX - coords.left;
			let shiftY = e.pageY - coords.top;

			elem.style.position = "absolute";

			moveAt(e);

			document.body.appendChild(elem);			

			elem.style.zIndex = 1000;
			
			function moveAt(e){
				elem.style.left = e.pageX - shiftX + 'px';
				elem.style.top = e.pageY - shiftY + 'px';
				checkDropable(e);
			}

			elem.ondragstart = function(){
				return false;
			}

			function checkDropable(e){
				elem.hidden = true;

				var efp = document.elementFromPoint(e.clientX, e.clientY);

				elem.hidden = false;

				
				delete CreateEl.readyId[elem.id];
				if (efp.id == 'trash') {
					elem.parentElement.removeChild(elem);
					delete CreateEl.checkId[elem.id];
					
					
				}
				if (efp.id == 'cyrcle'){
					CreateEl.readyId[elem.id] = [elem.id];
				}
			}

			document.onmousemove = function(e){
				moveAt(e);
			}

			elem.onmouseup = function(){
				document.onmousemove = null;
				elem.onmouseup = null;
			}
		}
	}
}

class addElemMenu{
	constructor(id, text){
		if(!document.querySelector('li.' + id.slice(1))){
		this._li = document.createElement('LI');
		this._li.classList.add(id.slice(1));
		this._li.innerHTML = text;

		this._span = document.createElement('SPAN');
		this._span.classList.add(id.slice(1));
		this._span.classList.add("elem");

		document.querySelector('.elem-menu').appendChild(this._li);
		this._li.appendChild(this._span); 
		}
	}
}


CreateEl.checkId = {};
CreateEl.readyId = {};
function reverseComb(str){
	let ret_str = '';
		ret_str += str.slice(str.indexOf('#', 1)) + str.slice(0, str.indexOf('#', 1));
		return ret_str;
	}


	document.querySelector("#cyrcle").onclick = function(e){
		let target = e.target;
		let arr = ['red', 'black', 'white'];
		let i = 0;
		let deg = 1;
		let timerId = setInterval(function(){
			target.style.backgroundColor = arr[i];
			target.style.transform = "rotate(" + deg + "deg)";
			deg += 3;
			(deg % 4 == 0)? i++ : null;
			(i == 4)? i = 0 : null;
			if(deg > 360){
				clearInterval(timerId);
			}
		}, 30);
		if(target.id == "cyrcle"){
			var comb = '';
			for (let key in CreateEl.readyId)
				comb += '#' + CreateEl.readyId[key];
			for(let key in safeComb){
				if(key == comb || reverseComb(comb) == key){
					let str = safeComb[key];
					let addMenu = new addElemMenu(str.slice(0, str.indexOf('-')), str.slice(str.indexOf('-') + 1));
				}
		}
	}
}





	let ul_menu = document.querySelector('.elem-menu');

	function clickCreate(e) {
		let target = e.target;
		if(target.tagName == 'LI' || target.tagName == 'SPAN'){
			let elem = new CreateEl(target.classList[0]);
		}
	}

	ul_menu.addEventListener("click", clickCreate);