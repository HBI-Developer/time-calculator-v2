import { times } from "../../variables";
import bigInt from "../../../javascripts/libs/BigInt";
import getCertainTime from "../TimeFunctions/getCertainTime";

/**
        @param {milliseconds:number}
        @return {number[]}
            Array of number contains what this milliseconds equals as time [milliseconds, seconds, minutes, hours, ...]
    */

const fromMillisecondsToTime = (milliseconds: number): number[] => {
  let timesArray: number[] = [],
    base = 1,
    module = 1000;

  for (let i = -1; i < times.length; i++) {
    let time: number;

    if (i < times.length - 1) {
      time = bigInt(milliseconds).mod(module).divide(base);
    } else {
      time = bigInt(milliseconds).divide(base);
    }

    if (base === 1) {
      base = 1000;
    } else {
      base *= +getCertainTime(i) + 1;
    }

    if (i < times.length - 2) {
      module *= times[i + 1][1] + 1;
    }

    timesArray.push(time);
  }

  return timesArray;
};

export default fromMillisecondsToTime;
