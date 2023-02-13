import { reset } from "./variables";

$(():void => {

    $("body").on('click', 'aside .reset', ():void => {

        reset();

    });

});