import './sass/main.scss';
import { debounce } from 'lodash';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import fetchCountries from './js/fetchCountries'
import countryListTemplate from './templates/country-list.hbs'
import countryCardTemplate from './templates/country-card.hbs'
import './partials/country-search.html'



const inputEl = document.querySelector('.country-input')
const resultContainerEl = document.querySelector('.js-result-container')

inputEl.addEventListener('input', debounce(onCountrySearch, 500))

function onCountrySearch(event) {

    const inputContryName = event.target.value

    if (!inputContryName)
        return;

    fetchCountries(inputContryName)
        .then(
            function responseError(countries) {
                    if (countries.status === 404) {
                        errorMessage('404, Таких стран не бывает :)')
                        return
                   }
                    
                    
                const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(inputContryName))
                return filteredCountries
            }
        )
        .then(renderCountries)
        .catch(error => console.log('catch error. Страна не найдена', error));
}
    



function renderCountries(filteredCountries) {
    if (filteredCountries.length === 1) {

        const countryCardToRender = countryCardTemplate(...filteredCountries)
        resultContainerEl.innerHTML = countryCardToRender
        return
    }
    if (((filteredCountries.length >= 2) && (filteredCountries.length <= 10))) {

        const countryListToRender = countryListTemplate(filteredCountries)
        resultContainerEl.innerHTML = countryListToRender
        return
    }
    if ((filteredCountries.length < 1)) {
        errorMessage('Таких стран не бывает :)')        
    }
    else {
        errorMessage('Введите более специфичное значение')
    }
}



function errorMessage(message) {
    error({
            addClass: 'modal',
            text: `${message}`,
            title: false,
            icon: false,
            closer: false,
            sticker: false,
            delay: 0,
            });
}


