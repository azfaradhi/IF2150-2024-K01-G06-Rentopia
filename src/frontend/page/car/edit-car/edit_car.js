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
                const carData = {
                    model_car : model,
                    type_car: type,
                    seat_car: seat,
                    price_car: price,
                };
                console.log("Collect data car: ", carData);
            }

        })
    }
}
