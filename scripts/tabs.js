$("#tickets-tb").css({
    "display": "none",
    "opacity": 0
});

$("#tickets-tb").slideDown(250,function() {
    $(this).animate({"opacity": 1},100);
});

function viewTicketsTab(){
    if ($(".tabs span").hasClass("select-last-child")) {
        $(".tabs span").removeClass("select-last-child");
        $(".tabs span:last-child").css("color","#999");
        $(".tabs span:first-child").css("color","#555");

        // $("#tickets-tb").addClass("current-tab");
        // $("#passwords-tb").removeClass("current-tab");

        $("#passwords-tb").animate({ "opacity": 0 },100, function () {
            $("#passwords-tb").slideUp(250), function(){
                $("#passwords-tb").css({"display": "block", "height": "1px"});
            };
        });

        $("#tickets-tb").css({
            "display": "none",
            "opacity": 0
        });

        $("#tickets-tb").slideDown(250,function() {
            $(this).animate({"opacity": 1},100);
        });

        $("#ticket-tab-slider").animate({"margin-left": "0"});
    }
}

function viewPasswordsTab() {
    if (!$(".tabs span").hasClass("select-last-child")) {
        $(".tabs span").addClass("select-last-child");
        $(".tabs span:first-child").css("color","#999");
        $(".tabs span:last-child").css("color","#555");

        //$("#passwords-tb").addClass("current-tab");
        //$("#tickets-tb").removeClass("current-tab");

        $("#tickets-tb").animate({ "opacity": 0 },100, function () {
            $("#tickets-tb").slideUp(250), function(){
                $("#tickets-tb").css({"display": "block", "height": "1px"});
            };
        });

        $("#passwords-tb").css({
            "display": "none",
            "opacity": 0
        });

        $("#passwords-tb").slideDown(250,function() {
            $(this).animate({"opacity": 1},100);
        });

        $("#ticket-tab-slider").animate({"margin-left": "-100%"});
    }
}