document.getElementById('targetPercent').addEventListener('input', function () {
  document.getElementById('percentLabel').textContent = this.value + '%';
});

function calculateAttendance() {
  const unit = document.getElementById('unit').value;
  let attended = parseFloat(document.getElementById('attended').value);
  let total = parseFloat(document.getElementById('total').value);
  const target = parseFloat(document.getElementById('targetPercent').value);
  const resultDiv = document.getElementById('result');

  if (isNaN(attended) || isNaN(total) || total <= 0 || attended < 0 || attended > total) {
    resultDiv.textContent = 'Please enter valid numbers.';
    return;
  }

  // Convert everything to hours for calculation
  if (unit === 'day') {
    attended *= 6;
    total *= 6;
  }

  const currentPercent = (attended / total) * 100;

  if (currentPercent < target) {
    // How many more classes (X) needed to reach target:
    // (attended + X) / (total + X) >= target
    const required = Math.ceil(((target * total - 100 * attended) / (100 - target)));

    const neededDays = unit === 'day' ? Math.ceil(required / 6) : required;
    resultDiv.innerHTML = `Current Attendance: ${currentPercent.toFixed(2)}%<br>
    You need to attend <strong>${neededDays}</strong> more ${unit === 'day' ? 'day(s)' : 'hour(s)'} to reach ${target}%.`;
  } else {
    // How many classes (X) can you skip:
    // attended / (total + X) >= target
    const maxBunks = Math.floor((100 * attended - target * total) / target);
    const bunkDays = unit === 'day' ? Math.floor(maxBunks / 6) : maxBunks;

    resultDiv.innerHTML = `Current Attendance: ${currentPercent.toFixed(2)}%<br>
    You can skip <strong>${bunkDays}</strong> ${unit === 'day' ? 'day(s)' : 'hour(s)'} without dropping below ${target}%.`;
  }
}
