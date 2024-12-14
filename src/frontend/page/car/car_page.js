let currentPageCars = 1;
let items_per_page_car = 4;
let seatValue = -1;
let availValue = -1;

async function fetchCar(page, seatValue, availValue) {
    try {
        const apiUrlCar = `http://127.0.0.1:5000/api/car/alldata?page=${page}&items_per_page=${items_per_page_car}&seat=${seatValue}&status=${availValue}`;
        const responseCar = await fetch(apiUrlCar);
        if (!responseCar.ok) {
            throw new Error(`Error fetching activity: ${response.statusText}`);
        }
        const dataCar = await responseCar.json();

        displayCars(dataCar.cars,page,dataCar.total_pages);
    } catch (error) {
        console.error("Failed to fetch car:", error);
    }
}

function carPageCommandChoice(){
    const searchButton = document.getElementById("car-search");
    const addButton = document.getElementById("btn-add-car");
    const nextButton = document.getElementById("next-page");
    const prevButton = document.getElementById("prev-page");
    if (nextButton){
        nextButton.addEventListener('click', async () => {
            currentPageCars++;
            await fetchCar(currentPageCars, seatValue, availValue);
        })
    }
    if (prevButton){
        prevButton.addEventListener('click', async () =>{
            if (currentPageCars > 1){
                currentPageCars --;
                await fetchCar(currentPageCars, seatValue, availValue);
            }
        })
    }

    if (addButton) {
        addButton.addEventListener('click', async () =>{
            window.location.hash = '/car/add';
        })
    }

    if (searchButton) {
        searchButton.addEventListener('click', async () =>{
            
        const seatValue = document.getElementById("car-seat").value;
        const availValue = document.getElementById("car-avail").value;

        if (!seatValue || !availValue){
            alert("Please select both seat and availability options!");
        }
        else{
            await fetchCar(currentPageCars, seatValue, availValue);
        }
        })
    }
}

function displayCars(cars, page, totalPage) {
    const containerListCars = document.getElementById('car-card-container');
    containerListCars.innerHTML = "";

    if (cars.length === 0) {
        alert("No cars found.");
    }

    for (let i = 0; i < cars.length; i += 2) {
        const rowElement = document.createElement('div');
        rowElement.className = 'car-row'; 

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
            const updateButton = carElement.querySelector('.btn-update');
            updateButton.addEventListener('click', () => {
                const carId = updateButton.getAttribute('data-car-id');
                try{
                    window.location.hash = `/car/edit?id=${carId}`;
                } catch (error) {
                    console.log("error");
                }
            });
        
            let confirmDelete = null;
            const deleteButton = carElement.querySelector('.btn-delete');
            deleteButton.addEventListener('click', async () => {
                const carId = deleteButton.getAttribute('data-car-id');

                if (car.status_car === 'reserved') {
                    alert("Cannot delete reserved car!");
                    return;
                } else {
                    confirmDelete = window.confirm("Are you sure you want to delete this car?");
                }
                if (!confirmDelete) {
                    return;
                }
                
                try{
                    const response = await fetch(`http://127.0.0.1:5000/api/car/delete/${carId}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(carId),
                    });
                    if (!response.ok){
                        throw new Error(`Failed to delete car: ${response.statusText}`);
                    }
                    await fetchCar(currentPageCars, seatValue, availValue);
                    alert("Success deleted car!");

                    window.location.hash = '/car'

                }
                catch (error){
                    console.log("error");
                }
            });

            rowElement.appendChild(carElement);
            rowElement.appendChild(carElement);
        }

        containerListCars.appendChild(rowElement); 
    }

    const pageNumberDisplay = document.getElementById("page-number");
    pageNumberDisplay.textContent = `Page: ${page}`;

    const prevButton = document.getElementById("prev-page");
    const nextButton = document.getElementById("next-page");

    prevButton.disabled = page <= 1;
    nextButton.disabled = page >= totalPage;
}


function makeCarPage(){
    fetchCar(currentPageCars, seatValue, availValue);
}
document.addEventListener('DOMContentLoaded', () => {
    makeCarPage();
    carPageCommandChoice();
});
