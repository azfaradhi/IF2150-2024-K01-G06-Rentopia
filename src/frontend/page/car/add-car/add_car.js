
console.log("addcar is loaded");

const fileInput = document.getElementById('file-input');
console.log("fileInput: ", fileInput);
const imagePreview = document.getElementById('car-image-preview');
console.log("imagePreview: ", imagePreview);
const fileNameDisplay = document.getElementById('file-name');


async function initAddCar(){
    const addButton = document.getElementById("btn-add");
    const cancelButton = document.getElementById("btn-cancel");

    fileInput.addEventListener('change', function(event) {
        console.log("File input change event triggered.");
        console.log("Selected file: ", event.target.files[0]);
        const file = event.target.files[0];
        if (file) {
            fileNameDisplay.textContent = file.name;
            fileNameDisplay.style.color = 'black';
        } else {
            fileNameDisplay.textContent = 'Belum ada file dipilih';
            fileNameDisplay.style.color = '#888';
        }
    });

    if (addButton) {
        addButton.addEventListener('click', async () => {
            console.log("Masuk kok disinin");
            const id = document.getElementById("car-id").value;
            const model = document.getElementById("car-model").value;
            const type = document.getElementById("car-type").value;
            const seat = document.getElementById("car-seat").value;
            const price = document.getElementById("car-price").value;
            const imageFile = document.getElementById("file-input").files[0];

            if (!id || !model || !type || !seat || !price || !imageFile) {
                alert("Please fill in all fields and upload an image!");
                return;
            }
            if (seat!="4" && seat !="6") {
                valid = false;
                alert("Please enter a valid car seat, either 4 seat or 6 seat!");
                document.getElementById("car-seat").value = "";
                return;
            }

            if (!isNum(price)) {
                valid = false;
                alert("Please enter a valid car price!");
                document.getElementById("car-price").value = "";
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
            console.log(formData);

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
                alert(result.message);
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

function isNum(value) {
    return !isNaN(value) && isFinite(parseFloat(value));
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded");
    initAddCar();
});
