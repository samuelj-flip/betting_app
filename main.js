// Simple JS for toggling navbar or interactive sections (expand later)
document.addEventListener("DOMContentLoaded", function () {
  console.log("Site loaded!");

  // Example: Highlight today's date if used
  const dateElement = document.querySelector("#todayDate");
  if (dateElement) {
    const today = new Date().toLocaleDateString();
    dateElement.textContent = today;
  }

  // Placeholder for more interactivity later
});

  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");});


    const scoresContainer = document.getElementById("scores");

    async function fetchLiveScores() {
      try {
        const response = await fetch("https://livescore-api.com/api-client/scores/live.json?key=YOUR_API_KEY&secret=YOUR_API_SECRET");
        const data = await response.json();

        if (!data || !data.data || data.data.match.length === 0) {
          scoresContainer.innerHTML = "<p class='text-center text-red-500'>No live matches available right now.</p>";
          return;
        }

        scoresContainer.innerHTML = data.data.match.map(match => `
          <div class="bg-white rounded shadow p-4 mb-4">
            <div class="flex justify-between font-semibold">
              <span>${match.home_name}</span>
              <span class="text-blue-600">${match.score}</span>
              <span>${match.away_name}</span>
            </div>
            <p class="text-sm text-gray-500 text-right mt-2">Status: ${match.status}</p>
          </div>
        `).join('');
      } catch (error) {
        scoresContainer.innerHTML = "<p class='text-center text-red-600'>Error loading live scores. Please try again later.</p>";
        console.error(error);
      }
    }

    fetchLiveScores();
    setInterval(fetchLiveScores, 60000); // Refresh every 60s

  async function getOdds() {
    try {
      const response = await fetch("https://api.the-odds-api.com/v4/sports/soccer_epl/odds?regions=eu&apiKey=YOUR_API_KEY");
      const data = await response.json();

      let output = data.slice(0, 5).map(game => `
        <div class="bg-white shadow p-4 rounded mb-4">
          <h2 class="text-lg font-bold mb-2">${game.home_team} vs ${game.away_team}</h2>
          <p class="text-gray-700">Commence: ${new Date(game.commence_time).toLocaleString()}</p>
          <p class="text-blue-500 font-semibold">Bookmaker: ${game.bookmakers[0]?.title || 'N/A'}</p>
          <div class="mt-2">
            ${game.bookmakers[0]?.markets[0]?.outcomes.map(odd => `
              <p>${odd.name}: <strong>${odd.price}</strong></p>
            `).join('')}
          </div>
        </div>
      `).join("");

      document.getElementById("odds").innerHTML = output;

    } catch (error) {
      console.error("Odds error:", error);
    }
  }

  getOdds();

    async function fetchOdds() {
      const API_KEY = 'YOUR_API_KEY_HERE'; // replace with your key
      const URL = `https://api.the-odds-api.com/v4/sports/soccer_epl/odds?regions=eu&markets=h2h&apiKey=${API_KEY}`;

      try {
        const res = await fetch(URL);
        const data = await res.json();

        let html = data.slice(0, 10).map(match => {
          const bookmaker = match.bookmakers[0];
          const outcomes = bookmaker?.markets[0]?.outcomes || [];

          return `
            <div class="bg-white shadow-md rounded-lg p-4">
              <div class="flex justify-between items-center mb-2">
                <span class="font-bold text-gray-800">${match.home_team}</span>
                <span class="text-gray-500">vs</span>
                <span class="font-bold text-gray-800">${match.away_team}</span>
              </div>
              <div class="grid grid-cols-3 gap-2 text-center mt-2">
                ${outcomes.map(outcome => `
                  <div class="bg-gray-200 p-2 rounded hover:bg-green-200 cursor-pointer">
                    <p class="text-sm">${outcome.name}</p>
                    <p class="font-bold">${outcome.price}</p>
                  </div>
                `).join('')}
              </div>
              <p class="text-right text-xs text-gray-400 mt-2">${new Date(match.commence_time).toLocaleString()}</p>
            </div>
          `;
        }).join('');

        document.getElementById('matches').innerHTML = html;

      } catch (err) {
        console.error(err);
        document.getElementById('matches').innerHTML = `<p class="text-red-500 text-center">Failed to load odds. Check your API key or rate limit.</p>`;
      }
    }

    fetchOdds();

// Flutter payment
function makePayment() {
    FlutterwaveCheckout({
      public_key: "FLWPUBK_TEST-xxxxxxxxxxxxxxxxxxxxx-X",
      tx_ref: "betmaster_" + Date.now(),
      amount: 1000,
      currency: "NGN",
      payment_options: "card,banktransfer,ussd",
      customer: {
        email: "customer@example.com",
        phone_number: "08012345678",
        name: "Customer Name",
      },
      callback: function (data) {
        // Replace with your actual WhatsApp or Telegram link
        window.location.href = "https://wa.me/2348012345678?text=I+just+paid+for+premium+tips";
      },
      customizations: {
        title: "BetMaster Premium",
        description: "₦1000 for Premium Tips",
        logo: "https://your-site.com/logo.png", // optional
      },
    });
  }
  function makePaymentbasic() {
    FlutterwaveCheckout({
      public_key: "FLWPUBK_TEST-xxxxxxxxxxxxxxxxxxxxx-X",
      tx_ref: "betmaster_" + Date.now(),
      amount: 500,
      currency: "NGN",
      payment_options: "card,banktransfer,ussd",
      customer: {
        email: "customer@example.com",
        phone_number: "08012345678",
        name: "Customer Name",
      },
      callback: function (data) {
        // Replace with your actual WhatsApp or Telegram link
        window.location.href = "https://wa.me/2348012345678?text=I+just+paid+for+premium+tips";
      },
      customizations: {
        title: "BetMaster Premium",
        description: "₦500 for Premium Tips",
        logo: "https://your-site.com/logo.png", // optional
      },
    });
  }