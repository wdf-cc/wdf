import $ from 'jquery';
var Keyboard;

(function() {
	var keyRows = [
		['\'',',','.','?','close'],
		['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
		['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
		['caps', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'delete'],
		['logo','space','submit'] //'submit'
	];
	var initialDeleteDelayTime = 500;
	var deleteDelayTime = 100;

	Keyboard = function (el, opts) {
		this.el = el;
		this.$el = $(el);
		this.onChange = opts.onChange;
		this.onSubmit = opts.onSubmit;
		this.onLogoClick = opts.onLogoClick;
		this.isCaps = false;
		this.value = '';
		this.keys = [];
		this.deleteTimeoutId = null;
		this.onButtonDown = this.onButtonDown.bind(this);
		this.onButtonUp = this.onButtonUp.bind(this);
		this.deleteLastLetter = this.deleteLastLetter.bind(this);
		this.addEventListeners();
		this.createElements();
	}
	Keyboard.prototype.addEventListeners = function() {
		$('body').on('touchstart', '.keyboard-button', this.onButtonDown);
		$('body').on('touchend', this.onButtonUp);
	};
	Keyboard.prototype._onChange = function() {
		this.onChange({value: this.value});
		this.input.set(this.value);
	};
	Keyboard.prototype.onButtonDown = function(e) {
		$(e.currentTarget).data('key').onClick(e);
	};
	Keyboard.prototype.onButtonUp = function() {
		clearTimeout(this.deleteTimeoutId);
	};
	Keyboard.prototype.addLetter = function(letter) {
		letter = this.isCaps ? letter.toUpperCase() : letter;
		this.value = this.value + letter;
		this._onChange();
		if (this.isCaps) {
			this.toggleCaps();
		}
	};
	Keyboard.prototype.deleteLastLetter = function(delay) {
		if (!this.value.length) { return; }
		this.value = this.value.slice(0, -1);
		this._onChange();
		this.deleteTimeoutId = setTimeout(this.deleteLastLetter, delay || deleteDelayTime);
	};
	Keyboard.prototype.toggleCaps = function() {
		this.isCaps = !this.isCaps;
		this.keys.forEach(function(key) {
			if (key instanceof LetterKey) {
				var letter = key.containerEl.textContent;
				key.containerEl.textContent = this.isCaps ? letter.toUpperCase() : letter.toLowerCase();
			}
		}.bind(this));
	};
	Keyboard.prototype.submit = function() {
		this.onSubmit({value: this.value});
		this.value = '';
		this._onChange();
	};
	Keyboard.prototype.createElements = function() {
		this.$el.addClass('keyboard');
		var docFrag = document.createDocumentFragment();
		this.input = new Input();
		docFrag.appendChild(this.input.el);

		keyRows.forEach(function(row, index) {
			var rowEl = RowEl(index);
			docFrag.appendChild(rowEl);
			row.forEach(function(o) {
				var key;
				switch(o) {
					case 'caps':
						key = new CapsKey(this);
						break;
					case 'delete':
						key = new DeleteKey(this);
						break;
					case 'logo':
						key = new Logo(this);
						break;
					case 'space':
						key = new SpaceKey(this);
						break;
					case 'submit':
						key = new SubmitKey(this);
						break;
					case 'close':
						key = new CloseKey(this);
						break;
					default:
						key = new LetterKey(this, o);
						break;
				}
				rowEl.appendChild(key.el);
				this.keys.push(key);
			}.bind(this));
		}.bind(this));
		this.el.appendChild(docFrag);
	};

	function Input() {
		this.el = document.createElement('div');
		this.el.classList.add('keyboard-input');
		this.inputTextEl = document.createElement('div');
		this.inputTextEl.classList.add('keyboard-input-text');
		this.el.appendChild(this.inputTextEl);
	}
	Input.prototype.set = function(text) {
		this.inputTextEl.innerHTML = text.replace(/ /g, '&nbsp;');
	};

	function RowEl(index) {
		var rowEl = document.createElement('div');
		rowEl.classList.add('keyboard-row', 'keyboard-row-' + index);
		return rowEl;
	}

	function Key() {
		this.el = document.createElement('div');
		this.$el = $(this.el);
		this.$el.data('key', this);
		this.el.classList.add('keyboard-button');
		this.containerEl = document.createElement('div');
		this.containerEl.classList.add('keyboard-button-container');
		this.el.appendChild(this.containerEl);
	}
	Key.prototype.onClick = function() {
		throw 'You must override `onClick`';
	};

	function LetterKey(keyboard, letter) {
		Key.call(this);
		this.keyboard = keyboard;
		this.letter = letter;
		this.el.classList.add('keyboard-button-letter');
		this.containerEl.textContent = letter;
	}
	LetterKey.prototype.onClick = function() {
		this.keyboard.addLetter(this.letter);
	};

	function CapsKey(keyboard) {
		Key.call(this);
		this.keyboard = keyboard;
		this.el.classList.add('keyboard-button-caps');
		this.iconEl = document.createElement('div');
		this.iconEl.classList.add('keyboard-button-caps-icon');
		this.containerEl.appendChild(this.iconEl);
	}
	CapsKey.prototype.onClick = function() {
		this.keyboard.toggleCaps();
	};

	function DeleteKey(keyboard) {
		Key.call(this);
		this.keyboard = keyboard;
		this.el.classList.add('keyboard-button-delete');
		this.iconEl = document.createElement('div');
		this.iconEl.classList.add('keyboard-button-delete-icon');
		this.containerEl.appendChild(this.iconEl);
	}
	DeleteKey.prototype.onClick = function() {
		this.keyboard.deleteLastLetter(initialDeleteDelayTime);
	};

	function Logo(keyboard) {
		this.keyboard = keyboard;
		this.el = document.createElement('img');
		this.el.classList.add('keyboard-logo');
		this.el.src = 'imgs/logo.png';
	}
	Logo.prototype.onClick = function(event) {
		event.preventDefault();
		this.keyboard.onLogoClick();
		console.log(1);
	};

	function SpaceKey(keyboard) {
		Key.call(this);
		this.keyboard = keyboard;
		this.el.classList.add('keyboard-button-space');
		this.containerEl.textContent = 'space';
	}
	SpaceKey.prototype.onClick = function() {
		this.keyboard.addLetter(' ');
	};

	function SubmitKey(keyboard) {
		Key.call(this);
		this.keyboard = keyboard;
		this.el.classList.add('keyboard-button-submit');
		//this.containerEl.textContent = 'Submit';
		this.containerEl.textContent = '清空';
	}
	SubmitKey.prototype.onClick = function() {
		this.keyboard.submit();
	};

	function CloseKey(keyboard){
		Key.call(this);
		this.keyboard = keyboard;
		this.el.classList.add('keyboard-button-submit');
		this.containerEl.textContent = '隐藏键盘';
		this.up = true;
	}

	CloseKey.prototype.onClick = function (){
		if(this.up){
		$(this.keyboard.el).css({
			"transform":"translateY(65%)"
		})
			this.up = false;
			this.containerEl.textContent = '显示键盘';
		}else{
			$(this.keyboard.el).css({
				"transform":"translateY(0%)"
			})	
			this.up = true;
			this.containerEl.textContent = '隐藏键盘';
		}
	}

	// $.fn.keyboard = function(opts) {
	// 	// eslint-disable-next-line no-unused-vars
	// 	var keyboard = new Keyboard(this.get(0), Object.assign({
	// 		onChange: function(){},
	// 		onSubmit: function(){},
	// 		onLogoClick: function(){}
	// 	}, opts));
	// };
})();

export default Keyboard;