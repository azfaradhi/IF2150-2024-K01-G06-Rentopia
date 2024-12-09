console.log("apdet cust");

async function initUpdateCustomer(id_cust) {
    console.log("apdet custttttt");
    const placeholder = await fetch(`http://127.0.0.1:5000/api/customer/${id_cust}`);
    const data = await placeholder.json();
    console.log("datadsadsiadjsaiodjsaiojdoia");
    console.log(data);

    const updateButton = document.getElementById("btn-update");
    const cancelButton = document.getElementById("btn-cancel");

    //masukin sebagai placeholder
    document.getElementById("cust-nik").value = data.id_cust;
    document.getElementById("cust-name").value = data.name_cust;
    document.getElementById("cust-phone").value = data.phone_cust;
    document.getElementById("cust-address").value = data.address_cust;

    if (updateButton) {
        updateButton.addEventListener('click', async () => {
            const nik = document.getElementById("cust-nik").value;
            const name = document.getElementById("cust-name").value;
            const phone = document.getElementById("cust-phone").value;
            const address = document.getElementById("cust-address").value;
    }
}
