async function fetchAllActivities() {
    console.log('RAFIF OK');
    const apiUrl = 'http://127.0.0.1:5000/api/activity/alldata'; // API yang akan dipanggil
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log('Received data:', data);
        return data.activities;
    } catch (error) {
        console.error("Error fetching activity:", error);
        return [];
    }
}

const SHOWN_ACTIVITIES_KEY = 'shown_activities';

async function fetchAllNotifications() {
    const activities = await fetchAllActivities();
    const today = new Date();
    
    const shownActivities = JSON.parse(localStorage.getItem(SHOWN_ACTIVITIES_KEY)) || [];

    activities.forEach(activity => {
        const returnDate = new Date(activity.date_range[1]); // Menggunakan tanggal akhir dari date_range
        const timeDiff = returnDate.getTime() - today.getTime();
        const diffDays = Math.floor(timeDiff / (1000 * 3600 * 24)); // Menggunakan Math.floor
        
        if (diffDays <= 1 && diffDays >= 0 && !shownActivities.includes(activity.id_activity)) {
            showNotification(activity);
            shownActivities.push(activity.id_activity);
        }
    });

    // Simpan ID aktivitas yang sudah ditampilkan ke localStorage
    localStorage.setItem(SHOWN_ACTIVITIES_KEY, JSON.stringify(shownActivities));
    // localStorage.removeItem(SHOWN_ACTIVITIES_KEY);
}

async function showNotification(activity) {
    console.log('LOVE');
    const notifContainer = document.getElementById('notif-container');
    
    // Pastikan bahwa data yang diperlukan ada sebelum menampilkan notifikasi
    if (!activity.name_cust || !activity.date_range || !activity.id_activity) {
        console.warn("Activity data is incomplete", activity);
        return;  // Jika data tidak lengkap, tidak akan menampilkan notifikasi
    }
    
    // Membuat elemen notif-box baru
    const notifBox = document.createElement('div');
    notifBox.classList.add('notif-box');  // Menambahkan kelas untuk styling
    notifBox.id = `notif-box-${activity.id_activity}`; // Unikkan ID untuk setiap notifikasi

    // Menambahkan isi HTML untuk notifikasi
    notifBox.innerHTML = `
        <div>
            <b style="font-size: 20px;">NOTIFICATION</b>
            <p>The ${activity.id_car} ${activity.model_car} rented by ${activity.name_cust} is due for return on ${activity.date_range[1]}</p>
        </div>
        <div class="actions">
            <button id="btn-close-${activity.id_activity}" onclick="closeNotifBox(${activity.id_activity})">
                <img src="public/close.svg" alt="Close" width="15" height="15" style="vertical-align: middle;">
            </button>
        </div>
    `;

    // Menambahkan notifBox ke dalam notifContainer hanya jika template valid
    if (notifBox.innerHTML.trim() !== "") {
        notifContainer.appendChild(notifBox); // Ini akan menambahkan elemen baru tanpa menimpa yang sudah ada
    } else {
        console.warn("Empty notification template detected, not adding it.");
    }
}

function closeNotifBox(id) {
    const notifBox = document.getElementById(`notif-box-${id}`);
    if (notifBox) {
        notifBox.style.display = 'none'; // Menyembunyikan kotak notifikasi
    }
}