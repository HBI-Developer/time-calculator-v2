import reset from "./GeneralFunctions/reset";

$((): void => {
  $("body").on("click", "aside .reset", (): void => {
    reset();
  });
});
