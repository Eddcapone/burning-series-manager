# burning-series-manager
Fügt ein Kontext Menü hinzu, welches nach einem Rechtsklick auf eine Serie erscheint. Ermöglicht es die Serien in diverse Kategorien einzuordnen, z.B. kann eine Serie die man bereits vollständig angesehen hat, mit dem Label "abgeschlossen" versehen werden, woraufhin sie auf der Seite entsprechend markiert wird.

Neue Serien können über ein Kontextmenü das beim rechts klicken auf einer der Serien erscheint, hinzugefügt werden.

![alt text](https://raw.githubusercontent.com/Eddcapone/burning-series-manager/master/img/contextMenu.png)

## HowTo:

### Kategorien anpassen
Die Context Menü Kategorien können ganz einfach angepasst werden. Es können auch problemlos neue Kategorien hinzugefügt werden.
Hierzu fügt man dem Objekt `mainObj` einfach ein neues Objekt hinzu. Orientieren Sie sich einfach an den bereits vorhanden Objekten und nutzen Sie diese als Vorlage. In folgendem Beispiel wurde die neue Kategorie `langweilig` hinzugefügt.

Die iconClass kann durch eine beliebige Font-Awesome Klasse ersetzt werden.

```
var mainObj = {
	vormerken :  				{ serien: [], name: "vormerken", farbe: "#8dc4ea", iconClass: "far fa-bookmark", buttonText: "Merken" },
	bekannt   :			{ serien: [], name: "bekannt", farbe: "#008b8b", iconClass: "fas fa-child", buttonText: "Bekannt" },
	angefangen :		{ serien: [], name: "angefangen", farbe: "#ffff00", iconClass: "fas fa-eye", buttonText: "Angefangen" },
	vollendet :		{ serien: [], name: "vollendet", farbe: "#00ff00", iconClass: "far fa-smile", buttonText: "Vollendet" },
	aufNaechsteFolgeWarten :  { serien: [], name: "aufNaechsteFolgeWarten", farbe: "#8fbc8f", iconClass: "far fa-clock", buttonText: "Auf nächste Folge warten" },
	abgebrochen  : 			{ serien: [], name: "abgebrochen", farbe: "orange", iconClass: "far fa-stop-circle", buttonText: "Abgebrochen" },
	trashSerie 	 :			{ serien: [], name: "trashSerie", farbe: "red", iconClass: "fa fa-trash-alt", buttonText: "Uninteressant" },
	langweilig 	 :			{ serien: [], name: "langweilig", farbe: "purple", iconClass: "fa fa-trash", buttonText: "Langweilig" },
};
```

#### Ergebnis:

![alt text](https://raw.githubusercontent.com/Eddcapone/burning-series-manager/master/img/newButton.PNG)

## Credits:
[Balázs Varga](https://stackoverflow.com/users/2909109/bal%C3%A1zs-varga) for developing the context menu position logic.
