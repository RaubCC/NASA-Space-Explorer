const API_KEY = 'CiT27T5fvzIgfDABxg5axCev4KGnrKECRUdc954T'; // User's new NASA API key
const API_URL = 'https://api.nasa.gov/planetary/apod';

const gallery = document.getElementById('gallery');
const getImagesBtn = document.getElementById('getImages');
const loadingMsg = document.getElementById('loadingMsg');

// Fun space facts for students
const facts = [
  "A day on Venus is longer than its year.",
  "There are more stars in the universe than grains of sand on Earth.",
  "Neutron stars can spin 600 times per second.",
  "Jupiter’s Great Red Spot is a giant storm bigger than Earth!",
  "The hottest planet isn’t the closest one to the Sun."
];

// Show a random fact in the fact box
function showRandomFact() {
  const factBox = document.getElementById('spaceFact');
  const fact = facts[Math.floor(Math.random() * facts.length)];
  factBox.textContent = `Did you know? ${fact}`;
}

// Show a random fact when the page loads
window.onload = showRandomFact;

// Helper: Get dates from inputs
function getDateRange() {
  const start = document.getElementById('startDate').value;
  const end = document.getElementById('endDate').value;
  return { start, end };
}

// Display the gallery of images or videos
function displayGallery(items) {
  // Clear the gallery first
  gallery.innerHTML = '';

  // Loop through each item in the array
  items.forEach(item => {
    // Create a new div for each gallery card
    const card = document.createElement('div');
    card.className = 'gallery-card';

    // Check if the item is an image
    if (item.media_type === 'image') {
      card.innerHTML = `
        <img src="${item.url}" alt="${item.title}" class="gallery-img" />
        <div class="gallery-title">${item.title}</div>
        <div class="gallery-date">${item.date}</div>
      `;
    } else if (item.media_type === 'video') {
      // If it's a video, show a play icon and link to the video
      card.innerHTML = `
        <a href="${item.url}" target="_blank">
          <img src="https://img.icons8.com/ios-filled/100/000000/youtube-play.png" alt="YouTube Video" class="gallery-img" />
        </a>
        <div class="gallery-title">${item.title} (Video)</div>
        <div class="gallery-date">${item.date}</div>
      `;
    }

    // Add a click event to open a modal (function should be defined elsewhere)
    card.addEventListener('click', () => openModal(item));
    // Add the card to the gallery
    gallery.appendChild(card);
  });
}

// Fetch APOD images for date range
async function fetchAPOD() {
  const { start, end } = getDateRange();
  loadingMsg.style.display = 'block';
  loadingMsg.textContent = '🔄 Loading space photos…';
  gallery.innerHTML = '';

  try {
    const res = await fetch(`${API_URL}?api_key=${API_KEY}&start_date=${start}&end_date=${end}`);
    if (!res.ok) throw new Error('Failed to fetch NASA data');
    const data = await res.json();
    displayGallery(data);
  } catch (err) {
    loadingMsg.textContent = 'Error loading images. Please try again.';
    console.error(err);
  } finally {
    loadingMsg.style.display = 'none';
  }
}

// Get modal elements
const modal = document.getElementById('modal');
const modalDetails = document.getElementById('modal-details');
const closeBtn = document.querySelector('.close-btn');

// Function to open the modal with item details
function openModal(item) {
  // If the item is an image, show the image and details
  if (item.media_type === 'image') {
    modalDetails.innerHTML = `
      <img src="${item.hdurl || item.url}" alt="${item.title}" class="modal-img" />
      <h2>${item.title}</h2>
      <p><strong>Date:</strong> ${item.date}</p>
      <p>${item.explanation}</p>
    `;
  } else if (item.media_type === 'video') {
    // If the item is a video, show the video and details
    modalDetails.innerHTML = `
      <iframe width="100%" height="400" src="${item.url}" frameborder="0" allowfullscreen></iframe>
      <h2>${item.title}</h2>
      <p><strong>Date:</strong> ${item.date}</p>
      <p>${item.explanation}</p>
    `;
  }
  // Show the modal
  modal.style.display = 'block';
}

// Close the modal when the close button is clicked
closeBtn.onclick = () => {
  modal.style.display = 'none';
};

// Close the modal when clicking outside the modal content
window.onclick = event => {
  if (event.target == modal) modal.style.display = 'none';
};

// Event Listener
getImagesBtn.addEventListener('click', fetchAPOD);

document.addEventListener('DOMContentLoaded', function() {
  // Example: Select an element and add a click event listener
  const myElement = document.getElementById('myElementId');
  if (myElement) {
    myElement.addEventListener('click', function() {
      // Event handler code goes here
    });
  } else {
    // This will show in the console if the element is not found
    console.error('Element with ID "myElementId" not found.');
  }
});
