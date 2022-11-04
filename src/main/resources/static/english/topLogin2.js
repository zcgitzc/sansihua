
//if (document.location.href.indexOf('cnki.net') > 0) {
//	document.domain = "cnki.net";
//}

var oauserSites = ["oi.cnki.net", "cajn.cnki.net", "dysw.cnki.net", "web02.cnki.net", "bnjj.cnki.net", "ste.cnki.net"
	, "local.cnki.net"
];
isNull2 = function (str) {
	if (typeof (str) === "undefined" || str === null || str === "")
		return true;
	else
		return false;
};
function OauserOutSite(v) {
	try {
		if (isNull2(v)) { return false; }
		var vj = JSON.parse(v);
		var domain1 = document.domain.toLowerCase();
		if (vj.UserName.toLowerCase() === "oauser" && oauserSites.indexOf(domain1) > 0) {
			return true;
		}
	} catch (e) {
		return false;
	}
	return false;
}

jQuery.fn.shake = function (times, offset, delay) {
	this.stop().each(function () {
		var Obj = $(this);
		var marginLeft = parseInt(Obj.css('margin-left'));
		Obj.animate({ 'margin-left': marginLeft + offset }, delay, function () {
			Obj.animate({ 'margin-left': marginLeft }, delay, function () {
				times = times - 1;
				if (times > 0)
					Obj.shake(times, offset, delay);
			});
		});
	});
	return this;
};
function shake2(Obj, times, offset, delay) {
	Obj.stop().each(function () {
		var marginLeft = parseInt(Obj.css('margin-left'));
		Obj.animate({ 'margin-left': marginLeft + offset }, delay, function () {
			Obj.animate({ 'margin-left': marginLeft }, delay, function () {
				times = times - 1;
				if (times > 0)
					shake2(Obj, times, offset, delay);
			});
		});
	});
}

function Ecp_ShowMsgFocus(msg, focusEle) {
	Ecp_ShowMsg(msg);

	if (focusEle)
		focusEle.focus();
}
//----------------------

function Ecp_ShowMsgShake(msg, noshake) {
	Ecp_ShowMsg(msg);

	if (!noshake) {
		shake2($('#Ecp_top_login_layer'), 3, 4, 80);
	}
	//$('#Ecp_top_login_layer').shake(3, 4, 80);
}

function Ecp_ShowMsg(msg) {
	if (msg && msg.length > 0) {
		$('#Ecp_errorMsg').text(msg).show();
		$(".login-title").css("margin-bottom", 0);
	}
	else {
		$('#Ecp_errorMsg').text("").hide();
		$(".login-title").css("margin-bottom", "24px");
	}
}

Date.prototype.Format = function (fmt) {
	var o = {
		"M+": this.getMonth() + 1,  //月份   
		"d+": this.getDate(),
		"H+": this.getHours(),
		"m+": this.getMinutes(),
		"s+": this.getSeconds(),
		"q+": Math.floor((this.getMonth() + 3) / 3),//季度   
		"S": this.getMilliseconds() //毫秒   
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
	return fmt;
};
//----------------------

var Ecp_IsShowCheck;
var Ecp_LoginStuts = "Ecp_LoginStuts";
var Ecp_notFirstLogin = "Ecp_notFirstLogin";
var b_AutoLogin;
var b_newLogin = false;
var Ecp_ResultR;
var Ecp_IsLogin = false;
var Ecp_CookieOtherDomain = '';
var Ecp_LoginOpen = 0;

function FlushLogin() {
	$("#Ecp_top_login_closeLayer").unbind("click").bind("click", function () { Ecp_CloseLayer(); });
	$("#Ecp_CheckCodeImg").unbind("click").bind("click", function () { Ecp_ReGetImg(); });
	$("#Ecp_CheckLink").unbind("click").bind("click", function () { Ecp_ReGetImg(); });
	$("#Ecp_Button1").unbind("click").bind("click", function () { return Ecp_SubmitCheck(this); });
	$("#Ecp_Button2").unbind("click").bind("click", function () { return Ecp_IpLogin(true); });

	$("#Ecp_top_login").unbind("click").bind("click", function () { Ecp_ShowLoginLayer2(2); });//, '-90px', '42px'
	$("#Ecp_top_logout_showLayer").unbind("click").bind("click", function () { Ecp_ShowLogOutLayer(2); });
	$("#Ecp_top_logoutClick").unbind("click").bind("click", function () { Ecp_LogoutOptr_my(0); });
	$("#Ecp_top_login1").unbind("click").bind("click", function () { Ecp_ShowLoginLayer2(1); });//, '-90px', '42px'
	$("#Ecp_top_logout_showLayer1").unbind("click").bind("click", function () { Ecp_ShowLogOutLayer(1); });
	$("#Ecp_top_logoutClick1").unbind("click").bind("click", function () { Ecp_LogoutOptr_my(0); });

	$("#Ecp_top_logoutGrClick").unbind("click").bind("click", function () { Ecp_LogoutOptr_my(2); });
	$("#Ecp_top_logoutJgClick1").unbind("click").bind("click", function () { Ecp_LogoutOptr_my(1); });

	$("#ecpover_open").unbind("click");

	var loginlink = $("script[src]").filter(function () { return $(this).attr('src').toUpperCase().indexOf("LOGINAPI") >= 0; });
	if (loginlink) {
		var loginlinkattr = loginlink.attr('src');
		if (loginlinkattr) {
			var ptcode = GetParams3("platform", loginlink.attr('src').toLowerCase());
			if (ptcode) {
				var cardlink = $("#Ecp_header_BuyCard_link");
				if (cardlink) {
					if (ptcode.toLowerCase() === "kjpt") {
						cardlink.attr("href", "https://kjcard.cnki.net/");
					} else if (ptcode.toLowerCase() === "skpt") {
						cardlink.attr("href", "https://skcard.cnki.net/");
					}
				}
			}
		}
	}

	Ecp_ValdateInput("Ecp_TextBoxUserName");
	Ecp_ValdateInput("Ecp_TextBoxPwd");
	Ecp_ValdateInput("Ecp_CheckCode");

	var domain1 = document.domain;
	if (!domain1.toLowerCase().endWith('cnki.net') && !/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(domain1)) {
		var intd = domain1.indexOf('cnki.net');
		if (intd > 0) {
			Ecp_CookieOtherDomain = domain1.substr(intd);
		}
		else {
			Ecp_CookieOtherDomain = domain1.replace('www.', '');
		}
	}
	//if (Ecp_CookieOtherDomain !== '') {
	//	Ecp_topLoginUrl = '//login.' + Ecp_CookieOtherDomain + '/TopLogin/';
	//}
	//else
	Ecp_topLoginUrl = 'https://login.cnki.net/TopLogin/';

	//$(function () { $('input, textarea').placeholder(); });

	var uid = Ecp_GetQueryString("uid");
	if (uid && uid.length > 100) {
		var cuid5 = cookie('ecp_uid5');
		var uid5 = $.md5(uid);
		if (cuid5 === undefined || cuid5 && cuid5.length >= 16 && cuid5 !== uid5) {
			cookie("ecp_uid5", uid5);
			var autoLogin = Ecp_GetQueryString("autoLogin");
			if (autoLogin && autoLogin === '1')
				b_AutoLogin = true;

			b_newLogin = true;
			var nf = cookie(Ecp_notFirstLogin);
			Ecp_UidLogin(uid, nf);
			return;
		}
	}
	Ecp_FlushLogin();
}

isNull2 = function (str) {
	return (typeof (str) === "undefined" || str === null || str === "")
};

function Ecp_FlushLogin() {
	var v = cookie(Ecp_LoginStuts);
	if (v && v.length > 0) {//&& !OauserOutSite(v)
		var vj = JSON.parse(v);

		var ses = cookie("Ecp_session");
		if (!ses || ses.length === 0 && ses === "") {
			b_newLogin = true;
		}

		var nf = cookie(Ecp_notFirstLogin);
		if (nf && nf.length > 0) {
			if (nf !== vj.r) {
				b_newLogin = true;
			}
		} else {
			Ecp_ResultR = vj.r;
			b_newLogin = true;
		}

		//if (b_newLogin) {
		//	Ecp_UidLogin("", nf);
		//} else {
			Ecp_LoginResult(vj);
		//}
	}
	else if (Ecp_isAuotIpLogin === '1') {
		var faultIp = cookie("Ecp_IpLoginFail");
		var isLogout = cookie("Ecp_lout");

		if ((!faultIp || faultIp.length <= 0) && (!isLogout || isLogout.length <= 0)) {
			var url1 = Ecp_topLoginUrl + "api/loginapi/IpLoginFlush";
			if ((typeof Ecp_platform) !== 'undefined' && !isNull2(Ecp_platform)) {
				url1 += "?platform=" + Ecp_platform;
			}
			$.ajax({
				url: url1,
				dataType: "jsonp",
				success: function (result) {
					//console.log("Top:IpLoginFlush," + result.IsSuccess + "|" + result.ErrorCode + "|" + result.ErrorMsg);
					if (result.success && Ecp_CookieOtherDomain.length > 0) {
						cookie("Ecp_IpLoginFail", "", { expires: -1, path: '/', domain: Ecp_CookieOtherDomain });
					}
					Ecp_LoginSuccessOne(2, result);
				}
			});
		}
	}
}
//----------------------

function Ecp_ShowLogOutLayer(p) {
	$('#Ecp_top_login_layer').hide();
	Ecp_LoginOpen = 0;

	if (p === 1) {
		$('#Ecp_top_logout_layer1').toggle();
		$('#Ecp_top_logout_layer').hide();
	} else {
		$('#Ecp_top_logout_layer').toggle();
		$('#Ecp_top_logout_layer1').hide();
	}
}

function Ecp_CloseLayer() {
	if (Ecp_Style === '2') {
		$("#Ecp_modal_he").hide();
		$("#Ecp_shadow_he").hide();
		$("#Ecp_top_login_layer").hide();
	}
	else {
		$('#Ecp_top_login_layer').hide(500);
		//		Ecp_WelcomeShow();
	}
	Ecp_LoginOpen = 0;
}

function Ecp_WelcomeShow() {
	if (Ecp_UserStatus() > 0)
		$('#Ecp_welcome').show();
	else
		$('#Ecp_welcome').hide();
}

function Ecp_UserStatus() {
	var v = cookie('c_m_LinID');
	if (!v || v.length < 45) {
		return 0;
	}
	var b1 = !$("#Ecp_top_login1").is(':visible');
	var b2 = !$("#Ecp_top_login").is(':visible');
	if (b1) {
		if (b2) {
			return 3;
		}
		return 2;
	}
	if (b2) {
		return 1;
	}
	return 0;
}

function Ecp_ShowLoginLayer2(p, left, top) {

	//Ecp_FlushLogin();
	//if (Ecp_IsLogin) {
	//	return;
	//}

	Ecp_ShowMsg();

	if (Ecp_Style === '2') {
		$("#Ecp_modal_he").show();
		$("#Ecp_shadow_he").show();
		$("#Ecp_top_login_layer").show();
		$('#Ecp_top_login_layer').animate({ "top": "50%", "left": "50%", "margin-top": "-173px" }, 800);
		if (p === 1) {
			$('#Ecp_ThirdLogin').hide();
			$('#Ecp_RegistNew').hide();
		} else {
			$('#Ecp_ThirdLogin').show();
			$('#Ecp_RegistNew').show();
		}
	}
	else {
		if (left && top)
			$('#Ecp_top_login_layer').css({ 'left': left, 'top': top }).toggle();
		else {
			//console.log(Ecp_LoginOpen + "_p:" + p);
			if (Ecp_LoginOpen === 0) {
				$('#Ecp_top_login_layer').show();
				Ecp_LoginOpen = p;
			}
			else {
				if (Ecp_LoginOpen === p) {
					$('#Ecp_top_login_layer').hide();
					Ecp_LoginOpen = 0;
				} else {
					Ecp_LoginOpen = p;
				}
			}

			if (p === 1) {
				$('#Ecp_top_login_layer').css({ 'left': '-105px' });
				$('#Ecp_ThirdLogin').hide();
				$('#Ecp_RegistNew').hide();
				//$('#Ecp_ThirdLoginPlace').show();
			} else {
				$('#Ecp_top_login_layer').css({ 'left': '25px' });
				$('#Ecp_ThirdLogin').show();
				$('#Ecp_RegistNew').show();
				//$('#Ecp_ThirdLoginPlace').hide();
			}
			//if (p === 0) {
			//	$('#Ecp_AutoLoginCheck').show();
			//} else {
			//	$('#Ecp_AutoLoginCheck').hide();
			//}

			$('#Ecp_top_logout_layer').hide();
			$('#Ecp_top_logout_layer1').hide();
		}
	}
}

function Ecp_GetLoginStatus() {
	var gr = !$("#Ecp_top_login").is(":hidden");
	var jg = !$("#Ecp_top_login1").is(":hidden");
	if (jg) {
		if (gr)
			return 0;
		return 1;
	}
	else {
		if (gr)
			return 2;
	}
	if (!gr && !jg && typeof Ecp_HiddenHeader !== "undefined" && Ecp_HiddenHeader) {
		return 0;
	}
	return 3;
}

//----------------------

//login----------------
function Ecp_UserLogin(userName, pwd) {
	var p = Ecp_GetLoginStatus();

	var checkCode = '';
	b_AutoLogin = $("#rememberMe").prop("checked");
	checkCode = $("#Ecp_CheckCode");
	if (Ecp_IsShowCheck) {
		var ccode = checkCode.val();
		if (ccode === '') {
			Ecp_ShowMsgFocus(getLoginResource("NeedCode"), checkCode);
			return false;
		}
		if (RegexCheck(/^[A-Za-z0-9]{4,4}$/, ccode) === false) {
			Ecp_ShowMsgFocus(getLoginResource("NeedRightCode"), checkCode);
			return false;
		}
	}
	Ecp_ShowMsg(getLoginResource("Logining"));
	var param;
	if (Ecp_IsShowCheck) {
		param = {
			userName: userName, pwd: pwd, isAutoLogin: b_AutoLogin, checkCode: checkCode.val(), p: p
		};
	}
	else {
		param = {
			userName: userName, pwd: pwd, isAutoLogin: b_AutoLogin, p: p
		};
	}
	if ((typeof Ecp_platform) !== 'undefined' &&!isNull2(Ecp_platform)) {
		param["platform"] = Ecp_platform;
	}

	$.ajax({
		url: Ecp_topLoginUrl + "api/loginapi/Login",
		data: param,
		cache: false,
		dataType: "jsonp",
		success: function (result) {
			//console.log("Top:UserLogin," + result.IsSuccess + "|" + result.ErrorCode + "|" + result.ErrorMsg);
			Ecp_LoginSuccessOne(p, result);
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			//alert("登录出错:" + XMLHttpRequest.status + XMLHttpRequest.statusText + " " + XMLHttpRequest.readyState + " " + textStatus);
		}
	});
}

function Ecp_IpLogin(forceLogin) {
	var p = Ecp_GetLoginStatus();
	b_AutoLogin = $("#rememberMe").prop("checked");
	var checkCode = '';
	if (Ecp_IsShowCheck) {
		checkCode = $("#Ecp_CheckCode");
		var ccode = checkCode.val();
		if (ccode === '') {
			Ecp_ShowMsgFocus(getLoginResource("NeedCode"), checkCode);
			return false;
		}
		if (RegexCheck(/^[A-Za-z0-9]{4,4}$/, ccode) === false) {
			Ecp_ShowMsgFocus(getLoginResource("NeedRightCode"), checkCode);
			return false;
		}
	}

	Ecp_ShowMsg(getLoginResource("Logining"));
	//if (Ecp_CookieOtherDomain.length > 0) {
	//	cookie("Ecp_IpLoginFail", "", { expires: -1, path: '/', domain: Ecp_CookieOtherDomain });
	//}
	if (forceLogin)
		forceLogin = true;
	else
		forceLogin = false;
	var cCode;
	if (Ecp_IsShowCheck) {
		cCode = checkCode.val();
	}
	else {
		cCode = "";
	}

	var param;
	param = {
		isAutoLogin: b_AutoLogin, checkCode: cCode, isForceLogin: forceLogin, p: p
	};
	if ((typeof Ecp_platform) !== 'undefined' &&!isNull2(Ecp_platform)) {
		param["platform"] = Ecp_platform;
	}

	$.ajax({
		url: Ecp_topLoginUrl + "api/loginapi/IpLogin",
		data: param,
		dataType: "jsonp",
		success: function (result) {
			//console.log("Top:IpLogin," + result.IsSuccess + "|" + result.ErrorCode + "|" + result.ErrorMsg);
			if (result.success && Ecp_CookieOtherDomain.length > 0) {
				cookie("Ecp_IpLoginFail", "", { expires: -1, path: '/', domain: Ecp_CookieOtherDomain });
			}
			Ecp_LoginSuccessOne(p, result);
		}
	});
}

function Ecp_LoginSuccessOne(p, result) {
	if (result.IsSuccess === true) {
		b_newLogin = true;
		Ecp_IsShowCheck = false;
		$("#Ecp_CheckCodeImg").attr({ src: "" });
		$("#Ecp_CheckCodeLayer").hide();
	}
	//Ecp_ResultR = result.r;
	Ecp_LoginResult(result, p);
}

function Ecp_UidLogin(uid, r) {
	var url1 = Ecp_topLoginUrl + "api/loginapi/UidLogin";
	var isF = true;
	if (uid && uid.length > 0) {
		url1 += "?uid=" + uid + "&cookieLogin=true";
		isF = false;
	}
	if (r && r.length > 0) {
		if (isF) {
			url1 += "?r=" + r;
		} else {
			url1 += "&r=" + r;
		}
		isF = false;
	}
	if ((typeof Ecp_platform) !== 'undefined' && !isNull2(Ecp_platform)) {
		if (isF) {
			url1 += "?platform=" + Ecp_platform;
		} else {
			url1 += "&platform=" + Ecp_platform;
		}
	}

	$.ajax({
		url: url1,
		dataType: "jsonp",
		success: function (result) {
			//console.log("Top:UidLogin," + result.IsSuccess + "|" + result.ErrorCode + "|" + result.ErrorMsg);
			if (!result.IsSuccess) {
				var uid = cookie('c_m_LinID');
				var u = "";
				if (uid !== null) {
					u = getSubCookie(decodeURIComponent(uid), "LinID");
				}
				//console.log("Top:UidLogin," + u);
			}
			if (result.IsSuccess === true) {
				//Ecp_ResultR = result.r;
				Ecp_LoginResult(result);
				return;
			}
			else {
				Ecp_loginFalse();
				Ecp_ReomveCookie(0);
				//Ecp_ShowMsgShake(result.ErrorMsg);
			}
		}
	});
}

function Ecp_loginFalse() {
	Ecp_IsLogin = false;
	Ecp_ShowMsg();
	$('#Ecp_top_login_oversea').hide();
}

function Ecp_ReomveCookie(p) {
	var remove = p;

	var v = cookie(Ecp_LoginStuts);
	if (v && v.length > 0) {
		/*var vjson = JSON.parse(v);*/
	}
	else {
		remove = 0;
	}

	if (remove === 0) {
		cookie(Ecp_LoginStuts, "", { expires: -1, path: '/', domain: Ecp_CookieDomain });
		cookie(Ecp_notFirstLogin, "", { expires: -1 });
		cookie("c_m_expire", "", { expires: -1, path: '/', domain: Ecp_CookieDomain });
		cookie("c_m_LinID", "", { expires: -1, path: '/', domain: Ecp_CookieDomain });
		cookie("Ecp_session", "", { expires: -1 });
		cookie("LID", "", { expires: -1, path: '/', domain: Ecp_CookieDomain });
		if (Ecp_CookieOtherDomain.length > 0) {
			cookie(Ecp_LoginStuts, "", { expires: -1, path: '/', domain: Ecp_CookieOtherDomain });
			cookie("c_m_expire", "", { expires: -1, path: '/', domain: Ecp_CookieOtherDomain });
			cookie("c_m_LinID", "", { expires: -1, path: '/', domain: Ecp_CookieOtherDomain });
			cookie("Ecp_session", "", { expires: -1, path: '/', domain: Ecp_CookieOtherDomain });
			cookie("LID", "", { expires: -1, path: '/', domain: Ecp_CookieOtherDomain });
		}
	}
}

//function Ecp_UserLogout(p) {

//}
//----------------------

function Ecp_LoginResult(vj, p) {
	if (vj === undefined || vj === null) {
		Ecp_loginFalse();
		Ecp_ReomveCookie(p);
		Ecp_ShowMsgShake(getLoginResource("LoginFailed"));
		return;
	}

	if (vj.IsShowCheck) {
		$("#Ecp_CheckCode").val("");
		Ecp_IsShowCheck = true;
		$("#Ecp_CheckCodeImg").attr({ src: Ecp_topLoginUrl + "api/loginapi/CheckCode" });
		$("#Ecp_CheckLink").click();
		$("#Ecp_CheckCodeLayer").show();
	}
	else {
		Ecp_IsShowCheck = false;
		$("#Ecp_CheckCodeImg").attr({ src: "" });
		$("#Ecp_CheckCodeLayer").hide();
	}

	//oversea-----------------
	if (vj.Msg === 'showoversea') {
		if (vj.ErrorMsg === null || vj.ErrorMsg === undefined || vj.ErrorMsg === '') {
			Ecp_loginFalse();
			Ecp_ReomveCookie(p);
			Ecp_ShowMsgShake(getLoginResource("LoginFailed"));
			return;
		}

		$('#Ecp_top_login_oversea').show();

		if (vj.ErrorCode === -1 || vj.ErrorCode === -2) {
			$('#ecpover_select').hide();
			$('#ecpover_close').show();
			$("#ecpover_p_close").html(vj.ErrorMsg);
			Ecp_ShowMsgShake(getLoginResource("LoginFailed"), true);
		}
		else {
			$('#ecpover_select').show();
			$('#ecpover_close').hide();

			$("#ecp_over_i").text(vj.ErrorCode);
			if (vj.r && vj.r.length > 0)
				$("#ecp_over_day").text(vj.r);
			$("#ecpover_open").unbind("click").bind("click", function () {
				$.ajax({
					url: Ecp_topLoginUrl + "api/loginapi/OverSeaOpen?k=" + vj.ErrorMsg,
					dataType: "jsonp",
					success: function (result) { Ecp_LoginResult(result); }
				});
			});
		}
		return;
	}
	else {
		$('#Ecp_top_login_oversea').hide();
	}
	//oversea-----------------

	if ((!vj.ShowName || vj.ShowName === '') && (!vj.BShowName || vj.BShowName === '') || vj.success === false) {
		Ecp_loginFalse();
		Ecp_ReomveCookie(p);
		if (vj.ErrorMsg === null || vj.ErrorMsg === undefined || vj.ErrorMsg === '')
			Ecp_ShowMsgShake(getLoginResource("LoginFailed"));
		else {
			if (vj.ErrorMsg === "IP自动登录失败") {
				if (vj.r !== null) {
					var d2 = new Date();
					d2.setHours(d2.getHours() + 24);
					cookie("Ecp_IpLoginFail", vj.r, { expires: d2, path: '/', domain: Ecp_CookieDomain });
					if (Ecp_CookieOtherDomain.length > 0) {
						cookie("Ecp_IpLoginFail", vj.r, { expires: d2, path: '/', domain: Ecp_CookieOtherDomain });
					}
				}
				//Ecp_isAuotIpLogin = "0";
			}
			Ecp_ShowMsgShake(vj.ErrorMsg);
		}
		return;
	}

	if (Ecp_CookieOtherDomain.length > 0) {
		cookie("Ecp_IpLoginFail", "", { expires: -1, path: '/', domain: Ecp_CookieOtherDomain });
	}

	if (vj.Domain !== null && vj.Domain !== undefined && vj.Domain !== '') {
		//Ecp_CookieDomain = vj.Domain;
		//Ecp_CookieOtherDomain = vj.Domain;
	}

	$(".modal").hide();

	Ecp_IsLogin = true;

	var data = new Object();//for cookie
	if (b_AutoLogin)
		vj.IsAutoLogin = true;

	//if (!b_newLogin) {
	if (!Ecp_ResultR) {
		var v = cookie(Ecp_LoginStuts);
		if (v && v.length > 0) {
			var vjson = JSON.parse(v);
			vj.r = vjson.r;
		}
	}
	else {
		vj.r = Ecp_ResultR;
	}
	//}

	vj.ShowName = vj.ShowName ? decodeURIComponent(vj.ShowName) : "";
	vj.BShowName = vj.BShowName ? decodeURIComponent(vj.BShowName) : "";

	data.IsAutoLogin = vj.IsAutoLogin;
	data.UserName = vj.UserName;
	data.ShowName = vj.ShowName ? encodeURIComponent(vj.ShowName) : "";
	data.UserType = vj.UserType;
	data.BUserName = vj.BUserName;
	data.BShowName = vj.BShowName ? encodeURIComponent(vj.BShowName) : "";
	data.BUserType = vj.BUserType;
	data.r = vj.r;

	WriteLoginCookie(data);
	function WriteLoginCookie(data) {
		try {
			var date2 = new Date();
			date2.setFullYear(date2.getFullYear() + 20);
			if (!isNull2(data.UserName)) {
				if (data.UserType === 'jf') {
					cookie("Ecp_loginuserjf", data.UserName, { expires: date2, path: '/', domain: Ecp_CookieDomain });
				} else {
					cookie("Ecp_loginuserbk", data.UserName, { expires: date2, path: '/', domain: Ecp_CookieDomain });
				}
				if (!isNull2(data.BUserName)) {
					if (data.BUserType === 'jf') {
						cookie("Ecp_loginuserjf", data.BUserName, { expires: date2, path: '/', domain: Ecp_CookieDomain });
					} else {
						cookie("Ecp_loginuserbk", data.BUserName, { expires: date2, path: '/', domain: Ecp_CookieDomain });
					}
				}
			}
		}
		catch (err) { }
	}


	var zone = getClientTimezone();
	if (zone === 8) {
		var fromCookie = false;
		var expire;
		if (vj.Expire && vj.Expire.length > 0)
			expire = vj.Expire;
		else {
			fromCookie = true;
			expire = cookie('c_m_expire');
		}

		var d;
		if (expire && expire.length > 0) {
			if (Ecp_CookieOtherDomain.length > 0 && fromCookie) {//从cookie获取的过期时间,当前时间加20
				d = new Date();
				d.setMinutes(d.getMinutes() + 20);
			}
			else {
				d = new Date(Date.parse(expire.replace(/-/g, "/")));
			}
		}
		else if (data.IsAutoLogin) {
			d = 7;
		} else {
			d = new Date();
			d.setMinutes(d.getMinutes() + 20);
		}
	}
	else {
		if (data.IsAutoLogin) {
			d = 7;
		} else {
			d = new Date();
			d.setMinutes(d.getMinutes() + 20);
		}
	}

	var rootPath = Ecp_getRootPath();
	var hid = JSON.stringify(data);

	if (vj.Uid === undefined || vj.Uid === null) {
		var uid = cookie('c_m_LinID');
		if (uid !== undefined && uid !== null && uid !== "" && uid.length > 45) {
			vj.Uid = getSubCookie(decodeURIComponent(uid), "LinID");
		}
	}

	var expireDate = new Date(d);
	expireDate.setSeconds(expireDate.getSeconds() + 5);

	//$.cookie.raw = true;

	cookie(Ecp_notFirstLogin, data.r, { expires: d, path: rootPath }, false);
	cookie(Ecp_LoginStuts, hid, { expires: d, path: '/', domain: Ecp_CookieDomain }, false);
	if (vj.Uid !== undefined && vj.Uid !== null) {
		cookie('c_m_LinID', 'LinID=' + vj.Uid + '&ot=' + d.Format('MM/dd/yyyy HH:mm:ss'), { expires: d, path: '/', domain: Ecp_CookieDomain }, false);
		//x.cnki.net
		//cookie('AID', vj.Uid, { expires: d, path: '/', domain: Ecp_CookieDomain }, false);
	}
	if (zone === 8)
		cookie('c_m_expire', d.Format('yyyy-MM-dd HH:mm:ss'), { expires: expireDate, path: '/', domain: Ecp_CookieDomain }, false);
	cookie("Ecp_lout", 0, { expires: -1, path: '/', domain: Ecp_CookieDomain }, false);	
	cookie("Ecp_session", 1, { path: '/', domain: Ecp_CookieDomain }, false);

	if (Ecp_CookieOtherDomain.length > 0) {
		cookie(Ecp_LoginStuts, hid, { expires: d, path: '/', domain: Ecp_CookieOtherDomain }, false);
		if (vj.Uid !== undefined && vj.Uid !== null)
			cookie('c_m_LinID', 'LinID=' + vj.Uid + '&ot=' + d.Format('MM/dd/yyyy HH:mm:ss'), { expires: d, path: '/', domain: Ecp_CookieOtherDomain }, false);
		if (zone === 8)
			cookie('c_m_expire', d.Format('yyyy-MM-dd HH:mm:ss'), { expires: expireDate, path: '/', domain: Ecp_CookieOtherDomain }, false);
		cookie("Ecp_lout", 0, { expires: -1, path: '/', domain: Ecp_CookieOtherDomain }, false);
		cookie("Ecp_session", 1, { path: '/', domain: Ecp_CookieOtherDomain }, false);
	}

	//cookie("Ecp_test", "aa" + data.r, { expires: d, path: '/', domain: Ecp_CookieDomain })
	//cookie("Ecp_test2", "aa2" + data.r, { expires: d, path: '/' })

	//if (!vj.Uid) {
	//	$("#Ecp_MycnkiLink").attr("href", $("#Ecp_MycnkiLink").attr("href") + "loginid2.aspx?uid=" + data.Uid);
	//	$("#Ecp_MycnkiLink1").attr("href", $("#Ecp_MycnkiLink1").attr("href") + "loginid2.aspx?uid=" + data.Uid);
	//}

	$("#Ecp_top_login_layer").hide();
	Ecp_LoginOpen = 0;
	if (Ecp_PageStyle === 'header') {
		$("#Ecp_top_login").hide();
		$("#Ecp_top_logout_layer").hide();
		$("#Ecp_top_logout").show();
		$("#Ecp_TextBoxUserName").val("");
		$("#Ecp_TextBoxPwd").val("");
		$("#Ecp_CheckCode").val("");
		$("#rememberMe").attr("checked", false);
		$("#Ecp_header_Register").hide();
	}

	Ecp_ShowLoginStauts(vj);

	if (typeof getLeadHtml === 'function')
		getLeadHtml(Ecp_topLoginUrl, data.UserName, data.UserType, "", b_newLogin);

	if (typeof LoginSucess === 'function') {
		if (Ecp_PageStyle === 'header') {
			if (b_newLogin) {
				LoginSucess(vj, b_newLogin);
				Ecp_CloseRealName(!(vj.ErrorCode && vj.ErrorCode === 9));
			}
		} else
			LoginSucess(vj, b_newLogin);
	}
	if (vj.ErrorCode && vj.ErrorCode === 9) {
		var uid2 = "";
		if (vj.Uid) uid2 = vj.Uid;
		var uName = "";
		if (vj.UserName) uName = vj.UserName;

		$("#Ecp_top_login_realName").show();
		$("#Ecp_top_login_realNameFrame").attr('src', Ecp_realNameUrl + "?UID=" + uid2 + "&userName=" + uName);
		ecp_startClock();
	} else {
		Ecp_CloseRealName(false);
	}
}

isNull2 = function (str) {
	if (typeof (str) === "undefined" || str === null || str === "")
		return true;
	else
		return false;
};

var realNameClock;
var realnameCookie = 'ecp_realname';
function ecp_startClock() {
	realNameClock = self.setInterval("ecp_checkRealNameCookie()", 300);
}
function ecp_checkRealNameCookie() {
	var coo = cookie(realnameCookie);
	if (coo && coo.length > 0) {
		if (realNameClock)
			realNameClock = window.clearInterval(realNameClock);
		cookie(realnameCookie, "", { expires: -1, path: '/', domain: '.cnki.net' });

		//console.log("get cookie");
		if (coo === "2") {
			Ecp_CloseRealName(true);
			Ecp_FlushLogin();
		}
		else {
			Ecp_CloseRealName(false);
		}
	}
}

function Ecp_CloseRealName(completed) {
	if (completed && typeof Ecp_LoginComplete === "function")
		Ecp_LoginComplete();

	$("#Ecp_top_login_realNameFrame").attr('src', '');
	$("#Ecp_top_login_realName").hide();
}

//=============================

function Ecp_ShowLoginStauts(vj) {
	if (typeof Ecp_HiddenHeader !== "undefined" && Ecp_HiddenHeader)
		return;

	if (!vj) {
		Ecp_ShowStatus(1, "");
		Ecp_ShowStatus(2, "");
	}
	else if (vj.UserType === "jf") {//vj.ShowName && vj.ShowName.length > 0
		Ecp_ShowStatus(2, vj.ShowName);
		$("#Ecp_MycnkiLinkJg").hide();
		if (vj.BUserType === "bk") {
			Ecp_ShowStatus(1, vj.BShowName);
		}
		else {
			Ecp_ShowStatus(1, "");
		}
		if (Ecp_PageStyle === 'header') {
			$("#Ecp_header_Register").hide();
		}

	} else {
		$("#Ecp_MycnkiLinkJg").show();
		Ecp_ShowStatus(1, vj.ShowName);
		Ecp_ShowStatus(2, "");
		if (Ecp_PageStyle === 'header') {
			$("#Ecp_header_Register").hide();
		}
	}

	Ecp_WelcomeShow();
}

function Ecp_ShowStatus(p, name) {
	if (p === 1) {
		if (name && name.length > 0) {
			$("#Ecp_top_login1").hide();
			$("#Ecp_top_logout1").show();
			$("#Ecp_loginShowName1").text(name);
		}
		else {
			$("#Ecp_top_login1").show();
			$("#Ecp_top_logout1").hide();
		}
		$("#Ecp_top_logout_layer1").hide();
	}
	else {
		if (name && name.length > 0) {
			$("#Ecp_top_login").hide();
			$("#Ecp_top_logout").show();
			$("#Ecp_loginShowName").text(name);
		}
		else {
			$("#Ecp_top_login").show();
			$("#Ecp_top_logout").hide();
		}
		$("#Ecp_top_logout_layer").hide();
	}
}

//0all, 1 3jg, 2 4 gr
function Ecp_LogoutOptr_my(p) {
	if (p === 1) {
		$("#Ecp_top_login1").show();
		$("#Ecp_top_logout1").hide();
	} else if (p === 2) {
		$("#Ecp_top_login").show();
		$("#Ecp_top_logout").hide();
	} else {
		$("#Ecp_top_login1").show();
		$("#Ecp_top_logout1").hide();
		$("#Ecp_top_login").show();
		$("#Ecp_top_logout").hide();
		$("#Ecp_header_Register").show();
	}

	Ecp_ShowMsg();

	//Ecp_UserLogout(p);
	//Ecp_loginFalse();

	$("#Ecp_TextBoxUserName").val("");
	$("#Ecp_TextBoxPwd").val("");
	$("#Ecp_CheckCode").val("");
	$("#rememberMe").attr("checked", false);

	var url1 = Ecp_topLoginUrl + "api/loginapi/Logout";//?domain=" + Ecp_CookieDomain;

	//if (p === 0) {
	//	Ecp_ReomveCookie(p);
	//}
	url1 += "?p=" + p;
	if (!isNull2(Ecp_platform)) {
		url1 += "&platform=" + Ecp_platform;
	}

	$.ajax({
		url: url1,
		dataType: "jsonp",
		cache: false,
		async: false,
		success: function (result) {
			//console.log("Top:Logout," + result.IsSuccess + "|" + result.ErrorCode + "|" + result.ErrorMsg);
			var r = (new Date()).Format("HH:mm:ss");
			r = result.Msg + " " + r;
			$("#Ecp_LoginUid").val(r);

			var v = cookie(Ecp_LoginStuts);
			var vj = null;
			if (v && v.length > 0) {
				vj = JSON.parse(v);
			}
			Ecp_ShowLoginStauts(vj);

			if (!vj) {
				cookie("Ecp_lout", 1, { path: '/', domain: Ecp_CookieDomain });
				if (Ecp_CookieOtherDomain.length > 0) {
					cookie("Ecp_lout", 1, { path: '/', domain: Ecp_CookieOtherDomain });
				}
				p = 0;
			}
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			$("#Ecp_LoginUid").val(textStatus + ":" + errorThrown);
		},
		complete: function (XMLHttpRequest, textStatus) {
			Ecp_LogoutSend(p);
			Ecp_ReomveCookie(p);
		}
	});

	if (typeof lead_remove === 'function')
		lead_remove();
}

function Ecp_LogoutSend(p) {
	var vj;
	var u;
	var vc;
	if (typeof Ecp_LogoutOptr === 'function') {
		if (p !== 0) {
			var v = cookie(Ecp_LoginStuts);
			if (v && v.length > 0) {
				vj = JSON.parse(v);
				//console.log('logout result : v');
			}
			//else {
			//	console.log('logout result : non v');
			//}
			if (!vj)
				p = 0;
			else {
				var uid = cookie('c_m_LinID');
				if (!uid) {
					p = 0;
				} else {
					u = getSubCookie(decodeURIComponent(uid), "LinID");
					if (!u) {
						p = 0;
					} else {
						vc = cookie("c_m_expire");
						if (!vc) {
							var d = new Date();
							d.setMinutes(d.getMinutes() + 20);
							vc = d.Format('yyyy-MM-dd HH:mm:ss');
						}
					}
				}
			}
		}

		if (p === 0) {
			Ecp_LogoutOptr(p);
		} else {
			vj.ErrorCode = 1;
			vj.ErrorMsg = null;
			vj.Expire = vc;
			vj.IsSuccess = true;
			vj.Msg = "登录成功";
			vj.Uid = u;
			LoginSucess(vj, true);
		}
	}
}

function Ecp_ReGetImg() {
	$("#Ecp_CheckCodeImg").attr("src", Ecp_topLoginUrl + "api/loginapi/CheckCode?t=" + Math.random());
}
//----------------------

//login validate--------------

String.prototype.Trim = function () {
	return this.replace(/^\s+|\s+$/g, "");
};
String.prototype.Ltrim = function () {
	return this.replace(/^\s+/g, "");
};
String.prototype.Rtrim = function () {
	return this.replace(/\s+$/g, "");
};
function RegexCheck(reg, str) {
	return reg.test(str);
}

String.prototype.endWith = function (str) {
	var reg = new RegExp(str + "$");
	return reg.test(this);
};

function Ecp_CheckUserName(userName) {
	var uName = userName.val();
	uName = $.trim(uName);
	if (uName === '') {
		Ecp_ShowMsgFocus(getLoginResource("EmptyUsername"), userName);
		return false;
	}
	if (RegexCheck(/.*('|;|\"|--).*/, uName) === true) {
		Ecp_ShowMsgFocus(getLoginResource("WrongFormatUsername"), userName);
		return false;
	}
	return true;
}
function Ecp_CheckPwd(pwd) {
	if (pwd.val() === '') {
		Ecp_ShowMsgFocus(getLoginResource("EmptyPassword"), pwd);
		return false;
	}
	return true;
}

function Ecp_EnterSubmit(e, invalue, button) {
	if (invalue.value && invalue.value === "") {
		Ecp_ShowMsg();
		return;
	}
	if (window.event) {

		keyPressed = window.event.keyCode; // IE
	}
	else {

		keyPressed = e.which; // Firefox

	}
	if (keyPressed === 13 || e.event === "keydown") {
		Ecp_SubmitCheck(button);
		event.stopPropagation();
		return false;
	}
}

function Ecp_SubmitCheck(button) {
	Ecp_ShowMsg();
	var userName = $('#Ecp_TextBoxUserName');
	var pwd = $('#Ecp_TextBoxPwd');

	if (!Ecp_CheckUserName(userName))
		return false;
	if (!Ecp_CheckPwd(pwd))
		return false;

	//button.disabled = true;
	Ecp_UserLogin(userName.val(), pwd.val());
}
//----------------------

function Ecp_GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r !== null) return unescape(r[2]); return null;
}

function Ecp_LoadJs(src, id, fun, parm) {
	var script = document.getElementById(id);
	if (script) {
		var head = document.getElementsByTagName('head')[0];
		head.removeChild(script);
	}

	script = document.createElement("script");
	script.id = id;
	script.type = "text/javascript";
	script.src = src;
	if (isImplementedOnload(script)) {
		script.onload = function () {
			fun(parm);
		};
	} else {
		script.onreadystatechange = function () {
			var r = script.readyState;
			if (r === 'loaded' || r === 'complete') {
				script.onreadystatechange = null;
				fun(parm);
			}
		};
	}
	document.getElementsByTagName("head")[0].appendChild(script);
}

function isImplementedOnload(script) {
	script = script || document.createElement('script');
	if ('onload' in script)
		return true;
	script.setAttribute('onload', '');
	return typeof script.onload === 'function';
}

function parseParam(param, key) {
	var paramStr = "";
	if (param instanceof String || param instanceof Number || param instanceof Boolean) {
		paramStr += "&" + key + "=" + encodeURIComponent(param);
	} else {
		$.each(param, function (i) {
			var k = key === null ? i : key + (param instanceof Array ? "[" + i + "]" : "." + i);
			paramStr += '&' + parseParam(this, k);
		});
	}
	return paramStr.substr(1);
}

function Ecp_ValdateInput(inp) {
	var el = document.getElementById(inp);
	if ("\v" == "v") {
		el.onpropertychange = textChange;
	} else {
		el.addEventListener("input", textChange, false);
	}
	function textChange() {
		if (el.value === "") {
			Ecp_ShowMsg();
		}
	}
}
//----------------------

function Ecp_getRootPath() {
	var strFullPath = window.document.location.href;
	var strPath = window.document.location.pathname;
	var pos = strFullPath.indexOf(strPath);
	var postPath = strPath.substring(0, strPath.substr(1).indexOf('/') + 1) + '/';
	return postPath;
}

function Ecp_TestCookieEnable() {
	var result = false;
	if (!navigator)
		return false;
	if (navigator.cookiesEnabled)
		return true;
	document.cookie = "e_t_c=1; expires=60";
	var cookieSet = document.cookie;
	if (cookieSet.indexOf("e_t_c=1") > -1)
		result = true;
	document.cookie = "";
	return result;
}
function cookie(key, value, options, isEncode) {
	if (typeof value === "undefined") {
		var cookies = document.cookie.split("; ");
		for (var i = 0, len = cookies.length; i < len; i++) {
			var parts = cookies[i].split("=");
			var name = decodeURIComponent(parts.shift());
			if (name === key)
				return decodeURIComponent(parts.join("="));
		}
		return undefined;
	}

	var _cookie = '';
	if (!isEncode)
		_cookie = key + "=" + value;
	else
		_cookie = encodeURIComponent(key) + "=" + encodeURIComponent(value);

	options = options || {};
	if (options.expires) {
		if (typeof options.expires === 'number') {
			var days = options.expires, t = options.expires = new Date();
			t.setTime(+t + days * 864e+5);
		}
		_cookie += ";expires=" + options.expires.toUTCString();
	}
	if (options.path)
		_cookie += ";path=" + options.path;
	if (options.domain)
		_cookie += ";domain=" + options.domain;
	//if (options.secure)
	_cookie += ";secure";
	document.cookie = _cookie;
}

function getSubCookie(coo, key) {
	if (coo !== undefined && key !== undefined) {
		var subCoo = coo.split("&");
		for (var i = 0; i < subCoo.length; i++) {
			var index = subCoo[i].indexOf("=");
			var sub = subCoo[i].substring(0, index);
			if (decodeURIComponent(sub) === key)
				return decodeURIComponent(subCoo[i].substring(index + 1));
		}
	}
	return "";
}

function getClientTimezone() {
	var nTimezone = -(new Date()).getTimezoneOffset() / 60;
	return nTimezone;
}

function GetParams3(name, src) {
	var reg = new RegExp("[^\?&]?" + encodeURI(name) + "=[^&]+");
	var arr = src.match(reg);
	if (arr !== null) {
		return decodeURI(arr[0].substring(arr[0].search("=") + 1));
	}
	return "";
}
//----------------------