var StartArray = new Array();
var FrameArray = new Array();
var BLOCK = new Object();
var DbList = new Object();
DbList["CJFD"] = "期刊论文";
DbList["CJFQ"] = "期刊论文";
DbList["CDFD"] = "博士论文";
DbList["CMFD"] = "硕士论文";
DbList["CPFD"] = "会议论文";
DbList["CCND"] = "报纸文章";
DbList["CYFD"] = "年鉴";
DbList["SCPD"] = "中国专利";
DbList["SCSD"] = "中国标准";
DbList["SOSD"] = "外国标准";
DbList["SNAD"] = "科技成果";
DbList["SSJD"] = "Springer期刊";
DbList["CRLDENG"] = "外文题录";
DbList["CBBD"] = "图书";
DbList["CLKJ"] = "期刊论文";
DbList["CLKB"] = "博士论文";
DbList["CLKM"] = "硕士论文";
DbList["CLKP"] = "会议论文";
DbList["CLKN"] = "报纸文章";
DbList["CLKC"] = "案例";
DbList["CLKL"] = "法律法规";
DbList["CLKLP"] = "法律法规";
DbList["CLKLT"] = "法律法规";
var strFirstPage = "首页";
var strNextPage = "下一页";
var strPrevPage = "上一页";
var strLastPage = "末页";
var isSetMix = false; //是否已经设置最小化
function RegisterFrame(id, curcode, src) {
    curcode = curcode.toLowerCase();
    if (curcode == "ccjd" || curcode == "cjsf" || curcode == "fcjd")
        curcode = "cjfq";
    else if (curcode == "cdsf" || curcode.indexOf('cdbf') > -1)
        curcode = "cdfd";
    else if (curcode == "cmsf" || curcode == "cmzd" || curcode.indexOf('cmbf') > -1)
        curcode = "cmfd";
    src += "&curdbcode=" + curcode;
    if (document.getElementById("listv")) {
        var listv = document.getElementById("listv").value;
        src += "&vl=" + listv;
    }

    var frameformat = '<iframe id="{0}" name="{0}" width="100%" height="0" frameborder="no" scrolling="no" src=""></iframe> ';
    document.write(frameformat.format(id));
    var frame = new Object();
    frame.id = id;
    frame.src = src;
    FrameArray.push(frame);
}
function RegisterAsynBlock(id, curcode, name, desc, src, pagesize) {
    src += "&curdbcode=" + GetCurDbCode(curcode);
    var frameformat = '<div id={0} style="display:none"><div class="title">【{1}】<span>{2}</span></div><div class="box"><div class="boxTitle"><dl><dd class="first last active"><a>法律法规</a></dd></dl></div><div id="{0}_result" class="content"></div></div></div>';
    document.write(frameformat.format(id, name, desc));
    var frame = new BlockClass(id, src, "", pagesize);
    StartArray.push(frame);
    BLOCK[id] = frame;
}

function RegisterAsynBlock2(id, curcode, desc, src) {
    src += "&curdbcode=" + GetCurDbCode(curcode);
    var frameformat = '<div id={0} style="display:none"><div class="title">【{1}】<span></span></div><div class="box"><div class="boxTitle"><dl><dd class="first last active"><a>案例</a></dd></dl></div><div id="{0}_result" class="content"></div></div></div>';
    document.write(frameformat.format(id, desc));
    var frame = new BlockClass(id, src);
    StartArray.push(frame);
    BLOCK[id] = frame;
}

function RegisterAsynBlock3(id, curcode, name, desc, src, pagesize) {
    src += "&curdbcode=" + GetCurDbCode(curcode);
    var frameformat = '<div id={0} style="display:none"><div class="title">【{1}】<span>{2}</span></div><div class="box"><div class="boxTitle"><dl><dd class="first active"><a>法律法规(篇)</a></dd><dd class="first last"><a>法律法规(条目)</a></dd></dl></div><div id="{0}_result" class="content"></div></div></div>';
    document.write(frameformat.format(id, name, desc));
    var frame = new BlockClass(id, src, "", pagesize);
    StartArray.push(frame);
    BLOCK[id] = frame;
}


function RegisterAsynBlockEx(id, codelist, curcode, name, desc, src, pagesize) {
    src += "&curdbcode=" + GetCurDbCode(curcode);
    var frameformat = '<div id={0} style="display:none"><div class="title">【{1}】<span>{2}</span></div><div class="box"><div class="boxTitle"><dl id="{0}_dblist"></dl></div><div id="{0}_result" class="content"></div></div></div>';
    document.write(frameformat.format(id, name, desc));
    if (pagesize == null || pagesize == "")
        pagesize = 10;
    var frame = new BlockClass(id, src, codelist, pagesize);
    StartArray.push(frame);
    BLOCK[id] = frame;
}
function GetCurDbCode(curcode) {
    curcode = curcode.toLowerCase();
    if (curcode == "ccjd" || curcode == "cjsf" || curcode == "fcjd")
        curcode = "cjfq";
    else if (curcode == "cdbf" || curcode == "cdsf" || curcode == "cdbf2010")
        curcode = "cdfd";
    else if (curcode == "cmbf" || curcode == "cmsf" || curcode == "cmbf2010")
        curcode = "cmfd";
    return curcode;
}
function _removeDbList(list, code) {
    var newlist = new Array();
    for (var i = 0; i < list.length; i++) {
        if (code.toLowerCase() != list[i].toLowerCase()) {
            newlist.push(list[i]);
        }
    }
    return newlist;
}
//引文块
function RefBlockClass(dbcode, fn, dbname) {
    this.dbcode = dbcode;
    this.filename = fn;
    this.dbname = dbname;
    this.list = 'CLKJ,CLKB,CLKM,CLKP,CLKN,CBBD,SCPD,SCSD,CYFD,SSJD,CRLDENG';
    this.urlFormat = 'frame/{0}.aspx?reftype={1}&dbcode={2}&filename={3}&dbname={4}&curdbcode={5}';
    this.src = this.urlFormat.format('listdata', 64, dbcode, fn, dbname, "");
    this.SendRequest = function () {
        var obj = this;
        var oRequest = zXmlHttp.createRequest();
        if (oRequest != null) {
            oRequest.open("get", this.src, true);
            oRequest.onreadystatechange = function () {
                if (oRequest.readyState == 4) {
                    if (oRequest.status == 200) {
                        obj.OnDataReceive(oRequest);
                    }
                    else {
                        obj.OnDataError(oRequest);
                    }
                }
            };
            oRequest.send(null);
        }
    }
    this.OnDataReceive = function (oResp) {
        var strJson = oResp.responseText;
        if (strJson == "") {
            return;
        }
        var oRef = eval("(" + strJson + ")");
        if (oRef.Rows == null || oRef.Rows.length < 1)
            return;
        var oCount = oRef.Rows[0];
        if (Number(oCount.REFERENCE) > 0) {
            this._requestRefBlock(1);
        }
        if (Number(oCount.SUB_REFERENCE) > 0) {
            this._requestRefBlock(2);
        }
        if (Number(oCount.CITING) > 0) {
            this._requestRefBlock(3);
        }
        if (Number(oCount.SUB_CITING) > 0) {
            this._requestRefBlock(4);
        }
        if (Number(oCount.CO_CITING) > 0) {
            this._requestRefBlock(5);
        }
        if (Number(oCount.CO_CITED) > 0) {
            this._requestRefBlock(6);
        }
    }
    this._requestRefBlock = function (type) {
        var id = "frame" + type;
        var url = this.urlFormat.format("asynlist", type, this.dbcode, this.filename, this.dbname, "CRLDENG");
        var block = new BlockClass(id, url, this.list, 10);
        BLOCK[id] = block;
        block.SendRequest();
    }
    this.OnDataError = function (oResp) { }
}
//标准块请求
function BlockClass(id, src, list, pagesize) {
    this.id = id;
    this.src = src;
    this.init = true;
    this.haspager = false;
    this.hascontent = false;
    if (pagesize) {
        this.pagesize = pagesize;
    } else {
        this.pagesize = 10;
    }
    if (list != "" && list != null && list != undefined)
        this.list = list.split(',');
    this.SendRequest = function () {
        //_sendRequsetEx(this.GetUrl(), this.OnDataReceive, this.OnDataError, this);
        var obj = this;
        var oRequest = zXmlHttp.createRequest();
        if (oRequest != null) {
            oRequest.open("get", this.src, true);
            oRequest.onreadystatechange = function () {
                if (oRequest.readyState == 4) {
                    if (oRequest.status == 200) {
                        obj.OnDataReceive(oRequest);
                    }
                    else {
                        obj.OnDataError(oRequest);
                    }
                }
            };
            oRequest.send(null);
        }
    }
    this._getCurDbCode = function () {
        var curcode = "";
        var url = this.src;
        var regExp = /CurDBCode=([^&\s]*)/ig;
        var rPage = url.match(regExp);
        if (rPage == null)
            return curcode;
        return RegExp.$1;
    }
    this.OnDataReceive = function (oResp) {
        var html = oResp.responseText;
        var oBlock = document.getElementById(this.id);
        var oResult = document.getElementById(this.id + "_result");
        if (html != "") {
            oResult.innerHTML = html;
            this._setMoreBtn(oResult);
            //alert(this._getCurDbCode());
            if (this.haspager && this.pagesize > 0) {
                _setPager(oResult, this.src, this.id);
            }
            if (this.hascontent) {
                if (this.init) {
                    this._setTitle();
                }
                this.init = false;
                oBlock.style.display = "block";
            }
            else {

                if (this.list != null && this.init) {
                    this.list = _removeDbList(this.list, this._getCurDbCode(this.src));
                    if (this.list.length > 0)
                        OnMore(this.list[0], this.id);
                }
            }
        }

    }
    this.OnDataError = function (oResp) {
        var oResult = document.getElementById(this.id + "_result");
        oResult.innerHTML = "数据库忙";
    }

    this._setMoreBtn = function (oBlock) {
        var oMore = getElementsByName("div", "moreblock", oBlock);
        var dbnum = oMore.length;
        this.hascontent = false;
        var curcode = this._getCurDbCode(this.src);
        for (var i = 0; i < dbnum; i++) {
            var oInput = getFirstElementByName("input", "dbcode", oMore[i]);
            var oLink = getFirstElementByName("a", "link", oMore[i]);
            var oCount = getFirstElementByName("input", "morecount", oMore[i]);
            if (Number(oCount.value) > 0) {
                this.hascontent = true;
            }
            if (oInput == null) {
                return;
            }
            if (curcode == "" && dbnum == 1) {
                if (_getPageSize(this.src) < oCount.value) {
                    this.haspager = true;
                }
                return;
            }
            else if (curcode == "" && dbnum > 1) {
                if (_getPageSize(this.src) < oCount.value) {
                    var dbcode = oInput.value;
                    if (oLink != null) {
                        oLink.onclick = Function("return OnMore('" + dbcode + "','" + this.id + "')");
                        oLink.innerHTML = "更多";
                        oMore[i].style.display = "block";
                    }
                    this.haspager = false;
                }
            }
            else if (curcode != "" && dbnum == 1) {
                if (_getPageSize(this.src) < oCount.value) {
                    if (oLink != null) {
                        oLink.onclick = Function("return OnMore('','" + this.id + "')");
                        oLink.innerHTML = "全部";
                        oMore[i].style.display = "block";
                    }
                    this.haspager = true;
                }
            }
            else {
                this.haspager = false;
            }
        }
    }


    this._setTitle = function () {
        if (this.list == null || this.list == undefined)
            return;
        var html = "";
        var itemFormat = "<dd class=\"{2}\"><a onclick=\"ChangeDb('{0}','{3}',this)\">{1}</a></dd>";
        for (var i = 0; i < this.list.length; i++) {
            var style = "";
            if (i == 0) {
                style += "first";
            }
            if (i == this.list.length - 1) {
                style += " last";
            }
            if (this.list[i].toLowerCase() == this._getCurDbCode(this.src).toLowerCase()) {
                style += " active";
            }
            html += itemFormat.format(this.list[i], DbList[this.list[i]], style, this.id);

        }
        if (html != "") {
            var container = document.getElementById(this.id + "_dblist");
            if (container != null)
                container.innerHTML = html;
        }
    }

}

function ChangeDb(code, id, oDD) {
    var dl = document.getElementById(id + "_dblist");
    if (dl == null)
        return;
    if (BLOCK[id] == null)
        return;
    if (BLOCK[id]._getCurDbCode().toLowerCase() == code.toLowerCase())
        return;
    oDDList = dl.getElementsByTagName("dd");
    for (var i = 0; i < oDDList.length; i++) {
        if (oDDList[i].className != "") {
            oDDList[i].className = oDDList[i].className.replace("active", "");
        }
    }
    oDD.parentNode.className += " active";
    OnMore(code, id);
}
function OnMore(dbcode, id) {
    var oBlock = BLOCK[id];
    if (oBlock == null)
        return;
    var url = oBlock.src;
    var regExp = /CurDBcode=[^&]*/ig;
    if (regExp.test(url))
        url = url.replace(regExp, "CurDBCode=" + dbcode);
    else
        url = url + "&CurDBCode=" + dbcode;
    url = this._resetPage(url);
    oBlock.src = url;
    oBlock.SendRequest();
}
function _resetPage(url) {
    var regExp = /page=[^&\s]*/ig;
    url = url.replace(regExp, "page=" + 1);
    return url;
}

function RegisterCateRequest(containerid, resultid, url) {
    var oCate = new CateClass(containerid, resultid, url);
    StartArray.push(oCate);
}
function CateClass(id, resultid, src) {
    this.src = src;
    this.id = id;
    this.resultid = resultid;
    this.SendRequest = function () {
        var obj = this;
        var oRequest = zXmlHttp.createRequest();
        if (oRequest != null) {
            oRequest.open("get", this.src, true);
            oRequest.onreadystatechange = function () {
                if (oRequest.readyState == 4) {
                    if (oRequest.status == 200) {
                        obj.OnDataReceive(oRequest);
                    }
                    else {
                        obj.OnDataError(oRequest);
                    }
                }
            };
            oRequest.send(null);
        }
    }

    this.OnDataReceive = function (oResp) {
        var sJson = oResp.responseText;
        var json = eval('(' + sJson + ')');
        //alert(json.Children.length);
        if (json.Children.length == 0) {
            document.getElementById(this.id).style.display = "none";
            return;
        }
        var html = this._getTreeHtml(json);
        //alert(html);
        document.getElementById(this.id).innerHTML = '<ul>' + html + '</ul>';
    }
    this.OnDataError = function (oResp) {
        document.getElementById(this.id).style.display = "none";
    }

    this._getTreeHtml = function (oTree) {
        var ulformat = '<ul>{0}</ul>';
        var liformat = '<li><a name="treenode" onclick="GetCateSearch(\'{2}\',\'{1}\',this)">{0}</a>{3}</li>';
        var ChildData = "";
        for (var i = 0; i < oTree.Children.length; i++) {
            //alert(oTree.Children[i].Children);
            if (oTree.Children[i].Children.length > 0) {
                ChildData += this._getTreeHtml(oTree.Children[i]);
                //alert(ChildData);
            }
            else {
                ChildData += liformat.format(oTree.Children[i].Name, oTree.Children[i].Code, this.resultid, "");
            }
        }
        return liformat.format(oTree.Name, oTree.Code, this.resultid, ulformat.format(ChildData));
    }

}
function RegisterCateSearch(id, url) {
    var oRequest = new Object();
    oRequest.id = id;
    oRequest.src = url;
    oRequest.SendRequest = function () {
        var obj = this;
        zSendRequset(obj.src,
       function (oResult) {
           document.getElementById("treesearch").innerHTML = ReplaceRedMark(oResult.responseText);
           var count = getFirstElementByName('span', 'pcount', document.getElementById("treesearch"));
           if (count != null) {
               count = Number(count.innerHTML);
               //alert(count);
               if (count > 0) {
                   document.getElementById("LawTreeSearch").style.display = "block";
                   _setPager(document.getElementById("treesearch"), obj.src, obj.id);
               }
           }
       },
       function (oResult) { });
    }
    BLOCK[id] = oRequest;
    StartArray.push(oRequest);
}
function getFirstElementByName(tag, eltname, parent) {
    var elts = parent.getElementsByTagName(tag);
    for (var i = 0; i < elts.length; i++) {
        if (elts[i].getAttribute("name") == eltname) {
            return elts[i];
        }
    }
    return null;
}
function _getPageSize(url) {
    var curpage = 10;
    var regExp = /pagesize=([^&\s]*)/ig;
    var rPage = url.match(regExp);
    if (rPage == null)
        return curpage;
    curpage = RegExp.$1;
    curpage = Math.ceil(curpage);
    if (curpage < 1) curpage = 10;
    return curpage;
}
function _getPageCount(oBlock, url) {
    var pcount = getFirstElementByName("span", "pcount", oBlock);
    if (pcount == null)
        return;
    pcount = Number(pcount.innerHTML);
    return Math.ceil(pcount / _getPageSize(url));
}
function _getCurPage(url) {
    var curpage = 1;
    var regExp = /page=([^&\s]*)/ig;
    var rPage = url.match(regExp);
    if (rPage == null)
        return curpage;
    curpage = RegExp.$1;
    curpage = Math.ceil(curpage);
    if (curpage < 1) curpage = 1;
    return curpage;
}
function _setCurPageUrl(page, url) {
    var regExp = /page=[^&\s]*/ig;
    if (regExp.test(url))
        url = url.replace(regExp, "page=" + page);
    else
        url = url + "&page=" + page;
    return url;
}
function _setPager(oContainer, url, id) {
    oPager = getFirstElementByName("span", "pager", oContainer);
    if (oPager == null)
        return;
    var pageCount = _getPageCount(oContainer, url);
    if (pageCount == null)
        return;
    //alert(pageCount);
    if (pageCount < 2)
        return;
    var curPage = _getCurPage(url);
    //alert(curPage);
    var strTagFormat = "<a  onclick=\"TurnToPage('{0}','{1}')\" >{2}</a>";
    var strSkipFormat = "<input value=\"{0}\" id='pageskip_{2}'>/{1}<input type='button' class='zhuanye' onclick=\"SkipPage('{2}')\" value=''/>";
    var strFirst = "";
    var strPrev = "";
    var strNext = "";
    var strLast = "";
    if (curPage > 1) {
        strFirst = strTagFormat.format(id, 1, strFirstPage);
        strPrev = strTagFormat.format(id, curPage - 1, strPrevPage);
    }
    else {
        //        strFirst = '首页';
        //        strPrev = '上一页';
    }
    if (curPage < pageCount) {
        strNext = strTagFormat.format(id, curPage + 1, strNextPage);
        strLast = strTagFormat.format(id, pageCount, strLastPage);
    }
    var html = strFirst + strPrev + strNext + strLast + strSkipFormat.format(curPage, pageCount, id);
    oPager.innerHTML = html;
}

function getElementsByName(tag, eltname, parent) {
    var elts = parent.getElementsByTagName(tag);
    var count = 0;
    var elements = [];
    for (var i = 0; i < elts.length; i++) {
        if (elts[i].getAttribute("name") == eltname) {
            elements[count++] = elts[i];
        }
    }
    return elements;
}

function getDataUrl(fn, dc, dn, sc, tp, p, l) {
    var url = "/kcms/detail/frame/asynlist.aspx?dbcode={0}&dbname={1}&filename={2}&curdbcode={3}&page={4}&reftype={5}&pl={6}";
    url = url.format(dc, dn, encodeURIComponent(fn), sc, p, tp, l);
    return url;
}

function getlDataUrl(fn, dc, dn, sc, tp, p, l) {
    var url = "/kcms/detail/frame/listlite.aspx?dbcode={0}&dbname={1}&filename={2}&curdbcode={3}&page={4}&reftype={5}&pl={6}";
    url = url.format(dc, dn, fn, sc, p, tp, l);
    return url;
}

function getJDataUrl(fn, dc, dn, sc, tp, p, l) {
    var url = "/kcms/detail/frame/jdata.aspx?dbcode={0}&dbname={1}&filename={2}&curdbcode={3}&page={4}&reftype={5}&pl={6}";
    url = url.format(dc, dn, fn, sc, p, tp, l);
    return url;
}

function getJsonUrl(fn, dc, dn, sc, tp, p, l) {
    var url = "/kcms/detail/frame/json.aspx?dbcode={0}&dbname={1}&filename={2}&curdbcode={3}&page={4}&reftype={5}&pl={6}";
    url = url.format(dc, dn, fn, sc, p, tp, l);
    return url;
}

function getKMCUrl(fn, dc, dn, sc, tp, p, l) {
    var url = "../detail/frame/kmc.aspx?dbcode={0}&dbname={1}&filename={2}&type={3}";
    url = url.format(dc, dn, fn, tp);
    return url;
}



function getPicUrl(pykm, year, issue) {
    var base = getOuterBaseLink('COVER');
    var url = "";
    var url1 = "cjfd/small/{0}.jpg";
    var url2 = "cjfd/small/{0}/{0}{1}{2}.jpg";
    if (year && issue) {
        url = url2.format(pykm, year, issue);
    }
    else {
        url = url1.format(pykm);
    }
    return base + url;
}

function getPicErrUrl() {
    return "/kcms/detail/resource/gb/images/nopic1.gif";
}

function getBaseInfoUrl(dbcode, pykm) {
    var url = "/kcms/detail/frame/journalinfo.aspx?pykm={0}&dbcode={1}";
    url = url.format(pykm, dbcode);
    return url;
}
function getHYJCheckUrl(code) {
    var url = "/kcms/detail/frame/hyjinfo.aspx?code={0}";
    url = url.format(code);
    return url;
}
function getFileNameUrl(fn) {
    var url = "/kcms/detail/block/getfilename.aspx?filename={0}";
    url = url.format(fn);
    return url;
}


function RegisterJDLBk(fn, dn, dc, cc, t, cid, did) {
    var obj = new Object();
    obj.SendRequest = function () {
        kBlock.addDL(fn, dc, dn, cc, t, 10, getDLUrl, getJDataUrl, getDropListHtml, getListObj, getError, getWait);
    }
    StartArray.push(obj);
}

function RegisterJBk(fn, dn, dc, cc, t, cid, bid, l) {
    var obj = new Object();
    obj.SendRequest = function () {
        kBlock.add(fn, dc, dn, cc, t, l, getJDataUrl, getListObj, getError, cid, bid, getWait);
    }
    StartArray.push(obj);
}
function RegCCNDWeb(fn, dn, dc, t, cid) {
    var obj = new Object();
    obj.SendRequest = function () {
        kBlock.add(fn, dc, dn, dc, t, 1, getJsonUrl, function (oReq, t) {
            var o = getJsonObj(oReq);
            if (o == null || o.Count == 0)
                return;
            var web = o.Rows[0].WEB;
            if (web == "") return;
            var isMirror = getOuterBaseLink("VER") == "mirror";
            var htmlFormat = "";
            if (isMirror) {
                htmlFormat = "<span>{0}</span>";
            } else {
                htmlFormat = "<a href='{1}' target='_blank'>{0}</a>";
            }
            var html = "";
            var sites = web.split(';');
            for (var i = 0; i < sites.length; i++) {
                if (sites[i] == '') continue;
                if (i > 0) html += ';';
                var links = sites[i].split(',');
                if (links.length != 2) {
                    continue;
                }
                if (isMirror) {
                    html += htmlFormat.format(links[0]);
                } else {
                    html += htmlFormat.format(links[0], links[1]);
                }
            }
            if (html == "") return;
            if (document.getElementById("func" + t))
                document.getElementById("func" + t).innerHTML = html;
            if (cid && document.getElementById(cid))
                document.getElementById(cid).style.display = "block";
        }, getError);
    }
    StartArray.push(obj);
}


function getListObj(oReq, t, cid) {
    var o = getJsonObj(oReq)
    //alert(o);
    if (o == null || (o.Count == 0 && kBlock.IsFirstLoad(t)))
        return;
    var html = "";
    html += getListItem(o);
    if (document.getElementById("func" + t)) {
        document.getElementById("func" + t).innerHTML = html;
        //add by faw 20180611 设置'未找到相关数据' margin: 5px 0px;
        if (html == NULL_DATA) {
            document.getElementById("func" + t).style.margin = "5px 0px";
        }
    }

    if (document.getElementById("page" + t))
        document.getElementById("page" + t).innerHTML = getPagerHtml(t, o.Page, o.PL, o.Count);
    if (document.getElementById("title" + t))
        document.getElementById("title" + t).innerHTML = o.SName;
    if (document.getElementById("block" + t))
        document.getElementById("block" + t).style.display = "block";
    if (cid && document.getElementById(cid))
        document.getElementById(cid).style.display = "block";


}

function getWait(t) {
    if (document.getElementById("func" + t))
        document.getElementById("func" + t).innerHTML = "正在查找..."; //WAIT
}

function RegisterSBlock(fn, dn, dc, cc, t, g) {
    var obj = new Object();
    obj.SendRequest = function () {
        kBlock.add(fn, dc, dn, cc, t, 10, getDataUrl, getListHtml, getError, g);
    }
    StartArray.push(obj);
}

function getListHtml(oReq, t, g) {
    var id = "func" + t;
    var con = document.getElementById(id);
    if (con == null)
        return;
    if (oReq.responseText != "") {
        con.innerHTML = oReq.responseText;
        con.style.display = "block";
        if (g && document.getElementById(g)) {
            document.getElementById(g).style.display = "block";
        }

        if (t == "19" || t == "20") {
            if (document.getElementById("scpdzslj")) {
                document.getElementById("scpdzslj").style.display = "block";
            }
        }
    }
}
function RegImage(pykm, year, issue, cid) {
    var obj = new Object();
    obj.SendRequest = function () {
        ImageLoader(getPicUrl(pykm, year, issue), cid, getPicErrUrl());
    };
    StartArray.push(obj);
}
function RegDujia(dbcode, pykm, year, issue, cid) {
    var obj = new Object();
    obj.SendRequest = function () {
        ImageLoader(getPicUrl(pykm, year, issue), cid, getPicErrUrl());
        kSendRequset(getBaseInfoUrl(dbcode, pykm), function (oRecv) {
            var obj = getJsonObj(oRecv);
            if (obj != null) {
                if (obj.IsT.toLowerCase() == 'true') {
                    document.getElementById("dujiaPic").style.display = "block";
                    document.getElementById("dujiaGold").style.display = "inline-block";
                }
            }
        }, function (oRecv) { });
    }
    StartArray.push(obj);
}


function RegCheckJournal(dbcode, pykm, year, issue) {
    var obj = new Object();
    var format = "<a target='_blank' href='{0}'>{1}</a>";
    obj.SendRequest = function () {
        kSendRequset(getBaseInfoUrl(dbcode, pykm), function (oRecv) {
            var obj = getJsonObj(oRecv);
            if (obj != null) {
                if (obj.pykm.toLowerCase() == pykm.toLowerCase()) {
                    var name = document.getElementById("jname");
                    var name_en = document.getElementById("jnameen");
                    var nq = document.getElementById("jnq");
                    if (name)
                        name.innerHTML = format.format(getNaviLink(dbcode, pykm), name.innerHTML);
                    if (name_en)
                        name_en.innerHTML = format.format(getNaviLink(dbcode, pykm), name_en.innerHTML);
                    if (nq)
                        nq.innerHTML = format.format(getNaviIssueLink(dbcode, pykm, year, issue), nq.innerHTML);
                }
            }
        }, function (oRecv) { });
    }
    StartArray.push(obj);
}

function RegCheckHYJ(hyjcode, lid) {
    var obj = new Object();
    var format = "<a target='_blank' href='{0}'>{1}</a>";
    obj.SendRequest = function () {
        kSendRequset(getHYJCheckUrl(hyjcode), function (oRecv) {
            var obj = getJsonObj(oRecv);
            if (obj != null) {
                if (obj.HYJCode.toLowerCase() == hyjcode.toLowerCase()) {
                    var name = document.getElementById("jname");
                    if (name)
                        name.innerHTML = format.format(getHYJNaviUrl(hyjcode, lid), name.innerHTML);
                }
            }
        }, function (oRecv) { });
    }
    StartArray.push(obj);
}

function RegFileName(fn, aid, cid) {
    var obj = new Object();
    var url = 'detail.aspx?filename={0}&dbname={1}&dbcode=CJFQ';
    obj.SendRequest = function () {
        kSendRequset(getFileNameUrl(fn), function (oRecv) {
            var obj = getJsonObj(oRecv);
            if (obj != null) {
                if (obj.fn != "" && obj.dn != "") {
                    url = url.format(obj.fn, obj.dn);
                    document.getElementById(aid).href = url;
                    document.getElementById(cid).style.display = "";
                }
            }
        }, function (oRecv) { });
    }
    StartArray.push(obj);
}


function RegisterKMC(fn, dn, dc, cc, t) {
    var obj = new Object();
    obj.SendRequest = function () {
        kBlock.add(fn, dc, dn, cc, t, 10, getKMCUrl, getKMCHtml, null);
    }
    StartArray.push(obj);
}

function RegAd(id, area, kw, pykm, sc, ti) {
    link = getOuterBaseLink("AD");
    if (link == '')
        return;
    var url = link + "GetADInfo.aspx?area={0}&kw={1}&pykm={2}&sc={3}&title={4}";
    url = url.format(area, encodeURIComponent(kw), pykm, sc, encodeURIComponent(ti))
    var obj = new Object();
    obj.SendRequest = function () {
        var o = document.getElementById(id);
        if (o) {
            var loadfunc = function () { o.style.display = "block"; };
            if (o.attachEvent) { o.attachEvent('onload', loadfunc) }
            else { o.onload = loadfunc; }
            o.src = url;
        }
    };
    StartArray.push(obj);
}
function getKMCHtml(oReq, t) {
    //alert(oReq.responseText);
    var o = getJsonObj(oReq);
    var htmlcn = "";
    var htmlen = "";
    var htmlcnM = "";
    var htmlenM = "";
    var metalist = new Object();
    var datatype;
    if (o.Rows.length <= 0) return;
    if (o.Rows[0].MKMC_CN) datatype = 1;
    else if (o.Rows[0].MKMC_EN) datatype = 1;
    else { datatype = 0 }


    for (var i = 0; i < o.Rows.length; i++) {
        var oItem = o.Rows[i];
        if (datatype == 0) {
            if (oItem.KMC_CN != "") { if (metalist[oItem.KMC_CN] == undefined) { metalist[oItem.KMC_CN] = 1; htmlcn += getKmLink(o.PC, oItem.KMC_CN, oItem.KMC_CODE); if (i != o.Rows.length - 1) { htmlcn += "；"; } } }
            if (oItem.KMC_EN != "") { if (metalist[oItem.KMC_EN] == undefined || (metalist[oItem.KMC_EN] == 1)) { metalist[oItem.KMC_EN] = 1; htmlen += getKmLink(o.PC, oItem.KMC_EN, oItem.KMC_CODE); if (i != o.Rows.length - 1) { htmlen += ";"; } } }
        }
        else {
            if (oItem.MKMC_CN != "") {
                if (metalist[oItem.MKMC_CN] == undefined) {
                    metalist[oItem.MKMC_CN] = 1;
                    htmlcnM += getKmcLink(o.PC, oItem.MKMC_CN, oItem.MKMC_CODE, true);
                    if (i != o.Rows.length - 1) { htmlcnM += "；"; }
                }
            }
            //metalist 不包含 这个词 或者只包含一次（中文主题词的英文 没翻译）
            if (oItem.MKMC_EN != "") {
                if ((metalist[oItem.MKMC_EN] == undefined) || (metalist[oItem.MKMC_EN] == 1)) {
                    metalist[oItem.MKMC_EN] = 1;
                    htmlenM += getKmcLink(o.PC, oItem.MKMC_EN, oItem.MKMC_CODE, true);
                    if (i != o.Rows.length - 1) { htmlenM += ";"; }
                }
            }
        }
    }
    var oCn = document.getElementById("kmccontentcn");
    var oCnBlock = document.getElementById("kmccn");
    var oEn = document.getElementById("kmccontenten");
    var oEnBlock = document.getElementById("kmcen");
    if (oCn && oCnBlock) {
        if (htmlcnM != "" || htmlcn != "") {
            if (htmlcnM != "") {
                oCn.innerHTML = htmlcnM + "；" + oCn.innerHTML;
            }
            else {
                oCn.innerHTML += htmlcn;
            }
            oCnBlock.style.display = "";
        }
    }
    if (oEn && oEnBlock) {
        if (htmlenM != "" || htmlen != "") {
            if (htmlenM != "") {
                oEn.innerHTML = htmlenM + ";" + oEn.innerHTML
            }
            else {
                oEn.innerHTML += htmlen;
            }
            oEnBlock.style.display = "";
        }
    }
}
function getKmcLink(dc, kw, code, isKmc) {
    var strKmcLink = "<a onmouseover=\"kwPop('{0}','{1}','{2}',event)\" onmouseout='kwHide(1,event)' >{0}</a>"
    var lingformat = "";
    if (isKmc) {
        lingformat = "<span>" + strKmcLink + "<em>*</em></span>";
    }
    else {
        lingformat = strKmcLink;
    }
    return lingformat.format(kw, dc, code);
}

function RegItem(fn, t, b, c) {
    var obj = new Object();
    obj.SendRequest = function () {
        kBlock.add(fn, "CJFQ", "", "CJFQ", t, 1, getJsonUrl, getDataItem, null, c, b);
    }
    StartArray.push(obj);
}

function getDataItem(oReq, b, c) {
    var o = getJsonObj(oReq);
    if (o == null) return;
    //alert(oReq.responseText);
    if (o.Rows.length == 0) return;
    o = o.Rows[0][c];
    document.getElementById(c).innerHTML += o;
    document.getElementById(b).style.display = "block";
}

function RegisterStartLoad(startFunc) {
    StartArray.push(startFunc);
}

function startLoad() {
    for (var i = 0; i < StartArray.length; i++) {
        StartArray[i].SendRequest();
    }
    for (i = 0; i < FrameArray.length; i++) {
        document.getElementById(FrameArray[i].id).src = FrameArray[i].src;
    }
    FrameArray = null;
}
window.onload = startLoad;


function CallRequest(cb) {
    var obj = new Object();
    obj.SendRequest = function () {
        cb();
    }
    StartArray.push(obj);
}

function _sendRequset(sUrl, OnDataReceive, obj) {
    var oRequest = zXmlHttp.createRequest();
    if (oRequest != null) {
        //alert(sUrl)
        oRequest.open("get", sUrl, true);
        oRequest.onreadystatechange = function () {
            if (oRequest.readyState == 4) {
                if (oRequest.status == 200) {
                    OnDataReceive(oRequest, obj);
                }
            }
        };
        oRequest.send(null);
    }
}

function getNodeValue(oRoot, nodeName) {
    if (oRoot == null)
        return "";
    var oNodes = oRoot.getElementsByTagName(nodeName);
    if (oNodes == null)
        return "";
    if (oNodes.length > 0) {
        if (oNodes[0].text != 'undefined' && oNodes[0].text != undefined) {
            return oNodes[0].text;
        }
        else {
            return oNodes[0].textContent;
        }
    }
    return "";
}

function RefCountClass() {
    this.DataUrl = null;
    this.FileName = null;
    this.DbCode = null;
    this.DbName = null;
    this.Year = null;
    this.Link = null;
    this.Target = null;
    this.TargetLink = null;

    //listv
    this.ParamListV = document.getElementById("listv").value;

    this.getRefChartDataUrl = function () {
        var url = this.DataUrl + "?dbcode=" + this.DbCode + "&filename=" + this.FileName + "&vl=" + this.ParamListV;
        return url;
    }
    this.getRefUrlBase = function () {
        var url = this.Link + "?dbcode=" + this.DbCode + "&filename=" + this.FileName + "&vl=" + this.ParamListV;
        return url;
    }
    this.getRefUrl = function (reftype) {
        var url = this.Link + "?dbcode=" + this.DbCode + "&filename=" + this.FileName + "&dbname=" + this.DbName + "&RefType=" + reftype + "&vl=" + this.ParamListV;
        return url;
    }
    this.setRefLinkResult = function (reftype, count) {
        // alert(this.Target);
        var nCount = Number(count);
        if (nCount < 1) {
            return;
        }
        var linkid = "rl" + reftype;
        var countid = "rc" + reftype;
        var oA = document.getElementById(linkid);
        var oC = document.getElementById(countid);
        oA.href = this.getRefUrl(reftype);
        oA.target = this.Target;
        var sFunc = "return ChangeReferType('" + reftype + "')";
        oA.onclick = Function(sFunc);
        oC.innerHTML = "(" + count + ")";
        if (this.TargetLink == null) {
            this.TargetLink = oA.href;
            document.getElementById(this.Target).src = this.TargetLink;
            oA.className = "ReferLinkOn";
        }
    }
    this.setTotalCount = function (oRef) {

        this.setRefLinkResult(1, oRef.REFERENCE);
        this.setRefLinkResult(2, oRef.SUB_REFERENCE);
        this.setRefLinkResult(3, oRef.CITING);
        this.setRefLinkResult(4, oRef.SUB_CITING);
        this.setRefLinkResult(5, oRef.CO_CITING);
        this.setRefLinkResult(6, oRef.CO_CITED);

        if (oRef.REFERENCE == '0' && oRef.CITING == '0') {
            $("#MapTitle").hide();
            $("#MapArea").hide();
        }
        else {
            $("#MapTitle").show();
            $("#MapArea").show();
        }
    }
    this.OnRefChartDataReceive = function (oXmlDom, obj) {
        var strJson = oXmlDom.responseText;
        if (strJson == "") {
            return;
        }
        var oRef = eval("(" + strJson + ")");
        obj.setTotalCount(oRef);

    }
    this.SendRequest = function () {
        _sendRequset(this.getRefChartDataUrl(), this.OnRefChartDataReceive, this);
    }
};

function RefYearClass() {
    this.DataUrl = null;
    this.FileName = null;
    this.DbCode = null;
    this.DbName = null;
    this.Year = null;
    this.Link = null;
    this.Target = null;
    this.TargetLink = null;

    this.ParamListV = document.getElementById("listv").value;
    this.getRefChartDataUrl = function () {
        var url = this.DataUrl + "?dbcode=" + this.DbCode + "&filename=" + this.FileName + "&vl=" + this.ParamListV;
        return url;
    }
    this.getRefUrlBase = function () {
        var url = this.Link + "?dbcode=" + this.DbCode + "&filename=" + this.FileName + "&vl=" + this.ParamListV;
        return url;
    }
    this.getRefUrl = function (reftype) {
        var url = this.Link + "?dbcode=" + this.DbCode + "&filename=" + this.FileName + "&dbname=" + this.DbName + "&RefType=" + reftype + "&vl=" + this.ParamListV;
        return url;
    }

    this.setTimeItem = function (oItem, year, type) {
        var nCount = Number(getNodeValue(oItem, type));
        if (nCount > 0) {
            //alert(type);
            if (this.Year != year)
                AddToTimeArray(year, nCount, type);//依赖TimeAxis.js
            else
                AddCurTime(nCount, type);

        }
    }
    this.setYearItem = function (oItem) {
        var year = getNodeValue(oItem, "YEAR");
        this.setTimeItem(oItem, year, "REFERENCE");
        this.setTimeItem(oItem, year, "SUB_REFERENCE");
        this.setTimeItem(oItem, year, "CITING");
        this.setTimeItem(oItem, year, "SUB_CITING");
    }
    this.setYearCount = function (oYears) {
        if (!oYears) return;
        var oItems = oYears.getElementsByTagName("Item");
        for (var i = 0; i < oItems.length; i++) {
            this.setYearItem(oItems[i]);
        }
        if (this.Year != '' && this.Year != null) {
            //alert(this.Year);
            RenderTimeAxis(this.Year, this.getRefUrlBase(), this.Target);
        }
    }
    this.OnRefChartDataReceive = function (oXmlDom, obj) {

        //alert(oXmlDom);
        if (oXmlDom.responseXML == null)
            return;
        var oRoot = oXmlDom.responseXML.documentElement;
        if (oRoot == null) return;
        var strRootName = oRoot.nodeName;
        if (strRootName == "Error") {
            alert(strRootName + ":" + oRoot.text);
            return;
        }
        var oYears = oRoot.getElementsByTagName("YEARCOUNT");
        if (oYears == null) return;
        obj.setYearCount(oYears[0]);
    }

    this.SendRequest = function () {
        _sendRequset(this.getRefChartDataUrl(), this.OnRefChartDataReceive, this);
    }
};


function RefChartObj() {
    this.DataUrl = null;
    this.FileName = null;
    this.DbCode = null;
    this.DbName = null;
    this.Year = null;
    this.Link = null;
    this.Target = null;
    this.TargetLink = null;
    this.ParamListV = document.getElementById("listv").value;
    this.getRefChartDataUrl = function () {
        var url = this.DataUrl + "?dbcode=" + this.DbCode + "&filename=" + this.FileName + "&vl=" + this.ParamListV;
        return url;
    }
    this.getRefUrlBase = function () {
        var url = this.Link + "?dbcode=" + this.DbCode + "&filename=" + this.FileName + "&vl=" + this.ParamListV;
        return url;
    }
    this.getRefUrl = function (reftype) {
        var url = this.Link + "?dbcode=" + this.DbCode + "&filename=" + this.FileName + "&dbname=" + this.DbName + "&RefType=" + reftype + "&vl=" + this.ParamListV;
        return url;
    }
    this.setRefLinkResult = function (reftype, count) {
        // alert(this.Target);
        var nCount = Number(count);
        if (nCount < 1) {
            return;
        }
        var linkid = "rl" + reftype;
        var countid = "rc" + reftype;
        var oA = document.getElementById(linkid);
        var oC = document.getElementById(countid);
        oA.href = this.getRefUrl(reftype);
        oA.target = this.Target;
        var sFunc = "return ChangeReferType('" + reftype + "')";
        oA.onclick = Function(sFunc);
        oC.innerHTML = "(" + count + ")";
        if (this.TargetLink == null) {
            this.TargetLink = oA.href;
            document.getElementById(this.Target).src = this.TargetLink;
            oA.className = "ReferLinkOn";
        }
    }
    this.setTotalCount = function (oTotal) {
        this.setRefLinkResult(1, getNodeValue(oTotal, "REFERENCE"));
        this.setRefLinkResult(2, getNodeValue(oTotal, "SUB_REFERENCE"));
        this.setRefLinkResult(3, getNodeValue(oTotal, "CITING"));
        this.setRefLinkResult(4, getNodeValue(oTotal, "SUB_CITING"));
        this.setRefLinkResult(5, getNodeValue(oTotal, "CO_CITING"));
        this.setRefLinkResult(6, getNodeValue(oTotal, "CO_CITED"));
    }
    this.setTimeItem = function (oItem, year, type) {
        var nCount = Number(getNodeValue(oItem, type));
        if (nCount > 0) {
            //alert(type);
            AddToTimeArray(year, nCount, type); //依赖TimeAxis.js
        }
    }
    this.setYearItem = function (oItem) {
        var year = getNodeValue(oItem, "YEAR");
        this.setTimeItem(oItem, year, "REFERENCE");
        this.setTimeItem(oItem, year, "SUB_REFERENCE");
        this.setTimeItem(oItem, year, "CITING");
        this.setTimeItem(oItem, year, "SUB_CITING");

    }
    this.setYearCount = function (oYears) {
        var oItems = oYears.getElementsByTagName("Item");
        for (var i = 0; i < oItems.length; i++) {
            this.setYearItem(oItems[i]);
        }
        if (this.Year != '' && this.Year != null) {
            //alert(this.Year);
            RenderTimeAxis(this.Year, this.getRefUrlBase(), this.Target);
        }
    }
    this.OnRefChartDataReceive = function (oXmlDom, obj) {

        //alert(oXmlDom); 
        var oRoot = oXmlDom.responseXML.documentElement;
        if (oRoot == null) return;
        var strRootName = oRoot.nodeName;
        if (strRootName == "Error") {
            alert(strRootName + ":" + oRoot.text);
            return;
        }
        var oTotal = oRoot.getElementsByTagName("TOTAL");
        if (oTotal == null) return;
        obj.setTotalCount(oTotal[0]);

        var oYears = oRoot.getElementsByTagName("YEARCOUNT");
        if (oYears == null) return;
        obj.setYearCount(oYears[0]);
    }
    this.SendRequest = function () {
        _sendRequset(this.getRefChartDataUrl(), this.OnRefChartDataReceive, this);
    }
}

function SetRefChartData(dbcode, filename, dbname, year) {
    var oRefChart = new RefChartObj();
    oRefChart.DataUrl = "/kcms/detail/block/refchartdata.aspx";
    oRefChart.DbCode = dbcode;
    oRefChart.FileName = filename;
    oRefChart.Link = "/kcms/detail/frame/list.aspx";
    oRefChart.Target = "frame1";
    if (year == null || year == '') {
        //        
    }
    oRefChart.Year = year;
    RegisterStartLoad(oRefChart);
}

function SetRefChartDataEx(dbcode, filename, dbname, year) {
    var oRefCount = new RefCountClass();
    oRefCount.DataUrl = "/kcms/detail/block/refcount.aspx";
    oRefCount.DbCode = dbcode;
    oRefCount.FileName = filename;
    oRefCount.DbName = dbname;
    oRefCount.Link = "/kcms/detail/frame/list.aspx";
    oRefCount.Target = "frame1";
    oRefCount.Year = year;
    RegisterStartLoad(oRefCount);

    var oRefYear = new RefYearClass();
    oRefYear.DataUrl = "/kcms/detail/block/refyear.aspx";
    oRefYear.DbCode = dbcode;
    oRefYear.FileName = filename;
    oRefYear.Link = "/kcms/detail/frame/list.aspx";
    oRefYear.Target = "frame1";
    oRefYear.Year = year;
    RegisterStartLoad(oRefYear);
}

function OpenUrl(url) {
    window.open(url);
}

function HideAd(resizeid, adid) {
    document.getElementById(adid).style.display = "none";
    document.getElementById(resizeid).style.width = "100%";
}



//标红
function ReplaceRedMark(text) {
    var prefix = /###/g;
    var postfix = /\$\$\$/g;
    var pair = /###[^#]+\$\$\$/g;
    var title = /title=\"[^\"]*\"/gi;
    text = text.replace(title, function (sMatch) {
        sMatch = sMatch.replace(prefix, "");
        sMatch = sMatch.replace(postfix, "");
        return sMatch;
    });
    text = text.replace(pair, function (sMatch) {
        sMatch = sMatch.replace(prefix, "<font class='Mark'>");
        sMatch = sMatch.replace(postfix, "</font>");
        return sMatch;
    })
    text = text.replace(prefix, "");
    text = text.replace(postfix, "");
    return text;
}

//快照
var g_ssenable = false;
function EnableSnapShot(obj) {
    obj.value = '';
    g_ssenable = true;
}

function StartSnapShotSearch(dbcode, fn, dbname) {
    var urlFormat = "block/snapshotdata.aspx?fn={0}&dn={1}&dc={2}&kw={3}";
    var kw = document.getElementById("SnapshotSearchItem").value;
    kw = kw.replace(/(^\s*)|(\s*$)/g, "");
    if (kw == "" || g_ssenable == false) {
        return alert(SNAPSHOT_ALERT); //SNAPSHOT_ALERT
    }
    var reg = /select|update|delete|truncate|join|union|exec|insert|drop|count|’|"|;|>|<|%|&|#|'/i;
    if (reg.test(kw)) {
        return alert(SNAPSHOT_INVALID_ALERT); //SNAPSHOT_ALERT
    }
    var url = urlFormat.format(fn, dbname, dbcode, encodeURIComponent(kw));
    kSendRequset(url,
       function (oResult) {
           var text = oResult.responseText
           if (text != "") {
               var el = document.getElementById("divSnapshotSearchText");
               var el2 = document.getElementById("divSnapshotSearchContent");
               el2.style.display = 'block';
               text = ReplaceRedMark(text);
               el.innerHTML = text;
           }
       },
       function (oResult) { });
}

function ResetSnapShot() {
    var el2 = document.getElementById("divSnapshotSearchContent");
    el2.style.display = 'none';
    var el = document.getElementById("divSnapshotSearchText");
    el.innerHTML = "";
    check = 0;
    document.getElementById("SnapshotSearchItem").value = "";
}

//广告
function ShowAd(ad, hide) {
    var target = document.getElementById(ad);
    var source = document.getElementById(hide);
    if (target == null || source == null)
        return;
    var content = source.innerHTML;
    if (content.length < 200)
        return;
    target.innerHTML = content;
    target.style.display = "block";
}


function SearchLink(value, type, dbcode, filename) {
    var linkformat = "search.aspx?dbcode={0}&sfield={1}&skey={2}&filename={3}";
    var htmlformat = '<a href="{0}" target="_blank">{1}</a>';
    var valuelist = value.split(';');
    var html = "";
    for (var i = 0; i < valuelist.length; i++) {
        if (valuelist[i] != "") {
            html += htmlformat.format(linkformat.format(dbcode, type, encodeURIComponent(valuelist[i]), filename), valuelist[i]);
            if (i != valuelist.length - 1) {
                html += "；";
            }
        }
    }
    document.write(html);
}

function kwPop(kw, dc, code, event) {
    g_Keep1++;
    var cat = 'kmc';
    if (code == "") {
        cat = 'kw';
    }
    var oTargt = event.srcElement ? event.srcElement : event.target;
    var oPop = document.getElementById("kwPop");
    if (!oPop) return;
    var linkformat = "search.aspx?dbcode={0}&sfield={1}&skey={2}&code={3}";
    var htmlformat = '<a href="{0}" target="_blank">{1}</a>';
    var linkMeta = htmlformat.format(linkformat.format(dc, 'meta', encodeURIComponent(kw), ""), '• 知识元');
    var linkRefbook = GetRefBookLink(encodeURIComponent(kw));
    if (linkRefbook != "")
        linkRefbook = htmlformat.format(linkRefbook, '• 工具书');
    var linkFile = htmlformat.format(linkformat.format(dc, cat, encodeURIComponent(kw), code), '• 文献检索');
    oPop.innerHTML = linkMeta + linkRefbook + linkFile;
    oPop.style.left = getElementLeft(oTargt) + "px";
    oPop.style.top = Number(getElementTop(oTargt)) + 13 + "px";
    setTimeout(function () {
        oPop.style.display = "block";
    }, 100);

}
var g_Keep1 = 0;
var g_Keep2 = 0;
function kwHide(num, event) {
    if (num == 1)
        g_Keep1--;
    if (num == 2)
        g_Keep2--;
    var oPop = document.getElementById("kwPop");
    if (!oPop) return;
    var e = event;
    var tg = (document.all) ? e.srcElement : e.target;
    var reltg = (document.all) ? e.toElement : e.relatedTarget;
    setTimeout(function () {
        if ((num == 2 && g_Keep1 < 1)) {
            if (tg.nodeName != 'DIV') return;
            while (reltg != tg && reltg.nodeName != 'BODY')
                reltg = reltg.parentNode
            if (reltg == tg) return;
            oPop.style.display = "none";
        }
        else if ((num == 1 && g_Keep2 < 1))
            oPop.style.display = "none";
    }, 100);
}
function kwKeep() {
    g_Keep2++;
}


function RegisterKw(dc, id) {
    var obj = new Object();
    obj.SendRequest = function () {
        var oCn = document.getElementById(id);
        if (!oCn) return;
        var wkList = oCn.innerHTML.split('；');
        var html = "";
        for (var i = 0; i < wkList.length; i++) {
            //modified by scp 20160801
            if (dc.toUpperCase() != "DOAJ") {
                wkList[i] = wkList[i].replace(/[\s]*/g, '')
            }
            else {
                wkList[i] = wkList[i].replace(/[\f\n\r\t\v]*/g, '')
            }
            if (wkList[i].replace(/[\s]*/g, '') != "") {
                //alert(wkList[i]);
                html += getKmLink(dc, wkList[i], "") + '； ';
            }
            //end
        }
        //alert(html);
        oCn.innerHTML = html;
    }
    StartArray.push(obj);
}



function getKmLink(dc, kw, code) {
    var lingformat = "<a onmouseover=\"kwPop('{0}','{1}','{2}',event)\" onmouseout='kwHide(1,event)' >{0}</a>";
    return lingformat.format(kw, dc, code);
}

function mousePosition(ev) {
    if (ev.pageX || ev.pageY) {
        return { x: ev.pageX, y: ev.pageY };
    }
    if (document.body.scrollTop)
        return {
            x: ev.clientX - document.body.clientLeft + document.body.scrollLeft,
            y: ev.clientY - document.body.clientTop + document.body.scrollTop
        };
    return {
        x: ev.clientX - document.body.clientLeft + document.documentElement.scrollLeft,
        y: ev.clientY - document.body.clientTop + document.documentElement.scrollTop
    };
}
function getElementLeft(element) {
    var actualLeft = element.offsetLeft;
    var current = element.offsetParent;
    while (current !== null) {
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
    }
    return actualLeft;
}
function getElementTop(element) {
    var actualTop = element.offsetTop;
    var current = element.offsetParent;
    while (current !== null) {
        actualTop += current.offsetTop;
        current = current.offsetParent;
    }
    return actualTop;
}


function GetRelKw(v, id) {
    CallRequest(function () {
        var html = '';
        var row = '<tr><td align="center">{0}</td><td>{1}</td><td align="center">{2}</td></tr>';
        var link = '<a target="_blank" href="keyword.aspx?v={0}">{1}</a> ';
        var items = v.split(';');
        var top = 10;
        if (items.length < top) top = items.length;
        for (var i = 0; i < top; i++) {
            var value = items[i].split(':');
            if (value.length == 2) {
                var word = value[0];
                var count = value[1];
                html += row.format(i + 1, link.format(encodeURIComponent(word), word), count);
            }
        }
        var head = '<tr><th width="40">序号</th><th>关键词</th><th width="100">共现频次↓</th></tr>';
        document.getElementById(id).innerHTML = '<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabinfo" >' + head + html + '</table>';
    });

}

function RegExplan(v, id) {
    CallRequest(function () {
        kSendRequset(getExplanUrl(v), function (oReq) {
            var oData = getJsonObj(oReq);
            //alert(oData.Rows.length);
            var liformat = '<li>{0}...{1}<a target="_blank" class="readall" href="http://gongjushu.cnki.net/refbook/detail.aspx?recid={2}">阅读全文&gt;&gt;</a></li>';
            var emformat = '<em class="gray">{0}</em>';
            var html = "";
            for (var i = 0; i < oData.Rows.length; i++) {
                var row = oData.Rows[i];
                var em = "";
                if (row.条目字数 != '') { em += '字数:' + row.条目字数; }
                if (row.工具书名称 != '') { em += '  - 来源:' + row.工具书名称; }
                if (em != "") { em = emformat.format(em); }
                html += liformat.format(row.abstract, em, row.条目编码);
            }
            if (html != "") {
                document.getElementById(id).innerHTML = html;
            }
        }, null);
    })
}
function getExplanUrl(v) {
    return 'block/explan.aspx?v=' + encodeURIComponent(v);
}


function RegTranslate(v, l, id) {
    CallRequest(function () {
        kSendRequset(getTranslateUrl(v, l), function (oReq) {
            document.getElementById(id).innerHTML = oReq.responseText;
        }, null);
    })
}

function getTranslateUrl(v, l) {
    return 'block/translate.aspx?v={0}&l={1}'.format(encodeURIComponent(v), l);
}

function RegKwAuthor(v, id) {
    var url = 'block/kwauthor.aspx?v={0}'.format(encodeURIComponent(v));
    CallRequest(function () {
        kSendRequset(url, function (oReq) {
            var oData = getJsonObj(oReq);
            var html = '';
            var row = '<tr><td align="center">{0}</td><td>{1}</td><td align="center">{2}</td></tr>';
            var pos = 0;
            for (var i = 0; i < oData.Rows.length; i++) {
                var item = oData.Rows[i];
                var au = item.AU_CN;
                var code = item.AU_CODE;
                var count = item.c;
                if (au == code)
                    continue;
                html += row.format(i + 1, au, count);
                pos++;
                if (pos == 10)
                    break;
            }
            var head = '<tr><th width="40">序号</th><th>作者</th><th width="100">引词频次↓</th></tr>';
            document.getElementById(id).innerHTML = '<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabinfo" >' + head + html + '</table>';
        }, null);
    })
}
function RegKwSub(v, id) {
    var url = 'block/kwsub.aspx?v={0}'.format(encodeURIComponent(v));
    CallRequest(function () {
        kSendRequset(url, function (oReq) {
            var oData = getJsonObj(oReq);
            var html = '';
            var td = '<td  width="50" align="center"><a href="javascript:void(0)" onclick="RequSubFile(\'{2}\',\'{3}\',\'subfile\',1)">{0}{1}</a></td>'
            var row = '<tr>{0}</tr>';
            var pos = 0;
            var trhtml = '';
            var count = oData.Count;
            var sub = '';
            for (var i = 0; i < 5; i++) {
                if (i < count) { var oRow = oData.Rows[i]; if (sub == '') sub = oRow.ZT_CODE; trhtml += td.format(oRow.专题名, '(' + oRow.c + ')', v, oRow.ZT_CODE); }

            }
            if (trhtml != '') {
                html += row.format(trhtml);
            }
            if (count > 5) {
                trhtml = '';
                for (var i = 5; i < 10; i++) {
                    if (i < count) { var oRow = oData.Rows[i]; trhtml += td.format(oRow.专题名, '(' + oRow.c + ')', v, oRow.ZT_CODE); }
                    else { trhtml += td.format('', '', '', ''); }
                }
                html += row.format(trhtml);
            }
            document.getElementById(id).innerHTML = '<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabinfo" >' + html + '</table>';
            if (sub != '')
                RequSubFile(v, sub, 'subfile', 1);
        }, null);
    })

}


function RequSubFile(v, s, id, p) {
    var url = 'block/kwsubfile.aspx?v={0}&s={1}&p={2}'.format(encodeURIComponent(v), s, p);
    document.getElementById(id).innerHTML = "正在请求...";
    kSendRequset(url, function (oReq) {
        var oData = getJsonObj(oReq);
        //alert(oData.Rows.length);
        var liformat = '<li>[{7}].{0}.<a target="_blank" href="detail.aspx?dbcode=CJFQ&dbname={2}&filename={3}">{1}</a>. {4}. {5}({6})</li>';
        var html = "";
        for (var i = 0; i < oData.Rows.length; i++) {
            var row = oData.Rows[i];
            html += liformat.format(row.AU_CN, row.TI_CN, row.TABLE, row.FN, row.SRC, row.YEAR, row.ISSUE, i + 1);
        }
        if (html != "") {
            document.getElementById(id).innerHTML = html;
        }
    }, null);
}

function RegChart(v, id) {
    CallRequest(function () {
        var iframe = document.getElementById(id);
        iframe.onload = function () {
            //alert("xx");
            //iframe.style.height = iframe.documnet.body.scrollHeight + "px";
        }
        iframe.src = 'frame/ztchart.aspx?kw=' + encodeURIComponent(v);
    })
}
function GetWbTitle() {
    var strt = encodeURIComponent(document.title.substring(0, 76));
    var title = document.title.split('-')[0].toString().replace(/[ ]/g, "");
    var strnewt = document.getElementById("hidtitle").value;
    if (strnewt != "") strt = encodeURIComponent(title + "-" + strnewt);
    strt = strt + "--文献出自中国知网";
    return strt;
}
//分享到新浪微博
function ShareWeibo_xl() {
    var strt = GetWbTitle();
    window.open('http://v.t.sina.com.cn/share/share.php?title=' + strt + '&url=' + encodeURIComponent(location.href) + '&source=bookmark', '_blank', 'width=450,height=400, menubar=no, scrollbars=no,resizable=yes,location=no, status=no');
}
//分享到网易微博
function ShareWeibo_wy() {
    var strt = GetWbTitle();
    var url = 'link=http://news.163.com/&source=' + encodeURIComponent('网易新闻') + '&info=' + strt + ' ' + encodeURIComponent(document.location.href);
    window.open('http://t.163.com/article/user/checkLogin.do?' + url + '&' + new Date().getTime(), 'newwindow', 'height=330,width=550,top=' + (screen.height - 280) / 2 + ',left=' + (screen.width - 550) / 2 + ',toolbar=no, menubar=no, scrollbars=no,resizable=yes,location=no, status=no');
}

//分享到腾讯微博
function ShareWeibo_tx() {
    var strt = encodeURIComponent(document.title);
    var title = document.title.split('-')[0].toString().replace(/[ ]/g, "");
    var strnewt = document.getElementById("hidtitle").value;
    if (strnewt != "") strt = encodeURIComponent(title + "-" + strnewt);
    var _t = encodeURIComponent(document.title);
    var _url = encodeURIComponent(document.location);
    var _appkey = encodeURI("appkey");
    var _pic = encodeURI('');
    var _site = '';
    var _u = 'http://v.t.qq.com/share/share.php?title=' + strt + '&url=' + _url + '&appkey=' + _appkey + '&site=' + _site + '&pic=' + _pic;
    window.open(_u, '转播到腾讯微博', 'width=700, height=680, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no');
}
//分享到人人网
function ShareWeibo_rr() {
    var strt = GetWbTitle();
    window.open('http://share.renren.com/share/buttonshare.do?link=' + encodeURIComponent(document.location.href) + '&title=' + strt, '_blank', 'scrollbars=no,width=600,height=450,left=75,top=20,status=no,resizable=yes');

}
//分享到开心网
function ShareWeibo_kx() {
    var strt = GetWbTitle();
    window.open('http://www.kaixin001.com/repaste/share.php?rtitle=' + strt + '&rurl=' + encodeURIComponent(location.href) + '&rcontent=', '_blank', 'scrollbars=no,width=600,height=450,left=75,top=20,status=no,resizable=yes');
}
//分享到豆瓣网
function ShareWeibo_db(obj) {
    var strt = GetWbTitle();
    window.open('http://www.douban.com/recommend/?url=' + encodeURIComponent(location.href) + '&V=1&title=' + strt, 'douban', 'toolbar=0,resizable=1,scrollbars=yes,status=1,width=450,height=330');
}

function GetShareWeibosRight(url) {
    var wbtext = "<div id='common_box' class='shareDiv' onmouseover='showshare()' onmouseout='closeshare()'><div id='cli_on' class='sharehd'>分享到</div><ul class='sharebd' id='sharedet'>"
+ "<li><a href='javascript:void(0);'  onclick=CopyToClipboard()     class='copy' title='复制链接'><i></i>复制链接</a></li>"
+ "<li><a href='javascript:void(0);'  onclick=ShareWeibo_xl('xl')     class='xl' title='分享到新浪微博'><i></i>新浪微博</a></li>"
//+ "<li><a href='javascript:void(0);'  onclick=ShareWeibo_tx('tx')     class='tx' title='分享到腾讯微博'><i></i>腾讯微博</a></li>"
//+ "<li><a href='javascript:void(0);'  onclick=ShareWeibo_rr('rr')     class='rr' title='分享到人人网'><i></i>人人网</a></li>"
//+ "<li><a href='javascript:void(0);'  onclick=ShareWeibo_kx('kx')     class='kx' title='分享到开心网'><i></i>开心网</a></li>"
//+ "<li><a href='javascript:void(0);'  onclick=ShareWeibo_db('db')     class='db' title='分享到豆瓣网'><i></i>豆瓣网</a></li>"
//+ "<li><a href='javascript:void(0);'  onclick=ShareWeibo_wy('wy')     class='wy' title='分享到网易微博'><i></i>网易微博</a></li>"
+ "</ul></div>";
    document.write(wbtext);
}

function CopyToClipboard() {
    var clipboard = new Clipboard(".sharebd .copy", {
        text: function () {
            return window.location.href;
        }
    });

    clipboard.on('success', function (e) {
        alert("已复制到剪贴板！");
    });

    clipboard.on('error', function (e) {
    });
}

function showshare() {
    document.getElementById("common_box").style.width = '142px';
}
function closeshare() {
    document.getElementById("common_box").style.width = '32px'
}

//浏览历史和下载历史cookie操作
//start
function ge(eID) {
    return document.getElementById(eID);
}
function newsetCookie(name, value) {
    var Days = 7;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    var cookievalues = "";
    if (newgetCookie(name) != null) {
        cookievalues = newgetCookie(name);
    }
    var title;
    var url;
    if (value == "") {
        title = getTestTitle();
        url = document.URL;
        var strdbcode = getQueryString("dbcode");
        var strdbname = getQueryString("dbname");
        var strfilename = getQueryString("filename");
        value = title + "!" + strdbcode + "!" + strdbname + "!" + strfilename;
    }
    if (!IsIndexOfTheValue(cookievalues, title)) {
        document.cookie = name + "=" + escape(value + "|" + cookievalues) + ";expires=" + exp.toGMTString() + ";path=/";
    }
}
function getTestTitle() {
    var title = document.title;
    var arrt = title.split('-');
    if (arrt.length > 2) {
        title = "";
        for (var i = 0; i < arrt.length - 1; i++) {
            title += arrt[i].toString();
        }
    }
    else {
        title = document.title.split('-')[0].toString().replace(/[ ]/g, "");
    }
    return title.replace('!', '');
}
function IsIndexOfTheValue(name, value) {
    var usercookie = name;
    var flag = false;
    var DicValue = "";
    if (usercookie != null) {
        for (var i = 0; i < usercookie.length; i++) {
            if (usercookie[i] != "|")
                DicValue += usercookie[i];
            else {
                if (DicValue.indexOf(value) > -1) {
                    flag = true;
                    return flag;
                }
                DicValue = "";
            }
        }
    }
    return flag;
}
//读取cookies
function newgetCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) return unescape(arr[2]);
    else return null;
}
//删除cookies
function newdelCookie(name) {

    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = newgetCookie(name);
    if (cval != null) document.cookie = name + "=|;expires=" + exp.toGMTString() + ";path=/";
    if (name == "UserSeesKcms")
        ge("usersee_hiscontent").innerHTML = "";
    else if (name == "UserDownLoadsKcms")
        ge("userdowmn_hiscontent").innerHTML = "";
}
function newhisresult_ll() {
    var userinputHtml;
    var arruserinputs;
    arruserinputs = newgetCookie("UserSeesKcms");
    newsetC("UserSeesKcms", arruserinputs);
    arruserinputs = newgetCookie("UserSeesKcms");
    var inputscount = 0;
    if (arruserinputs != null) {

        userinputHtml = "<ul class='listSpan' >";
        var otherHtml = "";
        var DicValue = "";
        var trunUrl = "http://epub.cnki.net/kns/detail/detail.aspx?dbcode={0}&dbname={1}&filename={2}";
        var wordArry = arruserinputs.split("|");
        var c = 0
        for (var i = 0; i < wordArry.length; i++) {
            if (!wordArry[i] || wordArry[i] == "") {
                continue;
            }
            else {
                var wai = wordArry[i].split("!");
                var linkstr = "<li><a href='" + trunUrl.format(wai[1], wai[2], wai[3]) + "'>" + wai[0] + "</a></li>";
                userinputHtml += linkstr;
            }
            c++;
        }
        userinputHtml += "</ul>";

        userinputHtml += "<span><a onclick=\"newdelCookie('UserSeesKcms')\"  href='javascript:void(0)' style='margin-left:160px;'>清空</a></span>";


        if (c > 0) {
            ge("usersee_hiscontent").innerHTML = userinputHtml;
            ge("usersee_his").style.display = 'block';
        } else {
            ge("usersee_his").style.display = 'none';
        }

    }
}
function newsetC(cname, arruserinputs) {
    var strNewC = "";
    if (arruserinputs != null && arruserinputs != "") {
        var arrClist = arruserinputs.split("|");
        for (var i = 0; i < arrClist.length; i++) {
            if (i < 10) {
                var arrC = arrClist[i].split("!");
                if (strNewC.indexOf(arrC[0]) < 0) {
                    strNewC += arrClist[i] + "|";
                }
            }
        }
        newdelCookie(cname);
        var Days = 7;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);

        document.cookie = cname + "=" + escape(strNewC) + ";expires=" + exp.toGMTString() + ";path=/";
    }

}
function newhisresult_down() {
    var userinputHtml;
    var arruserinputs;
    arruserinputs = newgetCookie("UserDownLoadsKcms");
    newsetC("UserDownLoadsKcms", arruserinputs);
    arruserinputs = newgetCookie("UserDownLoadsKcms");
    var inputscount = 0;
    if (arruserinputs != null) {
        userinputHtml = "<ul class='listSpan' >";
        var otherHtml = "";
        var DicValue = "";
        var trunUrl = "../detail/detail.aspx?dbcode={0}&dbname={1}&filename={2}";
        var wordArry = arruserinputs.split("|");
        var c = 0;
        for (var i = 0; i < wordArry.length; i++) {
            if (!wordArry[i] || wordArry[i] == "") {
                continue;
            }
            else {
                var wai = wordArry[i].split("!");
                var linkstr = "<li><a href='" + trunUrl.format(wai[1], wai[2], wai[3]) + "'>" + wai[0] + "</a></li>"
                userinputHtml += linkstr;
                c++;
            }
        }
        userinputHtml += "</ul>";
        userinputHtml += "<span><a onclick=\"newdelCookie('UserDownLoadsKcms')\"  href='javascript:void(0)' style='margin-left:160px;'>清空</a></span>";

        if (c > 0) {

            ge("userdowmn_hiscontent").innerHTML = userinputHtml;
            ge("userdown_his").style.display = 'block';
        } else { ge("userdown_his").style.display = 'none'; }
    } else { ge("userdown_his").style.display = 'none'; }
}
function BindOnClick_DownLoad() {

    var aTags = document.getElementsByTagName("a");
    if (aTags && aTags.length > 0) {
        for (var i = 0; i < aTags.length; i++) {
            if (aTags[i].href.toString().indexOf("download.aspx?") > -1) {
                var elementA = aTags[i];

                if (window.attachEvent) {
                    elementA.attachEvent("onclick", function () { addTitToCookic(event.srcElement) });
                }
                else {
                    elementA.addEventListener("click", function () { addTitToCookic(this) }, false);
                }
            }
        }
    }
}
function addTitToCookic(obj) {

    newsetCookie("UserDownLoadsKcms", '');
}
//end
//PGB 订阅处理 20120515
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
function SubScription(subt, subu, subc) {

    var subTurnUrl = "/kcms/detail/frame/SubTurnPage.aspx";

    var filen = getQueryString("filename") + ";";

    var myForm = document.createElement("form");
    myForm.method = "post";
    myForm.setAttribute("target", "_blank");
    myForm.action = subTurnUrl;

    var myInputT = document.createElement("input");
    myInputT.setAttribute("name", "SubT");
    myInputT.setAttribute("value", subt);
    myForm.appendChild(myInputT);

    var myInputC = document.createElement("input");
    myInputC.setAttribute("name", "SubC");
    myInputC.setAttribute("value", subc + filen);
    myForm.appendChild(myInputC);

    var myInputU = document.createElement("input");
    myInputU.setAttribute("name", "SubU");
    myInputU.setAttribute("value", subu);
    myForm.appendChild(myInputU);

    document.body.appendChild(myForm);
    myForm.submit();
    document.body.removeChild(myForm);
}
//图片
function GetImgPath() {
    var fn = "";
    if (getQueryString("filename") != null) fn = getQueryString("filename");
    var ImgSearchFC = "//image.cnki.net";
    src = ImgSearchFC + "/getimage.ashx?fnbyIdAndName=" + encodeURIComponent(fn);
    try {
        RequestJsonObject(src, function () {
            if (typeof oJson != "undefined") {
                var html = oJson.IDs;
                if (html != null && html != "") {
                    //过滤自行使用区域字符 (Private Use Zone)  
                    html = html.replace(new RegExp("([\ue000-\uf8ff])", "gm"), " ");
                    RenderImages(html);
                }
            }
        });
    } catch (err) { };
}
function RenderImages(html) {
    var lid = "";
    if (document.getElementById("loginuserid") != null) lid = document.getElementById("loginuserid").value;
    var fn = getQueryString("filename");
    var imgids = html;
    var imgsrc = "//image.cnki.net/detail.aspx?ref=kcms&id=";
    var imgFrameSrc = "//image.cnki.net/picinfo.aspx?id=";
    var imgpath = "//image.cnki.net/getimage.ashx?id=";
    var imgMore = "//image.cnki.net/Document/{0}.html";
    var imgMoreNew = "//image.cnki.net/TurnPage.aspx?ref=kcms&docid={0}&uid={1}";
    var imgdivhtml = "";
    var imgFristId = "";
    if (imgids != null) {
        var arrimgids = imgids.split('||');
        for (i = 0; i < arrimgids.length; i++) {
            if (i < 8) {
                var tempId = arrimgids[i].split('##')[0];
                var tempName = arrimgids[i].split('##')[1];
                if (tempId != "") {
                    var openwurl = imgsrc + tempId + "&uid=" + lid;
                    imgdivhtml += "<a target='_blank' onclick=OpenWindowsUrl('" + openwurl + "') title='点击查看图片信息' style='display:inline-block;width:180px;margin:5px;overflow:hidden;'>"
            + "<img src='" + imgpath + tempId + "' id=" + tempId + " style='width:180px;max-height:200px;border:1px solid #ddd;'><h3 style='width:180px;height:44px;overflow:hidden;font-size:12px;font-weight:normal;text-align:center;line-height:22px;'>" + tempName + "</h3>" + "</a>";
                }
            }
            imgFristId = arrimgids[0].split('##')[0];
        }
        //        var Moreurl = imgMore.replace("{0}", imgFristId);
        var Moreurl = imgMoreNew.replace("{0}", fn).replace("{1}", lid);
        if (arrimgids.length > 8) imgdivhtml += "<div class='zwjdown' style='margin-right:20px;'><a href='" + Moreurl + "' target='_blank'>更多图片...</a><div>";
    }
    var imgObj = document.getElementById("imgdiv");
    var Objimg = document.getElementById("divimg");
    if (imgObj && Objimg) {
        Objimg.style.display = '';
        imgObj.innerHTML = imgdivhtml;
    }
}
function OpenWindowsUrl(url) {
    //海外版本用
    window.open(url, 'newwindow');
}
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var strsearch = window.location.search.substr(1).toLowerCase();
    var r = strsearch.match(reg);
    if (r != null) return unescape(r[2]); return "";
}
var C;
//添加监听事件
function O(G, U, C) {
    var ISIE = navigator.userAgent.indexOf("MSIE") != -1 && !window.opera;
    if (ISIE) {
        if (U == "load") {
            G.onreadystatechange = function () {
                if (this.readyState == "loaded") {
                    C();
                }
            }

        }
        else
            G.attachEvent("on" + U, (function (V) { return function () { C.call(V) } })(G))

    }
    else {
        G.addEventListener(U, C, false)
    }
}
//做跨域脚本支持
function RequestJsonObject(src, onJsonLoaded) {
    if (C) {
        document.body.removeChild(C)
    }
    C = J("SCRIPT");
    C.src = src + "&td=" + (new Date()).getTime();
    C.charset = "utf-8";
    document.body.appendChild(C);
    O(C, "load", onJsonLoaded);

}
function J(C) {
    return document.createElement(C)
}

//原版预览
function RenderYbylHtml(encode) {
    //    var dbCodeList = "SCDB,CPFD,IPFD,CIPD,CJFQ,CJFD,CSYD,CYFD,CDMD,CDFD,CMFD,CDSF,CMSF,CDBF2011,CMBF2011,CCND";
    var dbCodeList = "CAST";
    var subTurnUrl = "/kcms/Detail/ReadRedirectPage.aspx?filename={0}&dbcode={1}&tablename={2}";
    var pfn = getQueryString("filename");
    var pdb = getQueryString("dbname");
    var pdc = getQueryString("dbcode");
    if (pfn) {
        pfn = pfn.toUpperCase();
        pdb = pdb.toUpperCase();
        pdc = pdc.toUpperCase();
    }
    if (!encode) encode = "gb";
    subTurnUrl = subTurnUrl.format(pfn, pdc, pdb);
    var objli = document.getElementById("ybyl");
    if (pdc != "" && dbCodeList.indexOf(pdc) > -1) {
        if (objli) {
            objli.style.display = '';
            objli.setAttribute("class", "mlyll");
            if (encode.toLocaleLowerCase() == "en") {
                objli.innerHTML = "<a href='" + subTurnUrl + "' target='_blank'>View</a>";
            }
            else {
                objli.innerHTML = "<a href='" + subTurnUrl + "' target='_blank'>在线阅读</a>";
            }
        }
    }
    else {
        if (objli) {
            objli.style.display = 'none';
        }
    }
}
//下载图标
function SetDownLoadFlag(dflag) {
    var lid = "";
    if (document.getElementById("loginuserid") != null) {
        lid = document.getElementById("loginuserid").value;
    }
    if (lid != "") {
        if (dflag != "1") {

            var strClass = "page|chapter|whole|readol|caj|pdf|cajNew";
            var arrClass = strClass.split('|');
            var obj = document.getElementsByTagName("li");
            for (var i = 0; i < obj.length; i++) {
                var strClassName = obj[i].className.replace("/n", "");
                strClassName = strClassName.replace(/[ ]/g, "");
                strClassName = strClassName.replace(/(^\s*)|(\s*$)/g, "");
                if (strClass.indexOf(strClassName) > -1) {
                    obj[i].className = "pdfN";
                }
            }
        }
        else { return; }
    }
    else {
        return;
    }
}

function showBqsm(bqsmurl) {
    if (!bqsmurl) return;
    var bqsmdiv = document.getElementById("bkbqsm");
    if (!bqsmdiv) return;
    bqsmdiv.innerHTML = getBqsmHtml(bqsmurl);
    bqsmdiv.style.display = 'block';

}
function getBqsmHtml(bqsmurl) {
    var closeHtml = "<a class='close' href='javascript:closeBqsm()'>X</a>";
    var IMGhtml = "<div><img src='" + bqsmurl + "'/></div>";

    return closeHtml + IMGhtml;
}
function closeBqsm() {
    document.getElementById("bkbqsm").style.display = 'none';
}
function LinkXjjcom() {
    var fn = "";
    var dbcode = "";
    var dbname = "";

    if (getQueryString("filename") != null) fn = getQueryString("filename");
    if (getQueryString("dbcode") != null) dbcode = getQueryString("dbcode");
    if (getQueryString("dbname") != null) dbname = getQueryString("dbname");

    var products = ",LXYL,LXYY,LXYN,LXYP,LXYM,LXYD,LXYJ,LXYTZK,LXYTBS,";
    if (products.indexOf(dbcode.toUpperCase()) < 0) {
        return;
    }
    var xjjPath = "http://r.cnki.net/kns/request/GetXuanJiang.ashx?title=" + encodeURI($("#chTitle").text()) + "&auth=" + encodeURI(getThisFileAus());

    try {
        RequestJsonObject(xjjPath, function () {
            if (typeof result != "undefined") {
                //var html = result;
                if (result.length == 0) return;
                var pichtml = "";

                pichtml += "<div><div style='width: 990px;padding-left: 10px;padding-top: 10px;height: 28px;line-height: 28px;font-weight: 600;font-size: 13px;color: #555;border-bottom: 1px solid #ccc;background: -webkit-gradient(linear, 0 0, 0 100%, from(#fff), to(#D9D9D9));background:-moz-linear-gradient(top, #fff,#D9D9D9);background:linear-gradient(to bottom, #fff, #D9D9D9);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#ffffff,endColorstr=#D9D9D9,grandientType=0);'>宣讲家网相关视频</div><ul style='padding: 10px 0px 15px 20px;overflow: hidden;'>";

                for (i = 0; i < result.length; i++) {
                    if (i < 6) {
                        pichtml += "<li style=' float: left; width: 470px;height: 28px;line-height: 28px; overflow: hidden;text-overflow: ellipsis; white-space: nowrap; margin-right: 10px;'><a target='_blank' href='" + result[i].Href + "'>" + result[i].Title + "</a></li>";
                    }
                }
                pichtml += "</ul></div>";

                $(".nodebar").prepend(pichtml);
            }
        });
    } catch (err) { };
}
//本篇文献的关键词，数组格式
function getThisFileAus() {
    var r = "";
    $("#aulist").children().each(function (index, element) {
        r += $(element).text() + ',';
    });

    if (!r) return null;
    r = r.charAt(r.length - 1) == "," ? r.substring(0, r.length - 1) : r;
    return r;
}
function RegisterKcm(dc, id) {
    var obj = new Object();
    obj.SendRequest = function () {
        var oCn = document.getElementById(id);
        if (!oCn) return;
        var wkList = oCn.innerHTML.split(';');
        var html = "";
        for (var i = 0; i < wkList.length; i++) {
            wkList[i] = wkList[i].replace(/[\s]*/g, '')
            if (wkList[i] != "") {
                //alert(wkList[i]);
                html += getKcmLink(dc, wkList[i], wkList[i]) + '； ';
            }
        }
        //alert(html);
        oCn.innerHTML = html;
    }
    StartArray.push(obj);
}
//分类号链接
function getKcmLink(dc, kcmcode, code) {
    var linkformat = "search.aspx?dbcode={0}&sfield={1}&skey={2}&code={3}";
    var lingformat = "<a href='" + linkformat.format(dc, 'cf', kcmcode, code) + "' target='_blank' >{0}<a>";
    return lingformat.format(kcmcode, dc, code);
}

function posttoknsmoreById(tip, dbcode) {
    if (!tip)
        return;
    var sel = $("#" + tip).val();
    if (!sel)
        return;
    var urltest = "/kns/brief/more.aspx";

    var pArr = new Array();
    pArr.push(CreateElement("input", "hidden", "dbPrefix", dbcode));
    pArr.push(CreateElement("input", "hidden", "sel", encodeURIComponent(sel)));
    pArr.push(CreateElement("input", "hidden", "tip", tip));
    PostSumit('partform', urltest, pArr, 'partform');
}
function PostSumit(formID, URL, paramObjs, targetName) {
    $("#" + formID).remove();
    var temp = $("<form>");
    temp[0].action = URL;
    temp[0].method = "post";
    temp[0].target = targetName;
    temp[0].style.display = "none";
    temp[0].id = formID;

    if (paramObjs) {
        for (var i = 0; i < paramObjs.length; i++) {
            temp[0].appendChild(paramObjs[i]);
        }
    }

    document.body.appendChild(temp[0]);
    temp[0].submit();
    return temp;
}
function CreateElement(eTag, eType, eName, eValue) {
    var tempE = document.createElement(eTag);
    tempE.type = eType;
    tempE.name = eName;
    tempE.value = eValue;
    return tempE;
}

//add by faw 20190705 WWHX外文核心刊添加‘本文作者发表的文献’
function RegisterFrame_knet(id, src) {
    var frameformat = '<iframe id="{0}" name="{0}" width="100%" height="0" frameborder="no" scrolling="no" src=""></iframe> ';
    document.write(frameformat.format(id));
    var frame = new Object();
    frame.id = id;
    frame.src = src;
    FrameArray.push(frame);
}

//获取‘目录页浏览’链接
function GetInfoMlyll(p, y, q, k) {
    //modify by by faw 20210531 删除目录页浏览
    //var url = "/kcms/detail/block/mlyll.aspx?pykm={0}&year={1}&issue={2}&zwkm={3}";
    //url = url.format(p, y, q, encodeURI(k));
    //$.get(url, function (data) {
    //    //$("#ssyptable").html(data);
    //    $("#mlyll").html(data);
    //});
}

//add by faw 20210118 文献收藏and关注
///*********************************************************
function getClientIP() {
    var clientIP = newgetCookie("Ecp_ClientIp");
    if (!clientIP) {
        clientIP = localStorage.getItem("userIp_mycnkiWap");
    }
    if (!clientIP) {
        $.ajax({
            url: "https://recsys.cnki.net/RCDService/api/UtilityOpenApi/GetUserIP",
            type: "GET",
            success: function (result) {
                if (result.Success && result.Data != "") //已收藏
                {
                    clientIP = result.Data;
                    SetCookie("Ecp_ClientIp", clientIP);
                    localStorage.setItem("userIp_mycnkiWap", clientIP);
                    return clientIP;
                }
            }
        });
    }
    else {
        return clientIP;
    }
}
function getClientID() {
    var clientID = newgetCookie("Ecp_ClientId");
    if (!clientID) {
        clientID = localStorage.getItem("clientId_mycnkiWap");
    }
    if (!clientID) {
        $.ajax({
            url: "https://recsys.cnki.net/RCDService/api/UtilityOpenApi/GenerateClientID",
            type: "GET",
            success: function (result) {
                if (result.Success && result.Data != "") //已收藏
                {
                    clientID = result.Data;
                    SetCookie("Ecp_ClientId", clientID);
                    localStorage.setItem("clientId_mycnkiWap", clientID);
                    return clientID;
                }
            }
        });
    }
    else {
        return clientID;
    }
}

//收藏 取消收藏 查询是否收藏
//otype:0 代表查询  1代表添加或取消收藏
function AddFavToMyCnki(otype, dbcode, filename) {
    var poperateType = otype;
    if (!otype || otype == 0) {
        poperateType = "query";
    }
    var pidenID = newgetCookie("LID");
    var pclientID = getClientID();
    var puserIP = getClientIP();

    var pplatformURL = location.host + "/kcms@KCMS"
    var pproductID = dbcode;// "RMKM";
    var pfileID = filename; //"1020427186.nh";  

    var $obj = $("#addfavtokpc span");
    if (otype == 1) {
        if ($obj.hasClass("collected")) {
            poperateType = "delete";
        }
        else {
            poperateType = "add";
        }
    }

    var params = "idenID=" + pidenID + "&clientID=" + pclientID + "&userIP=" + puserIP + "&platformURL=" + pplatformURL + "&productID=" + pproductID + "&fileID=" + pfileID + "&operateType=" + poperateType;
    var favoUrl = "https://recsys.cnki.net/RCDService/api/UserDataCenter/CollectFile?" + params;
    $.ajax({
        url: favoUrl,
        //url: "https://recsys.cnki.net/RCDServiceBeta/api/UserDataCenter/CollectFile",
        //data: { idenID: pidenID, clientID: pclientID, userIP: puserIP,platform: pplatform, platformURL: pplatformURL, productID: pproductID, fileID: pfileID, operateType: poperateType },
        type: "POST",
        success: function (result) {
            switch (poperateType) {
                //添加收藏
                case "add":
                    if (result.Success && result.Code == 1) //成功
                    {
                        $obj.addClass("collected");
                        $obj.attr("title", "已收藏");
                    }
                    break;
                    //取消收藏
                case "delete":
                    if (result.Success && result.Code == 1) {
                        $obj.removeClass("collected");
                        $obj.attr("title", "收藏");
                    }
                    break;
                    //查询
                case "query":
                    if (result.Success && result.Data == 1) //已收藏
                    {
                        $obj.addClass("collected");
                        $obj.attr("title", "已收藏");
                    }
                    else {
                        $obj.removeClass("collected");
                        $obj.attr("title", "收藏");
                    }
                    break;
            }
        }
    });
}

//关注 取消关注  查询是否关注
function AddConcernToMyCnki(otype, ftype, dbcode, filename) {
    var poperateType = otype;
    var presourceType = "paper";
    if (!otype || otype == 0) {
        poperateType = "query";
    }
    if (!ftype || ftype == 0) {
        presourceType = "paper";
    }
    var pidenID = newgetCookie("LID");
    var pclientID = getClientID();
    var puserIP = getClientIP();
    var pplatformURL = location.host + "/kcms@KCMS"

    var $obj = $("#RefTrack span");
    if (otype == 1) {
        if ($obj.hasClass("followed")) {
            poperateType = "delete";
        }
        else {
            poperateType = "add";
        }
    }

    var pproductID = dbcode;// "RMKM";
    var presourceID = filename; //"1020427186.nh";  
    //var presourceName = $(".wx-tit h1").text(); //题名;  

    if (ftype == 1) //作者
    {
        presourceType = "author";
        presourceID = getQueryString("code");
    }

    var params = "idenID=" + pidenID + "&clientID=" + pclientID + "&userIP=" + puserIP + "&platformURL=" + pplatformURL + "&productID=" + pproductID + "&resourceID=" + presourceID + "&operateType=" + poperateType + "&resourceType=" + presourceType;

    var concernUrl = "https://recsys.cnki.net/RCDService/api/UserDataCenter/Concern?" + params;
    $.post(concernUrl, function (result) {
        switch (poperateType) {
            //添加关注
            case "add":
                if (result.Success && result.Code == 1) //成功
                {
                    $obj.addClass("followed");
                    $obj.attr("title", "已关注");
                }
                break;
                //取消关注
            case "delete":
                if (result.Success && result.Code == 1) {//成功
                    $obj.removeClass("followed");
                    $obj.attr("title", "关注");
                }
                break;
                //查询
            case "query":
                if (result.Success && result.Data == 1) //已关注
                {
                    $obj.addClass("followed");
                    $obj.attr("title", "已关注");
                }
                else {
                    $obj.removeClass("followed");
                    $obj.attr("title", "关注");
                }
                break;
        }
    })

}