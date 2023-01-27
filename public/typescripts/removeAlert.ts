import alertify from '../javascripts/libs/alertify';

// @variable y contains position of scroll on y in page

let y:number;

$("body").on("click", ".remove:not(.disabled)", function ():void {

    // Fired when click on remove button in time box or time group if it isn't disabled

    // assign scrollY in page to y

    y = window.scrollY;

    // Shown confirm with message in first argument

    alertify.confirm("Are you sure from delete this time element?", ():void => {

        // If user click on yes

        // @variable isFirst is this time box or time group is the first in page

        let isFirst = !$(this).parents('.equation, .equations').prev('.sign').length;

        if (isFirst) {

            // If this is the first one remove the sign element after it

            $(this).parents('.equation, .equations').next('.sign').remove();
        } else {

            // If this's not first one remove the sign element before it

            $(this).parents('.equation, .equations').prev('.sign').remove();
        }

        // remove this time box or time group

        $(this).parents('.equation, .equations').remove();

        if ($(".row > .equation, .row > .equations").length <= 1) {

            // If there's one time box or time group in page set disabled on remove button

            $(".row > .equation, .row > .equations").find('.remove').addClass('disabled');
        }

    });

    // Set This's text on this's element

    $(".alertify.ajs-movable:not(.ajs-maximized) .ajs-header").text('Are you sure?');
    $(".alertify .ajs-footer .ajs-buttons.ajs-primary .ajs-cancel").text('No');
    $(".alertify .ajs-footer .ajs-buttons.ajs-primary .ajs-ok").text('Yes');

});

$("body").on("click", ".alertify .ajs-footer .ajs-buttons.ajs-primary .ajs-button", ():void => {

    // Scroll y to (y) value [Because this's model scroll to up, when click OK]

    window.scrollTo(0, y);
});