// Homepage functionality
document.addEventListener('DOMContentLoaded', function() {
    // Make course cards clickable with proper course IDs
    const courseCards = document.querySelectorAll('.course-card');
    
    courseCards.forEach(card => {
        card.addEventListener('click', function() {
            const courseId = this.getAttribute('data-course-id');
            window.location.href = `course-single.html?course=${courseId}`;
        });
    });
    
    // Course single page functionality
    if (document.querySelector('.course-single')) {
        loadCourseData();
    }
});

function loadCourseData() {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('course');
    
    // Sample course data (in real app, this would come from an API)
    const courses = {
        'web-dev': {
            title: "Complete Web Development Bootcamp",
            instructor: "Dr. Angela Yu",
            rating: 4.8,
            reviews: "58,000",
            videoId: "PkZNo7MFNFg",
            modules: [
                {
                    title: "HTML Fundamentals",
                    lessons: [
                        { title: "Introduction to HTML", duration: "10:25", completed: true },
                        { title: "HTML Tags and Elements", duration: "15:42", active: true },
                        { title: "HTML Forms", duration: "12:30" }
                    ]
                },
                {
                    title: "CSS Styling",
                    lessons: [
                        { title: "CSS Basics", duration: "14:20" },
                        { title: "Flexbox Layout", duration: "18:15" }
                    ]
                }
            ]
        },
        'python-data': {
            title: "Python for Data Science",
            instructor: "Jose Portilla",
            rating: 4.7,
            reviews: "42,500",
            videoId: "LHBE6Q9XlzI",
            modules: [
                {
                    title: "Python Basics",
                    lessons: [
                        { title: "Python Syntax", duration: "12:10", completed: true },
                        { title: "Data Types", duration: "14:35", active: true }
                    ]
                }
            ]
        },
        'ux-design': {
            title: "UX Design Fundamentals",
            instructor: "Daniel Walter",
            rating: 4.6,
            reviews: "35,200",
            videoId: "sgqz6f4t4xY",
            modules: [
                {
                    title: "UX Principles",
                    lessons: [
                        { title: "User Research", duration: "16:20", completed: true },
                        { title: "Wireframing", duration: "13:45", active: true }
                    ]
                }
            ]
        }
    };
    
    if (courseId && courses[courseId]) {
        const course = courses[courseId];
        
        // Update page content
        document.title = `${course.title} | LearnHub`;
        document.querySelector('.course-title').textContent = course.title;
        document.getElementById('instructor-name').textContent = course.instructor;
        document.getElementById('course-rating').textContent = course.rating;
        document.getElementById('review-count').textContent = course.reviews;
        
        // Update video
        const iframe = document.getElementById('course-video');
        iframe.src = `https://www.youtube.com/embed/${course.videoId}`;
        
        // Find active lesson
        let activeLesson = null;
        for (const module of course.modules) {
            for (const lesson of module.lessons) {
                if (lesson.active) {
                    activeLesson = lesson;
                    break;
                }
            }
            if (activeLesson) break;
        }
        
        if (activeLesson) {
            document.getElementById('current-lesson').textContent = activeLesson.title;
        }
        
        // Render curriculum
        const modulesContainer = document.getElementById('course-modules');
        modulesContainer.innerHTML = '';
        
        course.modules.forEach(module => {
            const moduleEl = document.createElement('div');
            moduleEl.className = 'module';
            moduleEl.innerHTML = `
                <div class="module-header">
                    <h3>${module.title}</h3>
                    <span>${module.lessons.length} lectures • ${calculateModuleDuration(module.lessons)}</span>
                </div>
                <ul class="lessons">
                    ${module.lessons.map(lesson => `
                        <li class="${lesson.completed ? 'completed' : ''} ${lesson.active ? 'active' : ''}">
                            <i class="fas ${lesson.completed ? 'fa-check-circle' : lesson.active ? 'fa-play-circle' : 'fa-lock'}"></i>
                            <span>${lesson.title}</span>
                            <span class="duration">${lesson.duration}</span>
                        </li>
                    `).join('')}
                </ul>
            `;
            modulesContainer.appendChild(moduleEl);
        });
    }
}

function calculateModuleDuration(lessons) {
    // Simple duration calculation - in a real app you'd parse the times
    return `${lessons.length * 15} min`;
}