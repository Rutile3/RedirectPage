
(function () {
  const getYY = (date) => { return (""  + (date.getFullYear() )).slice(-2); }
  const getMM = (date) => { return ("0" + (date.getMonth() + 1)).slice(-2); }
  const getDD = (date) => { return ("0" + (date.getDate()     )).slice(-2); }

  // URLパラメータを連想配列で取得します。
  const getUrlParameters = () => {
    let params = {};

    // 先頭の一文字の「?」を削除し、「&」区切りで各パラメータ取得し、
    // "="でパラメータ名と値を分割し連想配列で取得する
    location.search.substr(1).split("&").forEach(e => {
      let param = e.split("=");
      params[param[0]] = param[1];
    });

    return params;
  }

  // URLパラメータからプロジェクトのURLを取得します。
  const getProjectUrl = (url_params) => {
    // 要素と値が存在する場合
    if (url_params["project_url"]) {
      return "https://scrapbox.io/" + url_params["project_url"] + "/";
    }
    else {
      return "https://scrapbox.io/Rutile3-Test/";
    }
  }

  // URLパラメータから指定年月日をDate型で取得します。
  const getCreateDate = (url_params) => {
    if (url_params["yymmdd"] && /^(\d{6})$/.test(url_params["yymmdd"])) {
      const yy = url_params["yymmdd"].substr(0, 2);
      const mm = url_params["yymmdd"].substr(2, 2);
      const dd = url_params["yymmdd"].substr(4, 2);
      const tmp_date = new Date("20" + yy + "-" + mm + "-" + dd);
      // Date型に変換でき、変換結果が元の値と相違が無ければ有効な年月日
      if (yy === getYY(tmp_date) &&
          mm === getMM(tmp_date) &&
          dd === getDD(tmp_date)) {
          return tmp_date;
      }
    }

    return new Date();
  }

  // URLパラメータとリダイレクトするプロジェクトのURLを取得
  const url_params  = getUrlParameters();
  const project_url = getProjectUrl(url_params);

  const date = getCreateDate(url_params);
  const yy = getYY(date);
  const mm = getMM(date);
  const dd = getDD(date);

  location.href = project_url + yy + mm + dd;
})();
