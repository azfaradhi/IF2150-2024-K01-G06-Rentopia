
console.log("addcar is loaded");

async function initAddCar(){
    const addButton = document.getElementById("btn-add");
    const cancelButton = document.getElementById("btn-cancel");
    const fileInput = document.getElementById('file-input');
    const imagePreview = document.getElementById('car-image-preview');

    // fungsi buat nampilin preview image
    fileInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imagePreview.src = e.target.result;
                imagePreview.style.display = "block";
            };
            reader.readAsDataURL(file);
        } else {
            imagePreview.src = "";
            imagePreview.style.display = "none";
        }
    });

    if (addButton) {
        addButton.addEventListener('click', async () => {
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

            try {
                const response = await fetch('http://127.0.0.1:5000/api/car/create', {
                    method: 'POST',
                    body: formData,
                });
                if (!response.ok) {
                    throw new Error(`Failed to create car: ${response.statusText}`);
                }
                const result = await response.json();
                alert(result.message);
                window.location.hash = '/car';
            } catch (error) {
                console.error("Error: ", error);
            }
        });
    }

    if (cancelButton){
        cancelButton.addEventListener('click', () =>{
            window.location.hash = '/car'
        })
    }
}

function isNum(value) {
    return !isNaN(value) && isFinite(parseFloat(value));
}

document.addEventListener('DOMContentLoaded', () => {
    initAddCar();
});
