const baseUrlCust = `http://localhost:5000/api/customer/`;

async function fetchActivity(id_cust) {
    try {
        const apiUrl = `${baseUrlCust}${id_cust}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Error fetching activity: ${response.statusText}`);
        }
        console.log("berhasil dong");
        const data = await response.json();
        displayCustomer(data);
        console.log(data);
    } catch (error) {
        console.error("Failed to fetch activity:", error);
    }
}

function createCustomerElement(customer){
    const custElement = document.createElement('div');
    custElement.className = "info-customers";
    custElement.innerHTML = `
        <div class="info-left">
            <p>ID ${customer.id_cust}</p>
            <h1>${customer.name_cust}</h1>

            <div class="contact">
                <img src="public/telephone.svg" alt="" width="30" height="30" style="vertical-align: middle;">
                <a>${customer.phone_cust}</a>
            </div>

            <div class="contact">
                <img src="public/loc.svg" alt="" width="30" height="30" style="vertical-align: middle;">
                <a>${customer.address_cust}</a>
            </div>
        </div>
        <div class= "flex-col" >
                <div class="status-card ${  customer.status_cust === 'active' ? 'status-active' : 
                                        customer.status_cust === 'inactive' ? 'status-inactive' : 
                                    'status-not-available'}">
                    ${customer.status_cust}
                </div>
                <div class="actions info-right">
                    <button id="btn-delete"><img src="public/trash.svg" alt="" width="20" height="20" style="vertical-align: middle;"></button>
                    <button id="btn-update"><img src="public/edit.svg" alt="" width="20" height="20" style="vertical-align: middle;"></button>
                </div>
            </div>
        </div>
        `;
    return custElement
}

function displayCustomer(customer){
    const container = document.getElementById('cutomm');
    const custElement = createCustomerElement(customer);
    container.appendChild(custElement);
}

function fetching(){
    for (let i =1 ; i< 5; i++){
        fetchActivity(i);
    }
}

fetching();