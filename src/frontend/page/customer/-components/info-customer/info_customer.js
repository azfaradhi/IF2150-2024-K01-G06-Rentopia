// customer.js

document.addEventListener('DOMContentLoaded', () => {
    const customerId = 1; // Replace with the actual customer ID you want to fetch

    // Fetch customer data
    window.api.fetchCustomer(customerId).then(customer => {
        document.getElementById('customer-id').textContent = customer.id;
        document.getElementById('customer-name').textContent = customer.name;
        document.querySelector('.contact a').textContent = customer.phone;
        document.querySelector('.contact a').href = `tel:${customer.phone}`;
        document.querySelector('.contact a img').alt = customer.phone;

        // Fetch activity data
        window.api.fetchActivity(customer.activity_id).then(activity => {
            const statusElement = document.querySelector('.status');
            statusElement.innerHTML = ''; // Clear existing status

            const statusText = document.createElement('p');
            if (activity.status_activity === 'on-going') {
                statusText.textContent = 'On-Going';
                statusText.className = 'on-going';
            } else if (activity.status_activity === 'available') {
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
});