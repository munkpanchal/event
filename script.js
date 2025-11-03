// Event Data with Images
const events = [
  {
    title: "Garage Nation Brighton",
    date: "Sat, 3rd Dec 2022",
    location: "Brighton",
    time: "11PM - 4AM",
    image: "public/1.jpeg",
    day: "03",
    month: "DEC",
  },
  {
    title: "Garage Nation St Ives UK Tour",
    date: "Sat, 3rd Dec 2022",
    location: "St Ives",
    time: "10PM - 4AM",
    image: "public/2.jpeg",
    day: "03",
    month: "DEC",
  },
  {
    title: "Garage Nation Maidstone",
    date: "Sat, 10th Dec 2022",
    location: "Maidstone",
    time: "9PM - 4AM",
    image: "public/3.jpeg",
    day: "10",
    month: "DEC",
  },
  {
    title: "Garage Nation Southampton",
    date: "Sat, 3rd Dec 2022",
    location: "Southampton",
    time: "10PM - 4AM",
    image: "public/4.jpeg",
    day: "03",
    month: "DEC",
  },
];

// Pagination Settings
let currentPage = 1;
const eventsPerPage = 6;

// DOM Elements
const eventContainer = document.getElementById("events");
const searchInput = document.getElementById("search");
const filterSelect = document.getElementById("filter");
const resultsCount = document.getElementById("results-count");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const paginationNumbers = document.getElementById("pagination-numbers");
const newsletterForm = document.getElementById("newsletter-form");

// Filtered Events
let filteredEvents = [...events];

// Render Events
function displayEvents(eventsToDisplay, page = 1) {
  eventContainer.innerHTML = "";

  if (eventsToDisplay.length === 0) {
    eventContainer.classList.add("empty");
    resultsCount.textContent = "No events found";
    updatePagination(0);
    return;
  }

  eventContainer.classList.remove("empty");

  const startIndex = (page - 1) * eventsPerPage;
  const endIndex = startIndex + eventsPerPage;
  const paginatedEvents = eventsToDisplay.slice(startIndex, endIndex);

  paginatedEvents.forEach((event, index) => {
    const eventCard = createEventCard(event, index);
    eventContainer.appendChild(eventCard);
  });

  updateResultsCount(eventsToDisplay.length, page);
  updatePagination(eventsToDisplay.length);
}

// Create Event Card
function createEventCard(event, index) {
  const card = document.createElement("div");
  card.classList.add("event-card");
  card.style.animationDelay = `${index * 0.1}s`;

  // Extract day abbreviation from date
  const dayAbbr = event.date.split(",")[0].toUpperCase();

  card.innerHTML = `
    <div class="event-image-wrapper">
      <img src="${event.image}" alt="${event.title}" class="event-image" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 300%22%3E%3Crect fill=%22%23141414%22 width=%22400%22 height=%22300%22/%3E%3Ctext fill=%22%23FFD700%22 font-family=%22Arial%22 font-size=%2224%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3E${event.title}%3C/text%3E%3C/svg%3E'">
      <div class="event-date-badge">
        <span class="date">${event.day}</span>
        <span class="day">${dayAbbr}</span>
      </div>
    </div>
    <div class="event-content">
      <div class="event-info">
        <h3>${event.title}</h3>
        <div class="event-date">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          ${event.date}
        </div>
        <div class="event-location">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          ${event.location}
        </div>
        <div class="event-time">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          ${event.time}
        </div>
      </div>
      <div class="event-actions">
        <button class="btn-primary" onclick="handleBuyTicket('${event.title}')">Buy Ticket</button>
        <button class="btn-secondary" onclick="handleMoreInfo('${event.title}')">More Info</button>
      </div>
    </div>
  `;

  return card;
}

// Update Results Count
function updateResultsCount(total, page) {
  const start = (page - 1) * eventsPerPage + 1;
  const end = Math.min(page * eventsPerPage, total);
  resultsCount.textContent = `Showing ${start}-${end} of ${total} event${
    total !== 1 ? "s" : ""
  }`;
}

// Update Pagination Controls
function updatePagination(totalEvents) {
  const totalPages = Math.ceil(totalEvents / eventsPerPage);

  // Clear pagination numbers
  paginationNumbers.innerHTML = "";

  if (totalPages <= 1) {
    prevBtn.disabled = true;
    nextBtn.disabled = true;
    return;
  }

  // Previous button
  prevBtn.disabled = currentPage === 1;

  // Page numbers
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    const pageBtn = document.createElement("button");
    pageBtn.textContent = i;
    pageBtn.classList.toggle("active", i === currentPage);
    pageBtn.addEventListener("click", () => {
      currentPage = i;
      displayEvents(filteredEvents, currentPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    paginationNumbers.appendChild(pageBtn);
  }

  // Next button
  nextBtn.disabled = currentPage === totalPages;
}

// Filter Events
function filterEvents() {
  const searchText = searchInput.value.toLowerCase().trim();
  const selectedLocation = filterSelect.value.toLowerCase().trim();

  filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchText) ||
      event.location.toLowerCase().includes(searchText) ||
      event.date.toLowerCase().includes(searchText);

    const matchesLocation =
      selectedLocation === "" ||
      event.location.toLowerCase() === selectedLocation;

    return matchesSearch && matchesLocation;
  });

  currentPage = 1; // Reset to first page
  displayEvents(filteredEvents, currentPage);
}

// Event Handlers
function handleBuyTicket(eventTitle) {
  // You can replace this with actual ticket purchase logic
  alert(`Redirecting to ticket purchase for: ${eventTitle}`);
  // window.location.href = `tickets.html?event=${encodeURIComponent(eventTitle)}`;
}

function handleMoreInfo(eventTitle) {
  // You can replace this with actual more info logic
  const event = events.find((e) => e.title === eventTitle);
  if (event) {
    alert(
      `${eventTitle}\n\nDate: ${event.date}\nLocation: ${event.location}\nTime: ${event.time}`
    );
  }
}

// Newsletter Form Handler
if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailInput = document.getElementById("email");
    const messageDiv = document.getElementById("newsletter-message");
    const email = emailInput.value.trim();

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      messageDiv.textContent = "Please enter a valid email address";
      messageDiv.className = "newsletter-message error";
      return;
    }

    // Simulate API call
    messageDiv.textContent = "Subscribing...";
    messageDiv.className = "newsletter-message";

    setTimeout(() => {
      messageDiv.textContent =
        "Thank you for subscribing! Check your email for confirmation.";
      messageDiv.className = "newsletter-message success";
      emailInput.value = "";

      setTimeout(() => {
        messageDiv.textContent = "";
        messageDiv.className = "newsletter-message";
      }, 5000);
    }, 1000);
  });
}

// Pagination Event Handlers
prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displayEvents(filteredEvents, currentPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

nextBtn.addEventListener("click", () => {
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    displayEvents(filteredEvents, currentPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

// Search and Filter Event Listeners
searchInput.addEventListener("input", filterEvents);
filterSelect.addEventListener("change", filterEvents);

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  displayEvents(events, currentPage);

  // Add smooth scroll behavior
  document.querySelector(".scroll-indicator")?.addEventListener("click", () => {
    document.querySelector(".search-section").scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Keyboard Navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && currentPage > 1) {
    prevBtn.click();
  } else if (e.key === "ArrowRight") {
    const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
    if (currentPage < totalPages) {
      nextBtn.click();
    }
  }
});
