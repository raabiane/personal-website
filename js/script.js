// Function to handle clicks on menu links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        // Get the target ID from the href attribute
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            // Smooth scroll to the target element
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Initialize an object to track the completion of animations for specific projects
let animationCompleted = {
    projectOne: false,
    projectTwo: false,
    projectThree: false,
    projectFour: false,
    projectFive: false,
};

// Function to check if a project is visible and trigger animation if not completed
function checkProjectVisibility(projectSelector, projectName, animationClass) {
    const project = document.querySelector(projectSelector);
    const windowHeight = window.innerHeight;
    const rect = project.getBoundingClientRect();

    if (!animationCompleted[projectName] && rect.top <= windowHeight / 2 && rect.bottom >= 0) {
        // If the project is in the viewport, add the animation class
        const projImageLeft = project.querySelector(animationClass);
        projImageLeft.classList.add('animated');

        // Mark the animation as completed for this project
        animationCompleted[projectName] = true;
    }
}

// Function to handle the scroll event
function handleScroll() {
    // Check the visibility of specific projects and trigger animations
    checkProjectVisibility('.proj-one', 'projectOne', '.proj-image-left');
    checkProjectVisibility('.proj-two', 'projectTwo', '.proj-image-right');
    checkProjectVisibility('.proj-three', 'projectThree', '.proj-image-left');
    checkProjectVisibility('.proj-four', 'projectFour', '.proj-image-right');
    checkProjectVisibility('.proj-five', 'projectFive', '.proj-image-left');
}

// Add a scroll event listener to trigger animations on scroll
window.addEventListener('scroll', handleScroll);

// Add a load event listener to trigger animations on page load
window.addEventListener('load', handleScroll);