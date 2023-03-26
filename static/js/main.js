$(function() {

    $body = $("body")
    $("#menu-toggle").click(function(){
        $body.toggleClass("menu-open")
        updateMenuBar()
        if ($body.hasClass("menu-open")) {
            $("#menu-toggle").html("close")
        } else {
            $("#menu-toggle").html("menu")
        }
    })

    $(".sublist").each(function(i) {
       let $this = $(this)
        $this.find("div").click(function() {
            $this.toggleClass("show")
        })
    })


    // auto hide of menu
    let $window = $(window)
    let $nav = $("header")
    let oh = 0
    let dir = 0
    function updateMenuBar() {
        let nh = $window.scrollTop()
        if (nh > 80) {
            if (nh-oh > 0) {
                oh = nh
                $nav.addClass("hide")
                $nav.removeClass("show")
            } else if (nh-oh < -80) {
                oh = nh
                $nav.addClass("show")
                $nav.removeClass("hide")
            }
        } else {
            $nav.removeClass("hide")
            $nav.removeClass("show")
        }
    }
    $window.scroll(updateMenuBar)

    // slideshow
    let allSlides = $(".slideshow .slide-image")
    let allSlideContent = $(".slideshow .slide-info")
    let index = 0
    function changeTo(ind) {
        let l = allSlides.length-1
        index = ind < 0 ? l : (ind > l ? 0 : ind)
        for (let i = 0; i < allSlides.length; i++) {
            if (i == index) {
                $(allSlides[i]).addClass("visible")
                $(allSlideContent[i]).addClass("visible")
            } else {
                $(allSlides[i]).removeClass("visible")
                $(allSlideContent[i]).removeClass("visible")
            }
        }
    }

    $(".slideshow .btn-right").click(function() {
        changeTo(index+1)
    })
    $(".slideshow .btn-left").click(function() {
        changeTo(index-1)
    })

})