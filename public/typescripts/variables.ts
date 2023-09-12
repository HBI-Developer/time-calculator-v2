let currentTime: number = sessionStorage.time
  ? parseInt(sessionStorage.time)
  : 0;

const times: [string, number][] = [
    ["seconds", 59],
    ["minutes", 59],
    ["hours", 23],
    ["days", 6],
    ["weeks", 4],
    ["months", 11],
    ["years", 9],
    ["decades", 9],
    ["centuries", 9],
    ["millenia", 0],
  ],
  /**
        @param {number} value
        @void
            Set value in param as new value to currentTime variable with set this value in time property in 
            sessionStorage
    */

  setCurrentTime = (value: number): void => {
    currentTime = value;

    sessionStorage.setItem("time", value.toString());
  };

export { currentTime, times, setCurrentTime };
