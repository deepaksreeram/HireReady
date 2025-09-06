// DOM elements
const formScreen = document.getElementById("formScreen");
const analyzeScreen = document.getElementById("analyzeScreen");
const resumeForm = document.getElementById("resumeForm");
const backBtn = document.getElementById("backBtn");
const analyzeMessage = document.getElementById("analyzeMessage");
const spinner = document.querySelector(".spinner");

// Form submission
resumeForm.addEventListener("submit", async function(e) {
  e.preventDefault();

  // Switch to analyzing screen
  formScreen.style.display = "none";
  analyzeScreen.style.display = "block";

  // Show spinner and initial analyzing message
  spinner.style.display = "block";
  analyzeMessage.textContent = "Analyzing Resume...";
  analyzeMessage.className = "message";

  const formData = new FormData(resumeForm);

  try {
    const response = await fetch("https://lehojaf181.app.n8n.cloud/webhook/41878c95-75bb-4932-8588-4dd54221e4f8", {
      method: "POST",
      body: formData
    });

    // Hide spinner after response
    spinner.style.display = "none";

    // Update message based on response
    if (response.ok) {
      analyzeMessage.textContent = "Check your email for your ATS Resume Score and Personalized Interview Preparation Report.";
      analyzeMessage.className = "message success";
      resumeForm.reset(); // reset form after success
    } else {
      analyzeMessage.textContent = "Something went wrong. Please try again.";
      analyzeMessage.className = "message error";
    }
  } catch (error) {
    spinner.style.display = "none";
    analyzeMessage.textContent = "Error connecting to server.";
    analyzeMessage.className = "message error";
  }
});

// Back button functionality
backBtn.addEventListener("click", () => {
  analyzeScreen.style.display = "none";
  formScreen.style.display = "block";
  analyzeMessage.textContent = ""; // clear message
  spinner.style.display = "block";  // reset spinner visibility
});
