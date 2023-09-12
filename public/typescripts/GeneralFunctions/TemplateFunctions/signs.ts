const signs = () => {
  let template = `
    <div class="col-12 col-lg-2 d-flex d-lg-grid gap-lg-1 px-sm-0 px-lg-2 sign">
        <div class="col mx-1 mx-lg-0 col-lg-12 btn active btn-dark">+</div>
        <div class="col mx-1 mx-lg-0 col-lg-12 btn btn-dark">-</div>
        <div class="col mx-1 mx-lg-0 col-lg-12 btn btn-dark">×</div>
        <div class="col mx-1 mx-lg-0 col-lg-12 btn btn-dark">÷</div>
    </div>
    
    `;

  return template;
};

export default signs;
