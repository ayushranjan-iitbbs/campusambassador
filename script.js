const countUp = (el, target, suffix = "", speed = 25) => {
  let count = 0;
  const update = () => {
    if (count < target) {
      count += Math.ceil((target - count) / speed);
      el.textContent = `${count}${suffix}`;
      requestAnimationFrame(update);
    } else {
      el.textContent = `${target}${suffix}`;
    }
  };
  update();
};

const animateDecimal = (el, start, end, step, delay = 300) => {
  let current = start;
  const interval = setInterval(() => {
    el.textContent = current.toFixed(1);
    current += step;
    if (current >= end) {
      el.textContent = end.toFixed(1);
      clearInterval(interval);
    }
  }, delay);
};

window.addEventListener("load", () => {
  countUp(document.getElementById("studentsCount"), 1200, "+");
  animateDecimal(document.getElementById("editionCount"), 1.0, 2.0, 0.5);
  countUp(document.getElementById("impressionsCount"), 55000, "+");
});

const scriptURL = "https://script.google.com/macros/s/AKfycbzJQervZFO6R1vh8DkiEdvePzmc71s7iS_DNKjRQ5maQNRvLJmXIj_0D6fufdDLLaB1/exec";

document.getElementById("caForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const form = e.target;
  const statusEl = document.getElementById("uploadStatus");
  const formData = new FormData(form);

  statusEl.textContent = "⏳ Submitting your form...";

  try {
    const payload = new URLSearchParams({
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      university: formData.get("university"),
      year: formData.get("year"),
    });

    const response = await fetch(scriptURL, {
      method: "POST",
      body: payload,
    });

    const resultText = await response.text();
    if (resultText.toLowerCase().includes("success")) {
  statusEl.textContent = "✅ Form submitted successfully!";
  alert("🎉 Form submitted successfully!");
  form.reset();
}
 else {
      statusEl.textContent = "❌ Submission failed: " + resultText;
    }
  } catch (error) {
    console.error(error);
    statusEl.textContent = "❌ Error occurred. Try again!";
  }
});
