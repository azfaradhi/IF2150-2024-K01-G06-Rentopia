import database #harus diadjust nanti
import psycopg2


conn = database.get_connection()

cur = conn.cursor()

def SetCustomerID(id_customer: int, id_reference: int):
    cur.execute("""
        UPDATE customers
        SET id_cust = %s
        WHERE id_cust = %s;
    """, (id_customer,id_reference))


def SetCustomerName(name_customer: str, id_customer:int):
    cur.execute(""" 
        UPDATE customers
        SET name_cust = %s
        WHERE id_cust = %s;
    """, (name_customer,id_customer))
    conn.commit()
    
def SetCustomerPhone(phone_customer: str, id_customer: int):
    cur.execute(""" 
        UPDATE customers
        SET phone_cust = %s
        WHERE id_cust = %s;
    """, (phone_customer,id_customer))
    conn.commit()
    
def SetCustomerAddress(address_customer: str, id_customer: int):
    cur.execute(""" 
        UPDATE customers
        SET address_cust = %s
        WHERE id_cust = %s;
    """, (address_customer,id_customer))
    conn.commit()

def SetCustomerAdditionalInfo(info_customer: str, id_customer: int):
    cur.execute(""" 
        UPDATE customers
        SET additional_info_cust = %s
        WHERE id_cust = %s;
    """, (info_customer,id_customer))
    conn.commit()

def SetCustomerStatus(status_customer: str, id_customer: int):
    cur.execute(""" 
        UPDATE customers
        SET status_cust = %s
        WHERE id_cust = %s;
    """, (status_customer,id_customer))
    conn.commit()

SetCustomerStatus("gabeli",12)
def GetCustomerID(name_customer: str) -> int:
    cur.execute("""
        SELECT id_cust
        FROM customers
        WHERE name_cust = %s
    """, (name_customer,))
    result = cur.fetchone()
    return result[0] if result else None

def GetCustomername(id_customer: int) -> str:
    cur.execute("""
        SELECT name_cust
        FROM customers
        WHERE id_cust = %s
    """, (id_customer,))
    result = cur.fetchone()
    return result[0] if result else None

def GetCustomerPhone(id_customer: int) -> str:
    cur.execute("""
        SELECT phone_cust
        FROM customers
        WHERE id_cust = %s
    """, (id_customer,))
    result = cur.fetchone()
    return result[0] if result else None

def GetCustomerAddress(id_customer: int) -> str:
    cur.execute("""
        SELECT phone_cust
        FROM customers
        WHERE id_cust = %s
    """, (id_customer,))
    result = cur.fetchone()
    return result[0] if result else None

def GetCustomerAdditionalInfo(id_customer: int) -> str:
    cur.execute("""
        SELECT additional_info_cust
        FROM customers
        WHERE id_cust = %s
    """, (id_customer,))
    result = cur.fetchone()
    return result[0] if result else None

def GetCustomerStatus(id_customer: int) -> str:
    cur.execute("""
        SELECT status_cust
        FROM customers
        WHERE id_cust = %s
    """, (id_customer,))
    result = cur.fetchone()
    return result[0] if result else None