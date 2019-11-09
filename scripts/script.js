function getSwatchTime() {
  // Swatch Internet Time
  const dt = new Date();
  document.getElementById("swatch-time").textContent = (
    Math.floor(
      ((((dt.getUTCHours() + 1) % 24) +
        dt.getUTCMinutes() / 60 +
        dt.getUTCSeconds() / 3600) *
        1000) /
        24
    ) / 1000
  )
    .toFixed(3)
    .substr(2);
}

getSwatchTime();
setInterval(() => {
  getSwatchTime();
}, 1000);

function setSecondsBar() {
  const second = moment().format("ss");
  document.getElementById("seconds-bar").style.width =
    (second / 60) * 100 + 1.666 + "%";
}

function getLegacyTimes() {
  // Unix Time
  document.getElementById("unix-time").textContent = moment().unix();
  // Local Time
  document.getElementById("local-time-hour").textContent = moment().format(
    "hh"
  );
  document.getElementById("local-time").innerHTML = moment().format(
    `${moment().format("ss") % 2 == 0 ? ":" : "\u00A0"}mm`
  );
  document.getElementById("local-time-meridian").textContent = moment().format(
    "a"
  );
  // Local 24-Hour Time
  if (moment().format("HH") > 12 || moment().format("H") === 0) {
    if (document.getElementById("local-24-hour-time-container").hidden) {
      document.getElementById("local-24-hour-time-container").hidden = false;
    }
    document.getElementById(
      "local-24-hour-time-hour"
    ).textContent = moment().format("HH");
    document.getElementById("local-24-hour-time").textContent = moment().format(
      `${moment().format("ss") % 2 == 0 ? ":" : "\u00A0"}mm`
    );
  } else if (!document.getElementById("local-24-hour-time-container").hidden) {
    document.getElementById("local-24-hour-time-container").hidden = true;
  }
  // UTC Time
  document.getElementById("utc-time-hour").textContent = moment()
    .utc()
    .format("hh");
  document.getElementById("utc-time").textContent = moment()
    .utc()
    .format(`${moment().format("ss") % 2 == 0 ? ":" : "\u00A0"}mm`);
  document.getElementById("utc-time-meridian").textContent = moment()
    .utc()
    .format("a");
  // UTC 24-Hour Time
  if (
    moment()
      .utc()
      .format("HH") > 12 ||
    moment()
      .utc()
      .format("H") === 0
  ) {
    if (document.getElementById("utc-24-hour-time-container").hidden) {
      document.getElementById("utc-24-hour-time-container").hidden = false;
    }
    document.getElementById("utc-24-hour-time-hour").textContent = moment()
      .utc()
      .format("HH");
    document.getElementById("utc-24-hour-time").textContent = moment()
      .utc()
      .format(`${moment().format("ss") % 2 == 0 ? ":" : "\u00A0"}mm`);
  } else if (!document.getElementById("utc-24-hour-time-container").hidden) {
    document.getElementById("utc-24-hour-time-container").hidden = true;
  }
  setSecondsBar();
}

function showMilliseconds() {
  document.getElementById("unix-time-milliseconds").textContent = moment()
    .valueOf()
    .toString()
    .slice(-3);
}

function checkMilliseconds() {
  if (
    moment()
      .valueOf()
      .toString()
      .slice(-3, -1) === "00"
  ) {
    clearInterval(syncSeconds);
    setInterval(() => {
      getLegacyTimes();
    }, 1000);
    setTimeout(() => {
      setInterval(() => {
        showMilliseconds();
      }, 1);
    }, 1000);
  }
}

let syncSeconds = setInterval(checkMilliseconds, 10);
