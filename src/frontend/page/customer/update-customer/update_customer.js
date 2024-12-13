console.log("apdet cust");

let custData = null;

async function initUpdateCustomer(id_cust) {
    // console.log("apdet custttttt");
    const placeholder = await fetch(`http://127.0.0.1:5000/api/customer?id_cust=${id_cust}`);
    const data = await placeholder.json();
    // console.log("datadsadsiadjsaiodjsaiojdoia");
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

            let valid = true;
            if (!nik || !name || !phone || !address){
                valid = false;
                alert("Please fill in all fields!");
                document.getElementById("cust-nik").value = "";
                document.getElementById("cust-name").value = "";
                document.getElementById("cust-phone").value = "";
                document.getElementById("cust-address").value = "";   
            }

            if (valid) {
                const custData = {
                    id_cust: nik,
                    name_cust: name,
                    phone_cust: phone,
                    address_cust: address,
                }
                console.log("Collect data customer: ", custData);
                try {
                    const passingData = await fetch('http://127.0.0.1:5000/api/customer/update', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(custData),
                    });

                    if (!passingData.ok) {
                        throw new Error(`Failed to update customer: ${passingData.statusText}`);
                    }
                    const result = await passingData.json();
                    console.log("Server Response: ", result.message);
                    document.getElementById("cust-nik").value = "";
                    document.getElementById("cust-name").value = "";
                    document.getElementById("cust-phone").value = "";
                    document.getElementById("cust-address").value = "";
                    alert("Success updating customer!");
                    window.location.hash = '/customer';
                } catch (error) {
                    console.error("Detailed error: ", error);
                }  
            }
        });
    }

    if (cancelButton) {
        cancelButton.addEventListener('click', () => {
            console.log("Cancel");
            window.location.hash = "/customer";
        })
    }
}