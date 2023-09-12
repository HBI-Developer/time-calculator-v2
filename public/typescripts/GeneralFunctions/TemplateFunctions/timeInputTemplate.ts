/**
    @param {string} message
        Title of Inputs [Seconds, Minutes, ...]
    @param {false | number} max
        If passing number then set max property in input with this number, If not passing or passing false
        boolean then don't set anything
    @return {string}
*/
const timeInputTemplate = (message: string, max?: false | number): string => {
  let input: string = `
        <div class="input-group input-group-sm mb-3">
            <span class="input-group-text">${message}</span>
            <input class="form-control" type="number" min="0" ${
              max ? `max='${max}'` : ""
            } value="0" aria-label="${message}">
        </div>
    `;

  return input;
};

export default timeInputTemplate;
