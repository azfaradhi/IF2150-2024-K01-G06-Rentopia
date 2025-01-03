# Rekayasa Perangkat Lunak G06 - K01

![OS](https://img.shields.io/badge/OS-Linux%20%7C%20MacBook%20%7C%20Windows%20%7C%20Windows%20WSL-blue?logo=linux)  
![Language](https://img.shields.io/badge/Language-Python%20%7C%20JavaScript%20%7C%20HTML%20%7C%20CSS-brightgreen?logo=python&logoColor=white)  
![Build Tool](https://img.shields.io/badge/Tools-Flask%20%7C%20Pyscope2-orange?logo=flask)  
![Database](https://img.shields.io/badge/Database-PostgreSQL-blue?logo=postgresql)  
![CLI](https://img.shields.io/badge/CLI-Electron-yellow?logo=electron)  

# **Rentopia**

<p align="center">
  <img src="logo.png" alt="Rentopia Logo">
</p>


## Penjelasan Aplikasi Rentopia
Rentopia adalah P/L berbentuk aplikasi yang bertujuan untuk membantu pengguna mengelola bisnis rental mobil secara lebih efisien dan akurat. P/L ini dirancang untuk memusatkan catatan aktivitas peminjaman, pelanggan, serta unit mobil yang dimiliki, sehingga memudahkan pengelolaan operasional sehari-hari. Rentopia juga dilengkapi dengan fitur notifikasi yang mengingatkan pengguna tentang jadwal pengembalian mobil yang belum dilakukan, serta menyediakan laporan berkala yang dapat disesuaikan dengan kebutuhan pengguna. Dengan demikian, Rentopia membantu pengguna dalam meningkatkan efisiensi operasional dan keakuratan pendataan usaha rental mobil.

## Instalasi

### Instruksi
   1. Clone repository
      ```bash
      git clone https://github.com/azfaradhi/IF2150-2024-K01-G06-Rentopia.git
      ```
### Set-up Environment
  2. Set Up PostgreSQL <br>
     Pastikan Anda telah melakukan setup username dan password database pada perangkat local Anda.
  3. Set Up Port Database <br>
     Ubah Database User dan Database Password sesuai yang ada pada local pada src/backend/.env.
      ```bash
      DB_USER = 'your_username'
      DB_PASS = 'your_password'
      ```

### Menjalankan Database
   4. Set Up Database, Tools, dan Compile file Python
      ```bash
      pip install -r requirements.txt
      
      cd src/backend

      python app.py
      ```
### Menjalankan Aplikasi
   5. Compile file Java & HTML
      ```bash
      cd src/frontend
      
      npm install

      npm start
      ```

## Daftar Modul
Berikut merupakan daftar modul yang diimplementasikan dalam P/L rentopia, beserta pembagian tugas masing-masing anggota.
<table> 
  <thead>
    <tr>
      <th> Anggota </th>
      <th> Modul Activity </th>
      <th> Modul Customer </th>
      <th> Modul Car </th>
      <th> Modul Report </th>
      <th> Modul Notification </th>
      <th> Lain - lain </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th> 13523043 </th>
        <td> Controller </td>
        <td> Model </td>
        <td> UI </td>
        <td> - </td>
        <td> Model <br> Controller </td>
        <td> - </td>
    </tr>
    <tr>
      <th> 13523079 </th>
        <td> Model </td>
        <td> Controller </td>
        <td> Controller <br> Model </td>
        <td> - </td>
        <td> - </td>
        <td> - </td>
    </tr>
    <tr>
      <th> 13523095 </th>
        <td> - </td>
        <td> UI </td>
        <td> UI </td>
        <td> - </td>
        <td> Controller <br> UI </td>
        <td> - </td>
    </tr>
    <tr>
      <th> 13523101 </th>
        <td> - </td>
        <td> UI </td>
        <td> UI </td>
        <td> UI <br> Controller </td>
        <td> - </td>
        <td> Set Up Database & Aplikasi </td>
    </tr>
    <tr>
      <th> 13523115 </th>
        <td> Controller <br> UI </td>
        <td> Controller <br> UI </td>
        <td> Controller <br> UI </td>
        <td> - </td>
        <td> - </td>
        <td> Set Up Database & Aplikasi </td>
    </tr>
  </tbody>

</table>


### Home Page
<p align="center">
  <img src="doc/page-history.png" alt="Page History">
</p>

### Page List of Car
<p align="center">
  <img src="doc/page-list-car.png" alt="Page List Car">
</p>

### Page List of Customer
<p align="center">
  <img src="doc/page-list-customer.png" alt="Page List Customer">
</p>

### Page Add Activity
<p align="center">
  <img src="doc/page-add-activity.png" alt="Page Add Activity">
</p>

### Page Add Car
<p align="center">
  <img src="doc/page-add-car.png" alt="Page Add Car">
</p>

### Page Add Customer
<p align="center">
  <img src="doc/page-add-customer.jpg" alt="Page Add Customer">
</p>

### Page Report
<p align="center">
  <img src="doc/page-report.png" alt="Page Report">
</p>

### Page Notification
<p align="center">
  <img src="doc/page-notification.png" alt="Page Notification">
</p>


## Daftar Tabel Basis Data
Berikut merupakan daftar tabel basis data yang digunakan dalam P/L ini. Header tabel menunjukkan nama tabel dan setiap kolom merepresentasikan atribut yang ada pada tabel.

| activities               | cars       | customers             | notifications |
|--------------------------|------------|-----------------------|---------------|
| id_activity              | id_car     | id_cust               | id_notif      |
| id_cust                  | photo_car  | name_cust             | date_end      |
| name_cust                | model_car  | phone_cust            | id_activity   |
| id_car                   | type_car   | address_cust          | -             |
| model_car                | seat_car   | status_cust           | -             |
| date_range               | price_car  | -                     | -             |
| total_price              | status_car | -                     | -             |
| status_car               | -          | -                     | -             |
| status_cust              | -          | -                     | -             |
| status_activity          | -          | -                     | -             |

## Anggota Kelompok
1. 13523043 - Najwa Kahani Fatima
2. 13523079 - Nayla Zahira
3. 13523095 - Rafif Farras
4. 13523101 - Barru Adi Utomo
5. 13523115 - Azfa Radhiyya Hakim
