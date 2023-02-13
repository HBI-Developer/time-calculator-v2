import bigInt from "../javascripts/libs/BigInt";
import { calculatingFinalResult, fromMillisecondsToTime, getEquations, reset } from "./variables";

$(():void => {

    $("body").on("click", ".calculating", ():void => {

        $("table tr th:last-child").text("Time");

        $(".loading-screen").fadeIn(400, async():Promise<void> => {

            let equations = await getEquations(),
                index = 1;

            equations = await calculatingFinalResult(equations);

            equations = fromMillisecondsToTime(equations);

            for await (let time of equations) {

                if (time < 0) {

                    $("table tr th:last-child").text("Time (In Nigative)");

                }

                $("table tr td").eq(index).text(bigInt(time).abs());

                index += 2;

            }

            $("body").css("overflow", "hidden");

            $(".result-page").fadeIn();

            $(".result-page").css("display", "flex");

            setTimeout(():void => {

                $(".loading-screen").fadeOut();

            }, 0);

        });

        $(".loading-screen").css("display", "flex");

    });

    $("body").on("click", ".result-page .re-calc", ():void => {

        reset();

        $(".result-page").fadeOut(400, ():void => {

            $("body").css("overflow-y", "auto");
            
        });
        
    });

});