console.log("report page");

async function fetchReport(date_range) {
    console.log("fetching report");
    // const apiUrl2 = `http://127.0.0.1:5000/api/report?date_range=${date_range}`;
    // console.log(apiUrl2);
    // console.log(`http://127.0.0.1:5000/api/report?date_range=${date_range}`);
    try {
        const apiUrl = `http://127.0.0.1:5000/api/report?date_range=${date_range}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Error fetching report: ${response.statusText}`);
        }
        const data = await response.json();
        displayReport(data.report_list);
    } catch (error) {
        console.error("Failed to fetch report:", error);
    }
}

function reportPageCommandChoice() {
    console.log("report page command choice");
    const submitButton = document.getElementById("btn-submit");
    if (submitButton) {
        submitButton.addEventListener('click', async () => {
            const date_awal = document.getElementById("start-date").value;
            const date_akhir = document.getElementById("end-date").value;
            const date_range = `{${date_awal},${date_akhir}}`;
            await fetchReport(date_range);
        })
    }
}

function displayReport(activities) {
    console.log("displaying report");
    const tableBody = document.getElementById("report-table-body");
    
    tableBody.innerHTML = "";
    let total = 0;
    activities.forEach(activity => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${activity.id_cust}</td>
        <td>${activity.name_cust}</td>
        <td>${activity.id_car}</td>
        <td>${activity.model_car}</td>
        <td>${activity.date_range ? activity.date_range[0] : 'N/A'}</td>
        <td>${activity.date_range ? activity.date_range[1] : 'N/A'}</td>
        <td>${activity.total_price}</td>
        `;
        tableBody.appendChild(row);
        total += activity.total_price;
        console.log("Total:", total);
    });
    const totalDisplay = document.getElementById("total-price");
    totalDisplay.textContent = "Total: " + total;
}

function makeReportPage() {
    fetchReport();
}

document.addEventListener('DOMContentLoaded', () => {
    reportPageCommandChoice();
    makeReportPage();
});