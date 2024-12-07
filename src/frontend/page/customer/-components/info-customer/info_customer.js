// function initCustomerInfo(customerId) {

//     // Fetch customer data
//     window.api.fetchCustomer(customerId).then(customer => {
//         document.getElementById('customer-id').textContent = customer.id_cust;
//         document.getElementById('customer-name').textContent = customer.name_cust;
//         document.getElementById('contact-phone').textContent = customer.phone_cust;
//         document.getElementById('place').textContent = customer.address_cust;
        
//         const statusElement = document.querySelector('.status');
//         statusElement.innerHTML = '';
//         // console.log('status', statusElement);
//         // document.querySelector('.status').textContent = customer.status_cust;
//         const statusText = document.createElement('p');
//         statusElement.appendChild(statusText);
//         if (customer.status_cust === 'on-going') {
//             statusText.textContent = 'On-Going';
//             statusText.className = 'on-going';
//         } else if (customer.status_cust === 'available') {
//             statusText.textContent = 'Available';
//             statusText.className = 'available';
//         }
//         // Fetch activity data
//         // window.api.fetchActivity(customer.id_cust).then(activity => {
//         //     const statusElement = document.querySelector('.status');
//         //     console.log('status', statusElement);
//         //     console.log('activity', activity);
//         //     statusElement.innerHTML = ''; // Clear existing status

//         //     const statusText = document.createElement('p');
//         //     if (activity.status_cust === 'active') {
//         //         statusText.textContent = 'On-Going';
//         //         statusText.className = 'on-going';
//         //     } else if (activity.status_cust === 'available') {
//         //         statusText.textContent = 'Available';
//         //         statusText.className = 'available';
//         //     }
//         //     statusElement.appendChild(statusText);
//         // }).catch(error => {
//         //     console.error('Error fetching activity:', error);
//         // });
//     }).catch(error => {
//         console.error('Error fetching customer:', error);
//     });
// }


// initCustomerInfo(1);