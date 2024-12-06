function loadSidebar() {
    fetch('./components/side-bar/side_bar.html')
        .then((response) => response.text())
        .then((html) => {
            console.log('Sidebar loaded:', html);
            const container = document.createElement('div');
            container.innerHTML = html;
            document.body.appendChild(container);

            // Tambahkan CSS
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = './components/side-bar/side_bar.css';
            document.head.appendChild(link);
        })
        .catch((error) => {
            console.error('Error loading sidebar:', error);
        });
}

window.onload = () => {
    loadSidebar();
};

// export default loadSidebar;
// window.addEventListener('hashchange', router);
// window.addEventListener('load', router);