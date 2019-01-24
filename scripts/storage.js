function storageFull() {
    //convert this to a modal
    console.log("localStorage is full");
}

function retrieveObject(key) {

    var storage = window.localStorage;

    var obj = JSON.parse(storage.getItem(key));

    if (obj === null)
        return [];

    return obj;
}

function storeObject(key, obj) {

    var storage = window.localStorage;

    try {

        storage.setItem(key, JSON.stringify(obj));

    } catch (e) {
        storageFull();
    }
}

function getBackupString() {
    //generate a string to backup the state
}

function restoreStateFromString() {
    //parse string and restore state (reload the page after updating localStorage)
}

function resetState() {

}