import { times } from "../../variables";

const getEquations = async (equationsGroup?: HTMLElement[]): Promise<any> => {
  let equations: (number | number[] | (number | number[])[])[] = [];

  if (!equationsGroup) {
    equationsGroup = [
      ...$("main section > .container > .row").children(
        ".equation, .sign, .equations"
      ),
    ];
  }

  for await (let equation of equationsGroup) {
    let numbers: number[] = [];

    if ($(equation).hasClass("equation")) {
      for await (let i of $(equation).find("input")) {
        let value = $(i).val() ?? 0,
          finalValue = !Array.isArray(value) ? +value : 0,
          inputIndex = $(i).parent().index(),
          counter = 0;

        finalValue *= 1000;

        for await (let time of times) {
          if (counter >= inputIndex) {
            break;
          }

          finalValue *= time[1] + 1;

          counter++;
        }

        numbers.push(finalValue);
      }

      numbers = [numbers.reduce((sum, index) => (sum += index), 0)];

      equations.push(numbers);
    } else if ($(equation).hasClass("sign")) {
      equations.push($(equation).children(".active").index());
    } else {
      let group = await getEquations([
        ...$(equation)
          .children(".row")
          .children(".equation, .sign, .equations"),
      ]);

      equations.push(group);
    }
  }

  if (equations.length === 0) {
    equations = [0];
  }

  return equations;
};

export default getEquations;
