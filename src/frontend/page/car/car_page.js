let currentPageCars = 1;
let items_per_page_car = 4;

async function fetchCar(page) {
    try {
        const apiUrlCar = `http://localhost:5000/api/car/alldata?page=${page}&items_per_page=${items_per_page_car}`;
        const responseCar = await fetch(apiUrlCar);
        if (!responseCar.ok) {
            throw new Error(`Error fetching activity: ${response.statusText}`);
        }
        console.log("masuk");
        const dataCar = await responseCar.json();

        displayCars(dataCar.cars,page,dataCar.total_pages);
        console.log(dataCar);
    } catch (error) {
        console.error("Failed to fetch car:", error);
    }
}

function carPageCommandChoice(){
    const addButton = document.getElementById("btn-add-car");
    const nextButton = document.getElementById("next-page");
    const prevButton = document.getElementById("prev-page");
    if (nextButton){
        nextButton.addEventListener('click', async () => {
            console.log("Next page clicked");
            console.log(currentPageCars);
            currentPageCars++;
            await fetchCar(currentPageCars);
            console.log("current: ", currentPageCars);
            
        })
    }
    if (prevButton){
        prevButton.addEventListener('click', async () =>{
            console.log("Prev button clicked");
            console.log(currentPageCars);
            if (currentPageCars > 1){
                currentPageCars --;
                await fetchCar(currentPageCars);
                console.log("current: ",currentPageCars);
            }
        })
    }
    if (addButton){
        addButton.addEventListener('click', async () =>{
            console.log("Add button clicked");
            window.location.hash = '/car/add';
        })
    }
    else{
        console.error("Add customer button not found");
    }
}

function displayCars(cars, page, totalPage) {
    const containerListCars = document.getElementById('car-card-container');
    containerListCars.innerHTML = "";

    // Create rows for the 2x2 layout
    for (let i = 0; i < cars.length; i += 2) {
        const rowElement = document.createElement('div');
        rowElement.className = 'car-row'; // Add a row class for styling

        // Add up to 2 cars per row
        for (let j = 0; j < 2 && i + j < cars.length; j++) {
            const car = cars[i + j];
            const carElement = document.createElement('div');
            carElement.className = 'car-card';
            carElement.innerHTML = `
                <div class="car-image">
                    <img src="../../img/${car.photo_car}" alt="Car Image">
                </div>
                <div class="card-content">
                    <div class="left-content">
                        <div class="nama-mobil">${car.model_car}</div>
                        <div class="keterangan">
                            <div>${car.id_car} - ${car.seat_car} Seat</div>
                            <div class="harga">Rp${car.price_car}</div>
                        </div>
                    </div>
                    <div class="right-content">
                        <div class="status-card ${car.status_car === 'reserved' ? 'status-ongoing' : 
                                               car.status_car === 'available' ? 'status-available' : 
                                               'status-not-available'}">
                            ${car.status_car}
                        </div>
        
                        <div class="button-space">
                            <div class="action-button">
                                <button class="btn-delete" data-car-id="${car.id_car}">
                                    <img src="public/trash.svg" alt="" width="20" height="20" style="vertical-align: middle;"/>
                                </button>
                            </div>
                            <div class="action-button">
                                <button class="btn-update" data-car-id="${car.id_car}">
                                    <img src="public/edit.svg" alt="" width="20" height="20" style="vertical-align: middle;"/>
                                </button>
                            </div>        
                        </div>   
                    </div>
                </div>
            `;
            // Add event listeners after creating the element
            const updateButton = carElement.querySelector('.btn-update');
            updateButton.addEventListener('click', () => {
                const carId = updateButton.getAttribute('data-car-id');
                console.log(`Edit car with ID: ${carId}`);
                // Use the router's query parameter format
                try{
                    window.location.hash = `/car/edit?id=${carId}`;
                    console.log("bisa aja tuh");
                }
                catch (error){
                    console.log("error");
                }
            });

            const deleteButton = carElement.querySelector('.btn-delete');
            deleteButton.addEventListener('click', () => {
                const carId = deleteButton.getAttribute('data-car-id');
                console.log(`Delete car with ID: ${carId}`);
                // Add delete functionality here
            });

            rowElement.appendChild(carElement);
            rowElement.appendChild(carElement);
        }

        containerListCars.appendChild(rowElement); // Add each row to the container
    }

    // Update pagination details
    const pageNumberDisplay = document.getElementById("page-number");
    pageNumberDisplay.textContent = `Page: ${page}`;

    const prevButton = document.getElementById("prev-page");
    const nextButton = document.getElementById("next-page");

    prevButton.disabled = page <= 1;
    nextButton.disabled = page >= totalPage;
}


function makeCarPage(){
    fetchCar(currentPageCars);
}
document.addEventListener('DOMContentLoaded', () => {
    carPageCommandChoice();
});