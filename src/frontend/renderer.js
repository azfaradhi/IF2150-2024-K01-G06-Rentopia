
// ini untuk load pagenya
function loadPage(page, callback) {
    fetch(page)
        .then(response => response.text())
        .then(html => {
            // const content = document.getElementById('content');
            // content.innerHTML = ''; // Clear only the content area, not the sidebar
            // content.innerHTML = html;
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
function getQueryParams() {
    const params = {};
    const queryString = window.location.hash.split('?')[1];
    console.log(queryString);
    if (queryString) {
        queryString.split('&').forEach(param => {
            const [key, value] = param.split('=');
            params[key] = decodeURIComponent(value);
        });
    }
    return params;
}

// ini untuk routing si pagenya, kalau ada tambahan, tambahin aja :)
function router() {
    const hash = window.location.hash || '#/';
    const route = hash.substring(1);
    console.log(route);
    switch (true) {
        case route === '/':
            loadPage('./page/-home-page/home_page.html', () =>{
                homePageCommandChoice();
                makeHomePage();
            });
            
            break;
        case route === '/activity':
            loadPage('./page/activity/activity_page.html');
            break;
        case route ==='/car':
            loadPage('./page/car/car_page.html', () => {
                makeCarPage();
                carPageCommandChoice();
            });
            break;
        case route === '/car/add':
            loadPage('./page/car/add-car/add_car.html', () =>{
                initAddCar();

            });
            break;
        case route.startsWith('/car/edit'):
            console.log("apalahweh");
            const param = getQueryParams();
            loadPage('./page/car/edit-car/edit_car.html', () =>{
                console.log("param = ",param["id"]);
                fetchCarById(param["id"]);
            })
            break;

        case route === '/customer':
            loadPage('./page/customer/customer_page.html', () =>{
                makeCustomerPage();
                customerPageCommandChoice();
            });
            break;
        case route === '/customer/add':
            loadPage('./page/customer/add-customer/add_customer.html', () =>{
                initAddCustomer();
            })
            break;
        case route === '/report':
            loadPage('./page/report/report_page.html');
            break;
        default:
            // loadPage('404.html');
    }
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
