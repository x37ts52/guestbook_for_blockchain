# guestbook_for_blockchain

## Wissenswertes vom Autor

Weiteres vom Autor x37ts52 zum Thema **Blockchain** auf [dev.to](https://dev.to/x37ts52)
<br>
<br>

## Index:

0. Vorwort
1. Was muss ich an Vorkenntnisse mitbringen?
2. Betriebssystem vorbereiten (Ubuntu & Windows 10)
3. Repository herunterladen und konfigurieren
4. Eine Testumgebung mit ganache aufbauen
5. ganache verwenden
6. Smart Contract in die Blockchain speichern/anhängen
7. Smart Contract mit der lokalen JSON des Smart Contract verbinden
8. MetaMask mit ganache verbinden und Account von Ganache entnehmen
9. WebDApp starten
10. Schlusswort
<br>

## 0 - Vorwort:

Diese WebDApp wurde als DemoObjekt entwickelt. Es wurde bewusst ein **Gästebuch** als Idee gewählt. Da ein Gästebuch Parameter in eine Datenbank schreiben sowie lesen muss. Die Datenbank wird in diesem Programm durch eine Blockchain mit ethereum Protokoll ersetzt, was für diese WebDapp die Software [ganache](https://truffleframework.com/ganache) (TestUmgebung) übernimmt. Auch sollte durch die GästebuchIdee der Smart Contract, der die Business Logic stellt/verwendet, einfach gehalten werden.

Der Smart Contract wird via [truffle](https://truffleframework.com/truffle) (Framework) in die ethereum Blockchain (Ganache) gespeichert/angehangen. Die WebDapp wurde wiederum so programmiert, dass via MetaMask ein ethereum Account abgefragt und eingebunden wird, welcher als schreibender/bezahlender Account dient.

**Allen wichtigen CodeDateien habe ich mit Kommentaren versehen. Ich hoffe, diese sind für sich selbsterklärend.**

*Zur Erinnerung:* Lesen aus der Blockchain ist umsonst und schreiben in die Blockchain kostet Coins (Fee).
<br>
<br>

**Download:** [Präsentation](https://github.com/x37ts52/guestbook_for_blockchain/blob/master/praesentation/20190315_Blockchain_Development.pdf)
<br>
<br>

## 1 - Was muss ich an Vorkenntnisse mitbringen?

+ HTML/CSS
+ JavaScript
+ node.js
<br>

## 2 - Betriebssystem vorbereiten

### Ubuntu (18.04.2 LTS)

**Benötigte Software**

node.js (10.15.3 LTS)
```
sudo snap install node --channel=10/stable --classic
```
<br>

**NPM Rechte-/Zugriffsfehler reparieren**

Dem Link und der Anweisung folgen. Danach am Ende das System einmal neustarten!

[Resolving EACCES permissions errors when installing packages globally](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally)
<br>
<br>

**Benötigte APT Packages**

Alle APT Installationen müssen im Terminal ausgeführt werden!

APT Packages auf den neuesten Stand bringen
```
sudo apt update
```

```
sudo apt upgrade
```

git
```
sudo apt install -y git
```

Ein Toolset, welches viele notwendige Packages beinhaltet
```
sudo apt install -y build-essential
```

Python 2
```
sudo apt install -y python
```
<br>

**Benötigte NPM Packages (global)**

Alle globalen NPM Installationen müssen im Terminal ausgeführt werden!

truffle (Framework)
```
npm install -g truffle
```

lite-server
```
npm install -g lite-server
```

browser-sync (Konfigurationstool für Lite-Server)
```
npm install -g browser-sync
```
<br>

### Window 10

**Benötigte Software**

[node.js (10.15.3 LTS)](https://nodejs.org/download/release/v10.15.3/)

[git](https://git-scm.com/)

[Python (2.7.16)](https://www.python.org/downloads/release/python-2716/)

[Microsoft Build Tool 2015](https://www.microsoft.com/de-de/download/details.aspx?id=48159)
<br>
<br>

**Benötigte NPM Packages (global)**

Installation muss in der Windows PowerShell (oder Eingabeaufforderung) mit Admin-Rechten ausgeführt werden!

windows-build-tools
```
npm install --global --production windows-build-tools
```
<br>
<br>
Installation muss in der Windows PowerShell (oder Eingabeaufforderung) *ohne* Admin-Rechten ausgeführt werden!

truffle (Framework)
```
npm install -g truffle
```

lite-server
```
npm install -g lite-server
```

browser-sync (Konfigurationstool für Lite-Server)
```
npm install -g browser-sync
```
<br>

## 3 - Repository herunterladen und konfigurieren

Das Repository von gitHub herunterladen und in ein beliebiges Verzeichnis speichern.

Eine Konfiguration, an irgendwelchen Dateien, muss *noch nicht* vorgenommen werden.
<br>
<br>

## 4 - Eine Testumgebung mit ganache aufbauen

### Ubuntu (18.04.2 LTS)

**Benötigte Software**

[ganache](https://truffleframework.com/ganache)
<br>
<br>

**Installation**

Die Testumgebung wird als AppImage heruntergeladen. Diese Datei in ein Verzeichnis abspeichern, wo diese persistent für immer bleiben soll. Mit der rechten Maustaste auf *Properties* klicken. Es öffent sich ein neues Fenster. Dort auf den Tab *Permissions* klicken. Unter dem Optionspunkt *Execute* ein Häckchen bei *Allow executing file as program* und Fenster schließen. Doppelklick dann auf das AppImage von ganache und es wird installiert.
<br>
<br>

### Windows 10

**Benötigte Software**

[ganache](https://truffleframework.com/ganache)
<br>
<br>

## 5 - ganache verwenden

### Ubuntu (18.04.2 LTS) & Windows

Ganache starten. Es öffnet sich ein Willkommensbildschirm. Dort wird *quickstart* ausgewählt. Die Testumgebung läuft.

Für weitere Informationen rund um [ganache](https://truffleframework.com/ganache) bitte auf der Entwicklerseite nachschauen.

![terminal](https://github.com/x37ts52/guestbook_for_blockchain/blob/master/readmeImage/ganache_001.png)

![terminal](https://github.com/x37ts52/guestbook_for_blockchain/blob/master/readmeImage/ganache_002.png)

1. Blockarchiv
2. Server-URL
3. AccountAdress
4. PrivateKey
<br>

## 6 - Smart Contract in die Blockchain speichern/anhängen

### Ubuntu (18.04.2 LTS) & Windows

Ein/e Terminal/Windows PowerShell öffnen und in das Verzeichnis *guestbook_for_blockchain* wechseln.

Dort wird folgender Befehl ausgeführt:
```
truffle migrate --reset
```
Mit dem Befehl deployen wir den Smart Contract des Gästebuchs in die Blockchain. Das *--reset* am Ende des Befehls sorgt dafür, dass der Smart Contract vorab frisch kompiliert wird.

Achtung! Sollte man die Eingabeaufforderung unter Windows 10 verwendet werden, dann lautet der Befehl folgender:
```
truffle.cmd migrate --reset
```

Nach dem Deployen gibt truffle einige Informationsparameter aus. An der markierten Stelle kann man die *ContractAddress* des Smart Contracts entnehmen.

![terminal](https://github.com/x37ts52/guestbook_for_blockchain/blob/master/readmeImage/deploy_001.png)
<br>
<br>

## 7 - Smart Contract aus der Blockhain mit der lokalen JSON des Smart Contracts verbinden

In einer IDE die Datei *app.js* (./www/resources/js) öffnen und bei der Funktion *initContract()* die *ContracAddress* vom deployeten Smart Contract eingeben.

![smartcontractInApp](https://github.com/x37ts52/guestbook_for_blockchain/blob/master/readmeImage/smartcontract_001.png)
<br>
<br>

## 8 - MetaMask mit ganache verbinden und Account von Ganache entnehmen

**Benötigte Software**

[MetaMask](https://metamask.io/)

Das BrowserWallet herunterladen und installieren.
<br>
<br>

**Account von ganache in MetaMask einbinden**

![metamasK002](https://github.com/x37ts52/guestbook_for_blockchain/blob/master/readmeImage/metamask_002.png)

![metamasK003](https://github.com/x37ts52/guestbook_for_blockchain/blob/master/readmeImage/metamask_003.png)

![metamasK004](https://github.com/x37ts52/guestbook_for_blockchain/blob/master/readmeImage/metamask_004.png)

![metamasK005](https://github.com/x37ts52/guestbook_for_blockchain/blob/master/readmeImage/metamask_005.png)

![metamasK006](https://github.com/x37ts52/guestbook_for_blockchain/blob/master/readmeImage/metamask_006.png)

![metamasK007](https://github.com/x37ts52/guestbook_for_blockchain/blob/master/readmeImage/metamask_007.png)
<br>
<br>

## 9 - WebDApp starten

Ein/e Terminal/Windows PowerShell öffnen und in das Verzeichnis *guestbook_for_blockchain* wechseln.

Dort wird folgender Befehl ausgeführt:
```
npm run dev
```

Es öffnet sich ein Browser und man wird aufgefordert sich bei MetaMask einzuloggen sowie die WebDApp zu validieren. MetaMask fragt die Valdierung ab, damit die WebDApp als vertrauenswürdig angesehen werden und man mit dieser, mit seinem Wallet, interagieren kann.

![metamasK001](https://github.com/x37ts52/guestbook_for_blockchain/blob/master/readmeImage/metamask_001.png)

**Es kann sein, dass man den Browser danach einmal refreshen muss, wenn nicht sofort die Eingabe ins Formularfeld klappt. Danach funktioniert die WebDApp einwandfrei.**
<br>
<br>

## 10 - Schlusswort

Fühlt Euch frei diese WebDApp zu testen oder zu verändern. Ich hoffe, ich konnte Euch einen einen kleinen Einblick geben, wie man eine WebDApp aufbauen könnte. Solltet Ihr Fehler gefunden oder Anregungen haben, schreibt mir einfach :-)
