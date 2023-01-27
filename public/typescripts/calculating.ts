// This's File to Calculating Operation when click on calculating button [in aside] And Re Calculating in Result Page

import bigInt from "../javascripts/libs/BigInt";
import { calculatingFinalResult, fromMillisecondsToTime, getEquations, reset } from "./variables";

$(():void => {

    $("body").on("click", ".calculating", ():void => {

        // Fired when click on calculating button in page

        // Reset time coloumn in result table with ("Time") as title 

        $("table tr th:last-child").text("Time");

        $(".loading-screen").fadeIn(400, async():Promise<void> => {

            /*
                @variable equations contains array of number that return from getEquations function
                @variable index will use as counter in for loop
            */

            let equations = await getEquations(),
                index = 1;

            // Assigning number that return from calculatingFinalResult function with equations value to equations

            equations = await calculatingFinalResult(equations);

            // Assigning array that return from fromMillisecondsToTime function with equations value to equations

            equations = fromMillisecondsToTime(equations);

            for await (let time of equations) {

                if (time < 0) {

                    // If return in time [index in equations] is less than 0 Add ("In negative to time column in result table")

                    $("table tr th:last-child").text("Time (In Nigative)");
                }

                // Add Absolute value of time to td with (index) index in result table

                $("table tr td").eq(index).text(bigInt(time).abs());

                // Increase index by 2

                index += 2;
            }

            // Hidden page scroll, and shown result page with result table

            $("body").css("overflow", "hidden");
            $(".result-page").fadeIn();
            $(".result-page").css("display", "flex");

            setTimeout(():void => {

                // Hidden loading screen element

                $(".loading-screen").fadeOut();
            }, 0);
        });

        $(".loading-screen").css("display", "flex");

    });

    $("body").on("click", ".result-page .re-calc", ():void => {

        // Fired when click on calculating again button in result page

        // Reset Page in website

        reset();

        // After reset hidden result page

        $(".result-page").fadeOut(400, ():void => {

            // After hidden result page cancel (hidden page scroll)

            $("body").css("overflow-y", "auto");
            
        });
    });

});