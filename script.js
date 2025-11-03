// Sample Event Data
const events = [
  {
    title: "Garage Nation Brighton",
    date: "Sat, 3rd Dec 2022",
    location: "Brighton",
    time: "11PM - 4AM",
  },
  {
    title: "Garage Nation St Ives UK Tour",
    date: "Sat, 3rd Dec 2022",
    location: "St Ives",
    time: "10PM - 4AM",
  },
  {
    title: "Garage Nation Maidstone",
    date: "Sat, 10th Dec 2022",
    location: "Maidstone",
    time: "9PM - 4AM",
  },
  {
    title: "Garage Natio`n Southampton",
    date: "Sat, 3rd Dec 2022",
    location: "Southampton",
    time: "10PM - 4AM",
  },
];

// Render Events
const eventContainer = document.getElementById("events");

function displayEvents(list) {
  eventContainer.innerHTML = "";
  list.forEach((event) => {
    const div = document.createElement("div");
    div.classList.add("event-card");
    div.innerHTML = `
      <div class="event-info">
        <h3>${event.title}</h3>
        <p>${event.date} • ${event.location} • ${event.time}</p>
      </div>
      <div class="event-actions">
        <button>Buy Ticket</button>
        <button class="more">More Info</button>
      </div>
    `;
    eventContainer.appendChild(div);
  });
}
displayEvents(events);

// Search Filter
const search = document.getElementById("search");
const filter = document.getElementById("filter");

search.addEventListener("input", filterEvents);
filter.addEventListener("change", filterEvents);

function filterEvents() {
  const text = search.value.toLowerCase();
  const selected = filter.value.toLowerCase();

  const filtered = events.filter(
    (ev) =>
      (ev.title.toLowerCase().includes(text) ||
        ev.location.toLowerCase().includes(text)) &&
      (selected === "" || ev.location.toLowerCase() === selected)
  );

  displayEvents(filtered);
}
