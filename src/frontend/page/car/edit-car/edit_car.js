console.log("editcar is loaded");

let carData = null;

async function fetchCarById(id) {
    try {
        const responseEditCar = await fetch(`http://127.0.0.1:5000/api/car/show/${id}`);
        if (!responseEditCar.ok) {
            throw new Error(`Error fetching car: ${response.statusText}`);
        }
        const dataCarEdit =  await responseEditCar.json();
        console.log("datanya teh ini:", dataCarEdit);
        initEditCar(id)
    } catch (error) {
        console.error("Failed to fetch car:", error);
        return null;
    }
}

async function initEditCar(id){

    let currentStatus = null
    let resultAdd = null
    try {
        const apiGetStatus = `http://localhost:5000/api/car/show/${id}`;
        const responseStatus = await fetch(apiGetStatus);

        console.log("masuk dong");
        if (!responseStatus.ok){
            throw new Error(`Failed to create activity: ${responseStatus.statusText}`);
        }
        resultAdd = await responseStatus.json();
        // currentStatus = resultAdd.status_car;
        console.log(resultAdd);
        currentStatus = resultAdd.status_car;
        console.log("status: ", currentStatus);

        document.getElementById("car-model").value = "";
        document.getElementById("car-type").value = "";
        document.getElementById("car-seat").value = "";
        document.getElementById("car-price").value = "";   

    }
    catch (error){
        console.error("Error: ", error);    
    }
    document.getElementById("car-id").value = id;
    document.getElementById("car-model").value = resultAdd.model_car;
    document.getElementById("car-type").value = resultAdd.type_car;
    document.getElementById("car-seat").value = resultAdd.seat_car;
    document.getElementById("car-price").value = resultAdd.price_car;
    const addButton = document.getElementById("btn-add");
    const cancelButton = document.getElementById("btn-cancel");

    if (addButton){
        addButton.addEventListener('click', async () =>{
            const model = document.getElementById("car-model").value;
            const type = document.getElementById("car-type").value;
            const seat = document.getElementById("car-seat").value;
            const price = document.getElementById("car-price").value;
            console.log("boleh de");
            let valid = true;
            if (!model || !type || !seat || !price){
                valid = false;
                alert("Please fill in all fields!");
                document.getElementById("car-model").value = "";
                document.getElementById("car-type").value = "";
                document.getElementById("car-seat").value = "";
                document.getElementById("car-price").value = "";   
            
            }

            if (valid){
                console.log("apa"); 


                const carData = {
                    id_car: id,
                    photo_car: "phoho",
                    model_car : model,
                    type_car: type,
                    seat_car: seat,
                    price_car: price,
                    status_car: currentStatus,
                };
                console.log("Collect data car: ", carData);
                try {
                    const responseEditAct = await fetch('http://localhost:5000/api/car/update', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(carData),
                    });
                    console.log("masuk dong");
                    if (!responseEditAct.ok){
                        throw new Error(`Failed to create activity: ${responseEditAct.statusText}`);
                    }
                    const resultAdd = await responseEditAct.json();
                    document.getElementById("car-model").value = "";
                    document.getElementById("car-type").value = "";
                    document.getElementById("car-seat").value = "";
                    document.getElementById("car-price").value = "";   
                    alert("Success update car!");
                    window.location.hash = "/car";

                }
                catch (error){
                    console.error("Error: ", error);    
                }
            }

        })
    }

    if(cancelButton){
        cancelButton.addEventListener('click', () => {
            console.log("Cancel");
            window.location.hash = "/car"
        })
    }
}
