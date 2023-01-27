// This's File for Switch between Time options in header [Seconds, Minutes, ...]

import { currentTime, setCurrentTime, timeInputTemplate, times } from "./variables";

$(():void => {
    $("body").on('click', `
        header .nav .offcanvas .offcanvas-body .list-group .list-group-item:not(.active),
        header .nav .btn-group .btn-check:not([checked])
    `, function ():void {

        // Fired when click in time option in navbar [For small screens and large screens]

        /*
            @variable onDesktop is navbar is large screen navbar or small screen navbar
            @variable timeIndex will contains index of selected time option
        */
        
        let onDesktop:boolean = $(this).hasClass('btn-check'),
            timeIndex:number;

        if (onDesktop) {

            // If this click on large screen navbar

            // Add checked property to this options

            $(this).prop('checked', true).siblings().removeProp('checked');

            // assigning this option index divide on 2 and bring it to lower number [2.6 => 2] to timeIndex

            timeIndex = Math.floor($(this).index() / 2);

            // Remove (active, disabled) classes From all item in list group times in navbar
            
            $("header .nav .offcanvas .offcanvas-body .list-group .list-group-item").removeClass('active disabled');
            
            // Add (active, disabled) classes to item with currentTime index number

            $("header .nav .offcanvas .offcanvas-body .list-group .list-group-item").eq(timeIndex).addClass('active disabled');

            // Set name of this time on Navbar

            $("header .nav button[data-bs-toggle='offcanvas']").text(times[timeIndex][0]);

        } else {

            // If this click on small screen navbar

            // add (active, disabled) classes to this option and remove from siblings

            $(this).addClass('active disabled').siblings().removeClass('active disabled');

            // Assigning index of this option to timeIndex

            timeIndex = $(this).index();

            // Set name of this time on Navbar
            
            $("header .nav button[data-bs-toggle='offcanvas']").text(times[timeIndex][0]);
            
            // Remove checked property from buttons in button group in navbar [on large screens]

            $("header .nav .btn-group .btn-check").removeProp('checked');
            
            // Add checked property to button with currentTime index number in button group

            $("header .nav .btn-group .btn-check").eq(timeIndex).prop('checked', true);

        }

        if (currentTime > timeIndex) {

            // If currentTime greater than timeIndex [For example switch is Hours => Minutes]

            // Remove any input with number of index large than timeIndex

            $('.equation .input-group').filter(function () {
                 return $(this).index() > timeIndex; 
            }).remove();

            // Remove max property from last input in time boxes [After remove inputs]

            $('.equation .input-group:last-child input').removeAttr('max');

        } else if (currentTime < timeIndex) {

            // If currentTime less than timeIndex [For example switch is Hours => Days]

            /*
                If the last input [Before adding inputs to time boxes] has value larger than max value to this time
                [for example 67 in second input] then put max value for this input
            */

            $('.equation .input-group:last-child input').map(function () {

                // Check if value for this input is larger than max value

                let number = ($(this).val() ?? 0) > times[currentTime][1];

                if (number) {

                    // If this's larger than then set max value for this time

                    $(this).val(times[currentTime][1]);
                }
            });

            // Set max property to last input [Before add inputs to time boxes]

            $('.equation .input-group:last-child input').attr('max', times[currentTime][1]);

            for (let i = currentTime + 1; i <= timeIndex; i++) {

                // @variable max will has number in index i in times array if i less than timeIndex else contains false

                let max = i < timeIndex ? times[i][1] : false;

                // Add template input will return from timeInputTemplate function to time boxes

                $(".equation form").append(timeInputTemplate(times[i][0], max));

            }

        }

        // Set number of timeIndex to currentTime

        setCurrentTime(timeIndex);
        
    });
});