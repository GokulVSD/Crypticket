function storageFull() {

    $(".modal-body").html("Looks like your browser has either run out of storage or doesn't support local storage.\
     You can try deleting some Generators to make space,\
      or switch to a Chromium based browser such as Chrome or Firefox.\
       You can transfer data to another browser or factory reset using the 3-dot menu");

    $("#modal").modal("show");
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

        $(".modal-body").html("Looks like something went terribly wrong when trying to restore.\
         It's recommended to factory reset if the string you typed had any semicolons (like ';')");

        $("#modal").modal("show");

        return;
    }


    location.reload();
}

function resetState() {

    $(".modal-header h4").html('<i class="fas fa-exclamation-circle"></i> Warning!');
    $(".modal-body").html('Are you sure you want to factory reset? All your Cryptickets, Passwords, Generators and Verifiers will be permanently deleted\
    <div></div>\
    <div tabindex="0" class="bnr-btn nibnr" onclick="confirmedReset()"><i class="far fa-trash-alt"></i> Factory Reset</div>');

    $("#modal").modal("show");
}

function confirmedReset() {

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
    $(".modal-header h4").html('<i class="fas fa-exclamation-circle"></i> Oops!');
}

$('#modal').on('hide.bs.modal', function (e) {
    setTimeout(() => afterModalTransition(this), 200);
});

$('#modal').modal("show");
$('#modal').modal("hide");

