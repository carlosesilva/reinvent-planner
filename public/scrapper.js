function retrieveSchedules() {
  return new Promise(function(resolve) {
    const links = document.querySelectorAll(".expandSessionImg:not(.expanded)");
    if (links) {
      console.log("Retrieving schedules...");
      links.forEach(link => link.click());
      setTimeout(function() {
        console.log("Retrieving schedules: SUCCESS");
        resolve();
      }, 2000);
    } else {
      resolve();
    }
  });
}

function processSessions() {
  console.log("Processing sessions...");
  const sessions = [];
  let sessionRows = document.querySelectorAll("#sessionsTab > .sessionRow");
  sessionRows.forEach(session => {
    console.log(`Processing: ${session.getAttribute("id")}`);
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

  console.log("Processing sessions: SUCCESS");
  return sessions;
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
    const date = rawDatetime.split(", ")[1] + " 2019";
    const [timeStart, timeEnd] = rawDatetime.split(", ")[2].split(" - ");
    const datetimeStart = Date.parse(date + "," + timeStart);
    const datetimeEnd = Date.parse(date + "," + timeEnd);
    datetime.start = datetimeStart;
    datetime.end = datetimeEnd;
  } catch (error) {}

  return datetime;
}

function displaySessions(sessions) {
  console.log("");
  const modal = document.createElement("div");
  modal.style.position = "fixed";
  modal.style.top = "0";
  modal.style.width = "100vw";
  modal.style.height = "100vh";
  modal.style.background = "#3338";
  modal.style.display = "grid";
  modal.style.justifyContent = "center";
  modal.style.alignItems = "center";
  modal.addEventListener("click", function(event) {
    if (event.target === this) {
      console.log("Closing...");
      document.body.removeChild(this);
    }
  });

  const modalContent = document.createElement("div");
  modalContent.style.width = "75vw";
  modalContent.style.padding = "2rem";
  modalContent.style.background = "#fff";
  modal.appendChild(modalContent);

  const label = document.createElement("label");
  label.style.fontSize = "20px";
  label.innerHTML = "Sessions info:";
  modalContent.appendChild(label);

  const textarea = document.createElement("textarea");
  textarea.value = JSON.stringify(sessions);
  textarea.style.width = "100%";
  textarea.style.height = "50vh";
  label.appendChild(textarea);

  const sessionsWithoutSchedule = sessions.filter(({ start, end }) =>
    [start, end].includes(null)
  );
  if (sessionsWithoutSchedule) {
    const message = document.createElement("p");
    const sessionsString = sessionsWithoutSchedule
      .map(session => session.abbreviation)
      .join(", ");
    message.innerHTML = `The following sessions do not have schedule information and therefore will not show up on the calendar: ${sessionsString}`;
    modalContent.appendChild(message);
  }

  document.body.appendChild(modal);
}

retrieveSchedules()
  .then(() => processSessions())
  .then(sessions => displaySessions(sessions));
