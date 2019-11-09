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
  document.getElementById("utc-time").textContent = moment()
    .utc()
    .format("hh:mm:ss a");
  document.getElementById("utc-24-hour-time").textContent = moment()
    .utc()
    .format("HH:mm:ss");
}

getLegacyTimes();
setInterval(() => {
  getLegacyTimes();
}, 1000);

function showMilliseconds() {
  document.getElementById(
    "unix-time-milliseconds"
  ).textContent = moment().valueOf();
}

showMilliseconds();
setInterval(() => {
  showMilliseconds();
}, 1);
