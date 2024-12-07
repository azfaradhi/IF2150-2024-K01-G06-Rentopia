const baseurlp = 'http://localhost:5000/api/car/show/';
async function fetchActivity(carId) {
    try {
        console.log(carId);
        const apiUrl = `${baseurlp}${carId}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Error fetching activity: ${response.statusText}`);
        }
        console.log("masuk");
        const data = await response.json();

        displayCars(data);
    } catch (error) {
        console.error("Failed to fetch activity:", error);
    }
}

function carPageCommandChoice(){
    const command = document.getElementById("car-page");
    const adding = command.querySelector('.btn-add-car');
    // const adding = command.querySelector("adding");
    // const btnadd = adding.querySelector("btn-add-car");
    console.log("apaaaa");
    // const addCar = command.querySelector('.btn-add-car');
    adding.addEventListener('click', () => {
        console.log("masukk ");
    });
    // const deleteBtn = carElement.querySelector('.btn-delete');
    // deleteBtn.addEventListener('click', () => {
    //     console.log('Delete car:', car.id);
    // });
}


function createCarElement(car) {
    const carElement = document.createElement('div');
    carElement.className = 'car-card';
    
    carElement.innerHTML = `
        <div class="car-image">
            <img src="../../img/${car.photo_car}" alt="">
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
                        <button class="btn-delete">
                            <img src="public/trash.svg" alt="" width="20" height="20" style="vertical-align: middle;"/>
                        </button>
                    </div>
                    <div class="action-button">
                        <button class="btn-update">
                            <img src="public/edit.svg" alt="" width="20" height="20" style="vertical-align: middle;"/>
                        </button>
                    </div>        
                </div>    
            </div>
        </div>
    `;

    const deleteBtn = carElement.querySelector('.btn-delete');
    deleteBtn.addEventListener('click', () => {
        console.log('Delete car:', car.id);
    });

    const updateBtn = carElement.querySelector('.btn-update');
    updateBtn.addEventListener('click', () => {
        console.log('Update car:', car.id);
    });

    return carElement;
}

function displayCars(cars) {
    const container = document.getElementById('cars-container');
        
    // cars.forEach(car => {
    const carElement = createCarElement(cars);
    container.appendChild(carElement);
    // });
} 

function fetching(){
    for (let i =1 ; i< 5; i++){
        let a = "CAR00" + i;
        fetchActivity(a);
    }
}

fetching();
carPageCommandChoice();
