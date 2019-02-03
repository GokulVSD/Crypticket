$('#sidebarCollapse').click(function () {

    $("#wrapper").toggleClass("toggled");
    $(this).toggleClass("active");
});

$('.container.fragment-container').click(function () {

    $("#wrapper").removeClass("toggled");
    $('#sidebarCollapse').addClass("active");
});

function viewTicketsPg() {

    if ($("#create-pg").is(":visible")) {
        $("#create-pg").animate({ "opacity": 0 },100, function () {
            $("#create-pg").slideUp(250);
        });
    }

    if ($("#verify-pg").is(":visible")) {
        $("#verify-pg").animate({ "opacity": 0 },100, function () {
            $("#verify-pg").slideUp(250);
        });
    }

    if (!$("#tickets-pg").is(":visible")) {
        $("#tickets-pg").css({
            "display": "none",
            "opacity": 0
        });
        $("#tickets-pg").slideDown(250,function() {
            $(this).animate({"opacity": 1},100);
        });
    }

    $("#create-pg-button").removeClass("toggle-engaged");
    $("#verify-pg-button").removeClass("toggle-engaged");
    $("#tickets-pg-button").addClass("toggle-engaged");
}

function viewCreatePg() {


    if ($("#tickets-pg").is(":visible")) {
        $("#tickets-pg").animate({ "opacity": 0 },100, function () {
            $("#tickets-pg").slideUp(250);
        });
    }

    if ($("#verify-pg").is(":visible")) {
        $("#verify-pg").animate({ "opacity": 0 },100, function () {
            $("#verify-pg").slideUp(250);
        });
    }

    if (!$("#create-pg").is(":visible")) {

        $("#create-pg").css({
            "display": "none",
            "opacity": 0
        });
        $("#create-pg").slideDown(250,function() {
            $(this).animate({"opacity": 1},100);
        });
    }

    $("#tickets-pg-button").removeClass("toggle-engaged");
    $("#verify-pg-button").removeClass("toggle-engaged");
    $("#create-pg-button").addClass("toggle-engaged");
}

function viewVerifyPg() {

    if ($("#tickets-pg").is(":visible")) {
        $("#tickets-pg").animate({ "opacity": 0 },100, function () {
            $("#tickets-pg").slideUp(250);
        });
    }

    if ($("#create-pg").is(":visible")) {
        $("#create-pg").animate({ "opacity": 0 },100, function () {
            $("#create-pg").slideUp(250);
        });
    }

    if (!$("#verify-pg").is(":visible")) {
        $("#verify-pg").css({
            "display": "none",
            "opacity": 0
        });
        $("#verify-pg").slideDown(250,function() {
            $(this).animate({"opacity": 1},100);
        });
    }

    $("#tickets-pg-button").removeClass("toggle-engaged");
    $("#create-pg-button").removeClass("toggle-engaged");
    $("#verify-pg-button").addClass("toggle-engaged");
}