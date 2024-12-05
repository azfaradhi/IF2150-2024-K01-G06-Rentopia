const components = [
    { path: './page/car/-components/status-button/status_button.html', elementId: 'status-button-container' },
];

function loadComponent(componentPath, elementId) {
    fetch(componentPath)
        .then(response => response.text())
        .then(html => {
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = html;
                console.log(`Component loaded: ${componentPath}`);
            } else {
                console.error(`Element with id ${elementId} not found`);
            }
        })
        .catch(error => {
            console.log(`Component: ${componentPath}`);
            console.error('Error loading component:', error);
        });
}

function loadAllComponents() {
    components.forEach(component => {
        loadComponent(component.path, component.elementId);
    });
}


loadAllComponents();