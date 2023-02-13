import { currentTime, setCurrentTime, timeInputTemplate, times } from "./variables";

$(():void => {
    $("body").on('click', `
        header .nav .offcanvas .offcanvas-body .list-group .list-group-item:not(.active),
        header .nav .btn-group .btn-check:not([checked])
    `, function ():void {
        
        let onDesktop:boolean = $(this).hasClass('btn-check'),
            timeIndex:number;

        if (onDesktop) {

            $(this).prop('checked', true).siblings().removeProp('checked');

            timeIndex = Math.floor($(this).index() / 2);
            
            $("header .nav .offcanvas .offcanvas-body .list-group .list-group-item").removeClass('active disabled');

            $("header .nav .offcanvas .offcanvas-body .list-group .list-group-item").eq(timeIndex).addClass('active disabled');

            $("header .nav button[data-bs-toggle='offcanvas']").text(times[timeIndex][0]);

        } else {

            $(this).addClass('active disabled').siblings().removeClass('active disabled');

            timeIndex = $(this).index();
            
            $("header .nav button[data-bs-toggle='offcanvas']").text(times[timeIndex][0]);

            $("header .nav .btn-group .btn-check").removeProp('checked');

            $("header .nav .btn-group .btn-check").eq(timeIndex).prop('checked', true);

        }

        if (currentTime > timeIndex) {

            $('.equation .input-group').filter(function () {
                 return $(this).index() > timeIndex; 
            }).remove();

            $('.equation .input-group:last-child input').removeAttr('max');

        } else if (currentTime < timeIndex) {

            $('.equation .input-group:last-child input').map(function () {

                let number = ($(this).val() ?? 0) > times[currentTime][1];

                if (number) {

                    $(this).val(times[currentTime][1]);

                }

            });

            $('.equation .input-group:last-child input').attr('max', times[currentTime][1]);

            for (let i = currentTime + 1; i <= timeIndex; i++) {

                let max = i < timeIndex ? times[i][1] : false;

                $(".equation form").append(timeInputTemplate(times[i][0], max));

            }

        }

        setCurrentTime(timeIndex);
        
    });
    
});