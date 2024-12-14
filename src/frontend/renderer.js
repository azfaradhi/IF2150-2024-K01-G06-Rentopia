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
            console.log(`CSS loaded: ${link.href}`);
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

function router() {
    const hash = window.location.hash || '#/';
    const route = hash.substring(1);
    console.log(route);
    switch (true) {
        case route === '/':
            loadPage('./page/-home-page/home_page.html', () =>{
                homePageCommandChoice();
                makeHomePage();
                setTimeout(async () => {
                    changeNotifButton();
                    await new Promise(resolve => setTimeout(resolve, 100));
                }, 1000);
                setInterval(async () => {
                    await changeNotifButton();
                    console.log("Notification button status updateddddddd.");
                }, 60000);
                if (!localStorage.getItem('hasRun')) {
                    localStorage.removeItem('SHOWN_ACTIVITIES_KEY');
                    localStorage.setItem('hasRun', 'true');
                }
            });
            
            break;
        case route === '/activity':
            loadPage('./page/activity/activity_page.html');
            break;
        case route === '/activity/add-activity':
            console.log("fwfed");
            loadPage('./page/activity/add-activity/add_activity.html', () => {
                initAddActivity();
            });
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
        case route.startsWith('/customer/add'):
            const parampage = getQueryParams();
            if (parampage["id"] === "home"){
                loadPage('./page/customer/add-customer/add_customer.html', () =>{
                    console.log("parampage = ",parampage["id"]);
                    initAddCustomer(parampage["id"]);
                })
                break;
            }
            else if (parampage["id"] === "customer"){
                loadPage('./page/customer/add-customer/add_customer.html', () =>{
                    initAddCustomer(parampage["id"]);
                })
                break;
            }
        case route.startsWith('/customer/update'):
            const custUpdateParam = getQueryParams();
            loadPage('./page/customer/update-customer/update_customer.html', () =>{
                console.log('anu');
                initUpdateCustomer(custUpdateParam["id"]);
            })
            break;
        case route === '/report':
            console.log("masuk report");    
            loadPage('./page/report/report_page.html', () => {
                reportPageCommandChoice();
                makeReportPage();
            });
            break;
        case route === '/notification':
            loadPage('./page/notification/notification_page.html');
            console.log('DIPANGGILLLLLLLLL');
            fetchAllNotifications();
            break;
        default:
    }
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
