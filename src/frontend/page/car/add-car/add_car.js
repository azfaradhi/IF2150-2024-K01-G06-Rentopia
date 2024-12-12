
console.log("addcar is loaded");

async function initAddCar(){
    const addButton = document.getElementById("btn-add");
    const cancelButton = document.getElementById("btn-cancel");


    if (addButton) {
        addButton.addEventListener('click', async () => {
            console.log("Masuk kok disinin");
            const id = document.getElementById("car-id").value;
            const model = document.getElementById("car-model").value;
            const type = document.getElementById("car-type").value;
            const seat = document.getElementById("car-seat").value;
            const price = document.getElementById("car-price").value;
            const imageFile = document.getElementById("car-image-input").files[0];

            if (!id || !model || !type || !seat || !price || !imageFile) {
                alert("Please fill in all fields and upload an image!");
                return;
            }

            const formData = new FormData();
            formData.append("id_car", id);
            formData.append("model_car", model);
            formData.append("type_car", type);
            formData.append("seat_car", seat);
            formData.append("price_car", price);
            formData.append("photo", imageFile);
            console.log("Disini masuk juga");

            try {
                const response = await fetch('http://127.0.0.1:5000/api/car/create', {
                    method: 'POST',
                    body: formData,
                });
                if (!response.ok) {
                    throw new Error(`Failed to create car: ${response.statusText}`);
                }
                const result = await response.json();
                console.log("Server Response: ", result.message);
                alert("Success adding car!");
                window.location.hash = '/car';
            } catch (error) {
                console.error("Error: ", error);
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