import datetime
import typing
import psycopg2

DB_USER = 'rpl'
DB_PASS = 'rpl'
DB_HOST = 'localhost'
DB_NAME = 'rentopia'

Aktivitas = {
    'id_activity': '',
    'id_cust': '',
    'id_mobil': '',
    'date_range': '',
    'total_price': '',
    'status_car': '',
    'status_cust': '',
    'status_activity': '',
    'additional_info_activity': ''
}

Customer = {

}

conn = psycopg2.connect(
    host=DB_HOST,
    database=DB_NAME,
    user=DB_USER,
    password=DB_PASS
)

cur = conn.cursor()

def GetIDAktivitas(dataAktivitas: typing.Dict[str, str]) -> int:
    cur.execute("""
        SELECT id_activity 
        FROM activities 
        WHERE id_activity == %s,
        """, (dataAktivitas['id_activity'],)
    )
    conn.commit()
    return cur.fetchone()


# def SetIDAktivitas():
#
#     return

def GetIDPelanggan(dataPelanggan: typing.Dict[str, str]) -> int:
    cur.execute("""
        SELECT id_cust 
        FROM activities 
        WHERE id_cust == %s;
        """, (dataPelanggan['id_cust'],)
    )
    conn.commit()
    return cur.fetchone()[0]


def SetIDPelangganInAktivitas(idPelanggan: int, idAktivitas: int):
    cur.execute("""
        UPDATE activities
        SET id_cust = %s
        WHERE id_activity = %s;
        """, (idAktivitas, idPelanggan,)
    )
    conn.commit()
    return


def GetIDMobil(idAktivitas: int) -> str:
    cur.execute("""
        SELECT id_cust 
        FROM activities 
        WHERE id_car == %s;
        """, (idAktivitas,)
    )
    conn.commit()
    return cur.fetchone()[0]


def SetIDMobilInAktivitas(idMobil : str, idAktivitas: int):
    cur.execute("""
        INSERT INTO activities (id_car)
        WHERE id_activity == %s
        VALUES (%s);
        """, (idAktivitas, idMobil,)
    )
    conn.commit()
    return cur.fetchone()


def GetTanggalAwal(idAktivitas: int) -> datetime.date:
    cur.execute("""
        SELECT date_range 
        FROM activities 
        WHERE id_activity == %s;
        """, (idAktivitas,)
    )
    date = cur.fetchone()[2][0]
    return datetime.strptime(date, "%Y-%m-%d").date() 



# def SetTanggalAwal(rentangTanggal: List<date>): void

def GetTanggalAkhir(idAktivitas: int) -> datetime.date:
    cur.execute("""
        SELECT date_range 
        FROM activities 
        WHERE id_activity == %s;
        """, (idAktivitas,)
    )
    date = cur.fetchone()[2][1]
    return datetime.strptime(date, "%Y-%m-%d").date() 


# def SetTanggalAkhir(rentangTanggal: List<date>): void

SetIDPelangganInAktivitas(4, 4)