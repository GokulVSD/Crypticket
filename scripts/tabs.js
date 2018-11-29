function viewTicketsTab(){
    if ($(".tabs span").hasClass("select-last-child")) {
        $(".tabs span").removeClass("select-last-child");
        $(".tabs span:last-child").css("color","#999");
        $(".tabs span:first-child").css("color","#555");
    }
}

function viewPasswordsTab() {
    if (!$(".tabs span").hasClass("select-last-child")) {
        $(".tabs span").addClass("select-last-child");
        $(".tabs span:first-child").css("color","#999");
        $(".tabs span:last-child").css("color","#555");
    }
}