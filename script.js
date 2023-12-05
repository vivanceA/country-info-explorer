function getCountryInfo() {
    const countryInput = document.getElementById('countryInput').value;
    const apiUrl = `https://restcountries.com/v3.1/name/${countryInput}`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        displayCountryInfo(data);
      })
      .catch(error => {
        displayError("Country not found. Please check the name and try again.");
      });
  }

function displayCountryInfo(countryData) {
    const countryInfoContainer = document.getElementById('countryInfo');
    countryInfoContainer.innerHTML = '';

    const country = countryData[0];

    const countryName = country.name.common;
    const capital = country.capital[0];
    const population = country.population.toLocaleString();
    const flagUrl = country.flags.png;
    const region = country.region;
    const subregion = country.subregion;
    const languages = Object.values(country.languages).join(', ');
    const currencies = Object.values(country.currencies).map(currency => `${currency.name} (${currency.symbol})`).join(', ');
    const area = country.area.toLocaleString();
    const borders = country.borders || [];

    const countryInfoHTML = `
    <h2>${countryName}</h2>
    <img src="${flagUrl}" alt="${countryName} Flag" style="max-width: 100px;">
    <p><strong>Capital:</strong> ${capital}</p>
    <p><strong>Population:</strong> ${population}</p>
    <p><strong>Region:</strong> ${region}</p>
    <p><strong>Subregion:</strong> ${subregion}</p>
    <p><strong>Languages:</strong> ${languages}</p>
    <p><strong>Currency:</strong> ${currencies}</p>
    <p><strong>Area:</strong> ${area} km²</p>
    ${borders.length > 0 ? `<p><strong>Borders:</strong> ${borders.join(', ')}</p>` : ''}
    `;

    countryInfoContainer.innerHTML = countryInfoHTML;

    adjustContainerSize();
}
    
function adjustContainerSize() {
    const countryInfoContainer = document.getElementById('countryInfo');
    const container = document.querySelector('.container');
    const containerPadding = 20;

    const contentWidth = countryInfoContainer.offsetWidth;
    container.style.width = `${contentWidth + 2 * containerPadding}px`;

    const maxWidth = 600;
    container.style.maxWidth = `${Math.min(contentWidth + 2 * containerPadding, maxWidth)}px`;
}
  
  
  
function displayError(errorMessage) {
const countryInfoContainer = document.getElementById('countryInfo');
countryInfoContainer.innerHTML = `<p style="color: red;">${errorMessage}</p>`;
}
