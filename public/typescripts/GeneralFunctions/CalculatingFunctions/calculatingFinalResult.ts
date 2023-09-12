import bigInt from "../../../javascripts/libs/BigInt";

/**
    @param {number[][] | number[]} timeArray
        As example equations that returning from getEquations function
    @return {number}
*/

const calculatingFinalResult = async (timeArray): Promise<number> => {
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

  for await (let time of timeArray) {
    let index = timeArray[counter];

    if (counter <= 0) {
      break;
    }

    if (index === 2) {
      timeArray[counter - 1][0] = bigInt(timeArray[counter - 1][0]).multiply(
        timeArray[counter + 1][0]
      );

      timeArray.splice(counter, 2);
    } else if (index === 3) {
      timeArray[counter - 1][0] = bigInt(timeArray[counter - 1][0]).divide(
        timeArray[counter + 1][0]
      );

      timeArray.splice(counter, 2);
    }

    counter -= 2;
  }

  counter = 1;

  result = timeArray[0][0];

  for await (let time of timeArray) {
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
};

export default calculatingFinalResult;
