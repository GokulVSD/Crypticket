function storageFull() {
    //convert this to a modal
    console.log("localStorage is full");
}

function retrieveObject(key) { return; //testing

    var storage = window.localStorage;

    var obj = JSON.parse(storage.getItem(key));

    if(obj === null)
        return [];

    return obj;
}

function storeObject(key, obj) { return; //testing

    var storage = window.localStorage;

    try{

        storage.setItem(key, JSON.stringify(obj));

    } catch(e) {
        storageFull();
    }
}