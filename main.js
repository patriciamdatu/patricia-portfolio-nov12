const filterLinks = document.querySelectorAll("#links a");
const cards = document.querySelectorAll(".project-card");
const form = document.getElementById("contact");
const successMessage = document.querySelector(".contact-me-success");
const formContainer = document.querySelector(".form-container");
const homeBtn = document.querySelector('.home-btn');
const headerTitle = document.querySelector('.mobile-header-title-container');

if (homeBtn && headerTitle) {
  homeBtn.addEventListener('click', () => {
    if (window.matchMedia("(max-width: 768px)").matches) {

      if (headerTitle.classList.contains("show")) {
        headerTitle.style.maxHeight = "0px";
        headerTitle.classList.remove("show");

      } else {
        headerTitle.classList.add("show");
        headerTitle.style.maxHeight = headerTitle.scrollHeight + "px";
      }

    }
  });
}


filterLinks.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();

        const category = link.textContent.trim(); // get button text

        cards.forEach(card => {
            if (category === "All Projects") {
                card.classList.remove("hide");
            } else if (card.classList.contains(category)) {
                card.classList.remove("hide");
            } else {
                card.classList.add("hide");
            }
        });
    });
});

    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault(); // Prevent the form from submitting traditionally

            const formData = new FormData(form);

            // Send the form data using fetch
            fetch('./send_email.php', {
                method: 'POST',
                body: formData,
            })
                .then(response => response.text()) // Expecting a plain text response
                .then(data => {
                    console.log(data); // For debugging, check the response
                    if (data.includes("Message sent successfully!")) {
                        formContainer.style.display = "none"; // Hide the form container
                        successMessage.style.display = "block"; // Show the success message
                        form.reset(); // Reset the form fields
                        window.scrollTo(0, 0); // Scroll to the top to show the success message
                    } else {
                        alert("There was an issue sending your message. Please try again.");
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                    alert("An unexpected error occurred.");
                });
        });
    }


// Get the container
const container = document.querySelector('.ui-ux-designer');

// Create the dot
const dot = document.createElement('div');
dot.classList.add('moving-dot');
container.appendChild(dot);

// Dimensions
const width = container.clientWidth;
const height = container.clientHeight;
const dotSize = 8;
const speed = 3; 

let x = 0, y = 0;
let direction = 'right';

function animateDot() {
    switch(direction) {
        case 'right':
            if(x < width - dotSize) { x += speed; }
            else direction = 'down';
            break;
        case 'down':
            if(y < height - dotSize) { y += speed; }
            else direction = 'left';
            break;
        case 'left':
            if(x > 0) { x -= speed; }
            else direction = 'up';
            break;
        case 'up':
            if(y > 0) { y -= speed; }
            else direction = 'right';
            break;
    }

    // Center the dot on the line
    dot.style.left = (x - dotSize / 20) + 'px';
    dot.style.top = (y - dotSize / 15) + 'px';

    requestAnimationFrame(animateDot);
}

// Start animation
animateDot();

const card = document.querySelectorAll(".card-container .card");
const experiences = document.querySelectorAll(".experience");

card.forEach(c => {
    c.addEventListener("click", () => {
        const targetClass = c.id.replace("-card", "");

        experiences.forEach(exp => {
            if (exp.classList.contains(targetClass)) {
                if (exp.classList.contains("show")) {
                    // Collapse section
                    exp.style.maxHeight = null; // resets to 0 smoothly
                    exp.classList.remove("show");
                } else {
                    // Expand section to fit content
                    exp.classList.add("show");
                    exp.style.maxHeight = exp.scrollHeight + "px"; // dynamic height
                }
            } else {
                // Collapse other sections
                exp.style.maxHeight = null;
                exp.classList.remove("show");
            }
        });
    });
});
