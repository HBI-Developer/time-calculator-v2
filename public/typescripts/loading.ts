import { currentTime, reset, setCurrentTime, times } from "./variables";

$(window).on('load', ():void => {

    if (currentTime < 0 || currentTime >= times.length) {

        setCurrentTime(0);

    }

    $("header .nav .offcanvas .offcanvas-body .list-group .list-group-item").removeClass('active disabled');

    $("header .nav .offcanvas .offcanvas-body .list-group .list-group-item").eq(currentTime).addClass('active disabled');

    $("header .nav button[data-bs-toggle='offcanvas']").text(times[currentTime][0]);

    $("header .nav .btn-group .btn-check").removeProp("checked");

    $("header .nav .btn-group .btn-check").eq(currentTime).prop("checked", true);

    reset();

    if (document.readyState === 'complete') {

        setTimeout(():void => {

            $('.loading-screen').fadeOut();

        });
        
    }

});
