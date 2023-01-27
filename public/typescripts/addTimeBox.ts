// This's script is about add New Time or Time Group to Page or to Time Group

import {times, timeTemplate, timeInputTemplate, signs, timeGroupTemplate, currentTime} from './variables';

$(():void => {

    $("body").on("click", ".add, .add-group", function ():void {

        // Fired when click on add or add-group button in page or time group

        // @const isTimeGroup is this element contains button is time group or the page
        // @const template if this button is add then contains time box template else contains time group template

        const 
            isTimeGroup:number = $(this).parents('.equations').length,
            template:string = $(this).hasClass('add') ? timeTemplate : timeGroupTemplate;

        if (isTimeGroup) {

            // If button inside time group then add this template to this time group before add button 

            $(this).parent().children('.add').before(template);

        } else {

            // If button is the button in page then add this template after last time box or time group

            $('.equation:last-child, .equations:last-child').after(template);

        }

        // @variable equation has selector for time box without inputs [Will be effect if the add template is time box]

        let equation = $('.equation').not(':has(input)');

        for (let i:number = 0; i <= currentTime; i++) {

            // @variable max will has number in index i in times array if i less than currentTime else contains false

            let max = i < currentTime ? times[i][1] : false;

            // Add template input will return from timeInputTemplate function to this time box

            equation.find('form').append(timeInputTemplate(times[i][0], max));
        }

        // Add sign template between this template and template before it [time box or time group]

        $('.equation, .equations').prev('.equation, .equations').after(signs);

        if ($('main section > .container > .row').children('.equation, .equations').length > 1) {

            // If time box or time group more than 1 remove disabled class from remove buttons

            $('.remove.disabled').removeClass('disabled');
        }
    });

});
