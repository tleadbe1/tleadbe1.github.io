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

// ===============================
// Main button handler
// ===============================
document.getElementById("predict-btn").addEventListener("click", () => {
  const times = [];

  for (let i = 1; i <= 6; i++) {
    const course = document.getElementById(`course-${i}`).value;
    const timeStr = document.getElementById(`time-${i}`).value;

    if (!course || !timeStr) continue;

    const seconds = parseTimeToSeconds(timeStr);

    if (seconds === null) {
      alert(`Invalid time format in row ${i}. Use hh:mm:ss or mm:ss`);
      return;
    }

    times.push(seconds);
  }

  if (times.length === 0) {
    alert("Please enter at least one race time.");
    return;
  }

  // ===============================
  // Placeholder prediction logic
  // Replace this later with your model
  // ===============================
  const predicted = mean(times);
  const uncertainty = stdDev(times);

  // ===============================
  // Display results
  // ===============================
  document.getElementById("predicted-time").textContent =
    formatSeconds(predicted);

  document.getElementById("uncertainty").textContent =
    "± " + formatSeconds(uncertainty);
});
