function getSwatchTime() {
  const dt = new Date();
  document.getElementById("swatch-time").textContent = Math.floor(
    ((((dt.getUTCHours() + 1) % 24) +
      dt.getUTCMinutes() / 60 +
      dt.getUTCSeconds() / 3600) *
      1000) /
      24
  );
}

getSwatchTime();
setInterval(() => {
  getSwatchTime();
}, 1000);

function getLegacyTimes() {
  document.getElementById("unix-time").textContent = moment().unix();
  document.getElementById("local-time").textContent = moment().format(
    "hh:mm:ss a"
  );
  document.getElementById("local-24-hour-time").textContent = moment().format(
    "HH:mm:ss"
  );
  if (moment().format("HH") > 12 || moment().format("H") === 0) {
    if (document.getElementById("local-24-hour-time").hidden) {
      document.getElementById("local-24-hour-time").hidden = false;
      document.getElementById("local-24-hour-time-label").hidden = false;
    }
    document.getElementById("local-24-hour-time").textContent = moment()
      .utc()
      .format("HH:mm:ss");
  } else if (!document.getElementById("local-24-hour-time").hidden) {
    document.getElementById("local-24-hour-time").hidden = true;
    document.getElementById("local-24-hour-time-label").hidden = true;
  }
  document.getElementById("utc-time").textContent = moment()
    .utc()
    .format("hh:mm:ss a");
  if (
    moment()
      .utc()
      .format("HH") > 12 ||
    moment()
      .utc()
      .format("H") === 0
  ) {
    if (document.getElementById("utc-24-hour-time").hidden) {
      document.getElementById("utc-24-hour-time").hidden = false;
      document.getElementById("utc-24-hour-time-label").hidden = false;
    }
    document.getElementById("utc-24-hour-time").textContent = moment()
      .utc()
      .format("HH:mm:ss");
  } else if (!document.getElementById("utc-24-hour-time").hidden) {
    document.getElementById("utc-24-hour-time").hidden = true;
    document.getElementById("utc-24-hour-time-label").hidden = true;
  }
}

function showMilliseconds() {
  document.getElementById("unix-time-milliseconds").textContent = moment()
    .valueOf()
    .toString()
    .slice(-3);
}

showMilliseconds();
setInterval(() => {
  showMilliseconds();
}, 1);

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
  }
}

let syncSeconds = setInterval(checkMilliseconds, 10);
