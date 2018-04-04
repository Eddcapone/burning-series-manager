// ==UserScript==
// @name         Burning Series Manager
// @namespace    http://bs.to/
// @version      2.4
// @description  Ermöglicht das markieren von Serien nach diversen Kriterien.
// @author       Eduard Fekete
// @match        https://bs.to/andere-serien
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// @require      https://use.fontawesome.com/releases/v5.0.9/js/all.js
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// ==/UserScript==

GM_addStyle('.contextMenuParent { position: relative;  }');
GM_addStyle('.contextMenuContainer { position: absolute; background: gray; z-index: 100; -webkit-box-shadow: 10px 10px 31px -1px rgba(0,0,0,0.75);-moz-box-shadow: 10px 10px 31px -1px rgba(0,0,0,0.75);box-shadow: 5px 5px 15px -1px rgba(0,0,0,0.75);}');
GM_addStyle('.contextMenu { display: grid; padding: 4px; width: 200px; border: 1px solid black;  color: black; }');
GM_addStyle('.contextMenu li { border-bottom: 1px solid gray; }');
GM_addStyle('.contextMenu li:hover { cursor: pointer; color: white; }');
GM_addStyle('.contextMenuClose { border: 1px solid #D8D8D8; padding: 0px; padding-left:2px; padding-right: 2px; background: white; position: absolute; top: 1px; right: 1px; color: red;  z-index: 110;}');
GM_addStyle('.contextMenuClose:hover { cursor: pointer; }');
GM_addStyle('.customMenuRemoveItem { background: red; }');

//Smoothscroll.js
!function(){var e,t={frameRate:300,animationTime:1500,stepSize:120,pulseAlgorithm:!0,pulseScale:8,pulseNormalize:1,accelerationDelta:20,accelerationMax:1,keyboardSupport:!0,arrowScroll:50,touchpadSupport:!0,fixedBackground:!0,excluded:""},a=t,o=!1,r=!1,n={x:0,y:0},i=!1,l=document.documentElement,c=[120,120,120],u={left:37,up:38,right:39,down:40,spacebar:32,pageup:33,pagedown:34,end:35,home:36};function s(){a.keyboardSupport&&S("keydown",w)}function d(){if(document.body){var t=document.body,n=document.documentElement,c=window.innerHeight,u=t.scrollHeight;if(l=document.compatMode.indexOf("CSS")>=0?n:t,e=t,s(),i=!0,top!=self)r=!0;else if(u>c&&(t.offsetHeight<=c||n.offsetHeight<=c)){var d=!1;if(n.style.height="auto",setTimeout(function(){d||n.scrollHeight==document.height||(d=!0,setTimeout(function(){n.style.height=document.height+"px",d=!1},500))},10),l.offsetHeight<=c){var f=document.createElement("div");f.style.clear="both",t.appendChild(f)}}a.fixedBackground||o||(t.style.backgroundAttachment="scroll",n.style.backgroundAttachment="scroll")}}a=t;var f=[],h=!1,m=+new Date;function p(e,t,o,r){var i,l;if(void 0===r&&(r=1e3),i=(i=t)>0?1:-1,l=(l=o)>0?1:-1,(n.x!==i||n.y!==l)&&(n.x=i,n.y=l,f=[],m=0),1!=a.accelerationMax){var c=+new Date-m;if(c<a.accelerationDelta){var u=(1+30/c)/2;u>1&&(u=Math.min(u,a.accelerationMax),t*=u,o*=u)}m=+new Date}if(f.push({x:t,y:o,lastX:t<0?.99:-.99,lastY:o<0?.99:-.99,start:+new Date}),!h){var s=e===document.body,d=function(n){for(var i=+new Date,l=0,c=0,u=0;u<f.length;u++){var m=f[u],p=i-m.start,w=p>=a.animationTime,g=w?1:p/a.animationTime;a.pulseAlgorithm&&(g=C(g));var v=m.x*g-m.lastX>>0,b=m.y*g-m.lastY>>0;l+=v,c+=b,m.lastX+=v,m.lastY+=b,w&&(f.splice(u,1),u--)}s?window.scrollBy(l,c):(l&&(e.scrollLeft+=l),c&&(e.scrollTop+=c)),t||o||(f=[]),f.length?M(d,e,r/a.frameRate+1):h=!1};M(d,e,0),h=!0}}function w(t){var o=t.target,r=t.ctrlKey||t.altKey||t.metaKey||t.shiftKey&&t.keyCode!==u.spacebar;if(/input|textarea|select|embed/i.test(o.nodeName)||o.isContentEditable||t.defaultPrevented||r)return!0;if(D(o,"button")&&t.keyCode===u.spacebar)return!0;var n=0,i=0,l=x(e),c=l.clientHeight;switch(l==document.body&&(c=window.innerHeight),t.keyCode){case u.up:i=-a.arrowScroll;break;case u.down:i=a.arrowScroll;break;case u.spacebar:i=-(t.shiftKey?1:-1)*c*.9;break;case u.pageup:i=.9*-c;break;case u.pagedown:i=.9*c;break;case u.home:i=-l.scrollTop;break;case u.end:var s=l.scrollHeight-l.scrollTop-c;i=s>0?s+10:0;break;case u.left:n=-a.arrowScroll;break;case u.right:n=a.arrowScroll;break;default:return!0}p(l,n,i),t.preventDefault()}var g={};setInterval(function(){g={}},1e4);var v,b,y=(v=0,function(e){return e.uniqueID||(e.uniqueID=v++)});function k(e,t){for(var a=e.length;a--;)g[y(e[a])]=t;return t}function x(e){var t=[],a=l.scrollHeight;do{var o=g[y(e)];if(o)return k(t,o);if(t.push(e),a===e.scrollHeight){if(!r||l.clientHeight+10<a)return k(t,document.body)}else if(e.clientHeight+10<e.scrollHeight&&(overflow=getComputedStyle(e,"").getPropertyValue("overflow-y"),"scroll"===overflow||"auto"===overflow))return k(t,e)}while(e=e.parentNode)}function S(e,t,a){window.addEventListener(e,t,a||!1)}function D(e,t){return(e.nodeName||"").toLowerCase()===t.toLowerCase()}function H(e,t){return Math.floor(e/t)==e/t}var M=window.requestAnimationFrame||window.webkitRequestAnimationFrame||function(e,t,a){window.setTimeout(e,a||1e3/60)};function T(e){var t,o;return(e*=a.pulseScale)<1?t=e-(1-Math.exp(-e)):(e-=1,t=(o=Math.exp(-1))+(1-Math.exp(-e))*(1-o)),t*a.pulseNormalize}function C(e){return e>=1?1:e<=0?0:(1==a.pulseNormalize&&(a.pulseNormalize/=T(1)),T(e))}var z=/chrome/i.test(window.navigator.userAgent),A=null;"onwheel"in document.createElement("div")?A="wheel":"onmousewheel"in document.createElement("div")&&(A="mousewheel"),A&&z&&(S(A,function(t){i||d();var o=t.target,r=x(o);if(!r||t.defaultPrevented||D(e,"embed")||D(o,"embed")&&/\.pdf/i.test(o.src))return!0;var n=t.wheelDeltaX||0,l=t.wheelDeltaY||0;if(n||l||(l=t.wheelDelta||0),!a.touchpadSupport&&function(e){if(e)return e=Math.abs(e),c.push(e),c.shift(),clearTimeout(b),!(H(c[0],120)&&H(c[1],120)&&H(c[2],120))}(l))return!0;Math.abs(n)>1.2&&(n*=a.stepSize/120),Math.abs(l)>1.2&&(l*=a.stepSize/120),p(r,-n,-l),t.preventDefault()}),S("mousedown",function(t){e=t.target}),S("load",d))}();

var mainObj = {
	vormerken :  				{ serien: [], name: "vormerken", farbe: "#8dc4ea", iconClass: "far fa-bookmark", buttonText: "Merken" },
	bekannt   :			{ serien: [], name: "bekannt", farbe: "#008b8b", iconClass: "fas fa-child", buttonText: "Bekannt" },
	angefangen :		{ serien: [], name: "angefangen", farbe: "#ffff00", iconClass: "fas fa-eye", buttonText: "Angefangen" },
	vollendet :		{ serien: [], name: "vollendet", farbe: "#00ff00", iconClass: "far fa-smile", buttonText: "Vollendet" },
	aufNaechsteFolgeWarten :  { serien: [], name: "aufNaechsteFolgeWarten", farbe: "#8fbc8f", iconClass: "far fa-clock", buttonText: "Auf nächste Folge warten" },
	abgebrochen  : 			{ serien: [], name: "abgebrochen", farbe: "orange", iconClass: "far fa-stop-circle", buttonText: "Abgebrochen" },
	trashSerie 	 :			{ serien: [], name: "trashSerie", farbe: "red", iconClass: "fa fa-trash-alt", buttonText: "Uninteressant" },
};

var contextMenuLinks = function() {
	var ret = "";
	$.each(mainObj, function(i, item) {
		ret += "<li class='"+ item.name +"'><i class='"+ item.iconClass +"'></i>&nbsp;"+ item.buttonText +"</li>";
	});
	return ret +
	"<li>-----------------------------------------</li>" +
    "<li class='customMenuRemoveItem'><i class='fas fa-minus-circle'></i>&nbsp;Auswahl entfernen</li>";
};

$(document).ready(function() {
    initContextMenu();
    init();
});

function GM_saveValue(key, value)
{
    if (key === "customMenuRemoveItem" || key === "") return;

    value = value.replace(",", "");
    value = value.replace("'", "");

    var GmArr = GM_getValue(key);

    if (GmArr === undefined) {
        GM_setValue(key, value);
        init();
    } else {
        //Unter diesem Key existieren bereits Werte
        var tmpArr = GmArr.split(',');

        for(let i in tmpArr) {
            if (tmpArr[i] === value) {
                alert("Fehler: Die Serie ist bereits in der Kategorie enthalten!");
                return true;    //Wert bereits vorhanden
            }
        }

        GM_setValue(key, (GM_getValue(key) + "," + value));
        init();
    }
}

function clearGM_Storage()
{
	$.each(mainObj, function(i, item) {
		GM_deleteValue(item.name);
	});
}

function removeFromGM_Storage(value)
{
    $.each(mainObj, function(i, item) {
        if (GM_getValue(item.name) !== undefined) {

            var index = item.serien.indexOf(value);
            if (index !== -1) {
                item.serien.splice(index, 1);
                if (item.serien.length) {
                    GM_setValue(item.name, item.serien.toString());
                } else {
                    GM_deleteValue(item.name);
                }
            }
        }
    });
    init();
}

function outputGM_Storage()
{
    $.each(mainObj, function(i, serienObj) {
        console.log(serienObj.name);
        console.log(serienObj.serien);
    });
}

function initStorage()
{
    //clearGM_Storage();

	$.each(mainObj, function(i, item) {
		item.serien = initArrayWithGMStorage(item.name);
	});
}

function initArrayWithGMStorage(key)
{
    if (GM_getValue(key) !== undefined) {
        return GM_getValue(key).split(",");
    }
}

function initContextMenu()
{
    $("div.genre > ul > li").each(function(i, obj) {

        $(this).addClass("contextMenuParent");

        $(this).contextmenu(function(e) {
            e.preventDefault();

            $(".contextMenuContainer").remove();

            $(this).append("<div class='contextMenuContainer'><ul class='contextMenu'>" + contextMenuLinks() + "</ul><div class='contextMenuClose'><i class='fas fa-times'></i></div></div>");

            $.each(mainObj, function(i, item) {
                $("."+ item.name).css("background", item.farbe);
            });

            // Calculate the offset coordinates and set CSS rules
            var off = $(this).offset();
            var scrollTop = $(window).scrollTop();

            $(this).find(".contextMenuContainer").css({
                'position': 'fixed',
                'left': off.left + 'px',
                'top': (off.top + $(this).outerHeight() - scrollTop) + 'px'
            });
        });
    });
}

function init()
{
    initStorage();

    outputGM_Storage();

    //Kommas aus title entfernen + Hintergrund weiß machen + HTML 'restoren' (ohne Komma)
    $("div.genre > ul > li > a").each(function(j, obj) {
        var newTitle = $(this).attr("title").replace(",","");
        newTitle = newTitle.replace("'", "");
        $(this).attr("title", newTitle);
		$(this).html(newTitle); //ToDo: auslagern um originale Serientitel nicht zu verändern
        $(this).css("background", "white");
    });

    //Serien einfärben
	$.each(mainObj, function(i, serienObj) {
		$.each(serienObj.serien, function(i, serie) {
			$("div.genre > ul > li > a[title='"+ serie +"']").each(function(j, obj) {
				$(obj).css("background", serienObj.farbe);
				$(obj).html("&nbsp;<i class='"+ serienObj.iconClass +"'></i>&nbsp;" + $(obj).html());
			});
		});
	});
}

$(document).on("click", ".contextMenuContainer div.contextMenuClose", function() {
    $(".contextMenuContainer").remove();
});

$(document).on("click", ".contextMenu li.customMenuRemoveItem", function() {
    var title = $(this).closest(".contextMenuParent").find("a").attr("title");

    removeFromGM_Storage(title);

    $(".contextMenuContainer").remove();
});

// Move the menu with window scroll
$(window).on('scroll', function(){
    if($(".contextMenuContainer").length) {
        var $elem = $(".contextMenuContainer").parents(".contextMenuParent");
        var off = $elem.offset();
        var scrollTop = $(window).scrollTop();
        $(".contextMenuContainer").css('top', (off.top + $elem.outerHeight() - scrollTop) + 'px');
    }
});

$(document).on("click", ".contextMenu li", function() {
    var key = $(this).attr("class");
    var title = $(this).closest(".contextMenuParent").find("a").attr("title");

    GM_saveValue(key, title);

    $(".contextMenuContainer").remove();
});