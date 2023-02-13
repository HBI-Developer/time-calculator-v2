import bigInt from '../javascripts/libs/BigInt';

let currentTime:number = sessionStorage.time ? parseInt(sessionStorage.time) : 0;

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

    timeTemplate:string = `
        <div class="col-12 col-lg-4 card pb-2 equation">
            <div class="card-body">
                <form></form>
            </div>
            <div class="btn btn-danger remove">&times;</div>
        </div>
    `,

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

        let equations:(number|number[]|((number|number[])[]))[] = [];

        if (!equationsGroup) {

            equationsGroup = [...$('main section > .container > .row').children('.equation, .sign, .equations')];

        }

        for await (let equation of equationsGroup) {

            let numbers:number[] = [];

            if ($(equation).hasClass('equation')) {
                
                for await (let i of $(equation).find('input')) {

                    let value = $(i).val() ?? 0,
                        finalValue = !Array.isArray(value) ? +value : 0,
                        inputIndex = $(i).parent().index(),
                        counter = 0;
                        
                    finalValue *= 1000;

                    for await (let time of times) {

                        if (counter >= inputIndex) {

                            break;

                        }

                        finalValue *= (time[1] + 1);

                        counter++;

                    }

                    numbers.push(finalValue);

                }

                numbers = [numbers.reduce((sum, index) => sum += index, 0)];
                
                equations.push(numbers);

            } else if ($(equation).hasClass('sign')) {
                
                equations.push($(equation).children('.active').index());

            } else {

                let group = await getEquations([...$(equation).children('.row').children('.equation, .sign, .equations')]);

                equations.push(group);

            }

        }

        if (equations.length === 0) {

            equations = [0];

        }

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

        let counter = 0,
            result = 0;

        for await (let time of timeArray) {
            
            if (counter >= timeArray.length) {

                break;

            }

            if (timeArray[counter].length > 1) {

                timeArray[counter] = [await calculatingFinalResult(timeArray[counter])];

            }

            counter += 2;

        }

        counter = timeArray.length - 2;

        for await(let time of timeArray) {

            let index = timeArray[counter];

            if (counter <= 0) {

                break;

            }

            if (index === 2) {

                timeArray[counter - 1][0] =  bigInt(timeArray[counter - 1][0]).multiply(timeArray[counter + 1][0]);

                timeArray.splice(counter, 2);

            } else if (index === 3) {

                timeArray[counter - 1][0] =  bigInt(timeArray[counter - 1][0]).divide(timeArray[counter + 1][0]);

                timeArray.splice(counter, 2);

            }

            counter -= 2;

        }

        counter = 1;

        result = timeArray[0][0];

        for await(let time of timeArray) {

            let index = timeArray[counter];

            if (counter >= timeArray.length) {

                break;

            }

            if (index === 0) {

                result = bigInt(result).add(timeArray[counter + 1][0]);

            } else if (index === 1) {

                result = bigInt(result).minus(timeArray[counter + 1][0]);

            }

            counter += 2;

        }

        return result;

    },

    /*
        @func fromMillisecondsToTime
        @param {milliseconds:number}
        @return
            Array of number contains what this milliseconds equals as time [milliseconds, seconds, minutes, hours, ...]
    */
    
    fromMillisecondsToTime = (milliseconds:number):number[] => {

        let timesArray:number[] = [],
            base = 1,
            module = 1000;

        for (let i = -1; i < times.length; i++) {

            let time:number;

            if (i < times.length - 1) {

                time = bigInt(milliseconds).mod(module).divide(base);

            } else {

                time = bigInt(milliseconds).divide(base);

            }

            if (base === 1) {

                base = 1000;

            } else {

                base *= (times[i][1] + 1);

            }

            if (i < times.length - 2) {

                module *= (times[i + 1][1] + 1);

            }

            timesArray.push(time);

        }

        return timesArray;

    };

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