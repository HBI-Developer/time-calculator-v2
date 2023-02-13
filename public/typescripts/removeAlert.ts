import alertify from '../javascripts/libs/alertify';

/*
    Used alertify Model instead of Bootstrap model Because Bootstrap model was not working in this
    project [I don't know why]
*/

let scrollYInWindow:number;

$("body").on("click", ".remove:not(.disabled)", function ():void {

    scrollYInWindow = window.scrollY;

    alertify.confirm("Are you sure from delete this time element?", ():void => {

        let isFirst = !$(this).parents('.equation, .equations').prev('.sign').length;

        if (isFirst) {

            $(this).parents('.equation, .equations').next('.sign').remove();

        } else {

            $(this).parents('.equation, .equations').prev('.sign').remove();

        }

        $(this).parents('.equation, .equations').remove();

        if ($(".row > .equation, .row > .equations").length <= 1) {

            $(".row > .equation, .row > .equations").find('.remove').addClass('disabled');

        }

    });

    $(".alertify.ajs-movable:not(.ajs-maximized) .ajs-header").text('Are you sure?');

    $(".alertify .ajs-footer .ajs-buttons.ajs-primary .ajs-cancel").text('No');

    $(".alertify .ajs-footer .ajs-buttons.ajs-primary .ajs-ok").text('Yes');

});

$("body").on("click", ".alertify .ajs-footer .ajs-buttons.ajs-primary .ajs-button", ():void => {

    // Scrolling window to (scrollYInWindow) value [Because alertify model scroll to up, when click OK]

    window.scrollTo(0, scrollYInWindow);

});