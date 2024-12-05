import psycopg2
from psycopg2 import OperationalError, Error


def get_connection():
    """Buat koneksi ke database PostgreSQL"""
    conn = psycopg2.connect(
        dbname="rentopia",
        user="rpl",
        password="rpl",
        host="127.0.0.1",
        port="5432"
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
        CREATE TABLE IF NOT EXISTS activities(
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
    # cur.close()

# conn = get_connection()
# create_tables(conn)