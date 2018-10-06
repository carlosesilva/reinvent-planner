// fetch session time
var links = document.querySelectorAll(".expandSessionImg");
links.forEach(link => link.click());

function getSessions() {
  const sessions = [];
  let sessionRows = document.querySelectorAll("#sessionsTab > .sessionRow");
  sessionRows.forEach(session => {
    console.log(`processing: ${session.getAttribute("id")}`);
    const id = session.getAttribute("id").slice(8);
    const link =
      "https://www.portal.reinvent.awsevents.com/connect/" +
      session.querySelector(".detailColumn > a").getAttribute("href");
    const abbreviation =
      session.querySelector(".detailColumn .abbreviation") &&
      session.querySelector(".detailColumn .abbreviation").textContent &&
      session
        .querySelector(".detailColumn .abbreviation")
        .textContent.trim()
        .split(" ")[0];
    const title = session.querySelector(".detailColumn .title").textContent;
    const type = session.querySelector(".detailColumn .type").textContent;
    const { start, end } = getSessionDatetime(session);
    const location =
      session.querySelector(".actionColumn .sessionRoom") &&
      session.querySelector(".actionColumn .sessionRoom").textContent;

    sessions.push({
      id,
      link,
      abbreviation,
      title,
      type,
      start,
      end,
      location
    });
  });

  console.log(sessions);
  console.log(JSON.stringify(sessions));
}

function getSessionDatetime(session) {
  const datetime = {
    start: null,
    end: null
  };

  try {
    const rawDatetime = session.querySelector(
      ".actionColumn .availableSessions"
    ).childNodes[1].textContent;

    const date = rawDatetime.split(", ")[1] + " 2018";

    const [timeStart, timeEnd] = rawDatetime.split(", ")[2].split(" - ");

    datetimeStart = Date.parse(date + "," + timeStart);
    datetimeEnd = Date.parse(date + "," + timeEnd);

    datetime.start = datetimeStart;
    datetime.end = datetimeEnd;
  } catch (error) {}

  return datetime;
}

setTimeout(getSessions, 5000);
