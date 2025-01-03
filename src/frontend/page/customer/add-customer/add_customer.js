console.log("addcust is loaded");

async function  initAddCustomer(param) {
    const addButton = document.getElementById("btn-add");
    const cancelButton = document.getElementById("btn-cancel");

    if (addButton){
        addButton.addEventListener('click', async () =>{
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
                const customerData = {
                    id_cust : nik,
                    name_cust : name,
                    phone_cust: phone,
                    address_cust: address,
                };
                try {
                    const response = await fetch('http://127.0.0.1:5000/api/customer/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(customerData),
                    });
                    console.log("Collect data customer: ", JSON.stringify(customerData));
                    if (!response.ok){
                        throw new Error(`Failed to create customer: ${response.statusText}`);
                    }
                    const result = await response.json();
                    const hasil = result.message;
                    alert(hasil);
                    document.getElementById("cust-nik").value = "";
                    document.getElementById("cust-name").value = "";
                    document.getElementById("cust-phone").value = "";
                    document.getElementById("cust-address").value = "";

                    if (param === "home"){
                        window.location.hash = '/';
                    }
                    else if (param === "customer"){
                        window.location.hash = '/customer';
                    }
                }
                catch (error) {
                    alert("")
                    console.error("Detailed error: ", error);
                }
            }
        })
    }
    if (cancelButton){
        cancelButton.addEventListener('click', async () =>{
            if (param === "home"){
                window.location.hash = '/';
            }
            else if (param === "customer"){
                window.location.hash = '/customer';
            }
        })
    }
}