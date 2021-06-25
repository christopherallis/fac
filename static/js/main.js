$(document).ready(() => {

    $window = $(window)

    let lastPos = 0;
    let lowestPos = 0;
    function fixScroll() {
        let scrollPos = $window.scrollTop();
        navbar = $('nav');
        
        let delta = scrollPos-lastPos
        lastPos = scrollPos

        if (delta > 0) {
            lowestPos = scrollPos
        }

        if (scrollPos > 200) {
            navbar.addClass('float');
        } else {
            navbar.removeClass('float');
        }
        
        if (scrollPos > 150) {
            if (lowestPos-scrollPos <= 100) navbar.addClass('hide');
            else navbar.removeClass('hide');
        } else {
            navbar.removeClass('hide');
        }
    }
    $window.scroll(fixScroll);
    fixScroll();

    $(".menu-button").click(() => {  
        $(".nav-container").toggleClass("open");
        //$(".menu-button i").toggleClass("fa-bars").toggleClass("fa-times");
    });
    $(".close-button").click(() => {  
        $(".nav-container").removeClass("open");
        //$(".menu-button i").toggleClass("fa-bars").toggleClass("fa-times");
    });

    $window.on('resize', () => {
        if ($window.width() >= 600)
            $(".nav-container").removeClass("open");
    })
});