document.addEventListener("DOMContentLoaded", function () {
  // ✅ Initialize EmailJS with public key
  emailjs.init("NtXNYYPIhxNIUuHzx"); // Replace with your actual PUBLIC key

  // ✅ Smooth scrolling for nav links
  const navLinks = document.querySelectorAll("header nav a");
  navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const className = this.getAttribute("href").substring(1);
      const section = document.getElementById(className);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // ✅ Smooth scroll for About Me button
  const aboutButton = document.querySelector(".btn[href='#About']");
  if (aboutButton) {
    aboutButton.addEventListener("click", function (e) {
      e.preventDefault();
      const section = document.getElementById("About");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
});

function sendEmail() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    alert("Please fill in all fields!");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address!");
    return false;
  }

  const submitButton = document.querySelector(".contact-form button");
  const originalText = submitButton.textContent;
  submitButton.textContent = "Sending...";
  submitButton.disabled = true;

  const params = {
    from_name: name,
    email_id: email,
    message: message
  };

  emailjs.send("service_xyz123", "template_bbl1hxc", params)
    .then(() => {
      alert("Email sent successfully!");
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("message").value = "";
    })
    .catch((err) => {
      console.error("Email sending failed:", err);
      alert("Failed to send message. Please try again later.");
    })
    .finally(() => {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    });

  return false;
}
