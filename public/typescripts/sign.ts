$((): void => {
  $("body").on("click", ".sign div:not(.active)", function (): void {
    $(this).addClass("active").siblings().removeClass("active");
  });
});
