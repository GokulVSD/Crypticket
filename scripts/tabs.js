
function viewTicketsTab(){
    if ($(".tabs span").hasClass("select-last-child")) {
        $(".tabs span").removeClass("select-last-child");
        $(".tabs span:last-child").css("color","#999");
        $(".tabs span:first-child").css("color","#555");

        $("#tickets-tb").addClass("current-tab");
        $("#passwords-tb").removeClass("current-tab");

        $("#ticket-tab-slider").animate({"margin-left": "0"});
    }
}

function viewPasswordsTab() {
    if (!$(".tabs span").hasClass("select-last-child")) {
        $(".tabs span").addClass("select-last-child");
        $(".tabs span:first-child").css("color","#999");
        $(".tabs span:last-child").css("color","#555");

        $("#passwords-tb").addClass("current-tab");
        $("#tickets-tb").removeClass("current-tab");

        $("#ticket-tab-slider").animate({"margin-left": "-100%"});
    }
}