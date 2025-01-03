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
        const apiGetStatus = `http://127.0.0.1:5000/api/car/show/${id}`;
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
    document.getElementById("car-image-preview").src = `../../img/${resultAdd.photo_car}`;
    
    const addButton = document.getElementById("btn-add");
    const cancelButton = document.getElementById("btn-cancel");
    const fileInput = document.getElementById('file-input');
    const imagePreview = document.getElementById('car-image-preview');

    fileInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            console.log("File selected:", file);
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

    if (addButton){
        addButton.addEventListener('click', async () =>{
            const model = document.getElementById("car-model").value;
            const type = document.getElementById("car-type").value;
            const seat = document.getElementById("car-seat").value;
            const price = document.getElementById("car-price").value;
            const imageFile = document.getElementById("file-input").files[0];
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

            if (seat!="4" && seat !="6") {
                valid = false;
                alert("Please enter a valid car seat, either 4 seat or 6 seat!");
                document.getElementById("car-seat").value = "";
            }

            if (!isNum(price)) {
                valid = false;
                alert("Please enter a valid car price!");
                document.getElementById("car-price").value = "";
            }

            if (valid){
                const formData = new FormData();
                formData.append("id_car", id);
                formData.append("model_car", model);
                formData.append("type_car", type);
                formData.append("seat_car", seat);
                formData.append("price_car", price);
                formData.append("photo", imageFile);
                console.log("Disini masuk juga");

                console.log("Collect data car: ", formData);
                try {
                    const responseEditAct = await fetch('http://127.0.0.1:5000/api/car/update', {
                        method: 'POST',
                        body: formData,
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

function isNum(value) {
    return !isNaN(value) && isFinite(parseFloat(value));
}
