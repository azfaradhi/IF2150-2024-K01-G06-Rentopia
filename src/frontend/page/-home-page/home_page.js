let currentPage = 1;
let itemsPerPage = 5;

async function fetchActivity(page) {
    console.log("fetchActivity called with page:", page); // Debug log
    try {
        const apiUrl = `http://localhost:5000/api/activity/alldata?page=${page}&items_per_page=${itemsPerPage}`;
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
        <td>${activity.status_car}</td>
        `;
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

document.addEventListener('DOMContentLoaded', () => {
    homePageCommandChoice();
    makeHomePage();
});