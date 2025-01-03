const components = [
    { path: './page/car/-components/car-card/car_card.html', elementId: 'car-card-container' },
    { path: './components/side-bar/side_bar.html', elementId: 'side-bar-container' },
    { path: './page/customer/-components/info-customer/info_customer.html', elementId: 'cust-card-container' },
];

function loadComponent(componentPath, elementId) {
    fetch(componentPath)
        .then(response => response.text())
        .then(html => {
            const element = document.getElementById(elementId);
            console.log(`Component loaded: ${componentPath}`);
            if (element) {
                element.innerHTML = html;
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = componentPath.replace('.html', '.css');
                document.head.appendChild(link);
                console.log(`CSS loaded: ${link.href}`);
                
            } else {
                console.error(`Element with id ${elementId} not found`);
            }
        })
        .catch(error => {
            console.error('Error loading component:', error);
        });
}

function loadAllComponents(callback) {
    const promises = components.map(component => {
        return loadComponent(component.path, component.elementId);
    });
    Promise.all(promises).then(() => {
        if (callback) {
            callback();
        }
    });
}

window.loadComponent = loadComponent;
window.loadAllComponents = loadAllComponents;