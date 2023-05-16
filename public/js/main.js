$(document).ready(function(){

    //CREATING A VARIABLE
    $nav = $('.nav');
    $toggleCollapse = $('.toggle-collapse');

    //CLICK EVENT ON TOGGLE MENU 
    $toggleCollapse.click(function(){
        $nav.toggleClass('collapse');
    });

    // WE HAVE TO CALL THE CAROUSEL FUNCTION SO IT WILL NOT DISAPPEAR , SO WE HAVE TO CALL THE OWN CAROUSEL FUNCTION
    $('.owl-carousel').owlCarousel({
        loop:true,
        autoplay:true,
        autoplayTimeout:4000,
        smartSpeed:1200,
        dots:false,
        nav:true,
        navText: [$('.owl-navigation .owl-nav-prev'),$('.owl-navigation .owl-nav-next')]    

    });
});