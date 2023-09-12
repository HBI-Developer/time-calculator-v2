import bigInt from "../../../javascripts/libs/BigInt";
import getEquations from "../../GeneralFunctions/CalculatingFunctions/getEquations";
import calculatingFinalResult from "../../GeneralFunctions/CalculatingFunctions/calculatingFinalResult";
import fromMillisecondsToTime from "../../GeneralFunctions/CalculatingFunctions/fromMillisecondsToTime";

export default (): void => {
  $("table tr th:last-child").text("Time");

  $(".loading-screen").fadeIn(400, async (): Promise<void> => {
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

    setTimeout((): void => {
      $(".loading-screen").fadeOut();
    }, 0);
  });

  $(".loading-screen").css("display", "flex");
};
