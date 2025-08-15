// Sample data - replace with API calls
const enrolledCourses = [
    {
        id: 1,
        title: "Web Development Bootcamp",
        progress: 65,
        lastAccessed: "2 days ago",
        image: "web-dev.jpg"
    },
    {
        id: 2,
        title: "Python Fundamentals",
        progress: 30,
        lastAccessed: "1 week ago",
        image: "python.jpg"
    }
];

document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.course-grid');
    
    enrolledCourses.forEach(course => {
        container.innerHTML += `
            <div class="course-card">
                <div class="course-progress">
                    <div class="progress-bar">
                        <div class="progress" style="width: ${course.progress}%"></div>
                    </div>
                    <span>${course.progress}% Complete</span>
                </div>
                <h3>${course.title}</h3>
                <p>Last accessed: ${course.lastAccessed}</p>
                <a href="course-single.html?id=${course.id}" class="btn btn-primary">
                    Continue Learning
                </a>
            </div>
        `;
    });
});