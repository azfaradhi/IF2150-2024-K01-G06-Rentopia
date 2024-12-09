console.log("report page");
let reportCurrentPage = 1;
let reportItemsPerPage = 5;

async function fetchReport(page, date_range) {
    // console.log("fetching report");
    // const apiUrl2 = `http://127.0.0.1:5000/api/report?date_range=${date_range}`;
    // console.log(apiUrl2);
    // console.log(`http://127.0.0.1:5000/api/report?date_range=${date_range}`);
    try {
        const apiUrl = `http://127.0.0.1:5000/api/report?date_range=${date_range}&page=${page}&items_per_page=${reportItemsPerPage}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Error fetching report: ${response.statusText}`);
        }
        const data = await response.json();
        displayReport(data.report_list, data.page, data.total_pages);
    } catch (error) {
        console.error("Failed to fetch report:", error);
    }
}

function reportPageCommandChoice() {
    // TODO: totaling harganya supaya ga per page hhhhhh
    console.log("report page command choice");
    const submitButton = document.getElementById("btn-submit");
    const nextButton = document.getElementById("next-page");
    const prevButton = document.getElementById("prev-page");

    if (nextButton) {
        nextButton.addEventListener('click', async () => {
            const date_awal = document.getElementById("start-date").value;
            const date_akhir = document.getElementById("end-date").value;
            const date_range = `{${date_awal},${date_akhir}}`;
            console.log(reportCurrentPage);
            reportCurrentPage++;
            await fetchReport(reportCurrentPage, date_range);
            console.log("current: ", reportCurrentPage); 
        })
    }

    if (prevButton) {
        prevButton.addEventListener('click', async () => {
            console.log(currentPage);
            const date_awal = document.getElementById("start-date").value;
            const date_akhir = document.getElementById("end-date").value;
            const date_range = `{${date_awal},${date_akhir}}`;
            if (reportCurrentPage > 1){
                reportCurrentPage --;
                await fetchReport(reportCurrentPage, date_range);
                console.log("current: ",reportCurrentPage);
            }
        })
    }

    if (submitButton) {
        console.log("submit button");
        submitButton.addEventListener('click', async () => {
            const date_awal = document.getElementById("start-date").value;
            const date_akhir = document.getElementById("end-date").value;
            const date_range = `{${date_awal},${date_akhir}}`;
            await fetchReport(reportCurrentPage, date_range);
        })
    }
}

function displayReport(activities, page, totalPage) {
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

    const pageNumberDisplay = document.getElementById("page-number");
    pageNumberDisplay.textContent = `Page: ${page}`;

    const prevButton = document.getElementById("prev-page");
    const nextButton = document.getElementById("next-page");

    prevButton.disabled = page <= 1;
    nextButton.disabled = page >= totalPage;
}

function makeReportPage() {
    fetchReport();
}

document.addEventListener('DOMContentLoaded', () => {
    reportPageCommandChoice();
    makeReportPage();
});