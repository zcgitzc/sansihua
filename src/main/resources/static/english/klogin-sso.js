//登录
function LoginSucess(data) {
    $(".modal").hide();//新版隐藏
    var uid = data.Uid;
    var uid5_hypt = $.md5(uid);
    var cuid5_hypt = cookie('ecp_hypt_uid5');
    if (cuid5_hypt === undefined || cuid5_hypt && cuid5_hypt.length >= 16 && cuid5_hypt !== uid5_hypt) {
        var loginUrl = "/klogin/request/login.ashx?act=login&uid=";
        if (uid && uid != '') {
            loginUrl += uid;
            $.ajax({
                type: "post",
                url: loginUrl,
                dataType: "jsonp",  //数据类型为jsonp  
                jsonp: "jsonp",
                success: function (data) {
                    var d = GetDateNow();
                    var islogin = data[0].IsLogin;
                    if (islogin) {
                        $("#kloginMngr").html(d + " 登录成功,调用了login.ashx?act=login");

                        //登录成功，cookie：ecp_uid5占位，避免刷新时再次执行LoginSucess
                        var uid5 = $.md5(uid);
                        cookie("ecp_uid5", uid5);
                        cookie("ecp_hypt_uid5", uid5, { path: '/', domain: Ecp_CookieDomain });

                        //登录成功，不需要刷新当前页面
                        var isNotSSoReload = $("#isNotSSoReload").length > 0;
                        if (!isNotSSoReload) {
                            //到系统内还原登陆
                            var urlhref = window.location.href;
                            if (urlhref.indexOf("&uid=") > 0 || urlhref.indexOf("?uid=") > 0) {
                                urlhref = SetQueryStringByName(urlhref, "uid", uid);
                            }
                            else {
                                urlhref = urlhref + (urlhref.indexOf("?") > 0 ? "&" : "?") + "uid=" + uid;
                            }
                            window.location = urlhref;
                        }
                    } else {
                        $("#kloginMngr").html(d + " 登录失败,调用了login.ashx?act=login");
                    }
                }
            });
        }
    }
}
//登出
function Ecp_LogoutOptr(data) {
    var logoutUrl = "/klogin/Request/login.ashx?act=logout";
    $.ajax({
        type: "get",
        url: logoutUrl,
        dataType: "jsonp",  //数据类型为jsonp  
        jsonp: "jsonp",
        success: function (data) {
            var d = GetDateNow();
            var isLogout = data[0].IsLogout;
            if (isLogout) {
                $("#kloginMngr").html(d + " 退出成功,调用了login.ashx?act=logout");
                cookie("ecp_hypt_uid5", "", { expires: -1, path: '/', domain: Ecp_CookieDomain });

                //登出成功，不需要刷新当前页面
                var isNotSSoReload = $("#isNotSSoReload").length > 0;
                if (!isNotSSoReload) {
                    var urlhref = window.location.href;
                    if (urlhref.indexOf("&uid=") > 0 || urlhref.indexOf("?uid=") > 0) {
                        urlhref = SetQueryStringByName(urlhref, "uid", "");
                    }
                    window.location = urlhref;
                }
            } else {
                $("#kloginMngr").html(d + " 退出失败,调用了login.ashx?act=logout");
            }
        }
    });
}

//获取时间
function GetDateNow() {
    return new Date().toLocaleString();
}

//设置Url参数值
function SetQueryStringByName(query, name, sValue) {
    if ('[object String]' == Object.prototype.toString.call(query)) {
        var result = query.match(new RegExp("([\?\&]+)" + name + "=[^\&]*", "i"));
        var ret = query;
        if (result != null) {
            ret = query.replace(result[0], result[1] + name + "=" + encodeURI(sValue));
        }
        else {
            ret = query + "&" + name + "=" + sValue;
        }
        return ret;
    }
    return "";
}

//根据位置显示用户自定义头
function SetCustomeHeader() {
    //自定义头内容
    if ($("#customeHeaderContent").length > 0) {
        var customeHeaderContent = $("#customeHeaderContent").val();
        headerHtml = unescape(customeHeaderContent);
        var positionValue = $("#customeHeaderPosition").val();
        if (positionValue == '1') {
            $('.ecp_top-nav').before(headerHtml);
        } else {
            $('.ecp_top-nav').after(headerHtml);
        }
    }

    //修改'手机版'url
    if ($("#customeHeaderHomePath").length > 0) {
        var customeHeaderHomePath = $("#customeHeaderHomePath").val();
        $('#Ecp_header_Mobile').attr('href', customeHeaderHomePath);
    }
}

//自定义电商统一登录头dom
function modifyEcpHeader() {
    //1.1修改样式
    $(".ecp_top-nav").css("border-top", "none");
    //修改用户名称样式
    $("#Ecp_loginShowName1").css("display", "inline-block")
    .css("max-width", "100px")
    .css("white-space", "nowrap")
    .css("text-overflow", "ellipsis")
    .css("overflow", "hidden");

    //隐藏链接
    $("#Ecp_header_english").hide();


    //添加链接
    $("#Ecp_header_Mobile").after("<a id='Ecp_header_Webmap' class='ecp_tn-tab' target='_blank' href='/kns/subPage/map.aspx'><i>网站地图</i></a>");

    //显示链接
    $("#Ecp_header_ChargeCenter").show();
    $("#Ecp_header_BuyCard").show();

    //$("#Ecp_header_ChargeCenter").before("<div class='ecp_tn-title' id='Ecp_header_test3'><a class='ecp_tn-tab' target='_blank' href='//my.cnki.net/elibregister/commonRegister.aspx'><i>测试3</i></a></div>");

    //不能在Ecp_top_login_div前加链接....

    //修改弹出框样式
    //$("#Ecp_top_login").unbind("click").bind("click", function () { Ecp_ShowLoginLayer2(1,'-110px','48px'); });
}

//渲染事件 -1.1不再使用
//if (typeof FlushLogin == 'function') {
//    FlushLogin();
//}

var modifyFlag = true;

//渲染完成之后，回调函数
function LayInitComplete() {
    if (modifyFlag) {
        if ($(".ecp_top-nav").length > 0) {
            modifyFlag = false;
            modifyEcpHeader();
            SetCustomeHeader();
        }
    }

}

if (modifyFlag) {
    if ($(".ecp_top-nav").length > 0) {
        modifyFlag = false;
        modifyEcpHeader();
        SetCustomeHeader();
    }
}
