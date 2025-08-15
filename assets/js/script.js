// Check progress on page load
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.course').forEach(course => {
        const courseId = course.dataset.id;
        if (localStorage.getItem(courseId) === 'completed') {
            markComplete(courseId, false); // false = don’t save again
        }
    });
});

// Mark course as complete
function markComplete(courseId, save = true) {
    const course = document.querySelector(`.course[data-id="${courseId}"]`);
    const progress = course.querySelector('.progress');

    // Animate progress bar
    progress.style.width = '100%';

    // Add completed styling
    course.classList.add('completed');

    if (save) {
        // Save to localStorage
        localStorage.setItem(courseId, 'completed');
    }
}
