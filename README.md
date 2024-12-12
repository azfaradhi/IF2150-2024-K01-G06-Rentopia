# Rekayasa Perangkat Lunak G06 - K01

## Penjelasan Aplikasi Rentopia
Rentopia adalah P/L berbentuk aplikasi yang bertujuan untuk membantu pengguna mengelola bisnis rental mobil secara lebih efisien dan akurat. P/L ini dirancang untuk memusatkan catatan aktivitas peminjaman, pelanggan, serta unit mobil yang dimiliki, sehingga memudahkan pengelolaan operasional sehari-hari. Rentopia juga dilengkapi dengan fitur notifikasi yang mengingatkan pengguna tentang jadwal pengembalian mobil yang belum dilakukan, serta menyediakan laporan berkala yang dapat disesuaikan dengan kebutuhan pengguna. Dengan demikian, Rentopia membantu pengguna dalam meningkatkan efisiensi operasional dan keakuratan pendataan usaha rental mobil.

## Instalasi

### Instruksi
   1. Clone repository
      ```bash
      git clone https://github.com/azfaradhi/IF2150-2024-K01-G06-Rentopia.git
      ```
### Set-up Environment
  2. Set Up PostgreSQL
     Pastikan Anda telah melakukan setup username dan password database pada perangkat local Anda.
  3. Set Up Port Database
     Ubah Database User dan Database Password sesuai yang ada pada local pada src/backend/.env.
   ```bash
      DB_USER = 'your_username'
      DB_PASS = 'your_password'
   ```
### Menjalankan Database
   4. Set Up Database & Compile file Python
      ```bash
      cd src/backend
      python app.py
      ```
### Menjalankan Aplikasi
   5. Compile file Java & HTML
      ```bash
      cd src/frontend
      npm start
      ```

## Daftar Modul


## Daftar Tabel Basis Data
Berikut merupakan daftar tabel basis data yang digunakan dalam P/L ini. Header tabel menunjukkan nama tabel dan setiap kolom merepresentasikan atribut yang ada pada tabel.
| activities               | cars       | customers             | notifications |
|----------                |----------  |----------             |----------     |
| id_activity              | id_car     | id_cust               | id_notif      |
| id_cust                  | photo_car  | name_cust             | date_end      |
| id_car                   | model_car  | phone_cust            | id_activity   |
| date_rang                | type_car   | address_cust          |-  |
| total_price              | seat_car   | additional_info_cust  |-   |
| status_car               | price_car  | status cust           |-   |
| status_cust              | status_car | -                     |-   |
| status_activity          | -          | -                     |-   |
| additional_info_activity | -          | -                     |-   |
