import psycopg2
import os
# from dotenv import load_dotenv

ENV_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), '.env')
# load_dotenv(ENV_PATH)

# DB_USER = os.getenv('DB_USER')
# DB_PASS = os.getenv('DB_PASS')
# DB_HOST = os.getenv('DB_HOST')
# DB_NAME = os.getenv('DB_NAME')
# DB_PORT = os.getenv('DB_PORT')

DB_USER = 'rpl'
DB_PASS = 'rpl'
DB_HOST = '127.0.0.1'
DB_NAME = 'rentopia'
DB_PORT = "5432"

class DatabaseSetup:
    # Inisialisasi kelas
    def __init__(self, DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_PORT):
        self.host = DB_HOST
        self.database = DB_NAME
        self.user = DB_USER
        self.password = DB_PASS
        self.port = DB_PORT
        self.connection = self.get_connection()

    # Buat koneksi ke database PostgreSQL
    def get_connection(self):
        conn = psycopg2.connect(
            host=self.host,
            database=self.database,
            user=self.user,
            password=self.password,
            port = self.port
        )
        return conn

    # Membuat tabel-tabel pada database
    def create_tables(self):
        cur = self.connection.cursor()
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
                id_cust TEXT PRIMARY KEY,
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
                id_cust TEXT,
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

        self.connection.commit()

def setup_database():
    setup = DatabaseSetup(
        DB_HOST,
        DB_NAME,
        DB_USER,
        DB_PASS,
        DB_PORT
    )
    setup.create_tables()

if __name__ == '__main__':
    setup_database()
