import database #harus diadjust nanti
import psycopg2


conn = database.get_connection()

cur = conn.cursor()

def SetPelangganID(idPelanggan: int, id_reference: int):
    cur.execute("""
        UPDATE customers
        SET id_cust = %s
        WHERE id_cust = %s;
    """, (idPelanggan,id_reference))


def SetPelangganNama(namaPelanggan: str, idPelanggan:int):
    cur.execute(""" 
        UPDATE customers
        SET name_cust = %s
        WHERE id_cust = %s;
    """, (namaPelanggan,idPelanggan))
    conn.commit()
SetPelangganNama('jokowi',10)
    
def SetPelangganTelp(telpPelanggan: str, idPelanggan: int):
    cur.execute(""" 
        UPDATE customers
        SET phone_cust = %s
        WHERE id_cust = %s;
    """, (telpPelanggan,idPelanggan))
    conn.commit()
    
def SetPelangganAlamat(alamatPelanggan: str, idPelanggan: int):
    cur.execute(""" 
        UPDATE customers
        SET address_cust = %s
        WHERE id_cust = %s;
    """, (alamatPelanggan,idPelanggan))
    conn.commit()

def SetPelangganKeterangan(keteranganPelanggan: str, idPelanggan: int):
    cur.execute(""" 
        UPDATE customers
        SET additional_info_cust = %s
        WHERE id_cust = %s;
    """, (keteranganPelanggan,idPelanggan))
    conn.commit()

def SetPelangganStatus(statusPelanggan: str, idPelanggan: int):
    cur.execute(""" 
        UPDATE customers
        SET status_cust = %s
        WHERE id_cust = %s;
    """, (statusPelanggan,idPelanggan))
    conn.commit()


def GetPelangganID(namaPelanggan: str) -> int:
    cur.execute("""
        SELECT id_cust
        FROM customers
        WHERE name_cust = %s
    """, (namaPelanggan,))
    result = cur.fetchone()
    return result[0] if result else None

def GetPelangganNama(idPelanggan: int) -> str:
    cur.execute("""
        SELECT name_cust
        FROM customers
        WHERE id_cust = %s
    """, (idPelanggan,))
    result = cur.fetchone()
    return result[0] if result else None

def GetPelangganTelp(idPelanggan: int) -> str:
    cur.execute("""
        SELECT phone_cust
        FROM customers
        WHERE id_cust = %s
    """, (idPelanggan,))
    result = cur.fetchone()
    return result[0] if result else None

def GetPelangganAlamat(idPelanggan: int) -> str:
    cur.execute("""
        SELECT phone_cust
        FROM customers
        WHERE id_cust = %s
    """, (idPelanggan,))
    result = cur.fetchone()
    return result[0] if result else None

def GetPelangganKeterangan(idPelanggan: int) -> str:
    cur.execute("""
        SELECT additional_info_cust
        FROM customers
        WHERE id_cust = %s
    """, (idPelanggan,))
    result = cur.fetchone()
    return result[0] if result else None

def GetPelangganStatus(idPelanggan: int) -> str:
    cur.execute("""
        SELECT status_cust
        FROM customers
        WHERE id_cust = %s
    """, (idPelanggan,))
    result = cur.fetchone()
    return result[0] if result else None