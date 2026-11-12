const form = document.querySelector("#notify-form");
const errorMsg = document.querySelector(".error-msg");
const successMsg = document.querySelector(".success-msg");
const emailInput = document.querySelector("#email");

const emailRules = [
  [(value) => value !== "", "Please provide an email"],
  [
    (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    "Please provide a valid email",
  ],
];

function validate(value, rules) {
  for (const [test, message] of rules) {
    if (!test(value)) return message;
  }
  return "";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const error = validate(emailInput.value.trim(), emailRules);

  if (error) {
    successMsg.hidden = true;
    errorMsg.textContent = error;
    errorMsg.hidden = false;
    emailInput.setAttribute("aria-invalid", "true");
    emailInput.focus();
    return;
  }
  errorMsg.hidden = true;
  successMsg.textContent = "Thanks! We'll let you know when we launch.";
  successMsg.hidden = false;
  emailInput.setAttribute("aria-invalid", "false");
  emailInput.value = "";
});

form.addEventListener("input", () => {
  errorMsg.hidden = true;
  successMsg.hidden = true;
  emailInput.setAttribute("aria-invalid", "false");
});
