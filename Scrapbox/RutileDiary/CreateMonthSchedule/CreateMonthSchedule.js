(function () {
  const project_url = "RutileDiary";

  const day_of_week = ["日", "月", "火", "水", "木", "金", "土"];
  function getWeek(date) { return day_of_week[date.getDay()]; }
  function getYY(date) { return (""  + (date.getFullYear() )).slice(-2); }
  function getMM(date) { return ("0" + (date.getMonth() + 1)).slice(-2); }
  function getYYMM(date) { return getYY(date) + getMM(date); }
  function getMonthDays(date) { return new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate(); }

  // 今月
  const today = new Date();
  const today_yy = getYY(today);
  const today_mm = getMM(today);
  const today_yymm = today_yy + today_mm;

  // 先月の来月
  const last_month = new Date();
  const next_month = new Date();
  last_month.setMonth(today.getMonth() - 1);
  next_month.setMonth(today.getMonth() + 1);
  const last_and_next_month = "[**** [" + getYYMM(last_month) + "]←→[" + getYYMM(next_month) + "]]";
  let body = last_and_next_month + "\n\n";

  // カレンダー
  body += "[*** 20" + today_yy + "年" + today_mm + "月]\n";
  const month_days = getMonthDays(today);
  for (let i = 1; i <= month_days; i++) {
    const tmp_date = new Date(today.getFullYear(), today.getMonth(), i);
    const tmp_dd = ("0" + i).slice(-2);
    body += "[" + today_yymm + tmp_dd + "] ";
    body += getWeek(tmp_date) + " \n";
  }

  body += "\n" + last_and_next_month + "\n\n";
  body += "#月予定表\n";

  location.href = "https://scrapbox.io/" + project_url + "/" + today_yymm + "?body=" + encodeURIComponent(body);
})();
