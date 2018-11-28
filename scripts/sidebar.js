$('#sidebarCollapse').click(function() {

    $("#wrapper").toggleClass("toggled");
    $(this).toggleClass("active");
});

function viewTicketsPg(){
    $("#create-pg").css("display", "none");
    $("#create-pg-button").removeClass("toggle-engaged");
    $("#verify-pg").css("display", "none");
    $("#verify-pg-button").removeClass("toggle-engaged");
    $("#tickets-pg").css("display", "block");
    $("#tickets-pg-button").addClass("toggle-engaged");
}

function viewCreatePg(){
    $("#tickets-pg").css("display", "none");
    $("#tickets-pg-button").removeClass("toggle-engaged");
    $("#verify-pg").css("display", "none");
    $("#verify-pg-button").removeClass("toggle-engaged");
    $("#create-pg").css("display", "block");
    $("#create-pg-button").addClass("toggle-engaged");
}

function viewVerifyPg(){
    $("#tickets-pg").css("display", "none");
    $("#tickets-pg-button").removeClass("toggle-engaged");
    $("#create-pg").css("display", "none");
    $("#create-pg-button").removeClass("toggle-engaged");
    $("#verify-pg").css("display", "block");
    $("#verify-pg-button").addClass("toggle-engaged");
}