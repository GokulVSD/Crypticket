var disableScroll = false;

$('#sidebarCollapse').click(function() {

    $("#wrapper").toggleClass("toggled");
    $(this).toggleClass("active");
    disableScroll = !disableScroll;
});

$('#wrapper').on("touchmove", function(e){
	
	if(disableScroll)
		e.preventDefault();
});