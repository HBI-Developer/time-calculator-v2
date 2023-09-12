import { currentTime, setCurrentTime, times } from "../../variables";
import getCertainTime from "../../GeneralFunctions/TimeFunctions/getCertainTime";
import timeInputTemplate from "../../GeneralFunctions/TemplateFunctions/timeInputTemplate";

export default function (): void {
  let onDesktop: boolean = $(this).hasClass("btn-check"),
    timeIndex: number;

  if (onDesktop) {
    $(this).prop("checked", true).siblings().removeProp("checked");

    timeIndex = Math.floor($(this).index() / 2);

    $(
      "header .nav .offcanvas .offcanvas-body .list-group .list-group-item"
    ).removeClass("active disabled");

    $("header .nav .offcanvas .offcanvas-body .list-group .list-group-item")
      .eq(timeIndex)
      .addClass("active disabled");

    $("header .nav button[data-bs-toggle='offcanvas']").text(
      times[timeIndex][0]
    );
  } else {
    $(this)
      .addClass("active disabled")
      .siblings()
      .removeClass("active disabled");

    timeIndex = $(this).index();

    $("header .nav button[data-bs-toggle='offcanvas']").text(
      times[timeIndex][0]
    );

    $("header .nav .btn-group .btn-check").removeProp("checked");

    $("header .nav .btn-group .btn-check").eq(timeIndex).prop("checked", true);
  }

  if (currentTime > timeIndex) {
    $(".equation .input-group")
      .filter(function () {
        return $(this).index() > timeIndex;
      })
      .remove();

    $(".equation .input-group:last-child input").removeAttr("max");
  } else if (currentTime < timeIndex) {
    let theTime = +getCertainTime();

    $(".equation .input-group:last-child input").map(function () {
      let thisVal = $(this).val() || "",
        thisNumber: number = !isNaN(+thisVal) ? +thisVal : 0,
        number = thisNumber > theTime;

      if (number) {
        $(this).val(theTime);
      }
    });

    $(".equation .input-group:last-child input").attr("max", theTime);

    for (let i = currentTime + 1; i <= timeIndex; i++) {
      let max = i < timeIndex ? +getCertainTime(i) : false;

      $(".equation form").append(
        timeInputTemplate(getCertainTime(i, true).toString(), max)
      );
    }
  }

  setCurrentTime(timeIndex);
}
