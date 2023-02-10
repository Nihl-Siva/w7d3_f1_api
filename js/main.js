const form = document.querySelector('#f1DataForm')
console.log(form)

form.addEventListener('submit', async ( event ) => {
    event.preventDefault();
    let season = document.querySelector('#season').value
    let round = document.querySelector('#round').value

    console.log(season, round)
    const racerData = await getData(season, round)
    console.log(racerData)

    racerData.forEach(driver => {
        createList(driver.position, driver.points, driver.wins, driver.Driver.givenName, driver.Driver.familyName, driver.Driver.nationality, driver.Constructors[0].name, driver.Constructors[0].nationality)
    });
})

const getData = async (season, round) => {
    let response = await axios.get(`https://ergast.com/api/f1/${season}/${round}/driverStandings.json`)
    return response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
}

const DOM_Elements = {
    f1_list: '.list-group.f1-list'
}
    
const createList = (position, points, wins, givenName, familyName, nationality, constructor, cNationality) => {
    console.log(position, points, wins, givenName, familyName, nationality, constructor, cNationality)
    const html = `<div class="driver-card mt-3 mb-3" style="width: 18rem;">
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Position: ${position}</li>
            <li class="list-group-item">Points: ${points}</li>
            <li class="list-group-item">Wins: ${wins}</li>
            <li class="list-group-item">Driver: ${givenName} ${familyName}</li>
            <li class="list-group-item">Nationality: ${nationality}</li>
            <li class="list-group-item">Constructor: ${constructor}</li>
            <li class="list-group-item">Constuctor Nationality: ${cNationality}</li>
        </ul>
    </div>`;
    document.querySelector(DOM_Elements.f1_list).insertAdjacentHTML('beforeend', html)
}

