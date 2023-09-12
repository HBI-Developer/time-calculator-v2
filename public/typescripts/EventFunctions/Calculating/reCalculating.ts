import reset from "../../GeneralFunctions/reset";

export default (): void => {
  reset();

  $(".result-page").fadeOut(400, (): void => {
    $("body").css("overflow-y", "auto");
  });
};
