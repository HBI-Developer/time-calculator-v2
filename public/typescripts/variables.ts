// Global File Contains Global Variables and Functions

// Import big int library [Use in Calculating Function]

import bigInt from '../javascripts/libs/BigInt';

/********************************************** Variables **********************************************/

/* 
    Current time is related with selected time option (seconds, minutes, ...) in Navbar
    number is index of time in times array [0 => seconds, 1 => minutes, ...], when switch
    the time new time index saving in sessionStorage
*/

let currentTime:number = sessionStorage.time ? parseInt(sessionStorage.time) : 0;

/********************************************** Constants **********************************************/

/*
    @const times Contains all times that shown in navbar and uses in scripts
    index [0] => Name of Time
    index [1] => Max of Time value in input element in website [If this time is not the selected time in navbar],
                 This's value is last value in next time minus 1 [For example each minutes has 60 seconds, for that
                 Seconds has 59, and So On]
*/

const
    times:[string, number][] = 
        [
            ['seconds', 59],
            ['minutes', 59],
            ['hours', 23],
            ['days', 6],
            ['weeks', 4],
            ['months', 11],
            ['years', 9],
            ['decades', 9],
            ['centuries', 9],
            ['millenia', 0]
        ],

    /*
        @const timeTemplate has template of Time Box [Without inputs] in website
    */
    
    timeTemplate:string = `
        <div class="col-12 col-lg-4 card pb-2 equation">
            <div class="card-body">
                <form></form>
            </div>
            <div class="btn btn-danger remove">&times;</div>
        </div>
    `,

    /*
        @const timeGroupTemplate has template of Time Group in website
    */
    
    timeGroupTemplate:string = `
        <div class="col-12 container card py-2 px-1 equations">
            <div class="col-12 row gy-2 gy-lg-4 mx-auto">
                <div class="col-12 btn btn-primary icon icon-plus add"> Add Time</div>
                <div class="col-12 btn btn-primary icon icon-plus-circle add-group"> Add Time Group</div>
                <div class="col-12 btn btn-danger remove">&times;  Remove</div>
            </div>
        </div>
    `,

    /*
        @func timeInputTemplate
        @param {message:String}
            Title of Inputs [Seconds, Minutes, ...]
        @param {max:Number}
            If passing number then set max property in input with this number, If not passing or passing false
            boolean then don't set anything
        @return String
            Return template of Input
    */

    timeInputTemplate = (message:string, max?:boolean|number):string => {

        let input:string = `
            <div class="input-group input-group-sm mb-3">
                <span class="input-group-text">${message}</span>
                <input class="form-control" type="number" min="0" ${max ? `max='${max}'` : ''} value="0" aria-label="${message}">
            </div>
        `;

        return input;
    },

    /*
        @const signs contains template of sign element [That's contains signs of math]
    */
    
    signs:string = `
        <div class="col-12 col-lg-2 d-flex d-lg-grid gap-lg-1 px-sm-0 px-lg-2 sign">
            <div class="col mx-1 mx-lg-0 col-lg-12 btn active btn-dark">+</div>
            <div class="col mx-1 mx-lg-0 col-lg-12 btn btn-dark">-</div>
            <div class="col mx-1 mx-lg-0 col-lg-12 btn btn-dark">×</div>
            <div class="col mx-1 mx-lg-0 col-lg-12 btn btn-dark">÷</div>
        </div>
    `,

    /*
        @func setCurrentTime
        @param {value:number}
        @void
            Set value in param as new value to currentTime variable with set this value in time property in 
            sessionStorage
    */
    
    setCurrentTime = (value:number):void => {

        currentTime = value;

        sessionStorage.setItem('time', value.toString());

    },

    /*
        @func reset
        @void
            Reset time boxes in page [Two boxes with sign element by current selected time]
    */

    reset = ():void => {
        $('.equation, .equations, .sign').remove();

        $('main .container .row').append(timeTemplate);

        $('main .container .row').append(signs);

        $('main .container .row').append(timeTemplate);

        for (let i:number = 0; i <= currentTime; i++) {

            let max = i <= currentTime - 1 ? times[i][1] : false;

            $('.equation').find('form').append(timeInputTemplate(times[i][0], max));
        }
    },

    /*
        @func getEquations
        @param {equationsGroup:Array of Selectors}
        @return
            Array of numbers
    */
    
    getEquations = async (equationsGroup?):Promise<any> => {

        /*
            @variable equations will contains numbers in inputs in time box as array and signs as number and
                      numbers in inputs in boxes in time groups as array of numbers array, That's Array will
                      will contains 1 number, is total of milliseconds of all times in inputs

                      In this Function This returning array Contains

                      Time Box as Number in Equation

                      Sign Element as Sign in Equation

                      Time Group as Equation Between Brackets in Equation

                      Reutrning array will be:

                      [
                        [2423342],
                        2,
                        [4324234],
                        1,
                        [[4324232], 0, [4324324]]
                      ]

                      Where 0 and even indexes is numbers or equations between brakets, and odd indexes
                      is signs [+, -, ×, ÷]
        */

        let equations:(number|number[]|((number|number[])[]))[] = [];

        if (!equationsGroup) {

            /*
                If equationsGroup is not passing to it value then put in it Selectors of Main Time boxes and signs
                and Time Groups
            */
               

            equationsGroup = [...$('main section > .container > .row').children('.equation, .sign, .equations')];
        }

        for await (let equation of equationsGroup) {

            // Each Time Box, Sign, Time Groups one by one

            // @variable numbers is array of number will contains all time in inputs by milliseconds

            let numbers:number[] = [];

            if ($(equation).hasClass('equation')) {

                // If equations selector is time box
                
                for await (let i of $(equation).find('input')) {

                    // Get each input in {i} variable

                    /*
                        @variable value contains value in input or 0
                        @variable finalValue If value is not array assign to it value variable, If not assign to it
                                  0 [Why behind this because TypeScript deals with value as array of string not as
                                  number]
                        @variable inputIndex contains index of this input in box [0 => First, 1 => Second, ...]
                        @variable counter is for loop counter with 0 as init value
                    */

                    let value = $(i).val() ?? 0,
                        finalValue = !Array.isArray(value) ? +value : 0,
                        inputIndex = $(i).parent().index(),
                        counter = 0;

                    // finalValue [If seconds, minutes, ...] to transform to mulliseconds first muliply in 1000
                        
                    finalValue *= 1000;

                    for await (let time of times) {

                        // time variable will contains indexes of times array

                        if (counter >= inputIndex) {

                            /*
                                If counter greater than or equals input index then break the for loop

                                in case seconds input [First Input] has 0 index then for loop not execute

                                in case minutes input [Second Input] has 1 index then for loop will execute
                                1 time

                                And So On
                            */

                            break;
                        }

                        /*
                            Multiply finalValue second index in time that has number plus 1
                            [In seconds index has 59 plus 1 => 60]
                            [In Minutes index has 59 plus 1 => 60]

                            and So On
                        */

                        finalValue *= (time[1] + 1);

                        // Increase counter by 1

                        counter++;
                    }

                    // After get time in input and transform it to milliseconds add to numbers array

                    numbers.push(finalValue);
                }

                // After get all times in input in time box by milliseconds, Get total all this times inside array

                numbers = [numbers.reduce((sum, index) => sum += index, 0)];

                // After Get total all this times inside array [Array from 1 Index] Add this to equations array
                
                equations.push(numbers);

            } else if ($(equation).hasClass('sign')) {

                // If this equation is sign element

                // Get active sign inside this element and add it index to equations array
                
                equations.push($(equation).children('.active').index());

            } else {

                // If this equations is Time Group

                /*
                    @variable group contains return of this function with time boxes and signs and time groups Selectors
                              inside this Time Group
                */

                let group = await getEquations([...$(equation).children('.row').children('.equation, .sign, .equations')]);

                // Add return value to equations array

                equations.push(group);
            }
        }

        if (equations.length === 0) {

            // If equations array Empty assign array with 0 

            equations = [0];
        }

        // Return equations array

        return equations;
    },

    /*
        @func calculatingFinalResult
        @param {timeArray:Array of number}
            As example equations that returning from getEquations function
        @return
            Total of timeArray numbers
    */
    
    calculatingFinalResult = async (timeArray):Promise<any> => {

        /*
            @variable counter is counter to for loop
            @variable result will contains final result for all this function
        */

        let counter = 0,
            result = 0;

        for await (let time of timeArray) {
            
            if (counter >= timeArray.length) {

                // If counter is Greater than or equals timeArray breaking for loop

                break;
            }

            if (timeArray[counter].length > 1) {

                /*
                    If index of time array is equation between brakets [Result of Time Group]
                    then execute this function on it to resolve the equation between brakets and
                    get tha final result to it, and set this result to this index in timeArray
                */

                timeArray[counter] = [await calculatingFinalResult(timeArray[counter])];
            }

            // increase counter by 2

            counter += 2;

        }

        // assign to counter timeArray length minus 2 for deals with array for end to start

        counter = timeArray.length - 2;

        for await(let time of timeArray) {

            // @variable index contains counter index in timeArray

            let index = timeArray[counter];

            if (counter <= 0) {

                // If counter less than or equals 0 breaking for loop

                break;
            }

            if (index === 2) {

                /*
                    If index contains number 2, Then this is multiply Operation, Multiply value in index after counter
                    with value in index before counter and set result in index before counter
                */

                timeArray[counter - 1][0] =  bigInt(timeArray[counter - 1][0]).multiply(timeArray[counter + 1][0]);

                // Remove counter index with index after counter

                timeArray.splice(counter, 2);

            } else if (index === 3) {

                /*
                    If index contains number 3, Then this is divide Operation, Divide value in index after counter
                    with value in index before counter and set result in index before counter
                */


                timeArray[counter - 1][0] =  bigInt(timeArray[counter - 1][0]).divide(timeArray[counter + 1][0]);

                // Remove counter index with index after counter

                timeArray.splice(counter, 2);

            }

            // Decrease counter by 2

            counter -= 2;

        }

        // Assign 1 to counter

        counter = 1;

        // Result equals first value in timeArray

        result = timeArray[0][0];

        for await(let time of timeArray) {

            // @variable index contains counter index in timeArray

            let index = timeArray[counter];

            if (counter >= timeArray.length) {

                // If counter greater than or equals timeArray length breaking for loop

                break;
            }

            if (index === 0) {

                // If index equals 0

                // Sum result with number in index after counter

                result = bigInt(result).add(timeArray[counter + 1][0]);

            } else if (index === 1) {

                // If index equals 1

                // Sub result with number in index after counter

                result = bigInt(result).minus(timeArray[counter + 1][0]);

            }

            // Increase counter by 2

            counter += 2;

        }

        // Return result

        return result;

    },

    /*
        @func fromMillisecondsToTime
        @param {milliseconds:number}
        @return
            Array of number contains what this milliseconds equals as time [milliseconds, seconds, minutes, hours, ...]
    */
    
    fromMillisecondsToTime = (milliseconds:number):number[] => {

        /*
            @variable timesArray will contains what this milliseconds equals as number

                for example:
                    [345, 34, 0, 12, 2, 0, 0, 0, 0, 0, 0]

                means:
                    345 Milliseconds
                    34 Seconds
                    12 Hours
                    2 Days

            @variable base is the number will time divide on it
                for example for millisecond is 1, for second is 60 and so on

            @variable module is the number will time module with it
                for example for milliseconds is 1000 for seconds is 60 and so on
            
        */

        let timesArray:number[] = [],
            base = 1,
            module = 1000;

        for (let i = -1; i < times.length; i++) {

            // @variable time will be time that calculate from milliseconds

            let time:number;

            if (i < times.length - 1) {

                // If i less than last index in times array

                // Module milliseconds from module then divide from base

                time = bigInt(milliseconds).mod(module).divide(base);
            } else {

                // If i equals last index in times array

                // Divide milliseconds from base

                time = bigInt(milliseconds).divide(base);
            }

            if (base === 1) {

                // If base equals 1

                // Assign 1000 to base

                base = 1000;
            } else {

                /* 
                    Else multiply base in number in index i in times array plus 1 In case Minutes for example 
                    base will be multiply in 59 plus 1 [60]
                */

                base *= (times[i][1] + 1);
            }

            if (i < times.length - 2) {

                // If i less than penultimate index in times array

                /*
                    module will multiply in number in next index plus 1, for example for Minutes module will
                    multiply in 23 plus 1 [24]
                */

                module *= (times[i + 1][1] + 1);
            }

            // Add value of time variable to timesArray

            timesArray.push(time);

        }

        // Return timesArray

        return timesArray;
    };

// Export Variables, Constants, Functions to Import by other TS files

export {
    currentTime,
    times,
    timeTemplate,
    timeGroupTemplate,
    timeInputTemplate,
    signs,
    reset,
    setCurrentTime,
    getEquations,
    calculatingFinalResult,
    fromMillisecondsToTime
};