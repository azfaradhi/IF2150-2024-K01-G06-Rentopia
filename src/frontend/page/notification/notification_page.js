async function fetchAllActivities() {
    const apiUrl = 'http://127.0.0.1:5000/api/activity/alldata';
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
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
        const returnDate = new Date(activity.date_range[1]);
        const timeDiff = returnDate.getTime() - today.getTime();
        const diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));
        
        if (diffDays <= 1 && diffDays >= 0 && !shownActivities.includes(activity.id_activity)) {
            showNotification(activity);
            shownActivities.push(activity.id_activity);
        }
    });

    localStorage.setItem(SHOWN_ACTIVITIES_KEY, JSON.stringify(shownActivities));
}

async function showNotification(activity) {
    const notifContainer = document.getElementById('notif-container');
    
    if (!activity.name_cust || !activity.date_range || !activity.id_activity) {
        console.warn("Activity data is incomplete", activity);
        return; 
    }
    
    const notifBox = document.createElement('div');
    notifBox.classList.add('notif-box');
    notifBox.id = `notif-box-${activity.id_activity}`;

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

    if (notifBox.innerHTML.trim() !== "") {
        notifContainer.appendChild(notifBox);
    } else {
        console.warn("Empty notification template detected, not adding it.");
        const emptyNotifBox = document.createElement('div');
        emptyNotifBox.classList.add('notif-box');
        emptyNotifBox.innerHTML = `
            <div>
                <b style="font-size: 20px;">NOTIFICATION</b>
                <p>No activity found.</p>
            </div>
        `;
        notifContainer.appendChild(emptyNotifBox);
    }
}

function closeNotifBox(id) {
    const notifBox = document.getElementById(`notif-box-${id}`);
    if (notifBox) {
        notifBox.style.display = 'none';
    }
}