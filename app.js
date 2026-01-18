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
function formatSeconds(seconds) {
  seconds = Math.round(seconds);

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  return [
    h > 0 ? h : null,
    String(m).padStart(2, "0"),
    String(s).padStart(2, "0"),
  ]
    .filter(Boolean)
    .join(":");
}

// ===============================
// Compute mean and std deviation
// ===============================
function mean(values) {
  return values.reduce((a, b) => a + b, 0) / values.length;
}

function stdDev(values) {
  const avg = mean(values);
  const variance = mean(values.map(v => (v - avg) ** 2));
  return Math.sqrt(variance);
}

function min(values) {
  return values.reduce((a,b) => a < b ? a : b,0)
}

// ===========================================
// Translate times from courses to state times
// ===========================================

function compTimes(time,course) {
  if (course === 1) {
    return  [time*.956457 + 93.4861,time*0.030158]
  } else if (course === 2) { 
    return [time*1.41337 + 99.3883,time*0.0452319]
  } else if (course === 3) {
    return [time*0.933274 + 70.8717,time*0.0172409]
  } else if (course === 4) {
    return [time*0.900216 + 103.754,time*0.0285823]
  } else if (course === 5) {
    return [time*1.001581 + 18.31618,time*0.0233544]
  } else if (course === 6) {
    return [time*0.908385 + 86.901663, time*0.0315955]
  } else if (course === 7) {
    return [time*0.965143 + 42.78563,time*0.02091025]
  } else if (course === 8) {
    return [time*1.094919 -9.91521055,time*0.020439492]
  } else if (course === 9) {
    return [time*0.950965446 + 69.367719,time*0.031628831]
  } else if (course === 10) {
    return [time*1.0267235 - 10.0231988,time*0.02468759]
  } else if (course === 11) {
    return [time*1.4242797 + 77.3506445,time*0.047904107]
  } else if (course === 12) {
    return [time*1.003124768 - 2.7617443,time*0.02089123634]
  } else if (course === 13) {
    return [time*.9925081 + 7.09019145,time*0.0211309]
  } else if (course === 14) {
    return [time*1.0075665 + 9.0181786,time*0.027571705]
  } else if (course === 15) {
    return [time*.967820133 + 24.47675622,time*0.02437042755]
  } else if (course === 16) {
    return [time*.96349 + 0.4132932,time*0.0196473709]
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

  for (let i = 1; i <= 6; i++) {
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

    times.push(seconds);
    uncertainties.push(uncert);
  }

  if (times.length === 0) {
    alert("Please enter at least one race time.");
    return;
  }

  
  const predicted = min(times);
  const uncertainty = mean(uncertainties);

  // ===============================
  // Display results
  // ===============================
  document.getElementById("predicted-time").textContent =
    formatSeconds(predicted);

  document.getElementById("uncertainty").textContent =
    "± " + formatSeconds(uncertainty);
});
