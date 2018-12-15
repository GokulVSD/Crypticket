$("#passwords-tb").slideUp(0);

function viewTicketsTab(){
    if ($(".tabs span").hasClass("select-last-child")) {
        $(".tabs span").removeClass("select-last-child");
        $(".tabs span:last-child").css("color","#999");
        $(".tabs span:first-child").css("color","#555");

        $("#passwords-tb").animate({ "opacity": 0 },200);
        
        $("#passwords-tb").slideUp(200);

        $("#tickets-tb").css({
            "display": "none",
            "opacity": 0
        });

        $("#tickets-tb").animate({"opacity": 1},200);

        $("#tickets-tb").slideDown(200);

        $("#ticket-tab-slider").animate({"margin-left": "0"});
    }
}

function viewPasswordsTab() {
    if (!$(".tabs span").hasClass("select-last-child")) {
        $(".tabs span").addClass("select-last-child");
        $(".tabs span:first-child").css("color","#999");
        $(".tabs span:last-child").css("color","#555");

        $("#tickets-tb").animate({ "opacity": 0 },200, function () {
        });

        $("#tickets-tb").slideUp(200);

        $("#passwords-tb").css({
            "display": "none",
            "opacity": 0
        });

        $("#passwords-tb").animate({"opacity": 1},200);

        $("#passwords-tb").slideDown(200);

        $("#ticket-tab-slider").animate({"margin-left": "-100%"});
    }
}