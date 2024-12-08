
console.log("addcar is loaded");

async function initAddCar(){
    const addButton = document.getElementById("btn-add");
    const cancelButton = document.getElementById("btn-cancel");

    if (addButton) {
        addButton.addEventListener('click', async () => {

            const id = document.getElementById("car-id").value;
            const model = document.getElementById("car-model").value;
            const type = document.getElementById("car-type").value;
            const seat = document.getElementById("car-seat").value;
            const price = document.getElementById("car-price").value;
            // const image = document.querySelector("#car-image").files[0];
            let valid = true;
            if (!id || !model || !type || !seat || !price) {
                valid = false;
                alert("Please fill in all fields!");
                document.getElementById("car-id").value = "";
                document.getElementById("car-model").value = "";
                document.getElementById("car-type").value = "";
                document.getElementById("car-seat").value = "";
                document.getElementById("car-price").value = "";
            }

            if (valid){
                const carData = {
                    id_car: id,
                    model_car: model,
                    type_car: type,
                    seat_car: seat,
                    price_car: price,
                    // image: image
                };
                console.log("Collect data: ", carData);
                try{
                    const response = await fetch('http://localhost:5000/api/car/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(carData),
                    });
                    console.log("masuk22");
                    if (!response.ok){
                        throw new Error(`Failed to create car: ${response.statusText}`);
                    }
                    const result = await response.json();
                    console.log("Server Response: ", result.message);
                    document.getElementById("car-id").value = "";
                    document.getElementById("car-model").value = "";
                    document.getElementById("car-type").value = "";
                    document.getElementById("car-seat").value = "";
                    document.getElementById("car-price").value = "";
                    alert("Success adding car!");
                    window.location.hash = '/car'
                }
                catch (error){
                    console.error("Detailed error: ", error);
                }



                // document.querySelector("#car-image").value = "";
                // document.querySelector(".preview img").src = "";
            }
        });
    }
    if (cancelButton){
        cancelButton.addEventListener('click', () =>{
            console.log("Cancel button clicked");
            window.location.hash = '/car'
        })
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded");
    initAddCar();
});