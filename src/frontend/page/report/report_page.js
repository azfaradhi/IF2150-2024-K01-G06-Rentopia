console.log("report page");
let reportCurrentPage = 1;
let reportItemsPerPage = 2;

async function fetchReport(page, date_range) {
    try {
        // fetching report
        const report_response = await fetch(`http://127.0.0.1:5000/api/report?date_range=${date_range}&page=${page}&items_per_page=${reportItemsPerPage}`);
        if (!report_response.ok) {
            throw new Error(`Error fetching report: ${report_response.statusText}`);
        }
        const report_data = await report_response.json();

        // fetching total harga
        const price_response = await fetch(`http://127.0.0.1:5000/api/report/price?date_range=${date_range}`);
        if (!price_response.ok) {
            throw new Error(`Error fetching report price: ${price_response.statusText}`);
        }
        const price_data = await price_response.json();

        displayReport(report_data.report_list, report_data.page, report_data.total_pages, price_data.total_price);
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

function displayReport(activities, page, totalPage, total_price) {
    console.log("displaying report");
    const tableBody = document.getElementById("report-table-body");
    
    tableBody.innerHTML = "";
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
    });
    if (page === totalPage) {
        const totalDisplay = document.getElementById("total-price");
        totalDisplay.textContent = "Total: " + total_price;
    } else {
        const totalDisplay = document.getElementById("total-price");
        totalDisplay.textContent = "";
    }

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