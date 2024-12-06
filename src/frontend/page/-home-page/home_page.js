const baseUrl = `http://localhost:5000/api/activity/show/`;

async function fetchActivity(activityId) {
    try {
        const apiUrl = `${baseUrl}${activityId}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Error fetching activity: ${response.statusText}`);
        }
        const data = await response.json();
        displayActivity(data);
    } catch (error) {
        console.error("Failed to fetch activity:", error);
    }
}
function displayActivity(activity) {
    const tableBody = document.getElementById("activity-table-body");
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${activity.id_cust}</td>
        <td>${activity.status_car}</td>
        <td>${activity.id_car}</td>
        <td>${activity.date_range ? activity.date_range[0] : 'N/A'}</td>
        <td>${activity.date_range ? activity.date_range[1] : 'N/A'}</td>
        <td>${activity.status_car}</td>
    `;
    tableBody.appendChild(row);

}

for (let i =10; i>0;i--){
    fetchActivity(i);
}
