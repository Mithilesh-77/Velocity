
const contactForm = document.getElementById("velocityContactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const phone = document.getElementById("contactPhone").value.trim();
    const subject = document.getElementById("contactSubject").value;
    const message = document.getElementById("contactMessage").value.trim();

    if (!name || !email || !subject || !message) {
        formStatus.textContent = "Please complete all required fields.";
        return;
    }

    formStatus.textContent =
        "Thank you, " + name + "! Your demo enquiry has been received.";

    console.log("VELOCITY Demo Enquiry:", {
        name,
        email,
        phone,
        subject,
        message
    });

    contactForm.reset();
});
