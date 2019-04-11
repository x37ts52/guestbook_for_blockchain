// Object (global): Parameter
let txObject = {};


async function initWeb3() {
    await console.log(`load: initWeb3`);

    // Promise: Ein Promisekonstrukt wurde nur gebaut, da es intern bei web3 einen spontanen
    // Versionswechsel gibt und es dadurch zu Fehlern kommt.
    // Dieser soll durch ein wartendes Promis abgefangen werden. Dadurch muss der web3 Inhalt
    // in einem Objekt zwischen gespeichert und somit weiter verwendet werden.
    // Notiz: Von 1.0.0 wird auf 0.20.3 gesprungen. Scheint ein BUG zu sein!
    await new Promise((resolve, reject) => {
        // Prüfen: Ist ein BrowserWallet verfügbar?
        window.addEventListener('load', async () => {
            if (window.ethereum) {
                // Einbinden: MetaMask (BrowserWallet)
                txObject.web3 = await new Web3(ethereum);
                
                try {
                    // Freischalten: Aktiver Account aus der BrowserWallet freigeben
                    await ethereum.enable();

                    // Einbinden: AccountHash wird aus der BrowserWallet entnohmen
                    txObject.account = await txObject.web3.eth.givenProvider.selectedAddress;
                    console.log(`AccountHash: ${ txObject.account }`)
                    resolve()
                } catch (error) {
                    console.error(error);
                    reject()
                }
            }
        });
    });

}


async function initContract() {
    await console.log(`load: initContract`);

    // Smart Contract JSON einladen und die ABI davon mit dem Contract in der Blockchain verknüpfen
    await $.getJSON('Guestbook.json', async (contract) => {
        txObject.contract = await new txObject.web3.eth.Contract(contract.abi, 'HIER DIE CONTRACT ADRESS EINGEBEN');
    });

}


async function initIndex() {
    await console.log(`load: initIndex`);

    // Einlesen: Listengröße (Arraygröße) aus der Blockchain holen
    txObject.postIndex = await txObject.contract.methods.countPostIndex().call();

}


async function render() {
    await console.log(`load: render`);

    // Schleife: Durchläuft das postIndex und gibt die Werte aus
    for (let index = 0; index < txObject.postIndex; index++) {
        // HTML-Ausgabe-CodeSnippet wird von der index,html geklont
        // Bei jedem Schleifendurchgang!
        let cloneOutputCon = await document.getElementById('outputConWrapper').cloneNode(true);
        cloneOutputCon.id = index;

        // Einlesen: Werte aus der Blockchain holen
        // Bei jedem Schleifendurchgang!
        let post = await txObject.contract.methods.getPosting(index).call();
        cloneOutputCon.getElementsByClassName('tableLName')[0].innerText = await post[0];
        cloneOutputCon.getElementsByClassName('tableRDate')[0].innerText = await `${post[2]}.${post[3]}.${post[4]} / ${post[5]}:${post[6]}`;
        cloneOutputCon.getElementsByClassName('tableCMessage')[0].innerText = await post[1];

        // CodeSnippet wird ins index.html eingefügt
        // Bei jedem Schleifendurchgang!
        document.getElementById('outputConWrapper').parentElement.appendChild(cloneOutputCon);
    }

}

// Ausführen: Funktionen in synchroner Reihenfolge ausführen
let execute = initWeb3().then(initContract).then(initIndex).then(render);
execute;



// Einlesen: HTML-Dateien beobachten und gesendete Werte übernehmen
async function push() {
    await console.log(`load: push`);

    // Einlesen: Variablen werden vom HTML-Dokument übernommen
    const inputName = document.getElementById('formInputName').value;
    const formInputMessage = document.getElementById('formInputMessage').value;
    const currentDate = new Date();

    // Ermitteln: Nonce (Aktuele Transactionposition des AccountHashs)
    txObject.nonce = await txObject.web3.eth.getTransactionCount(txObject.account);

    // Ermitteln: GasPrice wird vom CustomNetwork gelesen
    txObject.gasPrice = await txObject.web3.eth.getGasPrice();

    // Objekt: TransaktionsObjekt, welches in die Blockchain gepusht wird
    txPush = await {
        index: txObject.postIndex,
        name: inputName,
        post: formInputMessage,
        day: currentDate.getDate(),
        month: currentDate.getMonth() + 1,
        year: currentDate.getFullYear(),
        hour: currentDate.getUTCHours() + 2,
        minute: currentDate.getUTCMinutes()
    };

    // Ermitteln: GasLimit aus Transactionsparametern
    txObject.gasLimit = await txObject.contract.methods
        .setAll(
            txPush.index,
            txPush.name, txPush.post,
            txPush.day, txPush.month, txPush.year,
            txPush.hour, txPush.minute
        ).estimateGas();

    // Transaktion: In die Blockchain pushen
    await txObject.contract.methods
        .setAll(
            txPush.index,
            txPush.name, txPush.post,
            txPush.day, txPush.month, txPush.year,
            txPush.hour, txPush.minute
        ).send({
            from: txObject.account,         // Absender der Transaktion
            gasPrice: txObject.gasPrice,    // GasPrice
            gas: txObject.gasLimit          // GasLimit
        }, async (error, resolve) => {
            await console.log(error || resolve);
            
            // Reload: Nach der Transaktion Website neuladen
            await document.location.reload(true);
        });

}