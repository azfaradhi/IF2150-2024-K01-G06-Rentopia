// ini untuk load pagenya
function loadPage(page) {
    fetch(page)
        .then(response => response.text())
        .then(html => {
            document.getElementById('content').innerHTML = html;
            console.log('page loaded: ', page);
        })
        .catch(error => {
            console.error('error: ', error);
        })
}


// ini untuk routing si pagenya, kalau ada tambahan, tambahin aja :)
function router() {
    const hash = window.location.hash || '#/';
    const route = hash.substring(1);

    switch (route) {
        case '/':
            loadPage('./page/-home-page/home_page.html');
            break;
        case '/activity':
            loadPage('./page/activity/activity_page.html');
            break;
        case '/car':
            loadPage('./page/car/car_page.html');
            break;
        case '/customer':
            loadPage('./page/customer/customer_page.html');
            break;
        case '/report':
            loadPage('./page/report/report_page.html');
            break;
        default:
            // loadPage('404.html');
    }
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);