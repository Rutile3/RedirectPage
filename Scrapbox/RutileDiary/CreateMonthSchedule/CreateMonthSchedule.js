(function () {
  const project_url = "RutileDiary";

  const day_of_week = ["日", "月", "火", "水", "木", "金", "土"];
  function getWeek(date) { return day_of_week[date.getDay()]; }
  function getYY(date) { return (""  + (date.getFullYear() )).slice(-2); }
  function getMM(date) { return ("0" + (date.getMonth() + 1)).slice(-2); }
  function getDD(date) { return ("0" +  date.getDate()      ).slice(-2); }
  function getYYMM(date) { return getYY(date) + getMM(date); }
  function getMonthDays(date) { return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(); }

  // URLパラメータから指定年月を取得しDate型で返す
  // URLパラメータに意図した値がない場合は今日を返す
  function getCreateDate() {
    const url_search = location.search.substr(1).split("&")
    for(var i = 0; i < url_search.length; i++) {
      const key = url_search[i].split("=");
      const exist = key[0] === "yymm";
      const is_yymm_format = /^(\d{2}(0[1-9]|1[0-2]))$/.test(key[1]);
      if (exist && is_yymm_format){
        const yy = key[1].substr(0, 2);
        const mm = key[1].substr(2, 2);
        return new Date("20" + yy + "-" + mm);
      }
    }

    return new Date();
  }

  // 月予定表を作成する年月の取得
  const create_date = getCreateDate();
  const yy = getYY(create_date);
  const mm = getMM(create_date);

  // 月予定表を作成する年月の先月と来月
  const last_month = new Date(create_date.getTime());
  const next_month = new Date(create_date.getTime());
  last_month.setMonth(create_date.getMonth() - 1);
  next_month.setMonth(create_date.getMonth() + 1);
  const last_and_next_month = "[**** [" + getYYMM(last_month) + "]←→[" + getYYMM(next_month) + "]]";
  let body = last_and_next_month + "\n\n";

  // カレンダー作成
  body += "[*** 20" + yy + "年" + mm + "月]\n";
  const month_days = getMonthDays(create_date);
  for (let i = 1; i <= month_days; i++) {
    const tmp_date = new Date(create_date.getFullYear(), create_date.getMonth(), i);
    const dd = getDD(tmp_date);
    body += "[" + yy + mm + dd + "] ";
    body += getWeek(tmp_date) + " \n";
  }

  body += "\n" + last_and_next_month + "\n\n";
  body += "#月予定表\n";

  location.href = "https://scrapbox.io/" + project_url + "/" + yy + mm + "?body=" + encodeURIComponent(body);
})();
