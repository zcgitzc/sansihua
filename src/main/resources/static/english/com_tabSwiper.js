function tabSwiper(id,fn) {
    var widthCom = 0;
    var leftWid = 0;
    var iW = 300;
    var winContent = $("#" + id).find(".tab_content_box").width();
    var oBox = $("#" + id);
    var otabSwiper = oBox.find(".tab_swiper.active");//仅获取显示的ul
    var lis = otabSwiper.find(".slide_li");
    var rBtn = oBox.find(".tab_fr");
    var lBtn = oBox.find(".tab_fl");
    var initLeft = parseFloat(otabSwiper.css("left"));
    var setUlWidth = function ($ul) {
        var lis = $ul.find('li');
        var nwidthCom = 0;
        lis && lis.each(function () {
            var liLen = $(this).outerWidth(true);
            nwidthCom += liLen;
        })

        $ul.width(nwidthCom + iW);
        widthCom = nwidthCom;
        return nwidthCom;
    };
    //存储n值
    if (otabSwiper.data('indexN') == undefined) {
        otabSwiper.data('indexN', 0);
    }

    initLeft = $.isNumeric(initLeft) ? initLeft : 0;
    if (initLeft < 0) {
        setUlWidth(otabSwiper);
        if ((widthCom - Math.abs(initLeft)) > winContent) {
            rBtn.css({
                "visibility": "visible",
                "display":"block"
            }).removeClass('disable');
        } else {
            rBtn.addClass('disable');
        }
    }
    //三级菜单初始化  左右箭头处理
    if (otabSwiper.width() <= winContent) {//隐藏右侧按钮
        rBtn.addClass('disable');
    }

    if (initLeft == 0) {//隐藏左侧按钮
        lBtn.addClass('disable');
    } else {
        lBtn.css({
            "visibility": "visible",
                "display":"block"

        }).removeClass('disable');
    }

    lis && lis.each(function () {
        var liLen = $(this).outerWidth(true);
        widthCom += liLen;
    })


    //量少隐藏左右切换按钮
    if (widthCom <= winContent) {
        oBox.removeClass('tab_swiperbox');
        oBox.find('.tab_arrow').addClass('disable');
        oBox.off('click.lis');
        oBox.on('click.lis', 'li', function (e) {
            var target = $(e.target);
            if (target.hasClass('tab_button')) {
                return;
            }
            var _this = $(this);
            _this.addClass("active").siblings("li").removeClass("active");
            var oUl = _this.parent();
            var oCon = oUl.parent();
            var pid = oCon.parent().attr('id');

            //重新设置ul宽度
            setUlWidth(oUl);
            if (oUl.width() > oCon.width()) {
                tabSwiper(id, fn);
            }
            var isFirstLoad = $("#isFirstLoad").val() == '1' ? true : false;
            if (fn && $.isFunction(fn) && !isFirstLoad) {
                fn(_this);
            }
        });
        //父盒子宽度变化 left 值归0 
        otabSwiper.css("left", 0);
        otabSwiper.data('indexN', 0);

    } else {
            oBox.addClass(' tab_swiperbox ');
        //设置宽度
        otabSwiper.width(widthCom + iW);
        otabSwiper.data('isSwiper', true);
        //显示右侧按钮
        if (initLeft == 0) {
            rBtn.css({'visibility':'visible','display':'block'}).removeClass('disable');
        } else {
            if ((widthCom + initLeft) < winContent) {
                rBtn.addClass('disable');
            }
        }
        //绑定左右按钮点击事件
        rBtn.off('click');
        rBtn.on('click', function (e) {
            var initW = 0;
            var lis = oBox.find(".active .slide_li");
            var lastLiW = 0;
            var oUl = oBox.find('ul:visible');
            var leftWid = Math.abs(parseFloat(oUl.css('left'))) || 0;
            var winContent = $(this).siblings(".tab_content_box").width();
            //重新设置ul的宽度
            var nRulWidth = setUlWidth(oUl);
            var len = lis.length;
            var n = oUl.data('indexN');
            var nStart = n;
            leftWid = n == 0 ? 0 : leftWid;
            for (var i = nStart; i < len; i++) {
                var liWin = lis.eq(i).outerWidth(true);
                initW += liWin;
                if (initW > winContent) {
                    n = (i - 1 < 0) ? 0 : (i - 1);
                    lastLiW = lis.eq(i).outerWidth(true);
                    initW = initW - lastLiW;
                    leftWid = leftWid + initW;

                    if (initW > (nRulWidth - lastLiW)) {
                        leftWid = initW;
                    }
                    break;
                }
            };
            if (initW > (nRulWidth - lastLiW)) {
                n = 0;
                leftWid = initW;
            }

            if (oBox.find(".tab_swiper.active").width() - iW - leftWid < winContent) {
                rBtn.addClass('disable');
            };

            if (leftWid > 0) {
                lBtn.css({'visibility':'visible','display':'block'}).removeClass('disable');
            }
            if (leftWid == 0) {
                lBtn.addClass('disable');
            }
            oUl.animate({
                "left": "-" + leftWid + "px"
            }, 'normal', function () {
                oUl.data('indexN', n);
            })
        })

        lBtn.off('click');
        lBtn.on('click', function (e) {
            var initW = 0;
            var lis = oBox.find(".active .slide_li");
            var oUl = oBox.find('ul:visible');
            //重新设置ul的宽度
            var nRulWidth = setUlWidth(oUl);
            var winContent = $(this).siblings(".tab_content_box").width();
            var n = oUl.data('indexN');
            var nStart = n < 0 ? 0 : n;
            var lastLiW = 0;
            var leftWid = Math.abs(parseFloat(oUl.css('left'))) || 0;
            var flag = true;
            for (var i = nStart; i > 0; i--) {
                var liWin = lis.eq(i).outerWidth(true);
                initW += liWin;
                if (initW > winContent) {
                    n = i - 1;
                    lastLiW = lis.eq(nStart).outerWidth(true);
                    initW = initW - lastLiW;
                    leftWid = leftWid - initW;
                    flag = false;
                    break;
                }

            };

            if (initW == 0 || n == 0 || (n > 0 && flag) || (nStart == n && leftWid > 0)) {
                n = 0;
                leftWid = 0;
            }

            if (oBox.find(".tab_swiper.active").width() - iW - leftWid > winContent) {
                rBtn.css({'visibility':'visible','display':'block'}).removeClass('disable');
            };

            if (leftWid == 0) {
                lBtn.addClass('disable');
            }

            if (!oUl.is(':animated')) {
                oUl.animate({
                    "left": '-' + leftWid + "px"
                }, 'normal', function () {
                    oUl.data('indexN', n);
                })
            }
        })

        oBox.off('click.lis');
        oBox.on('click.lis', 'li', function (e) {
            var isFirstLoad = $("#isFirstLoad").val() == '1' ? true : false;
            var target = $(e.target);
            var _this = $(this);
            var index = _this.index();
            var winLi = 0;
            var otabSwiper = _this.parent();
            var lis = otabSwiper.find('.slide_li');
            //三级导航加入对比结果按钮点击不检索
            if (target.hasClass('tab_button')) {
                return;
            }
            _this.addClass("active").siblings("li").removeClass("active");

            //重新设置ul的宽度
            setUlWidth(otabSwiper);
            for (var i = 0; i < index - 1; i++) {
                winLi += lis.eq(i).outerWidth(true);
            };

            if (!otabSwiper.is(':animated')) {
                if (isFirstLoad) {
                    otabSwiper.animate({
                        "left": "-" + winLi + "px"
                    }, 'normal', function () {
                        var leftW = Math.abs(parseFloat(otabSwiper.css('left')));
                        var n;
                        if (leftW > 0) {
                            lBtn.css({ 'visibility': 'visible', 'display': 'block' }).removeClass('disable');
                        };

                        if (otabSwiper.width() - iW <= winContent) {
                            rBtn.addClass('disable');
                        }

                        if (leftW == 0) {
                            lBtn.addClass('disable');
                            n = 0;
                        };

                        if ((widthCom - leftW) <= winContent) {
                            rBtn.addClass('disable');
                        } else {
                            rBtn.css({ 'visibility': 'visible', 'display': 'block' }).removeClass('disable');
                        }

                        n = index - 1;
                        n = n < 0 ? 0 : n;
                        otabSwiper.data('indexN', n);
                    })
                }
                
                if (fn && $.isFunction(fn) && !isFirstLoad) {
                    fn(_this);
                }
            }
        })
    }
}

$(function(){
    var id="J_coms_tabswiper";
    var callback=function(){
        var $li=arguments[0];
        //可异步加载数据使用
        //alert("执行回调函数,点击了标签："+ $li.text());
    };

    tabSwiper(id,callback);

    $(window).on('resize',function(){
        var dw = $('body').data('oldWidth') || -1;
        var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
         //宽度发生改变
        if (dw != w) {
         tabSwiper(id,callback);
        }
    });
});