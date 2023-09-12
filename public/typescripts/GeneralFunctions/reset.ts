import { currentTime } from "../variables";
import signs from "./TemplateFunctions/signs";
import getCertainTime from "./TimeFunctions/getCertainTime";
import timeTemplate from "./TemplateFunctions/timeTemplate";
import timeInputTemplate from "./TemplateFunctions/timeInputTemplate";

/**
    @void
        Reset time boxes in page [Two boxes with sign element by current selected time]
*/
const reset = (): void => {
  $(".equation, .equations, .sign").remove();

  $("main .container .row").append(timeTemplate());

  $("main .container .row").append(signs());

  $("main .container .row").append(timeTemplate());

  for (let i: number = 0; i <= currentTime; i++) {
    let theTime: number = !isNaN(+getCertainTime(i)) ? +getCertainTime(i) : 0,
      max: number | false = i <= currentTime - 1 ? theTime : false;

    $(".equation")
      .find("form")
      .append(timeInputTemplate(getCertainTime(i, true).toString(), max));
  }
};

export default reset;
