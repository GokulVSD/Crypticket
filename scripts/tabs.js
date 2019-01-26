$("#passwords-tb").slideUp(0);

function viewTicketsTab() {
    if ($(".tabs span").hasClass("select-last-child")) {
        $(".tabs span").removeClass("select-last-child");
        $(".tabs span:last-child").css("color", "#999");
        $(".tabs span:first-child").css("color", "#555");

        $("#passwords-tb, #password-creater-tb").animate({ "opacity": 0 }, 200);

        $("#passwords-tb, #password-creater-tb").slideUp(200);

        $("#tickets-tb, #event-creater-tb").css({
            "display": "none",
            "opacity": 0
        });

        $("#tickets-tb, #event-creater-tb").animate({ "opacity": 1 }, 200);

        $("#tickets-tb, #event-creater-tb").slideDown(200);

        $("#ticket-tab-slider, #create-tab-slider").animate({ "margin-left": "0" });
    }
}

function viewPasswordsTab() {
    if (!$(".tabs span").hasClass("select-last-child")) {
        $(".tabs span").addClass("select-last-child");
        $(".tabs span:first-child").css("color", "#999");
        $(".tabs span:last-child").css("color", "#555");

        $("#tickets-tb, #event-creater-tb").animate({ "opacity": 0 }, 200);

        $("#tickets-tb, #event-creater-tb").slideUp(200);

        $("#passwords-tb, #password-creater-tb").css({
            "display": "none",
            "opacity": 0
        });

        $("#passwords-tb, #password-creater-tb").animate({ "opacity": 1 }, 200);

        $("#passwords-tb, #password-creater-tb").slideDown(200);

        $("#ticket-tab-slider, #create-tab-slider").animate({ "margin-left": "-100%" });
    }
}

function optionalTicketGenerator() {
    x = $("#optional-ticket-generator");
    if (!x.hasClass("xup")) {
        x.slideUp(200);
        x.addClass("xup");
    }
    else {
        x.slideDown(200);
        x.removeClass("xup");
    }
}

optionalTicketGenerator();

$(".creator-btn:eq( 0 )").keypress(function (e) {
    if (e.keyCode == 13) {
        optionalTicketGenerator();
    }
});

$(".creator-btn:eq( 1 )").keypress(function (e) {
    if (e.keyCode == 13) {
        newGenerator();
    }
});

$(".creator-btn:eq( 2 )").keypress(function (e) {
    if (e.keyCode == 13) {
        newPassGenerator();
    }
});

