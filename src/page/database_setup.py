import psycopg2

# Konfigurasi koneksi PostgreSQL
DB_USER = 'rpl'
DB_PASS = 'rpl'
DB_HOST = 'localhost'
DB_NAME = 'rentopia'

def get_connection():
    """Buat koneksi ke database PostgreSQL"""
    conn = psycopg2.connect(
        host=DB_HOST,
        database=DB_NAME,
        user=DB_USER,
        password=DB_PASS
    )
    return conn

def create_tables(conn):
    cur = conn.cursor()
    # Buat tabel cars
    cur.execute("""
        CREATE TABLE IF NOT EXISTS cars (
            id_car TEXT PRIMARY KEY, 
            photo_car TEXT NOT NULL, 
            model_car TEXT  NOT NULL, 
            type_car TEXT NOT NULL, 
            seat_car INTEGER NOT NULL, 
            price_car INTEGER NOT NULL, 
            status_car TEXT
        );
    """)
    # Buat tabel customers
    cur.execute("""
        CREATE TABLE IF NOT EXISTS customers (
            id_cust INTEGER PRIMARY KEY,
            name_cust TEXT NOT NULL,
            phone_cust TEXT NOT NULL,
            address_cust TEXT NOT NULL,
            additional_info_cust TEXT,
            status_cust TEXT
        );
    """)
    # Buat tabel activities
    cur.execute("""
        CREATE TABLE activities(
            id_activity SERIAL PRIMARY KEY,
            id_cust INTEGER,
            id_car TEXT,
            date_range DATE[],
            total_price INTEGER NOT NULL,
            status_car TEXT,
            status_cust TEXT,
            status_activity TEXT,
            additional_info_activity TEXT,
            FOREIGN KEY(id_cust) REFERENCES customers(id_cust) ON DELETE SET NULL,
            FOREIGN KEY(id_car) REFERENCES cars(id_car) ON DELETE SET NULL
        );
    """)
    # membuat tabel notifications
    cur.execute("""
        CREATE TABLE IF NOT EXISTS notifications (
            id_notif SERIAL PRIMARY KEY,
            date_end DATE,
            id_activity INTEGER,
            FOREIGN KEY (id_activity) REFERENCES activities(id_activity) ON DELETE CASCADE
        );
    """)

    conn.commit()
    #cur.close()

# if __name__ == '__main__':
#     conn = get_connection()
#     create_tables(conn)
#     conn.close()
#     print("Database dan tabel telah dibuat.")