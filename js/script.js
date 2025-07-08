const API_KEY = '386740dB'; // Replace with your actual key if you have one
const API_URL = 'https://api.nasa.gov/planetary/apod';

const gallery = document.getElementById('gallery');
const getImagesBtn = document.getElementById('getImages');
const loadingMsg = document.getElementById('loadingMsg');

// Helper: Get dates from inputs
function getDateRange() {
  const start = document.getElementById('startDate').value;
  const end = document.getElementById('endDate').value;
  return { start, end };
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

// Event Listener
getImagesBtn.addEventListener('click', fetchAPOD);
