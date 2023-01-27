// This is File to Events with sign elements

$(():void => {

    $("body").on("click", ".sign div:not(.active)", function ():void {

        // Fired when click on element (If this's not active) in sign element

        // Add active class to this element and remove from siblings

        $(this).addClass('active').siblings().removeClass('active');

    })

});