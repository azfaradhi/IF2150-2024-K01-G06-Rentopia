let currentPage = 1;
let itemsPerPage = 5;

async function fetchActivity(page) {
    console.log("fetchActivity called with page:", page); // Debug log
    try {
        const apiUrl = `http://127.0.0.1:5000/api/activity/alldata?page=${page}&items_per_page=${itemsPerPage}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Error fetching activity: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data);
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
            console.log("Next page clicked");
            console.log(currentPage);
            currentPage++;
            await fetchActivity(currentPage);
            console.log("current: ", currentPage);
            
        })
    }
    if (prevButton){
        prevButton.addEventListener('click', async () =>{
            console.log("Prev button clicked");
            console.log(currentPage);
            if (currentPage > 1){
                currentPage --;
                await fetchActivity(currentPage);
                console.log("current: ",currentPage);
            }
        })
    }
    
    if (addCustButton){
        addCustButton.addEventListener('click', () => {
            console.log("Add customer button clicked");
            window.location.hash = '/customer/add';
        });
    }
    if (addActButton){
        addActButton.addEventListener('click', () =>{
            console.log("add activity gais");
            window.location.hash = '/activity/add-activity';
        })
    }

    if (notifButton){
        notifButton.addEventListener('click', () =>{
            console.log("notif button clicked");
            window.location.hash = '/notification';
        })
    }

    else{
        console.error("Add customer button not found");
    }
}

function displayActivity(activities, page, totalPage) {
    console.log("displayActivity called with activities:", activities);
    console.log("Current page:", page, "Total pages:", totalPage);
    const tableBody = document.getElementById("activity-table-body");
    tableBody.innerHTML = "";

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
                const carAct = {
                    id_activity : activity.id_activity,
                    status_activity : "completed",
                    status_car : "available",
                    status_cust : "inactive"
                }
                try {
                    const responseEditAct = await fetch(`http://localhost:5000/api/activity/update/${activity.id_activity}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(carAct),
                    });
                    console.log("masuk dong");
                    if (!responseEditAct.ok){
                        throw new Error(`Failed to create activity: ${responseEditAct.statusText}`);
                    }
                    alert("Activity marked as completed!");
                    fetchActivity(currentPage);

                }
                catch (error){
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
        console.log('Received data:', data);
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
    console.log("Returning isTrue:", isTrue); 
    return isTrue;
}


async function changeNotifButton(){
    const notifButton = document.getElementById("notif-button");
    const isTrue = await hasNotifications();
    if (isTrue){
        notifButton.src = "public/homepage/notif_act.svg";
    }
    else{
        notifButton.src = "public/homepage/notif.svg";
    }
}
