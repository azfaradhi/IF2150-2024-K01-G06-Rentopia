
// ini untuk load pagenya
function loadPage(page, callback) {
    fetch(page)
        .then(response => response.text())
        .then(html => {
            const container = document.createElement('div');
            content.innerHTML = '';
            container.innerHTML = html;
            document.getElementById('content').appendChild(container);
            console.log('page loaded: ', page);
    
            // Add CSS
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = page.replace('.html', '.css');
            document.head.appendChild(link);
            // console.log(`CSS loaded: ${link.href}`);

            if (callback) {
                callback();
            }
        })
        .catch(error => {
            console.error('error: ', error);
        })
}
// export default loadPage;


// ini untuk routing si pagenya, kalau ada tambahan, tambahin aja :)
function router() {
    const hash = window.location.hash || '#/';
    const route = hash.substring(1);

    switch (route) {
        case '/':
            loadPage('./page/-home-page/home_page.html');
            makeHomePage();
            break;
        case '/activity':
            loadPage('./page/activity/activity_page.html');
            break;
        case '/car':
            loadPage('./page/car/car_page.html', () => {
                loadComponent('./page/car/-components/car-card/car_card.html', 'car-card-container');
            });
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
