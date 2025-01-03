let currentPageCustomer = 1;
let itemsPerPageCustomer = 3;

async function fetchCustomer(page) {
    try {
        const apiUrlCust = `http://127.0.0.1:5000/api/customer/alldata?page=${page}&items_per_page=${itemsPerPageCustomer}`;
        const responseCust = await fetch(apiUrlCust);
        if (!responseCust.ok) {
            throw new Error(`Error fetching activity: ${response.statusText}`);
        }

        const dataCust = await responseCust.json();
        displayCustomer(dataCust.customers,page,dataCust.total_pages);
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
            currentPageCustomer++;
            await fetchCustomer(currentPageCustomer);
            
        })
    }
    if (prevButton){
        prevButton.addEventListener('click', async () =>{
            if (currentPageCustomer > 1){
                currentPageCustomer --;
                await fetchCustomer(currentPageCustomer);
            }
        })
    }
    if (addButton){
        addButton.addEventListener('click', async () =>{
            window.location.hash = '/customer/add/?id=customer';
        })
    } else {
        console.error("Add customer button not found");
    }
}




function displayCustomer(customers, page, totalPage) {
    const containerList = document.getElementById('customer-list');
    containerList.innerHTML = "";

    if (customers.length === 0) {
        alert("No customers found");
    }

    customers.forEach(customer => {
        const custElement = document.createElement('div');
        custElement.className = "info-customers";
        custElement.innerHTML = `
            <div class="info-left-cust">
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
            <div class="flex-col">
                <div class="status-card ${customer.status_cust === 'active' ? 'status-active' :
                                         customer.status_cust === 'inactive' ? 'status-inactive' :
                                         'status-not-available'}">
                    ${customer.status_cust}
                </div>
                <div class="actions info-right">
                    <button class="btn-delete" data-cust-id="${customer.id_cust}">
                        <img src="public/trash.svg" alt="" width="20" height="20" style="vertical-align: middle;">
                    </button>
                    <button class="btn-update" data-cust-id="${customer.id_cust}">
                        <img src="public/edit.svg" alt="" width="20" height="20" style="vertical-align: middle;">
                    </button>
                </div>
            </div>
        `;

        const updateButton = custElement.querySelector('.btn-update');
        updateButton.addEventListener('click', () => {
            const custId = updateButton.getAttribute('data-cust-id');
            try {
                window.location.hash = `/customer/update?id=${custId}`;
            } catch (error) {
                console.error("Error:", error);
            }
        });

        const deleteButtonCust = custElement.querySelector('.btn-delete');
        deleteButtonCust.addEventListener('click', async () => {
            const custId = deleteButtonCust.getAttribute('data-cust-id')
            if (customer.status_cust === 'active') {
                alert("Cannot delete active customer!");
                return;
            }
            
            // Add confirmation dialog
            const confirmDelete = confirm("Are you sure you want to delete this customer?");
            if (!confirmDelete) {
                return;
            }

            try {
                const response = await fetch(`http://127.0.0.1:5000/api/customer/delete/${custId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: custId }),
                });

                if (!response.ok) {
                    throw new Error(`Failed to delete customer: ${response.statusText}`);
                }

                await fetchCustomer(currentPageCustomer);
                alert("Customer deleted successfully!");

            } catch (error) {
                console.log("Error deleting customer:", error);
            }
        });

        containerList.appendChild(custElement);
    });

    const pageNumberDisplay = document.getElementById("page-number");
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