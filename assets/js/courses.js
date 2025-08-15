// courses.js — Updated Version

let courses = [];

// Load courses on page load
document.addEventListener('DOMContentLoaded', function () {
    fetch('courses.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            courses = data;
            renderCourses(courses);
            setupFilters();
        })
        .catch(err => {
            console.error("❌ Failed to load courses.json", err);
            // Fallback if JSON fails (optional)
            courses = [
                {
                    id: 1,
                    title: "Complete Web Development Bootcamp",
                    category: "web-dev",
                    level: "Beginner",
                    instructor: "Dr. Angela Yu",
                    rating: 4.8
                },
                {
                    id: 2,
                    title: "Python for Data Science",
                    category: "python",
                    level: "Intermediate",
                    instructor: "Jose Portilla",
                    rating: 4.7
                }
            ];
            renderCourses(courses);
            setupFilters();
        });
});

function renderCourses(coursesToRender) {
    const grid = document.getElementById('coursesGrid');
    if (!grid) {
        console.error("❌ coursesGrid element not found in DOM");
        return;
    }
    grid.innerHTML = '';

    coursesToRender.forEach(course => {
        const card = document.createElement("div");
        card.classList.add("course-card");
        card.setAttribute("data-category", course.category);

        // Image container
        const imgContainer = document.createElement("div");
        imgContainer.classList.add("course-img");

        const img = document.createElement("img");
        img.src = `assets/images/${course.category}.jpg`;
        img.alt = course.title;

        // Handle missing image
        img.onerror = function () {
            console.warn(`❌ Missing image: ${img.src}`);
            img.src = "https://via.placeholder.com/300x200?text=Image+Not+Found";
        };

        const levelSpan = document.createElement("span");
        levelSpan.classList.add("course-level");
        levelSpan.textContent = course.level;

        imgContainer.appendChild(img);
        imgContainer.appendChild(levelSpan);

        // Content
        const contentDiv = document.createElement("div");
        contentDiv.classList.add("course-content");

        const title = document.createElement("h3");
        title.textContent = course.title;

        const metaDiv = document.createElement("div");
        metaDiv.classList.add("course-meta");
        metaDiv.innerHTML = `
            <span><i class="fas fa-user"></i> ${course.instructor}</span>
            <span><i class="fas fa-star"></i> ${course.rating}</span>
        `;

        const enrollBtn = document.createElement("a");
        enrollBtn.href = `course-single.html?id=${course.id}`;
        enrollBtn.classList.add("btn", "btn-primary", "enroll-btn");
        enrollBtn.textContent = "Enroll Now";

        contentDiv.appendChild(title);
        contentDiv.appendChild(metaDiv);
        contentDiv.appendChild(enrollBtn);

        // Append everything
        card.appendChild(imgContainer);
        card.appendChild(contentDiv);
        grid.appendChild(card);
    });
}

function setupFilters() {
    // Category filter
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function () {
            const category = this.value;
            const filtered = category === 'all'
                ? courses
                : courses.filter(course => course.category === category);
            renderCourses(filtered);
        });
    }

    // Search functionality
    const courseSearch = document.getElementById('courseSearch');
    if (courseSearch) {
        courseSearch.addEventListener('input', function () {
            const searchTerm = this.value.toLowerCase();
            const filtered = courses.filter(course =>
                course.title.toLowerCase().includes(searchTerm) ||
                course.instructor.toLowerCase().includes(searchTerm)
            );
            renderCourses(filtered);
        });
    }
}
