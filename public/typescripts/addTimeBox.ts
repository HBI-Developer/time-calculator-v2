import {times, timeTemplate, timeInputTemplate, signs, timeGroupTemplate, currentTime} from './variables';

$(():void => {

    $("body").on("click", ".add, .add-group", function ():void {

        const 
            isTimeGroup:number = $(this).parents('.equations').length,
            template:string = $(this).hasClass('add') ? timeTemplate : timeGroupTemplate;

        if (isTimeGroup) {

            $(this).parent().children('.add').before(template);

        } else {

            $('.equation:last-child, .equations:last-child').after(template);

        }

        let equation = $('.equation').not(':has(input)');

        for (let i:number = 0; i <= currentTime; i++) {

            let max = i < currentTime ? times[i][1] : false;

            equation.find('form').append(timeInputTemplate(times[i][0], max));
        }

        $('.equation, .equations').prev('.equation, .equations').after(signs);

        if ($('main section > .container > .row').children('.equation, .equations').length > 1) {

            $('.remove.disabled').removeClass('disabled');

        }
        
    });

});
