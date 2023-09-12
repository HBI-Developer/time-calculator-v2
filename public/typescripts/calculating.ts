import calculating from "./EventFunctions/Calculating/calculating";
import reCalculating from "./EventFunctions/Calculating/reCalculating";

$((): void => {
  $("body").on("click", ".calculating", calculating);

  $("body").on("click", ".result-page .re-calc", reCalculating);
});
