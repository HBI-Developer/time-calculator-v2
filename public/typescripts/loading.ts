// This's File for loading page

import { currentTime, reset, setCurrentTime, times } from "./variables";

$(window).on('load', ():void => {

    // When Page is loading

    if (currentTime < 0 || currentTime >= times.length) {

        // If currentTime less than 0 or greater then or equals length og times array

        // Set 0 to currentTime variable

        setCurrentTime(0);
    }

    // Remove (active, disabled) classes From all item in list group times in navbar [on small screens]

    $("header .nav .offcanvas .offcanvas-body .list-group .list-group-item").removeClass('active disabled');

    // Add (active, disabled) classes to item with currentTime index number

    $("header .nav .offcanvas .offcanvas-body .list-group .list-group-item").eq(currentTime).addClass('active disabled');

    // Set name of this time on Navbar [on small screens]

    $("header .nav button[data-bs-toggle='offcanvas']").text(times[currentTime][0]);

    // Remove checked property from buttons in button group in navbar [on large screens]

    $("header .nav .btn-group .btn-check").removeProp("checked");

    // Add checked property to button with currentTime index number in button group

    $("header .nav .btn-group .btn-check").eq(currentTime).prop("checked", true);

    // Reset the page [For update inputs in time boxes in page]

    reset();

    if (document.readyState === 'complete') {

        // After page load is copmplete

        setTimeout(():void => {

            // Hidden loading screen

            $('.loading-screen').fadeOut();

        });
        
    }

});
