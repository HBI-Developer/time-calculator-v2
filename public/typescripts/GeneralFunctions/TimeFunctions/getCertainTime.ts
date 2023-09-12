import { times, currentTime } from "../../variables";

const getCertainTime = (
  index: number = currentTime,
  isName: boolean = false
): number | string => {
  let result = isName ? times[index][0] : times[index][1];

  return result;
};

export default getCertainTime;
