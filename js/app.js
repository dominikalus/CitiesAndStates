document.addEventListener('DOMContentLoaded', function(){


    const api = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

    const cities = [];

    fetch(api)
        .then(response => response.json()) //data that comes from fetch has to be convertet into json
        .then(data => cities.push(...data)); //another promise that gives raw data,

    function findMatches(wordToMatch, cities){
        return cities.filter(place => {
            //here we need to find out if the city or state matches searched fraze
            //we need a couple of regexes, g - for global , i -ignore capital letters
            const regex = new RegExp(wordToMatch,'gi');
        return place.city.match(regex) || place.state.match(regex)
    });
    }

    // add commas to the population number
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    //display function
    function displayMatches(){
        const matchArray = findMatches(this.value, cities);
        const html = matchArray.map(place =>{
            const regex = new RegExp(this.value, 'gi');
        // highlight the city name
        const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
        // highlight the state name
        const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
        return `
   <li>
                <span class="name">${cityName}, ${stateName}</span>
                <span class="population">${numberWithCommas(place.population)}</span>
            </li>
`;
        // converts returned array from map() method into one large string
    }).join('');
        suggestions.innerHTML = html;
    }

    const searchInput = document.querySelector('.search');
    const suggestions = document.querySelector('.suggestions');

    searchInput.addEventListener('input', displayMatches);
});