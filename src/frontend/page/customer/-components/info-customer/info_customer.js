
console.log('=======================');

function initCustomerInfo() {
    const customerId = 1; // Replace with the actual customer ID you want to fetch

    // Fetch customer data
    window.api.fetchCustomer(customerId).then(customer => {
        console.log('Customer:', customer);
        document.getElementById('customer-id').textContent = customer.id_cust;
        document.getElementById('customer-name').textContent = customer.name_cust;
        document.querySelector('.contact a').textContent = customer.phone_cust;
        document.querySelector('.contact a').href = `tel:${customer.phone_cust}`;

        // Fetch activity data
        window.api.fetchActivity(customer.activity_id).then(activity => {
            const statusElement = document.querySelector('.status');
            statusElement.innerHTML = ''; // Clear existing status

            const statusText = document.createElement('p');
            if (activity.status_cust === 'active') {
                statusText.textContent = 'On-Going';
                statusText.className = 'on-going';
            } else if (activity.status_cust === 'available') {
                statusText.textContent = 'Available';
                statusText.className = 'available';
            }
            statusElement.appendChild(statusText);
        }).catch(error => {
            console.error('Error fetching activity:', error);
        });
    }).catch(error => {
        console.error('Error fetching customer:', error);
    });
}


initCustomerInfo();