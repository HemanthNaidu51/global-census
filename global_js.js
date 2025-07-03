// Demo census data
const censusData = {
  countries: [
    {
      name: "China",
      population: 1412000000,
      area: 9596960,
      capital: "Beijing",
      region: "asia",
      growth: 0.34,
    },
    {
      name: "India",
      population: 1380000000,
      area: 3287263,
      capital: "New Delhi",
      region: "asia",
      growth: 1.04,
    },
    {
      name: "United States",
      population: 331000000,
      area: 9833517,
      capital: "Washington, D.C.",
      region: "north-america",
      growth: 0.59,
    },
    {
      name: "Indonesia",
      population: 273000000,
      area: 1904569,
      capital: "Jakarta",
      region: "asia",
      growth: 1.07,
    },
    {
      name: "Pakistan",
      population: 225000000,
      area: 881913,
      capital: "Islamabad",
      region: "asia",
      growth: 2.0,
    },
    {
      name: "Brazil",
      population: 213000000,
      area: 8514877,
      capital: "Brasília",
      region: "south-america",
      growth: 0.72,
    },
    {
      name: "Nigeria",
      population: 211000000,
      area: 923768,
      capital: "Abuja",
      region: "africa",
      growth: 2.58,
    },
    {
      name: "Bangladesh",
      population: 166000000,
      area: 147570,
      capital: "Dhaka",
      region: "asia",
      growth: 1.01,
    },
    {
      name: "Russia",
      population: 146000000,
      area: 17098242,
      capital: "Moscow",
      region: "europe",
      growth: -0.04,
    },
    {
      name: "Mexico",
      population: 129000000,
      area: 1964375,
      capital: "Mexico City",
      region: "north-america",
      growth: 1.06,
    },
    {
      name: "Japan",
      population: 125000000,
      area: 377975,
      capital: "Tokyo",
      region: "asia",
      growth: -0.3,
    },
    {
      name: "Ethiopia",
      population: 118000000,
      area: 1104300,
      capital: "Addis Ababa",
      region: "africa",
      growth: 2.57,
    },
    {
      name: "Philippines",
      population: 110000000,
      area: 300000,
      capital: "Manila",
      region: "asia",
      growth: 1.35,
    },
    {
      name: "Egypt",
      population: 104000000,
      area: 1001449,
      capital: "Cairo",
      region: "africa",
      growth: 1.94,
    },
    {
      name: "Vietnam",
      population: 98000000,
      area: 331212,
      capital: "Hanoi",
      region: "asia",
      growth: 0.91,
    },
    {
      name: "Germany",
      population: 83000000,
      area: 357022,
      capital: "Berlin",
      region: "europe",
      growth: 0.32,
    },
    {
      name: "Turkey",
      population: 84000000,
      area: 783562,
      capital: "Ankara",
      region: "europe",
      growth: 1.09,
    },
    {
      name: "Iran",
      population: 84000000,
      area: 1648195,
      capital: "Tehran",
      region: "asia",
      growth: 1.3,
    },
    {
      name: "France",
      population: 68000000,
      area: 551695,
      capital: "Paris",
      region: "europe",
      growth: 0.22,
    },
    {
      name: "United Kingdom",
      population: 67000000,
      area: 242495,
      capital: "London",
      region: "europe",
      growth: 0.53,
    },
    {
      name: "Italy",
      population: 60000000,
      area: 301340,
      capital: "Rome",
      region: "europe",
      growth: -0.13,
    },
    {
      name: "South Africa",
      population: 60000000,
      area: 1221037,
      capital: "Cape Town",
      region: "africa",
      growth: 1.28,
    },
    {
      name: "Tanzania",
      population: 59000000,
      area: 947303,
      capital: "Dodoma",
      region: "africa",
      growth: 2.98,
    },
    {
      name: "Myanmar",
      population: 55000000,
      area: 676578,
      capital: "Naypyidaw",
      region: "asia",
      growth: 0.67,
    },
    {
      name: "South Korea",
      population: 52000000,
      area: 100210,
      capital: "Seoul",
      region: "asia",
      growth: 0.09,
    },
    {
      name: "Australia",
      population: 26000000,
      area: 7692024,
      capital: "Canberra",
      region: "oceania",
      growth: 1.18,
    },
    {
      name: "Canada",
      population: 38000000,
      area: 9984670,
      capital: "Ottawa",
      region: "north-america",
      growth: 0.89,
    },
    {
      name: "Monaco",
      population: 39000,
      area: 2.02,
      capital: "Monaco",
      region: "europe",
      growth: 0.71,
    },
  ],
};

let currentData = censusData.countries;
let filteredData = currentData;

function formatNumber(num) {
  if (num >= 1e9) return (num / 1e9).toFixed(1) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";
  return num.toString();
}

function calculateDensity(population, area) {
  return Math.round(population / area);
}

function updateData() {
  const region = document.getElementById("regionSelect").value;
  const sortBy = document.getElementById("sortBy").value;

  // Filter by region
  if (region === "all") {
    filteredData = currentData;
  } else {
    filteredData = currentData.filter((country) => country.region === region);
  }

  // Sort data
  filteredData.sort((a, b) => {
    switch (sortBy) {
      case "population":
        return b.population - a.population;
      case "area":
        return b.area - a.area;
      case "density":
        return (
          calculateDensity(b.population, b.area) -
          calculateDensity(a.population, a.area)
        );
      case "growth":
        return b.growth - a.growth;
      default:
        return b.population - a.population;
    }
  });

  updateTable();
  updateChart();
  updateStats();
}

function updateTable() {
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";

  filteredData.forEach((country) => {
    const row = document.createElement("tr");
    row.innerHTML = `
                    <td><strong>${country.name}</strong></td>
                    <td>${formatNumber(country.population)}</td>
                    <td>${formatNumber(country.area)}</td>
                    <td>${formatNumber(
                      calculateDensity(country.population, country.area)
                    )}</td>
                    <td>${country.growth > 0 ? "+" : ""}${country.growth}%</td>
                    <td>${country.capital}</td>
                `;
    tableBody.appendChild(row);
  });
}

function updateChart() {
  const chart = document.getElementById("populationChart");
  chart.innerHTML = "";

  const top10 = filteredData.slice(0, 10);
  const maxPopulation = Math.max(...top10.map((c) => c.population));

  top10.forEach((country) => {
    const barContainer = document.createElement("div");
    barContainer.className = "bar";

    const width = (country.population / maxPopulation) * 100;
    barContainer.style.width = width + "%";

    barContainer.innerHTML = `
                    <span class="bar-label">${country.name}</span>
                    <span class="bar-value">${formatNumber(
                      country.population
                    )}</span>
                `;

    chart.appendChild(barContainer);
  });
}

function updateStats() {
  const totalPop = filteredData.reduce(
    (sum, country) => sum + country.population,
    0
  );
  const avgGrowth =
    filteredData.reduce((sum, country) => sum + country.growth, 0) /
    filteredData.length;
  const mostPopulous = filteredData.reduce(
    (max, country) => (country.population > max.population ? country : max),
    filteredData[0]
  );
  const mostDense = filteredData.reduce(
    (max, country) =>
      calculateDensity(country.population, country.area) >
      calculateDensity(max.population, max.area)
        ? country
        : max,
    filteredData[0]
  );

  document.getElementById("totalPopulation").textContent =
    formatNumber(totalPop);
  document.getElementById("mostPopulous").textContent = mostPopulous.name;
  document.getElementById("avgGrowthRate").textContent =
    (avgGrowth > 0 ? "+" : "") + avgGrowth.toFixed(2) + "%";
  document.getElementById("mostDense").textContent = mostDense.name;
}

function filterCountries() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();

  if (searchTerm === "") {
    updateData();
    return;
  }

  filteredData = currentData.filter(
    (country) =>
      country.name.toLowerCase().includes(searchTerm) ||
      country.capital.toLowerCase().includes(searchTerm)
  );

  updateTable();
  updateChart();
  updateStats();
}

// Initialize the app
updateData();
