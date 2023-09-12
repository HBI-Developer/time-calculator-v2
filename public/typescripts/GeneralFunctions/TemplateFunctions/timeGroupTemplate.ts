const timeGroupTemplate = () => {
  let template = `
    <div class="col-12 container card py-2 px-1 equations">
        <div class="col-12 row gy-2 gy-lg-4 mx-auto">
            <div class="col-12 btn btn-primary icon icon-plus add"> Add Time</div>
            <div class="col-12 btn btn-primary icon icon-plus-circle add-group"> Add Time Group</div>
            <div class="col-12 btn btn-danger remove">&times;  Remove</div>
        </div>
    </div>
  `;

  return template;
};

export default timeGroupTemplate;
