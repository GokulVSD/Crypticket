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

    var storage = window.localStorage;

    var tickets = storage.getItem("tickets");
    var passwords = storage.getItem("passwords");
    var generators = storage.getItem("generators");
    var verifiers = storage.getItem("verifiers");

    var backup = btoa(tickets) + ";" + btoa(passwords) + ";" + btoa(generators) + ";" + btoa(verifiers);

    navigator.clipboard.writeText(backup);
}

function restoreStateFromString(str) {

    var items;

    try {

        items = str.split(";");

        if (items.length != 4) throw "Invalid length " + items.length;

        var storage = window.localStorage;

        storage.setItem("tickets", atob(items[0]));
        storage.setItem("passwords", atob(items[1]));
        storage.setItem("generators", atob(items[2]));
        storage.setItem("verifiers", atob(items[3]));

    } catch (e) {

        console.log("Invalid backup string: " + e);
        
        //display an error modal, prompt if they want to reset

        return;
    }

    //promt user if they wanna refresh via a modal

    location.reload();
}

function resetState() {
    //promt user if they are sure via a modal

    window.localStorage.clear();
    location.reload();
}

$("#restore-input").keypress(function (e) {

    if (e.keyCode == 13) {

        var str = $("#restore-input").val().trim();

        $("#restore-input").val("").blur();

        restoreStateFromString(str);
    }
});

function afterModalTransition(e) {
  e.setAttribute("style", "display: none !important;");
}

$('#modal').on('hide.bs.modal', function (e) {
	setTimeout( () => afterModalTransition(this), 200);
});

$('#modal').modal("show");
$('#modal').modal("hide");

