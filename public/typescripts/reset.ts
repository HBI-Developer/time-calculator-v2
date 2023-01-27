// This's File to Reset Button [In aside] Event

import { reset } from "./variables";

$(():void => {

    $("body").on('click', 'aside .reset', ():void => {

        // Fired when click on Reset button in page

        // Execute reset function

        reset();

    });

});