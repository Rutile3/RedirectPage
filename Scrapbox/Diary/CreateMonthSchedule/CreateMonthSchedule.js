
(() => {
  const day_of_week = ["日", "月", "火", "水", "木", "金", "土"];
  const getWeek = (date) => { return day_of_week[date.getDay()]; }
  const getYY = (date) => { return (""  + (date.getFullYear() )).slice(-2); }
  const getMM = (date) => { return ("0" + (date.getMonth() + 1)).slice(-2); }
  const getDD = (date) => { return ("0" + (date.getDate()     )).slice(-2); }
  const getYYMM = (date) => { return getYY(date) + getMM(date); }
  const getMonthDays = (date) => { return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(); }

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

  // 月予定表を作成する年月を取得
  const create_date = getCreateDate(url_params);
  const yy = getYY(create_date);
  const mm = getMM(create_date);

  // 月予定表を作成する年月の先月と来月
  const last_month = new Date(create_date.getTime());
  const next_month = new Date(create_date.getTime());
  last_month.setMonth(create_date.getMonth() - 1);
  next_month.setMonth(create_date.getMonth() + 1);
  const last_and_next_month = "[**** [" + getYYMM(last_month) + "]←→[" + getYYMM(next_month) + "]]";
  let body = last_and_next_month + "\n\n";

  // カレンダーを作成
  body += "[*** 20" + yy + "年" + mm + "月]\n";
  const month_days = getMonthDays(create_date);
  for (let d = 1; d <= month_days; d++) {
    const tmp_date = new Date("20" + yy + "-" + mm + "-" + d);
    const dd = getDD(tmp_date);
    body += "[" + yy + mm + dd + "] "+ getWeek(tmp_date) + " \n";
  }

  body += "\n" + last_and_next_month + "\n\n";
  body += "#月予定表\n";

  location.href = project_url + yy + mm + "?body=" + encodeURIComponent(body);
})();
