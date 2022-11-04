function AppendJs(jsurl, callback) {
	var oHead = document.getElementsByTagName('HEAD').item(0);
	var oScript = document.createElement("script");
	oScript.src = jsurl;
	if (callback)
		oScript.onload = callback;
	document.head.appendChild(oScript);
}

function IncludeCss(path) { var a = document.createElement('link'); a.href = path; a.rel = 'stylesheet'; var head = document.getElementsByTagName('head')[0]; head.appendChild(a); }
var Ecp_ArgueDic = new Object();
var Ecp_Lay_Locate = 'left';
var lang = 'zh-CN';
var Ecp_platform;

var ecp_data = "<div class='ecp_top-nav'>  <div class='ecp_tn-header'> <div class='ecp_tn-nav'>  <div class='ecp_tn-title'> <a id='Ecp_header_Mobile' class='ecp_tn-tab' target='_blank' href='https://m.cnki.net/mcnkidown/index.html'><i>手机版</i></a> <a id='Ecp_header_english' class='ecp_tn-tab' target='_blank' href='https://oversea.cnki.net'><i>English</i></a> <a id='Ecp_header_Help' class='ecp_tn-tab' target='_blank' href='https://service.cnki.net/helpcenter/'><i>帮助中心</i></a>  </div> </div> <div class='tn-person-r'>  <div id='Ecp_top_login_div20' class='ecp_tn-title ecp_tn-title-login'> <span id='Ecp_welcome' class='tn-greeting' style='display:none;'>欢迎</span>  </div>  <div id='Ecp_top_login_div21' class='ecp_tn-title ecp_tn-title-login'> <!--登录1--> <div id='Ecp_top_login1' class='div_inline'>  <a class='ecp_tn-tab' href='javascript:void(0);'> <i>机构登录<span class='ecp_tn-arrow'></span></i>  </a> </div> <!--退出1--> <div id='Ecp_top_logout1' class='ecp_tn-title' style='display:none;'>  <a id='Ecp_top_logout_showLayer1' class='ecp_tn-tab ecp_tn-tab-user' href='javascript:void(0);'> <i><em title='' id='Ecp_loginShowName1'></em><span class='ecp_tn-arrow'></span></i>  </a>  <div id='Ecp_top_logout_layer1' class='tn-topmenulist tn-topmenulist-a tn-topmenulist-a-user' style='display:none;'> <ul class='tn-text-list'>  <li><a id='Ecp_MycnkiLinkJg' href='https://my.cnki.net/MyCNKI/' title='我的账户' target='_blank'>我的账户</a></li>  <li><a id='Ecp_top_logoutJgClick1' href='javascript:void(0);' title='退出'>机构退出</a></li>  <li><a id='Ecp_top_logoutClick1' href='javascript:void(0);' title='退出'>全部退出</a></li> </ul>  </div> </div> <!--弹框--> <div id='Ecp_top_login_layer' class='tn-topmenulist tn-topmenulist-b Ecp_top_login_layer-my' style='left:5px;top: 42px;'>  <div class='outlogin_layerbox_bylx outlogin_layerbox_bylx_anrrow top_login_layer2-my' node-type='box'> <div>  <a id='Ecp_top_login_closeLayer' class='layerbox_close' href='javascript:void(0);'>×</a> </div> <div class='layerbox_left'>  <div class='ecp_titletips'></div>  <p id='Ecp_errorMsg' class='login_error_tips' style='display:none;'></p>  <ul class='loginformlist'> <li class='ndrelativewrap'>  <input id='Ecp_TextBoxUserName' class='styles' type='text' name='Ecp_TextBoxUserName' placeholder='请输入用户名/邮箱/手机号' tabindex='1' maxlength='64'>  <a id='Ecp_RegistNew' style='color: #666;' href='https://my.cnki.net/Register/CommonRegister.aspx?returnUrl=#ReturnUrl##&ecpplatform#' target='_blank'>注册新用户</a> </li> <li>  <input id='Ecp_TextBoxPwd' class='styles' type='password' name='Ecp_TextBoxPwd' placeholder='请输入密码' tabindex='2' maxlength='20' autocomplete='off' autocapitalize='off' onkeydown='return Ecp_EnterSubmit(event,this,Ecp_Button1);' />  <a style='color: #666;' href='https://my.cnki.net/mycnki/RealName/FindPsd.aspx#ecpplatform#' target='_blank'>找回密码</a> </li>  <!--验证码--> <li id='Ecp_CheckCodeLayer' class='loginform_yzm' style='display:none;'>  <input id='Ecp_CheckCode' placeholder='验证码' class='styles' tabindex='3' maxlength='6' autocomplete='off' autocapitalize='off' type='text' onkeydown='return Ecp_EnterSubmit(event, this, Ecp_Button1);'>  <img id='Ecp_CheckCodeImg' src='' class='ecp_yzm' alt='看不清？换一张'><a id='Ecp_CheckLink' href='javascript:;' class='reload-code' title='看不清？换一张'>看不清？换一张</a> </li> <li class='ecp_btn_wrap'>  <a id='Ecp_Button1' class='ecp_login_btn' href='javascript:void(0);' tabindex='4'>登录</a>  <a id='Ecp_Button2' class='ecp_login_btn' href='javascript:void(0);' tabindex='5'>IP登录</a>  <a href='https://fsso.cnki.net/' target='_blank'> <span style='color:#29b1e5; font-weight:bold; line-height: 30px;'>校外访问&gt;&gt;</span>  </a> </li> <li>  <label id='Ecp_AutoLoginCheck' class='rmb_login' title='用户下次访问直接登录系统，为了账户安全，建议您在个人电脑使用此功能'> <input class='auto_checkbox' id='rememberMe' type='checkbox' name='rememberMe' autocomplete='off' checked='checked' /> <span>自动登录</span>  </label> </li> <li id='Ecp_ThirdLogin' class='sub_wrap_r' style='padding-top: 10px; margin-bottom:-15px;'>  <div style='font-size: 12px;  border-top: 1px dotted #eee; padding: 10px 0; '> <span>其他登录:</span> <a href='https://my.cnki.net/ThirdLogin/ThirdLogin.aspx?to=qq&amp;RedirectUrl=#ReturnUrl##&ecpplatform#\'>  <img src='https://login.cnki.net/TopLogin/Images/qq2.png' alt='qq登录'  style='width: 14px; max-width: 14px;height: auto;margin-left: 10px; vertical-align: bottom;' /> </a> <a href='https://my.cnki.net/ThirdLogin/ThirdLogin.aspx?to=weixin&amp;RedirectUrl=#ReturnUrl##&ecpplatform#\'>  <img src='https://login.cnki.net/TopLogin/Images/weixin2.png' alt='微信登录'  style='width: 14px; max-width: 14px;height: auto;margin-left: 10px;vertical-align: bottom;' /> </a> <a href='https://my.cnki.net/ThirdLogin/ThirdLogin.aspx?to=163&amp;RedirectUrl=#ReturnUrl##&ecpplatform#\'>  <img src='https://login.cnki.net/TopLogin/Images/wangyi2.png' alt='网易登录'  style='width: 14px; max-width: 14px;height: auto;margin-left: 10px;vertical-align: bottom; ' /> </a> <a href='https://my.cnki.net/ThirdLogin/ThirdLogin.aspx?to=sina&amp;RedirectUrl=#ReturnUrl##&ecpplatform#\'>  <img src='https://login.cnki.net/TopLogin/Images/xinlang2.png' alt='新浪登录'  style=' width: 14px; max-width: 14px;height: auto;margin-left: 10px;vertical-align: bottom;' /> </a>  </div> </li> <li id='Ecp_ThirdLoginPlace' style='display:none; text-align:center;' class='sub_wrap_r'>  <p style='margin-top:40px;background-color:#eff6ff;font-size:14px;'> 登录机构用户  </p> </li>  </ul>  </div>  </div> </div> </div>  <div id='Ecp_top_login_div2' class='ecp_tn-title ecp_tn-title-login'> <div id='Ecp_top_login' class='div_inline'>  <a class='ecp_tn-tab' href='javascript:void(0);'> <i>个人登录<span class='ecp_tn-arrow'></span></i>  </a> </div> <div id='Ecp_top_logout' class='ecp_tn-title' style='display:none;'>  <a id='Ecp_top_logout_showLayer' class='ecp_tn-tab ecp_tn-tab-user' href='javascript:void(0);'> <i><em title='' id='Ecp_loginShowName'></em><span class='ecp_tn-arrow'></span></i>  </a>  <div id='Ecp_top_logout_layer' class='tn-topmenulist tn-topmenulist-a tn-topmenulist-a-user' style='display:none;'> <ul class='tn-text-list'>  <li><a id='Ecp_MycnkiLink' href='https://my.cnki.net/MyCNKI/' title='我的账户' target='_blank'>我的账户</a></li>  <li><a id='Ecp_top_logoutGrClick' href='javascript:void(0);' title='退出'>个人退出</a></li>  <li><a id='Ecp_top_logoutClick' href='javascript:void(0);' title='退出'>全部退出</a></li> </ul>  </div> </div>  </div> <!--其他 -->  <div class='ecp_tn-title' id='Ecp_header_Register'> <a class='ecp_tn-tab' target='_blank' href='https://my.cnki.net/Register/CommonRegister.aspx?returnUrl=#ReturnUrl##&ecpplatform#'><i>注册新用户</i></a>  </div>  <div class='ecp_tn-title' id='Ecp_header_mycnki'> <a class='ecp_tn-tab' target='_blank' href='https://i.cnki.net/#ecpplatform#'><i>我的CNKI<em class='icon-new'></em></i></a>  </div>  <div class='ecp_tn-title' id='Ecp_header_ChargeCenter' style='display:none;'> <a class='ecp_tn-tab' target='_blank' href='https://zhifu.cnki.net/#ecpplatform#'><i>充值中心</i></a>  </div>  <div class='ecp_tn-title' id='Ecp_header_BuyCard' style='display:none;'> <a class='ecp_tn-tab' target='_blank' id='Ecp_header_BuyCard_link' href='https://skcard.cnki.net/'><i>购买知网卡</i></a>  </div> </div>  </div> <input type='hidden' id='Ecp_LoginUserName' />  <input type='hidden' id='Ecp_LoginUid' />  <p style='display:none' id='Ecp_ReturnMsg'></p>  </div> <!--海外--> <div id='Ecp_top_login_oversea' class='login-modal' style='display:none;'>  <div class='login-l pull-left' style='width:483px;'> <div class='ecpover-mask'></div> <div class='ecpover-modal'>  <div class='ecpover-modal-hd'>{Tip}<a onclick='Ecp_LoginResult();' class='close'></a></div>  <div id='ecpover_select' class='ecpover-modal-bd'> <p>{Oversea}<br />{ServiceTimeRemain}<br /><i>{ServiceConfirm}</i></p> <div class='btns'><a onclick='Ecp_LoginResult();' class='btn btn-cancel'>{Cancel}</a><a id='ecpover_open' class='btn'>>{Access}</a></div> <div class='ecpover-tip'>{OverseaVisit}<a href='https://oversea.cnki.net' target='_blank'><i> oversea.cnki.net</i> ></a></div>  </div>  <div id='ecpover_close' class='ecpover-modal-bd' style='display:none;'> <p id='ecpover_p_close'>{Oversea}<br />{OverseaLoginExhaust}</i></p> <div class='btns'><a onclick='Ecp_LoginResult();' class='btn'>{Close}</a></div> <div class='ecpover-tip'>{OverseaVisit}<a href='https://oversea.cnki.net' target='_blank'><i> oversea.cnki.net</i> ></a></div>  </div> </div>  </div> </div> <!--海外--> <!--realname--> <div id='Ecp_top_login_realName' class='login-modal' style='display:none;'>  <div class='ecpover-mask2'></div>  <div style=' position:absolute; top:50%; left:50%; margin-left:-300px; margin-top:-220px; z-index:12000'>  <iframe id='Ecp_top_login_realNameFrame' style='width:600px; height:480px;border:none;'></iframe>  </div> </div> <!--realname--> <script>var Ecp_topLoginUrl = 'https://login.cnki.net/TopLogin/'; var Ecp_realNameUrl = 'https://login.cnki.net/Certification/RealNameCertificationPopup.aspx'; var Ecp_PageStyle = 'header'; var Ecp_Style = '1'; var Ecp_CookieDomain = 'cnki.net'; var Ecp_isAuotIpLogin = '1' <\/script>";

var Ecp_topLoginUrl = 'https://login.cnki.net/TopLogin/'
var Ecp_isAuotIpLogin = "1";
Ecp_windowonlad(function () {

	CreateArgDic();
	var nojquery = GetParams("nojquery")
	if (isNull(nojquery)) {
		nojquery = "0";
	}
	if (nojquery !== "1") {
		AppendJs(Ecp_topLoginUrl + "Scripts/jquery-1.11.3.min.js", InitPage);
	}
	else {
		InitPage();
	}
});

function InitPage() {
	AppendJs(Ecp_topLoginUrl + "Scripts/jquery.cookie.js");
	AppendJs(Ecp_topLoginUrl + "Scripts/jquery.md5.js");
	AppendJs(Ecp_topLoginUrl + "Scripts/json2-min.js");
	AppendJs(Ecp_topLoginUrl + "Scripts/resources/resource.js");
	AppendCss(Ecp_topLoginUrl + 'Content/TopLogin.css?v=201020');
	AppendJs(Ecp_topLoginUrl + "Scripts/topLogin2.js?v=201223", InitPage2);
}

function InitPage2() {
	AppendJs(Ecp_topLoginUrl + "Scripts/resources/login.zh-CN.js", InitPage3);
}

function InitPage3() {
	Ecp_platform = GetParams("platform");//)
	var returnUrl = GetParams("returnUrl");//)
	var isAutoIpLogin = GetParams("isAutoIpLogin");//)
	if (!isNull(isAutoIpLogin) && isAutoIpLogin === "0") {
		Ecp_isAuotIpLogin = "0";
	}
	else {
		Ecp_isAuotIpLogin = "1";
	}

	if (isNull(returnUrl)) {
		returnUrl = "https://www.cnki.net";
	}

	if (!isNull(Ecp_platform)) {
		returnUrl = decodeURIComponent(returnUrl);
		returnUrl = changeUrlArg(returnUrl, 'platform', Ecp_platform);
		returnUrl = encodeURIComponent(returnUrl);
	}
	var result = style2();
	function style2() {

		var result = ecp_data.replace(new RegExp("#ReturnUrl#", "g"), returnUrl);//loginapi/Login
		if (!isNull(Ecp_platform)) {
			result = result.replace(new RegExp("#ecpplatform#", "g"), "?platform=" + Ecp_platform);
			result = result.replace(new RegExp("#&ecpplatform#", "g"), "&platform=" + Ecp_platform);
			if (!isNull(returnUrl)) {
				result = result.replace(new RegExp("#returnurl#", "g"), "&returnUrl=" + returnUrl);
			}
			else {
				result = result.replace(new RegExp("#returnurl#", "g"), "");
			}
		}
		else {
			result = result.replace(new RegExp("#ecpplatform#", "g"), "");
			result = result.replace(new RegExp("#&ecpplatform#", "g"), "");
			if (!isNull(returnUrl)) {
				result = result.replace(new RegExp("#returnurl#", "g"), "?returnUrl=" + returnUrl);
			}
			else {
				result = result.replace(new RegExp("#returnurl#", "g"), "");
			}
		}
		return result;
	}
	var placeid = GetParams("placeid");
	var placesucc = false;
	if (!isNull(placeid)) {
		var placeho = $("#" + placeid + ":first");
		if (placeho) {
			placeho.prepend(result);
			placesucc = true;
		}
	}

	if (!placesucc) {
		$("body:first").prepend(result);
	}

	FlushLogin();

	if (typeof LayInitComplete === 'function') {
		LayInitComplete();
	}
}

isNull = function (str) {
	if (typeof (str) === "undefined" || str === null || str === "")
		return true;
	else
		return false;
};

function changeUrlArg(url, arg, val) {
	var pattern = arg + '=([^&]*)';
	var replaceText = arg + '=' + val;
	return url.match(pattern) ? url.replace(eval('/(' + arg + '=)([^&]*)/gi'), replaceText) : (url.match('[\?]') ? url + '&' + replaceText : url + '?' + replaceText);
}

function CreateArgDic() {
	var data = document.getElementById('toploginstruct').getAttribute('data').split('&');
	for (var vi = 0; vi < data.length; vi++) {
		var v = data[vi];
		var d = v.indexOf('=');
		var key = v.substring(0, d).toLowerCase();
		var val = v.substring(d + 1, v.length)
		Ecp_ArgueDic[key] = val;
	}
}

function GetParams(name) {
	return Ecp_ArgueDic[name.toLowerCase()];
}

function GetUrl() {
	var url = document.getElementById('toploginstruct');
	var reg = new RegExp("toplogin", "i").exec(url);
	return url.substring(0, reg.index);
}

function ReplaceSource(origin, dic) {
	var i = origin.indexOf("[");
	var j = origin.indexOf("]");
	while (i >= 0) {
		var temp = origin.substring(i + 1, j);
		//console.log(i + " " + j + " " + temp);

		origin = origin.replace("[" + temp + "]", dic[temp]);

		i = origin.indexOf("[");
		j = origin.indexOf("]");
	}

	//console.log(origin);
	return origin;
}
function baseUrl() {
	var url = document.getElementById('toploginstruct').src;
	var host = url.substring(0, url.toLowerCase().indexOf(Ecp_topToploginStr.toLowerCase()));
	return host;
}
function Ecp_windowonlad(FuncName) {
	if (document.all) {
		window.attachEvent('onload', FuncName)
	}
	else {
		window.addEventListener('load', FuncName, false);
	}
}
function AppendCss(path) {
	var a = document.createElement('link');
	a.href = path;
	a.rel = 'stylesheet';
	var head = document.getElementsByTagName('head')[0];
	head.appendChild(a);
}
