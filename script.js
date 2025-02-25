document.addEventListener("DOMContentLoaded", function () {
  // Contact Form Submission
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        alert("Please fill in all fields.");
        return;
      }

      // Display success message
      const successMessage = document.createElement("p");
      successMessage.textContent = `Thank you, ${name}! Your message has been sent.`;
      successMessage.style.color = "lime";
      successMessage.style.marginTop = "10px";

      contactForm.appendChild(successMessage);

      // Reset form after a short delay
      setTimeout(() => {
        contactForm.reset();
        successMessage.remove();
      }, 3000);
    });
  }

  // Fade-in effect for Blogs and Games sections
  ["blogs", "games"].forEach((sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.style.opacity = "1";
      section.style.transform = "translateY(0)";
    }
  });

  /// Handle "Read More" in Blogs
// Handle "Read More" in Blogs
document.querySelectorAll(".read-more").forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    alert("Coming Soon! Stay tuned for more details.");
  });
});

// Hide loader after page loads
window.addEventListener("load", function () {
  document.getElementById("loader").style.display = "none";
});


  // Handle "Play Now" in Games (Optional)
  document.querySelectorAll(".game .neon-button").forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      alert("Game is coming soon!");
    });
  });

  // Handle "View More" for projects
  document.querySelectorAll(".view-more").forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      alert("Coming Soon! Stay tuned for more details.");
    });
  });
});
window.addEventListener("load", function () {
    document.getElementById("loader").style.display = "none";
});
