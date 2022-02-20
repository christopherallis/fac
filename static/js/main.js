$(function() {

    $("#menu-toggle").click(function(){
        $("body").toggleClass("menu-open")
        if ($("body").hasClass("menu-open")) {
            $("#menu-toggle").html("close")
        } else {
            $("#menu-toggle").html("menu")
        }
    })

})