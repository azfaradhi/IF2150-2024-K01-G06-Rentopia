let currentPageCustomer = 1;
let itemsPerPageCustomer = 3;

async function fetchCustomer(page) {
    console.log("MASUKK JING");
    try {
        console.log("MASUKK JING");
        const apiUrlCust = `http://localhost:5000/api/customer/alldata?page=${page}&items_per_page=${itemsPerPageCustomer}`;
        const responseCust = await fetch(apiUrlCust);
        if (!responseCust.ok) {
            throw new Error(`Error fetching activity: ${response.statusText}`);
        }
        console.log("KENAPA GA MASUKK WOY");

        const dataCust = await responseCust.json();
        displayCustomer(dataCust.customers,page,dataCust.total_pages);
        console.log(dataCust);
    } catch (error) {
        console.error("Failed to fetch customer:", error);
    }
}

function customerPageCommandChoice(){
    const addButton = document.getElementById("btn-add-cust");
    const nextButton = document.getElementById("next-page");
    const prevButton = document.getElementById("prev-page");
    if (nextButton){
        nextButton.addEventListener('click', async () => {
            console.log("Next page clicked");
            console.log(currentPageCustomer);
            currentPageCustomer++;
            await fetchCustomer(currentPageCustomer);
            console.log("current: ", currentPageCustomer);
            
        })
    }
    if (prevButton){
        prevButton.addEventListener('click', async () =>{
            console.log("Prev button clicked");
            console.log(currentPageCustomer);
            if (currentPageCustomer > 1){
                currentPageCustomer --;
                await fetchCustomer(currentPageCustomer);
                console.log("current: ",currentPageCustomer);
            }
        })
    }
    if (addButton){
        addButton.addEventListener('click', async () =>{
            console.log("Add button clicked");
            window.location.hash = '/customer/add';
        })
    }

    else{
        console.error("Add customer button not found");
    }
}

function displayCustomer(customers, page, totalPage){
    const containerList = document.getElementById('customer-list');
    containerList.innerHTML = "";

    customers.forEach(customer => {
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
            containerList.appendChild(custElement); // <-- Append the element to the container

        });
        
        const pageNumberDisplay = document.getElementById("page-number")
        pageNumberDisplay.textContent = `Page: ${page}`;
    
        const prevButton = document.getElementById("prev-page");
        const nextButton = document.getElementById("next-page");
    
        prevButton.disabled = page <= 1;
        nextButton.disabled = page >= totalPage;
}

function makeCustomerPage(){
    fetchCustomer(currentPageCustomer);
}
document.addEventListener('DOMContentLoaded', () => {
    customerPageCommandChoice();
});