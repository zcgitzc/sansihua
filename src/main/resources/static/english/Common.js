
String.prototype.format = function () {
    var args = arguments;
    return this.replace(/\{(\d+)\}/g,
        function (m, i) {
            return args[i];
        });
}
String.prototype.setCharAt = function (index, chr) {
    if (index > this.length - 1) return str;
    return this.substr(0, index) + chr + this.substr(index + 1);
}

function getOuterLink(type, page) {
    var urlFormat = '{0}loginid.aspx?uid={1}&p={2}';
    var link = getOuterBaseLink(type) + page;
    window.open(link);
}

function getOuterLinkLogin(type, page, lid) {
    var urlFormat = '{0}loginid.aspx?uid={1}&p={2}';
    var url = urlFormat.format(getOuterBaseLink('NAVI'), encodeURIComponent(lid), encodeURIComponent(page));
    window.open(url);
}

function getOuterBaseLink(type) {
    var baseurl = "";
    type = type.toUpperCase();
    switch (type) {
        case "NAVI": if (typeof (BaseLink_NAVI) != 'undefined') baseurl = BaseLink_NAVI ? BaseLink_NAVI : ""; break;
        case 'COVER': if (typeof (BaseLink_COVER) != 'undefined') baseurl = BaseLink_COVER ? BaseLink_COVER : ""; break;
        case 'LIB': if (typeof (BaseLink_LIB) != 'undefined') baseurl = BaseLink_LIB; break;
        case 'AD': if (typeof (BaseLink_AD) != 'undefined') baseurl = BaseLink_AD ? BaseLink_AD : ""; break;
            //case 'KLOGINFOOTER': if (typeof (BaseLink_KloginFooter) != 'undefined') baseurl = BaseLink_KloginFooter ? BaseLink_KloginFooter : ""; break;
            //case 'KLOGIN': if (typeof (BaseLink_Klogin) != 'undefined') baseurl = BaseLink_Klogin ? BaseLink_Klogin : ""; break;
        case 'KLOGINHFURL': if (typeof (BaseLink_KLoginHFUrl) != 'undefined') baseurl = BaseLink_KLoginHFUrl ? BaseLink_KLoginHFUrl : ""; break;
        case 'VER': if (typeof (Ver) != 'undefined') baseurl = Ver ? Ver : ""; break;
        case 'ISOPENINTERNET': if (typeof (IsOpenInternet) != 'undefined') baseurl = IsOpenInternet ? IsOpenInternet : ""; break;
    };
    return baseurl;
}

function getKns55NaviLink(lid, code, table, pykm) {
    var urlFormat = '{0}loginid.aspx?uid={1}&p={2}';
    var pageFormat = 'Navi/Bridge.aspx?LinkType=BaseLink&DBCode={0}&TableName={1}&Field=BaseID&Value={2}';
    var pageFormatClkd = 'navi_clkd/Issue.aspx?dbcode={0}&dbPrefix=CLKT&pykm={1}';//modify by faw 20160106 添加法库导航跳转——期刊整本
    code = code.toLowerCase();
    //added by scp 20160621
    if (code == "chkj") {
        pageFormat = '/KNS/Navi_CHKD/Bridge.aspx?LinkType=BaseLink&DBCode={0}&TableName={1}&Field=BaseID&Value={2}';
    }
    //end
    var page, url;
    if (code != "clkj") {
        if (code == "cjsf") {
            table = "cjfdbaseinfo";
        }
        page = pageFormat.format(code, table, pykm);
        url = urlFormat.format(getOuterBaseLink('NAVI'), encodeURIComponent(lid), encodeURIComponent(page));
    }
    else {
        page = pageFormatClkd.format(code, pykm);
        url = urlFormat.format(getOuterBaseLink('NAVI'), encodeURIComponent(lid), encodeURIComponent(page));
    }
    window.open(url);
}

function getKns55NaviLinkIssue(lid, code, table, pykm, year, issue) {
    var urlFormat = '{0}loginid.aspx?uid={1}&p={2}';
    var pageFormat = 'Navi/Bridge.aspx?LinkType=IssueLink&DBCode={0}&TableName={1}&ShowField=cname&Field=BaseID*year*issue&Value={2}*{3}*{4}';
    var pageFormat_ccjd = 'Navi/Bridge.aspx?LinkType=IssueLink&DBCode={0}&TableName={1}&ShowField=cname&Field=thname&Value={2}{3}{4}';
    var pageFormatClkd = 'navi_clkd/itemlist.aspx?dbcode=CLKJ&dbPrefix=CLKJ&pykm={0}&yq={1}*{2}';//modify by faw 20160106 添加法库导航跳转——期刊分期
    code = code.toLowerCase();
    //added by scp 20160621
    if (code == "chkj") {
        pageFormat = '/KNS/Navi_CHKD/Bridge.aspx?LinkType=IssueLink&DBCode={0}&TableName={1}&ShowField=cname&BaseID={2}&YearID={2}{3}{4}&Field=拼音刊名*年*期&Value={2}*{3}*{4}';
    }
    //end
    var page, url;
    if (code == "cjsf") {
        table = "cjfdyearinfo";
    }
    if (code == "cfjd" || code == "cfjw" || code == "cfjg" || code == "cfjc" || code == "cfjx") {
        table = "cfedyearinfo";
    }
    if (code == "ccjd" || code == "cjfv" || code == "cjfu" || code == "cjfz" || code == "cjfy" || code == "cjfx" || code == "cjft") {
        table = "";
        pageFormat = pageFormat_ccjd;
    }
    if (code != "clkj") {
        page = pageFormat.format(code, table, pykm, year, issue);
        url = urlFormat.format(getOuterBaseLink('NAVI'), encodeURIComponent(lid), encodeURIComponent(page));
    } else {
        page = pageFormatClkd.format(pykm, year, issue);
        url = urlFormat.format(getOuterBaseLink('NAVI'), encodeURIComponent(lid), encodeURIComponent(page));
    }
    window.open(url);
}

function getKns55UnitNaviLink(lid, code, unitcode) {
    var urlFormat = '{0}loginid.aspx?uid={1}&p={2}';
    var pageFormat = 'Navi/Bridge.aspx?DBCode={0}&UnitCode={1}';
    var pageFormatClkd = 'navi_clkd/{0}issue.aspx?dbcode={0}&dbPrefix=CLKT&pykm={1}';//modify by faw 20160106 添加法库导航跳转——博硕
    code = code.toLowerCase();
    //added by scp 20160621
    if (code == "chkj") {
        pageFormat = '/KNS/Navi_CHKD/Bridge.aspx?DBCode={0}&UnitCode={1}';
    }
    //end
    var page, url;
    if (code == "cmbf" || code == "cmbf2011" || code == "cmsf" || code == "cmzd") {
        code = "cmfd";
    }
    else if (code == "cdbf" || code == "cdbf2011" || code == "cdsf" || code == "cdmd") {
        code = "cdfd";
    }
    if (code != "clkb" && code != "clkm") {
        page = pageFormat.format(code, unitcode);
        url = urlFormat.format(getOuterBaseLink('NAVI'), encodeURIComponent(lid), encodeURIComponent(page));
    }
    else {
        page = pageFormatClkd.format(code, unitcode);
        url = urlFormat.format(getOuterBaseLink('NAVI'), encodeURIComponent(lid), encodeURIComponent(page));
    }
    window.open(url);
}
//add by faw 20160106 添加法库导航跳转——报纸
function getKns55NewsNaviLink(lid, code, newscode) {
    var urlFormat = '{0}loginid.aspx?uid={1}&p={2}';
    var pageFormatClkd = 'navi_clkd/clknIssue.aspx?dbcode={0}&dbPrefix=CLKT&pykm={1}';
    code = code.toLowerCase();
    var page = pageFormatClkd.format(code, newscode);
    var url = urlFormat.format(getOuterBaseLink('NAVI'), encodeURIComponent(lid), encodeURIComponent(page));
    window.open(url);
}

function getKns55YearNaviLink(lid, code, table, pykm, year) {
    var urlFormat = '{0}loginid.aspx?uid={1}&p={2}';
    var pageFormat = 'Navi/Bridge.aspx?LinkType=YearLink&DBCode={0}&TableName={1}&ShowField={4}&Field={5}*year&Value={2}*{3}';
    var page = pageFormat.format(code, table, pykm, year, encodeURIComponent("年鉴中文名"), "BaseID");
    var url = urlFormat.format(getOuterBaseLink('NAVI'), encodeURIComponent(lid), encodeURIComponent(page));
    //alert(url);
    window.open(url);
}


function getKns55CYFDNaviLink(lid, code, table, pykm) {
    var urlFormat = '{0}loginid.aspx?uid={1}&p={2}';
    var pageFormat = 'Navi/Bridge.aspx?LinkType=BaseLink&DBCode={0}&TableName={1}&Field={3}&Value={2}';
    code = code.toLowerCase();
    var page = pageFormat.format(code, table, pykm, encodeURIComponent("种编码"));
    var url = urlFormat.format(getOuterBaseLink('NAVI'), encodeURIComponent(lid), encodeURIComponent(page));
    //alert(url);
    window.open(url);
}


function OpenCRLDENG(param) {
    window.open(BaseLink_CRLDENG + encodeURIComponent(param));
}

function GetRefBookLink(kw) {
    if (typeof (BaseLink_REFBOOK) == 'undefined' || BaseLink_REFBOOK == null || BaseLink_REFBOOK == "")
        return "";
    var linkformat = "{0}BasicSearch.aspx?kw={1}";
    return linkformat.format(BaseLink_REFBOOK, kw);
}

//function changeLang(src,target){
//	var url = window.location.href;
//	alert(url);
//	if(target=="chs" || target=="")
//	    target="..";
//	else if(target=="en")
//	    target="en";
//	else if(target=="cht")
//	    target="cht";
//	var regExp = /([^\/^.]*.aspx?[\S]*)/ig;
//	if(regExp.test(url))
//	{
//	    alert(RegExp.$1);
//	    url = target+"/"+RegExp.$1;
//     }
//	alert(url);
//	window.location = url;
//}

function login() {
    var url = window.location.href;
    var target = "../login.aspx?url=" + encodeURIComponent(url);
    window.location = target;
}

function logout() {
    var url = window.location.href;
    var target = "../logout.aspx?url=" + encodeURIComponent(url);
    window.location = target;
}

function MM_swapImage(image, url) {
    image.src = url;
}


function OnDownloadMore(url, sTitle, sTable, sFn, sCode) {
    var sUrl = url + "?ti=" + encodeURIComponent(sTitle) + "&tb=" + sTable + "&fn=" + sFn + "&code=" + sCode;
    window.open(sUrl, 'download', 'height=200, width=400, top=100,left=300, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no');

}


function OpenDLMore(sFn, sTable, sPlus) {
    var url = "../../download.aspx?filename=" + sFn + "&tablename=" + sTable + "&pubstr=" + sPlus;
    window.open(url, '_blank');
}

function ChangeReferType(reftype) {
    var el = document.getElementById("rl" + reftype);
    var arrReferLink = document.getElementsByName(el.name);
    for (var i = 0; i < arrReferLink.length; i++) {
        arrReferLink[i].className = "";
    }
    el.className = "ReferLinkOn";
}



function ShowChar(id) {
    var oValue = document.getElementById(id).innerHTML;
    var result = "";
    for (var i = 0; i < oValue.length; i++) {
        var c = oValue.charCodeAt(i);
        result += c + ":" + oValue[i] + ";";
    }
    alert(result);
}

function RemoveUnknownChar(oValue) {
    //var oValue = String(document.getElementById(id).innerHTML);
    for (var i = 0; i < oValue.length; i++) {
        var c = oValue.charCodeAt(i);
        if (c == 57361 || c == 57355 || c == 57347 || c == 57348) {
            //alert(c);
            oValue = oValue.setCharAt(i, ' ');
        }
        if (c == 58426) {
            oValue = oValue.setCharAt(i, 'ö');
        }
    }
    return oValue;
}


function KeywordFilter(text) {
    text = text.replace(/:[\d]+/g, "");
    return text;
}
var g_Summary = new Object();
var g_SummaryLength = 500;
function AbstractFilter(id, idMoer, idReset) {
    var oAb = document.getElementById(id);
    var text = oAb.innerHTML;
    g_Summary[id] = text;
    ResetSummary(id, idMoer, idReset);
}
function MoerSummary(id, idMoer, idReset) {
    var oAb = document.getElementById(id);
    var text = g_Summary[id];
    text = RemoveUnknownChar(text);
    //text = ReplaceSub(text);
    oAb.innerHTML = text + "&nbsp;";
    document.getElementById(idMoer).style.display = "none";
    document.getElementById(idReset).style.display = "";
}

function ResetSummary(id, idMoer, idReset) {
    var oAb = document.getElementById(id);
    var text = g_Summary[id];
    if (text.length > g_SummaryLength) {
        text = text.substring(0, g_SummaryLength) + '...';
        document.getElementById(idMoer).style.display = "";
        document.getElementById(idReset).style.display = "none";
    }
    text = RemoveUnknownChar(text);
    //text = ReplaceSub(text);
    oAb.innerHTML = text + "&nbsp;";
}
function GetCookie(sName) {
    var sRE = "[;]*[\s]*" + sName + "=([^;]*)";
    var oRE = new RegExp(sRE);
    //alert(document.cookie);
    if (oRE.test(document.cookie)) {
        return RegExp["$1"];
    } else {
        return "";
    }
}
function GetLib(text) {
    link = getOuterBaseLink("LIB");
    var co = document.getElementById("lib");
    if (link != "" && co) {
        var html = "<a target='_blank' href='{0}' >{1}</a> | ";
        var uid = GetCookie("LID");
        if (uid) { link = link + "&uid=" + uid; }
        html = html.format(encodeURI(link), text);
        co.innerHTML = html;
    }
}

function MetaFilter(text, dc) {
    var linkRegExp = /\[A\]([^\[]+)\[\/A]/ig;
    var brRegExp = /\[BR\]/ig;
    var link = '<a href="meta.aspx?key={0}&dbcode={2}" >{1}</a>';
    function replaceLink(match, $1) { return link.format(encodeURIComponent($1), $1, dc); }
    text = text.replace(linkRegExp, replaceLink);
    text = text.replace(brRegExp, '</p><p>')
    document.write(text);
}
function OpenMeta(key, code) {
    //if(key.indexOf('%'))
    //alert(key);
    //alert(key);
    url = "meta.aspx?key={0}&dbcode={1}";
    window.open(url.format(encodeURIComponent(key), code));
}


function Translate(value, lang, id) {
    //alert(value);
    google.language.translate(value, 'zh-CN', lang, function (result) { if (result.translation) { document.getElementById(id).innerHTML = result.translation; } });
}

/**
* KLogin Module
*/
(function ($) {
    var klogin = function () { };

    //获取dbCode
    var _getDbCode = function() {
        var dbcode = getQueryString("dbcode");
        var pcode = getQueryString("pcode");

        //如果pcode非空
        if (pcode != "") {
            dbcode = pcode;
        } else {
            //取表名前4位确定dbcode
            if (dbcode == '') {
                var dbname = getQueryString("dbname");
                if (dbname != '') {
                    dbcode = dbname.substr(0, 4);
                }
            }
        }
        return dbcode;
    };

    //加载头尾
    klogin.getHf= function () {
        var url = unescape(getOuterBaseLink("KLoginHFUrl"));
        var $boxH = $("#headerBox");
        var $boxF = $("#footerBox");
        if ($boxH.length == 1 && $boxF.length == 1 && $.trim(url) != "") {
            var ismirror = getOuterBaseLink("VER") == "mirror";
            var isopeninternet = getOuterBaseLink("ISOPENINTERNET") == "1";
            var flag = "1";//带首页链接
            if (ismirror == "1") {
                if (isopeninternet == "0") {
                    flag = "3";//封闭镜像
                } else {
                    flag = "4";//开放镜像
                }
            }
            var urlTotal = url + "&flag=" + flag + "&dbcode=" + _getDbCode();

            $.getJSON(urlTotal, function (json) {
                if (ismirror) {
                    $boxH.html(unescape(json.headhtml));
                } else {
                    $boxH.append(unescape(json.headhtml));
                }
                $boxF.html(unescape(json.foothtml));
                if ($("#footerBox .custom-footer").length > 0 && ($(window).height() - document.body.clientHeight > 0)) {
                    $boxF.css("margin-top", $(window).height() - document.body.clientHeight + 20);
                }
            });
        };
    };

    //登出
    klogin.loginOut = function () {
        var url = "/kns/Logout.aspx?q=-1";
        $.post(url, null, null);
        url = "/kdoc/Logout.aspx";
        $.post(url, null, null);
        url = "/kcms/Logout.aspx?url=" + encodeURIComponent(window.location.href);
        $.post(url, null, function () {
            var urlhref = window.location.href;
            if (urlhref.indexOf("&uid=") > 0 || urlhref.indexOf("?uid=") > 0) {
                urlhref = SetQueryStringByName(urlhref, "uid", "");
            }
            window.location = urlhref;
        });
    };

    //登录
    var _loginIn = function (uid) {
        var url = "/kns/Loginid.aspx";
        $.post(url, { uid: uid }, function () {
            //到系统内还原登陆
            var urlhref = window.location.href;
            if (urlhref.indexOf("&uid=") > 0 || urlhref.indexOf("?uid=") > 0) {
                urlhref = SetQueryStringByName(urlhref, "uid", uid);
            }
            else {
                urlhref = urlhref + (urlhref.indexOf("?") > 0 ? "&" : "?") + "uid=" + uid;
            }
            window.location = urlhref;
        });
    };

    //登录成功
    klogin.loginSuccess = function (uid) {
        _loginIn(uid);
    };

    window.KLogin = klogin;
})(jQuery);

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var strsearch = window.location.search.substr(1).toLowerCase();
    var r = strsearch.match(reg);
    if (r != null) return unescape(r[2]); return "";
}

function SetQueryStringByName(query, name, sValue) {
    if ('[object String]' == Object.prototype.toString.call(query)) {
        var result = query.match(new RegExp("([\?\&]+)" + name + "=[^\&]*", "i"));
        var sRe = query;
        if (result != null) {
            sRe = query.replace(result[0], result[1] + name + "=" + encodeURI(sValue));
        }
        else {
            sRe = query + "&" + name + "=" + sValue;
        }
        return sRe;
    }
    return "";
}

//JSDT显示分享弹层
function showDialogJSDT() {    
    var objTitle = $("#chTitle");
    if (objTitle.length == 0) {
        objTitle = $("#enTitle")
    }
    if (objTitle.length == 0) {
        return;
    }

    $("#J_fxHidden #fxUrl").text(window.location.href);
    $("#J_fxHidden #fxTitle").text($(objTitle).text());
    
    layer.open({
        type: 1,
        title: '欢迎分享',
        closeBtn: 0,
        shadeClose: true,
        skin: 'layerSelf-box',
        area: '430px',
        content: $('#J_fxHidden').html(),
        success: function (layero, index) {
            //提交按钮绑定点击事件
            var obtn = $('#J_layerSelf-btn-submit', layero);
            obtn && obtn.on('click', function () {
                //业务code...

                //提示信息
                layer.msg('分享成功', { 'icon': 1, 'time': 2000 });
                //关闭弹层
                layer.close(index);
            });
        }
    });
}


//注意发布时，将domain  换为 注释部分内容
function SetCookie(name, value, expiredays) {

    if (GetCookie(name) == "" || GetCookie(name) == null) {
        var exdate = new Date()
        exdate.setDate(exdate.getDate() + expiredays)
        document.cookie = name + "=" + escape(value) +
        //本地使用
        //((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + "; path=/";
        //外网使用
        ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + "; path=/;" + "domain=cnki.net";
    }

}
//读取cookies
function GetCookie(name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(name + "=")
        if (c_start != -1) {
            c_start = c_start + name.length + 1
            c_end = document.cookie.indexOf(";", c_start)
            if (c_end == -1) c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return ""
}