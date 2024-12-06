function loadHomePage() {
    fetch('./page/-home-page/home_page.html')
        .then((response) => response.text())
        .then((html) => {
            const container = document.createElement('div');
            container.innerHTML = html;
            document.body.appendChild(container);

            // Tambahkan CSS
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = './page/-home-page/home_page.css';
            document.head.appendChild(link);
        })
        .catch((error) => {
            console.error('Error loading sidebar:', error);
        });
}

export default loadHomePage;