import { times, currentTime } from "../../variables";
import signs from "../../GeneralFunctions/TemplateFunctions/signs";
import timeTemplate from "../../GeneralFunctions/TemplateFunctions/timeTemplate";
import timeInputTemplate from "../../GeneralFunctions/TemplateFunctions/timeInputTemplate";
import timeGroupTemplate from "../../GeneralFunctions/TemplateFunctions/timeGroupTemplate";
import getCertainTime from "../../GeneralFunctions/TimeFunctions/getCertainTime";

export default function () {
  const isTimeGroup: number = $(this).parents(".equations").length,
    template: string = $(this).hasClass("add")
      ? timeTemplate()
      : timeGroupTemplate();

  if (isTimeGroup) {
    $(this).parent().children(".add").before(template);
  } else {
    $(".equation:last-child, .equations:last-child").after(template);
  }

  let equation = $(".equation").not(":has(input)");

  for (let i: number = 0; i <= currentTime; i++) {
    let max = i < currentTime ? +getCertainTime(i) : false;

    equation
      .find("form")
      .append(timeInputTemplate(getCertainTime(i, true).toString(), max));
  }

  $(".equation, .equations").prev(".equation, .equations").after(signs());

  if (
    $("main section > .container > .row").children(".equation, .equations")
      .length > 1
  ) {
    $(".remove.disabled").removeClass("disabled");
  }
}
