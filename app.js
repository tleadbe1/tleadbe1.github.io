// ===============================
// Utility: Parse time string → seconds
// Accepts hh:mm:ss or mm:ss or ss
// ===============================
function parseTimeToSeconds(timeStr) {
  if (!timeStr) return null;

  const parts = timeStr.trim().split(":").map(Number);

  if (parts.some(isNaN)) return null;

  let seconds = 0;

  if (parts.length === 3) {
    seconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
  } else if (parts.length === 2) {
    seconds = parts[0] * 60 + parts[1];
  } else if (parts.length === 1) {
    seconds = parts[0];
  } else {
    return null;
  }

  return seconds;
}

// ===============================
// Utility: seconds → hh:mm:ss
// ===============================
function formatSeconds(seconds,uncert) {
  seconds = Math.round(seconds);

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  return [
    h > 0 ? String(h).padStart(2,"0") : null,
    String(m).padStart(2, "0"),
    String(s).padStart(2, "0"),
  ]
    .filter(Boolean)
    .join(":") + " +/- " + 
    [h > 0 ? "00" : null,"00",String(uncert).padStart(2,"0")]
    .filter(Boolean)
    .join(":");
}


// ===========================================
// Translate times from courses to state times
// ===========================================

function compTimes(time,course) {
  if (course === 1) {
    return  [time*1.01,60]
  } else if (course === 2) { 
    return [time*1.557,30]
  } else if (course === 3) {
    return [time*0.998,35]
  } else if (course === 4) {
    return [time*1.02,30]
  } else if (course === 5) {
    return [time*.979,50]
  } else if (course === 6) {
    return [time*1.007,25]
  } else if (course === 7) {
    return [time*1.088,25]
  } else if (course === 8) {
    return [time*1.02,30]
  } else if (course === 9) {
    return [time*1.022,40]
  } else if (course === 10) {
    return [time*1.005,25]
  } else if (course === 11) {
    return [time*1.014,30]
  } else if (course === 12) {
    return [time*.993,30]
  } else if (course === 13) {
    return [time*.993,30]
  } else {
    return [null,null]
  }
}


// ===============================
// Main button handler
// ===============================
document.getElementById("predict-btn").addEventListener("click", () => {
  const times = [];
  const uncertainties = [];

  for (let i = 1; i <= 3; i++) {
    const course = Number(document.getElementById(`course-${i}`).value);
    const timeStr = document.getElementById(`time-${i}`).value;

    if (!course || !timeStr) continue;

    const parsedTime = parseTimeToSeconds(timeStr);

    if (parsedTime === null) {
      alert(`Invalid time format in row ${i}. Use hh:mm:ss or mm:ss`);
      return;
    }

    const [seconds,uncert] = compTimes(parsedTime,course);

    if (seconds === null) {
      alert(`Invalid course chosen in row ${i}.`);
    }
    document.getElementById(`predicted-time-${i}`).textContent = formatSeconds(seconds,uncert);

  }

});
