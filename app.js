window.onload = function () {
  fetch("/ask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: "Generate a unique survey question about AI in daily life." })
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById("question").textContent = data.reply;
    })
    .catch(() => {
      document.getElementById("question").textContent = "⚠️ Could not load question.";
    });
};

function submitAnswer() {
  const inputBox = document.getElementById("user-input");
  const responseBox = document.getElementById("ai-response");
  const userText = inputBox.value.trim();

  if (!userText) {
    responseBox.textContent = "Please type your answer first.";
    responseBox.classList.remove("hidden");
    return;
  }

  responseBox.classList.remove("hidden");
  responseBox.textContent = "🤖 Typing...";

  fetch("/ask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: userText })
  })
    .then(res => res.json())
    .then(data => {
      responseBox.textContent = data.reply;
    })
    .catch(() => {
      responseBox.textContent = "⚠️ Something went wrong. Try again.";
    });
}
