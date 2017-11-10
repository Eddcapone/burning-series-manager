// ==UserScript==
// @name         Burning Series
// @namespace    http://bs.to/
// @version      1.0
// @description  Markiert vollständig angeschaute und angefangene Serien auf Burning Series. Man muss diese jedoch händisch in die Listen eintragen.
// @author       Eduard Fekete
// @match        https://bs.to/andere-serien
// @grant        none
// ==/UserScript==

//Es sind bereits einige Beispiel Einträge vorhanden

var vorgemerkt = [
];

//Serien bei der man schonmal ein paar Folgen gesehen hat,
//aber vieles vergessen hat weil es lang her war z.B. in der Kindheit.
var bekannt = [
];

var angefangen = [
];

var vollendet = [
    "Life on Mars (UK)",
    "Breaking Bad",
    "Vikings"
];

//Serien die man komplett gesehen hat, aber auf die Fortsetzung wartet
var fortsetzung = [
    "Vikings",
];

//Abgebrochen weil die Serie uninteressant ist
var abgebrochen = [
];
//Abgebrochen, aber Serie bekommt eventuell nochmal eine chance
var abgebrochenChance = [
];

var vorgemerktFarbe = "#8dc4ea";    //blau
var angefangenFarbe = "#ffff00";    //gelb
var vollendetFarbe = "#00ff00";     //grün
var bekanntFarbe = "#008b8b";       //darkcyan
var fortsetzungFarbe = "#8fbc8f";   //darkseagreen
var abgebrochenFarbe = "red";
var abgebrochenChanceFarbe = "orange";

$(document).ready(function() {

    $.each(abgebrochen, function(i, item) {
        $("div.genre > ul > li > a[title='"+ item +"']").each(function(j, obj) {
            $(obj).css("background", abgebrochenFarbe);
        });
    });
    $.each(abgebrochenChance, function(i, item) {
        $("div.genre > ul > li > a[title='"+ item +"']").each(function(j, obj) {
            $(obj).css("background", abgebrochenChanceFarbe);
        });
    });

    $.each(vorgemerkt, function(i, item) {
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

    $.each(fortsetzung, function(i, item) {
        $("div.genre > ul > li > a[title='"+ item +"']").each(function(j, obj) {
            $(obj).css("background", fortsetzungFarbe);
        });
    });


});
