// ==UserScript==
// @name         Burning Series A
// @namespace    http://bs.to/
// @version      2.0
// @description  Markiert vollständig angeschaute und angefangene Serien auf Burning Series. Man muss diese jedoch händisch in die Listen eintragen.
// @author       Eduard Fekete
// @match        https://bs.to/andere-serien
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// ==/UserScript==

GM_addStyle('.contextMenuParent { position: relative;  }');
GM_addStyle('.contextMenuContainer { position: absolute; background: gray; z-index: 100; -webkit-box-shadow: 10px 10px 31px -1px rgba(0,0,0,0.75);-moz-box-shadow: 10px 10px 31px -1px rgba(0,0,0,0.75);box-shadow: 5px 5px 15px -1px rgba(0,0,0,0.75);}');
GM_addStyle('.contextMenu { display: grid; padding: 4px; width: 200px; border: 1px solid black;  color: black; }');
GM_addStyle('.contextMenu li { border-bottom: 1px solid gray; }');
GM_addStyle('.contextMenu li:hover { cursor: pointer; color: red; }');
GM_addStyle('.contextMenuClose { position: absolute; top: 5px; right: 15px; color: red; }');
GM_addStyle('.contextMenuClose:hover { cursor: pointer; }');

var vormerken = [];

//Serien bei der man schonmal ein paar Folgen gesehen hat,
//aber vieles vergessen hat weil es lang her war z.B. in der Kindheit.
//z.B. Trickfilme
var bekannt = [];
var angefangen = [];
var vollendet = [];

//Serien die man komplett gesehen hat, aber auf die Fortsetzung warte
var aufNaechsteFolgeWarten = [];

//Abgebrochen weil die Serie uninteressant ist
var abgebrochen = [];
//Abgebrochen, aber Serie bekommt eventuell nochmal eine chance
//var abgebrochenChance = [];

var vorgemerktFarbe = "#8dc4ea";    //blau
var angefangenFarbe = "#ffff00";    //gelb
var vollendetFarbe = "#00ff00";     //grün
var bekanntFarbe = "#008b8b";       //darkcyan
var fortsetzungFarbe = "#8fbc8f";   //darkseagreen
var abgebrochenFarbe = "red";
//var abgebrochenChanceFarbe = "orange";

var contextMenuLinks =
    "<li class='vormerken'>Vormerken</li>"+
    "<li class='bekannt'>Bekannt</li>" +
    "<li class='angefangen'>Angefangen</li>" +
    "<li class='vollendet'>Vollendet</li>" +
    "<li class='aufNaechsteFolgeWarten'>Auf nächste Folge warten</li>" +
    "<li class='abgebrochen'>Abgebrochen</li>" +
    "<li>-----------------------------------------</li>" +
    "<li class='customMenuRemoveItem'>Auswahl entfernen</li>";

$(document).ready(function() {

    $("div.genre > ul > li").each(function(i, obj) {

        $(this).addClass("contextMenuParent");

        $(this).contextmenu(function(e) {
            e.preventDefault();

            $(".contextMenuContainer").remove();

            $(this).append("<div class='contextMenuContainer'><ul class='contextMenu'>" + contextMenuLinks + "</ul><div class='contextMenuClose'>X</div></div>");

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

    init();
});

function GM_saveValue(key, value)
{
    if (key === "customMenuRemoveItem" || key === "") return;

    value = value.replace(",", "");

    if (GM_getValue(key) === undefined) {

        GM_setValue(key, value);
        init();

    } else if (GM_getValue(key).indexOf(value) == -1) {

        GM_setValue(key, (GM_getValue(key) + "," + value));
        init();

    } else {
        alert("Bereits vorhanden!");
    }
}

keys = ["vormerken", "bekannt", "angefangen", "vollendet", "aufNaechsteFolgeWarten", "abgebrochen"];

function clearGM_Storage()
{
    GM_deleteValue("vormerken");
    GM_deleteValue("bekannt");
    GM_deleteValue("angefangen");
    GM_deleteValue("vollendet");
    GM_deleteValue("aufNaechsteFolgeWarten");
    GM_deleteValue("abgebrochen");
}

function removeFromGM_Storage(value)
{
    var tmpArr = [];

    for(let i in keys) {
        if (GM_getValue(keys[i]) !== undefined) {

            switch (keys[i]) {
                case "vormerken":
                    tmpArr = vormerken;
                    break;
                case "bekannt":
                    tmpArr = bekannt;
                    break;
                case "angefangen":
                    tmpArr = angefangen;
                    break;
                case "vollendet":
                    tmpArr = vollendet;
                    break;
                case "aufNaechsteFolgeWarten":
                    tmpArr = aufNaechsteFolgeWarten;
                    break;
                case "abgebrochen":
                    tmpArr = abgebrochen;
                    break;
            }

            var index = tmpArr.indexOf(value);
            if (index !== -1) {
                tmpArr.splice(index, 1);
                if (tmpArr.length) {
                    GM_setValue(keys[i], tmpArr.toString());
                } else {
                    GM_deleteValue(keys[i]);
                }
            }
        }
    }
    init();
}

function initArrayWithGMStorage(key)
{
    if (GM_getValue(key) !== undefined) {
        return GM_getValue(key).split(",");
    }
}

function initStorage()
{
    //clearGM_Storage();

    vormerken = initArrayWithGMStorage("vormerken");
    bekannt = initArrayWithGMStorage("bekannt");
    angefangen = initArrayWithGMStorage("angefangen");
    vollendet = initArrayWithGMStorage("vollendet");
    aufNaechsteFolgeWarten = initArrayWithGMStorage("aufNaechsteFolgeWarten");
    abgebrochen = initArrayWithGMStorage("abgebrochen");
}

function outputGM_Storage()
{
    console.log("abgebrochen");
    console.log(abgebrochen);

    console.log("vormerken");
    console.log(vormerken);

    console.log("bekannt");
    console.log(bekannt);

    console.log("angefangen");
    console.log(angefangen);

    console.log("vollendet");
    console.log(vollendet);

    console.log("aufNaechsteFolgeWarten");
    console.log(aufNaechsteFolgeWarten);
}

function init()
{
    initStorage();

    outputGM_Storage();

    //Kommas aus title entfernen
    $("div.genre > ul > li > a").each(function(j, obj) {
        var newTitle = $(this).attr("title").replace(",","");
        $(this).attr("title", newTitle);
        $(this).css("background", "white");
    });

    $.each(abgebrochen, function(i, item) {
        $("div.genre > ul > li > a[title='"+ item +"']").each(function(j, obj) {
            $(obj).css("background", abgebrochenFarbe);
        });
    });
    /*$.each(abgebrochenChance, function(i, item) {
        $("div.genre > ul > li > a[title='"+ item +"']").each(function(j, obj) {
            $(obj).css("background", abgebrochenChanceFarbe);
        });
    });*/

    $.each(vormerken, function(i, item) {
        $("div.genre > ul > li > a[title='"+ item +"']").each(function(j, obj) {
            $(obj).css("background", vorgemerktFarbe);
        });
    });

    $.each(bekannt, function(i, item) {
        $("div.genre > ul > li > a[title='"+ item +"']").each(function(j, obj) {
            $(obj).css("background", bekanntFarbe);
        });
    });

    $.each(angefangen, function(i, item) {
        $("div.genre > ul > li > a[title='"+ item +"']").each(function(j, obj) {
            $(obj).css("background", angefangenFarbe);
        });
    });

    $.each(vollendet, function(i, item) {
        $("div.genre > ul > li > a[title='"+ item +"']").each(function(j, obj) {
            $(obj).css("background", vollendetFarbe);
        });
    });

    $.each(aufNaechsteFolgeWarten, function(i, item) {
        $("div.genre > ul > li > a[title='"+ item +"']").each(function(j, obj) {
            $(obj).css("background", fortsetzungFarbe);
        });
    });
}