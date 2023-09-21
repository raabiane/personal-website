// Function to handle clicks on menu links
$('a[href^="#"]').on('click', function(e) {
    e.preventDefault();

    // Get the target ID from the href attribute
    const targetId = $(this).attr('href').substring(1);
    const targetElement = $('#' + targetId);

    if (targetElement.length) {
        // Smooth scroll to the target element
        $('html, body').animate({
            scrollTop: targetElement.offset().top
        }, 'smooth');
    }
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
    const project = $(projectSelector);
    const windowHeight = $(window).height();
    const rect = project[0].getBoundingClientRect();

    if (!animationCompleted[projectName] && rect.top <= windowHeight / 2 && rect.bottom >= 0) {
        // If the project is in the viewport, add the animation class
        const projImageLeft = project.find(animationClass);
        projImageLeft.addClass('animated');

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
$(window).on('scroll', handleScroll);

// Add a load event listener to trigger animations on page load
$(window).on('load', handleScroll);