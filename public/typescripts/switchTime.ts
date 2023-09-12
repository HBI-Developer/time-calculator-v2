import switchTime from "./EventFunctions/SwitchTime/switchTime";

$((): void => {
  $("body").on(
    "click",
    `
        header .nav .offcanvas .offcanvas-body .list-group .list-group-item:not(.active),
        header .nav .btn-group .btn-check:not([checked])
    `,
    switchTime
  );
});
