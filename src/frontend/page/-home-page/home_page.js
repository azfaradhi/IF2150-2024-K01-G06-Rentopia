let currentPage = 1;
let itemsPerPage = 5;

async function fetchActivity(page) {
    try {
        const apiUrl = `http://127.0.0.1:5000/api/activity/alldata?page=${page}&items_per_page=${itemsPerPage}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Error fetching activity: ${response.statusText}`);
        }
        const data = await response.json();
        displayActivity(data.activities,page,data.total_pages);
    } catch (error) {
        console.error("Failed to fetch activity:", error);
    }
}

function homePageCommandChoice(){
    const addCustButton = document.getElementById("add-new-cust");
    const addActButton = document.getElementById("add-new-activity");
    const nextButton = document.getElementById("next-page");
    const prevButton = document.getElementById("prev-page");
    const notifButton = document.getElementById("notif-button");
    if (nextButton){
        nextButton.addEventListener('click', async () => {
            currentPage++;
            await fetchActivity(currentPage);
        })
    }
    if (prevButton){
        prevButton.addEventListener('click', async () =>{;
            if (currentPage > 1){
                currentPage --;
                await fetchActivity(currentPage);
            }
        })
    }
    
    if (addCustButton){
        addCustButton.addEventListener('click', () => {
            window.location.hash = '/customer/add?id=home';
        });
    }
    if (addActButton){
        addActButton.addEventListener('click', () =>{
            window.location.hash = '/activity/add-activity';
        })
    }

    if (notifButton){
        notifButton.addEventListener('click', () =>{
            window.location.hash = '/notification';
        })
    }

    else{
        console.error("Add customer button not found");
    }
}

function displayActivity(activities, page, totalPage) {
    const tableBody = document.getElementById("activity-table-body");
    tableBody.innerHTML = "";
    
    if (activities.length === 0) {
        alert("No activities found");
    }

    activities.forEach(activity =>{
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${activity.id_cust}</td>
        <td>${activity.name_cust}</td>
        <td>${activity.id_car}</td>
        <td>${activity.model_car}</td>
        <td>${activity.date_range ? activity.date_range[0] : 'N/A'}</td>
        <td>${activity.date_range ? activity.date_range[1] : 'N/A'}</td>
        <td>
            <button 
                class="status-btn ${activity.status_activity === 'in-progress' ? 'available' : 'reserved'}"
                ${activity.status_activity === 'in-progress' ? '' : 'disabled'}
            >
                ${activity.status_activity}
            </button>      
        </td>
        `;

        const markFinished = row.querySelector('.status-btn');
        if (markFinished){
            markFinished.addEventListener('click', async () =>{
                console.log(`Mark finished activity with ID: ${activity.id_activity}`);
                const finishAct = {
                    id_activity : activity.id_activity,
                    status_activity : "completed",
                    status_car : "available",
                    status_cust : "inactive"
                }

                try {
                    const responseEditAct = await fetch(`http://127.0.0.1:5000/api/activity/update/${activity.id_activity}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(finishAct),
                    });

                    if (!responseEditAct.ok) {
                        throw new Error(`Failed to update activity: ${responseEditAct.statusText}`);
                    }
                } catch (error) {
                    console.log(error);
                }
                
                const car_update = {
                    id_car : activity.id_car,
                    status_car : "available",
                }
                try {
                    const responseEditAct = await fetch(`http://127.0.0.1:5000/api/car/update/status`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(car_update),
                    });
                    if (!responseEditAct.ok) {
                        throw new Error(`Failed to update activity: ${responseEditAct.statusText}`);
                    }
                } catch (error) {
                    console.log(error);
                }

                const cust_update = {
                    id_cust : activity.id_cust,
                    status_cust : "inactive"
                }
                try {
                    const responseEditAct = await fetch(`http://127.0.0.1:5000/api/customer/update/status`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(cust_update),
                    });
                    if (!responseEditAct.ok){
                        throw new Error(`Failed to update activity: ${responseEditAct.statusText}`);
                    }
                    alert("Activity marked as completed!");
                    fetchActivity(currentPage);
                } catch (error) {
                    console.log(error);
                }
            })
        }
        tableBody.appendChild(row);
    });

    const pageNumberDisplay = document.getElementById("page-number")
    pageNumberDisplay.textContent = `Page: ${page}`;

    const prevButton = document.getElementById("prev-page");
    const nextButton = document.getElementById("next-page");

    prevButton.disabled = page <= 1;
    nextButton.disabled = page >= totalPage;

}


function makeHomePage(){
    fetchActivity(currentPage);
}


async function fetchAllActivities() {
    const apiUrl = 'http://127.0.0.1:5000/api/activity/alldata'; 
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.activities;
    } catch (error) {
        console.error("Error fetching activity:", error);
        return [];
    }
}

async function hasNotifications() {
    const activities = await fetchAllActivities();
    const today = new Date();
    const shownActivities = JSON.parse(localStorage.getItem(SHOWN_ACTIVITIES_KEY)) || [];
    let isTrue = false; 

    for (let activity of activities) {
        const returnDate = new Date(activity.date_range[1]);
        const timeDiff = returnDate.getTime() - today.getTime();
        const diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));

        if (diffDays <= 1 && diffDays >= 0 && !shownActivities.includes(activity.id_activity)) {
            isTrue = true; 
            break;
        }
    }
    return isTrue;
}


async function changeNotifButton(){
    const notifButton = document.getElementById("notif-button");
    const isTrue = await hasNotifications();
    if (isTrue){
        notifButton.src = "public/homepage/notif_act.svg";
    } else{
        notifButton.src = "public/homepage/notif.svg";
    }
}
