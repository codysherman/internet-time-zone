function calculateBeat() {
  const dt = new Date();
  return (
    ((((dt.getUTCHours() + 1) % 24) +
      dt.getUTCMinutes() / 60 +
      dt.getUTCSeconds() / 3600 +
      dt.getUTCMilliseconds() / 3600000) *
      1000) /
    24 // Swatch Internet Time is a day divided into 1000 .beats
  );
}

function getSwatchTime() {
  // Swatch Internet Time
  const beat = calculateBeat();
  document.getElementById("swatch-time").textContent =
    (
      Math.floor(
        Math.round(beat * 100) / 100 // Round to consider .995+ as a new beat (inline with centibeat's .00 rounded from .995+)
      ) / 1000 // Divide to allow following steps to add zeros in design
    ) // Divide by 1000 to add zeros before 1-2 digit numbers (25 -> 0.025)
    .toFixed(3) // Add missing ending zeros (0.02 -> 0.020)
    .substr(2); // Remove the leading "0." (0.20 -> 020)
  console.log(beat, (beat % 1).toFixed(2).substr(2))
  document.getElementById("swatch-time-centibeats").textContent =
    "." + (beat % 1).toFixed(2).substr(2);
}

function checkMillibeats() {
  // Check if .millibeat is 0, meaning a new .centibeat started
  if ((calculateBeat() % 1).toFixed(3).substr(4) === "0") {
    clearInterval(syncBeats); // Stop checking if new .centibeat
    setInterval(() => {
      getSwatchTime();
    }, 864); // Update .beat every .centibeat
  }
}

const syncBeats = setInterval(checkMillibeats, 9); // Check when the next second starts, to make time as accurate as possible

function setSecondsBar() {
  const second = moment().format("ss");
  document.getElementById("seconds-bar").style.width =
    (second / 60) * 100 + 1.6667 + "%"; // Add 1.6667 to hit end instead of the final second being 00
}

function getLegacyTimes() {
  // Unix Time
  document.getElementById("unix-time").textContent = moment().unix();
  // UTC Time
  document.getElementById("utc-time-hour").textContent = moment()
    .utc()
    .format("hh");
  document.getElementById("utc-time").textContent = moment()
    .utc()
    .format(`${moment().format("ss") % 2 == 0 ? ":" : "\u00A0"}mm`); // Blink the colon on even numbers
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
      .format("HH") === "00"
  ) {
    if (document.getElementById("utc-24-hour-time-container").hidden) {
      document.getElementById("utc-24-hour-time-container").hidden = false; // Show 24-hour when PM or 12 AM
    }
    document.getElementById("utc-24-hour-time-hour").textContent = moment()
      .utc()
      .format("HH");
    document.getElementById("utc-24-hour-time").textContent = moment()
      .utc()
      .format(`${moment().format("ss") % 2 == 0 ? ":" : "\u00A0"}mm`); // Blink the colon on even numbers
  } else if (!document.getElementById("utc-24-hour-time-container").hidden) {
    document.getElementById("utc-24-hour-time-container").hidden = true; // Hide 24-hour when matches 12-hour
  }
  // Local Time
  document.getElementById("local-time-hour").textContent = moment().format(
    "hh"
  );
  document.getElementById("local-time").innerHTML = moment().format(
    `${moment().format("ss") % 2 == 0 ? ":" : "\u00A0"}mm` // Blink the colon on even numbers
  );
  document.getElementById("local-time-meridian").textContent = moment().format(
    "a" // Add the am or pm
  );
  // Local 24-Hour Time
  if (moment().format("HH") > 12 || moment().format("HH") === "00") {
    if (document.getElementById("local-24-hour-time-container").hidden) {
      document.getElementById("local-24-hour-time-container").hidden = false; // Show 24-hour when PM or 12 AM
    }
    document.getElementById(
      "local-24-hour-time-hour"
    ).textContent = moment().format("HH");
    document.getElementById("local-24-hour-time").textContent = moment().format(
      `${moment().format("ss") % 2 == 0 ? ":" : "\u00A0"}mm` // Blink the colon on even numbers
    );
  } else if (!document.getElementById("local-24-hour-time-container").hidden) {
    document.getElementById("local-24-hour-time-container").hidden = true; // Hide 24-hour when matches 12-hour
  }
  setSecondsBar(); // Update seconds loading bar once a second
}

function showMilliseconds() {
  document.getElementById("unix-time-milliseconds").textContent = moment()
    .valueOf()
    .toString()
    .slice(-3); // Show extra 3 digits from Unix Time Milliseconds separately
}

function checkMilliseconds() {
  if (
    moment()
      .valueOf()
      .toString()
      .slice(-3, -1) === "00" // Check if decisecond and centisecond are 0, meaning a new second started
  ) {
    clearInterval(syncSeconds); // Stop checking if new second
    setInterval(() => {
      getLegacyTimes();
    }, 1000); // Update clocks every second
    setTimeout(() => {
      setInterval(() => {
        showMilliseconds();
      }, 1); // Update Unix Time Milliseconds every "millisecond", actually every 4 milliseconds according to HTML5 spec
      document.getElementById("seconds-bar").hidden = false;
    }, 1000); // Wait a second and then display milliseconds (to match up with whden seconds appear)
  }
}

const syncSeconds = setInterval(checkMilliseconds, 10); // Check when the next second starts, to make time as accurate as possible
