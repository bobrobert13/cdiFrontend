import axios from 'axios'

class countries {
    constructor() {
    }
    async init () {
        return await this.get()
    }

    async get () {
        const urlCountries = `https://restcountries.eu/rest/v2/all`

        return axios({
            method: 'get',
            url: urlCountries,
            responseType: 'json'
        })
        .then(response => {
            
            let countries = []
            countries = response.data.map((country) => {
                let countrys
                if (country.callingCodes[0] !== "") {
                    countrys = {
                        flag: country.flag,
                        name: country.name === "Venezuela (Bolivarian Republic of)" ? 'Venezuela' : country.name,
                        shortname: country.alpha3Code,
                        currencies: country.name === "Venezuela (Bolivarian Republic of)" ? 'VES' : country.currencies[0].code,
                        phoneCode: country.callingCodes[0]
                    }
                } else {
                    countrys = {
                        flag: country.flag,
                        name: country.name === "Venezuela (Bolivarian Republic of)" ? 'Venezuela' : country.name,
                        shortname: country.alpha3Code,
                        currencies: country.name === "Venezuela (Bolivarian Republic of)" ? 'VES' : country.currencies[0].code,
                    }
                }
                return countrys
            })
            // console.log(countries)
            return countries
        })
        .catch(err => {
            console.error(err)
        })
    }
}

export default countries