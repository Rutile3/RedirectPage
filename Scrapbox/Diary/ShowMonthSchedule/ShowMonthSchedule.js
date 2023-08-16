
(() => {
  // URLパラメータを連想配列で取得します。
  const getUrlParameters = () => {
    let params = {};

    // 先頭の一文字の「?」を削除し、「&」区切りで各パラメータ取得し、
    // "="でパラメータ名と値を分割し連想配列で取得する
    location.search.substr(1).split("&").forEach(e => {
      let param = e.split("=");
      params[param[0]] = param[1];
    });

    return params
  }

  // URLパラメータからプロジェクトのURLを取得します。
  const getProjectUrl = (url_params) => {
    // 要素と値が存在する場合
    if (url_params["project_url"]) {
      return "https://scrapbox.io/" + url_params["project_url"] + "/"
    }
    else {
      return "https://scrapbox.io/Rutile3-Test/"
    }
  }

  // URLパラメータから指定年月をDate型で取得します。
  const getCreateDate = (url_params) => {
    if (url_params["yymm"] && /^(\d{2}(0[1-9]|1[0-2]))$/.test(url_params["yymm"])) {
      const yy = url_params["yymm"].substr(0, 2);
      const mm = url_params["yymm"].substr(2, 2);
      return new Date("20" + yy + "-" + mm);
    }
    else {
      return new Date();
    }
  }

  // URLパラメータとリダイレクトするプロジェクトのURLを取得
  const url_params  = getUrlParameters();
  const project_url = getProjectUrl(url_params);

  const date = getCreateDate(url_params);
  const yy = (""  + (date.getFullYear() )).slice(-2);
  const mm = ("0" + (date.getMonth() + 1)).slice(-2);

  location.href = project_url + yy + mm;
})();
