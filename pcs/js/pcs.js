(function($, owner) {
	/**
	 * 用户登录
	 **/
	owner.login = function(loginInfo, callback) {
		callback = callback || $.noop;
		loginInfo = loginInfo || {};
		loginInfo.sfzh = loginInfo.sfzh || '';
		loginInfo.password = loginInfo.password || '';
		if(!loginInfo.sfzh || !loginInfo.password) {
			return callback('身份证号/密码为空');
		}
		if(loginInfo.sfzh.length == 15 || loginInfo.sfzh.length == 18) {
			return callback();
		} else {
			return callback('身份证号必须为15位或18位');
		}
	};
	owner.changepw = function(loginInfo, callback) {
		callback = callback || $.noop;
		loginInfo = loginInfo || {};
		loginInfo.sfzh = loginInfo.sfzh || '';
		loginInfo.password = loginInfo.password || '';
		loginInfo.password_new = loginInfo.password_new || '';
		loginInfo.password_new_confirm = loginInfo.password_new_confirm || '';
		if(!loginInfo.sfzh || !loginInfo.password || !loginInfo.password_new || !loginInfo.password_new_confirm) {
			return callback('身份证号/密码为空');
		}
		if(loginInfo.sfzh.length == 15 || loginInfo.sfzh.length == 18) {

		} else {
			return callback('身份证号必须为15位或18位');
		}
		if(loginInfo.password_new != loginInfo.password_new_confirm) {
			return callback('新密码不一致');
		}
		return callback();
	}
	/**
	 * 
	 * @param {Object} name
	 * @param {Object} callback
	 */
	owner.createState = function(id, token, callback) {
		var state = owner.getState();
		state.id = id;
		state.token = token;
		owner.setState(state);
		return callback();
	};

	/**
	 * 获取当前状态
	 **/
	owner.getState = function() {
		var stateText = localStorage.getItem('$state') || "{}";
		return JSON.parse(stateText);
	};

	/**
	 * 设置当前状态
	 **/
	owner.setState = function(state) {
		state = state || {};
		localStorage.setItem('$state', JSON.stringify(state));
	};

	/**
	 * 设置应用本地配置
	 **/
	owner.setSettings = function(settings) {
		settings = settings || {};
		localStorage.setItem('$settings', JSON.stringify(settings));
	}
	/**
	 * 获取应用本地配置
	 **/
	owner.getSettings = function() {
		var settingsText = localStorage.getItem('$settings') || "{}";
		return JSON.parse(settingsText);
	}
	owner.getServer = function() {
		return "http://192.168.15.66:8080";
	}
	owner.pJson = function(s) {
		if(typeof s === 'string' && s.match(/^[\{\[].*[\}\]]$/)) {
			return JSON.parse(s);
		} else if(typeof s === 'object') {
			if(s._data) {
				return JSON.parse(s._data);
			}
			return s;
		} else {
			return {};
		}
	}
	owner.isEmpty = function(o) {
		return !o || o === '[]' || o === '{}' || o == 'null' || (typeof o == 'string' && o.indexOf('<') == 0);
	}
	owner.getUserInfo = function() {
		return JSON.parse(localStorage.getItem('$users') || '{}');
	}
	owner.setUserInfo = function(userInfo) {
		localStorage.setItem('$users', JSON.stringify(userInfo));
	}
	/**
	 * 获取主题
	 */
	owner.getTheme = function() {
		return JSON.parse(localStorage.getItem('$theme') || '{}');
	}
	/**
	 * 设置主题颜色
	 * @param {Object} theme
	 */
	owner.setTheme = function(theme) {
		if(!theme.bg) {
			theme.bg = "#F7F7F7";
		}
		if(!theme.color) {
			theme.color = "#000000";
		}
		if(!theme.style) {
			theme.style = "dark";
		}
		localStorage.setItem('$theme', JSON.stringify(theme));
	}
	owner.sort = function(arr, prop, dire) {
		if(dire && dire === 'desc') // 倒序
			arr.sort(function(x, y) {
				return x[prop] > y[prop] ? -1 : 1
			});
		else // 顺序
			arr.sort(function(x, y) {
				return x[prop] > y[prop] ? 1 : -1
			});
	}
	owner.jsonEmpty = function(obj) {
		return JSON.stringify(obj) == "{}";
	}
	/**
	 * 日期格式化
	 * @param {Object} date
	 * @param {Object} format
	 */
	owner.dateFormat = function(date, format) {
		if(!date) {
			return '-';
		}
		date = date || '';
		date = date.replace(/[-\\./:Tt ]/g, '');
		try {
			var y = date.length >= 4 ? parseInt(date.substring(0, 4), 10) : '',
				M = date.length >= 6 ? parseInt(date.substring(4, 6), 10) : '-',
				d = date.length >= 8 ? parseInt(date.substring(6, 8), 10) : '-',
				h = date.length >= 10 ? parseInt(date.substring(8, 10), 10) : '-',
				m = date.length >= 12 ? parseInt(date.substring(10, 12), 10) : '-',
				s = date.length >= 14 ? parseInt(date.substring(12, 14), 10) : '-';
		} catch(e) {
			window.console && console.error(e);
		}
		var o = {
			"M+": M, //month 
			"d+": d, //day 
			"h+": h, //hour 
			"m+": m, //minute 
			"s+": s //second 
		}

		if(/(y+)/.test(format)) {
			format = format.replace(RegExp.$1, (y + "").substr(4 - RegExp.$1.length));
		}

		for(var k in o) {
			if(new RegExp("(" + k + ")").test(format)) {
				format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
			}
		}
		return format;
	}
	owner.nullFormat=function(str){
		if(!str){
			return '-';
		}else{
			return str;
		}
	}
}(mui, window.pcs = {}));