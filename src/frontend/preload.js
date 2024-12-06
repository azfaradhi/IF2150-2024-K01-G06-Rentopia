
// ini untuk routing tiap pagenya, kek /api/activity/blablabla
// dan berlaku untuk semua page

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    fetchActivity: async (id_activity) => {
        const response = await fetch(`http://127.0.0.1:5000/api/activity/${id_activity}`);
        return response.json();
    },
    showActivity: async (id_activity) => {
        const response = await fetch(`http://127.0.0.1:5000/api/activity/show/${id_activity}`);
        return response.json();
    },
});
