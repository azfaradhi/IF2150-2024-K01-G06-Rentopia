# import db config
from _utils.database_setup import DatabaseSetup, DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_PORT

class Customer:
    #Inisialisasi Kelas Customer
    def __init__(self, id_cust):
        self.id_cust = id_cust
        self.__name_cust = None
        self.__phone_cust = None
        self.__address_cust = None
        self.__additional_info_cust = None
        self.__status_cust = None
    
    def loadCustomer(self):
        db_setup = DatabaseSetup(DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_PORT)
        conn = db_setup.get_connection()
        cur = conn.cursor()

        cur.execute("""
                    SELECT *
                    FROM customers
                    WHERE id_cust = %s
                    """, (self.id_cust, ))
        dataCustomer = cur.fetchone()

        if dataCustomer:
            self.__name_cust = dataCustomer[1]
            self.__phone_cust = dataCustomer[2]
            self.__address_cust = dataCustomer[3]
            self.__additional_info_cust = dataCustomer[4]
            self.__status_cust = dataCustomer[5]
        
    def saveCustomer(self):
        db_setup = DatabaseSetup(DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_PORT)
        conn = db_setup.get_connection()
        cur = conn.cursor()

        try:
            cur.execute("""
                        SELECT id_cust
                        FROM customers
                        WHERE id_cust = %s
                    """, (self.id_cust, ))
            existingCustomer = cur.fetchone()
            
            if existingCustomer:
                cur.execute("""
                        UPDATE customers
                        SET name_cust = %s,
                            phone_cust = %s,
                            address_cust = %s,
                            status_cust = %s
                        WHERE id_cust = %s
                        """, 
                        (self.__name_cust,
                         self.__phone_cust,
                        self.__address_cust,
                        self.__status_cust,
                        self.id_cust))
                conn.commit()
            else:
                cur.execute("""
                        INSERT INTO customers
                            (id_cust,
                            name_cust,
                            phone_cust,
                            address_cust,
                            status_cust)
                        VALUES (%s, %s, %s, %s, %s)
                        """, 
                        (self.id_cust,
                         self.__name_cust,
                         self.__phone_cust,
                        self.__address_cust,
                        self.__status_cust))
                conn.commit()
        except Exception as e:
            conn.rollback()
            print(f"Error: {e}")
        finally:
            cur.close()
            
    def deleteCustomer(self):
        db_setup = DatabaseSetup(DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_PORT)
        conn = db_setup.get_connection()
        cur = conn.cursor()

        try:
            cur.execute("""
                        SELECT id_cust
                        FROM customers
                        WHERE id_cust = %s
                    """, (self.id_cust, ))
            existingCustomer = cur.fetchone()
            
            if existingCustomer:
                cur.execute("""
                        DELETE FROM customers
                        WHERE id_cust = %s
                        """, (self.id_cust, ))
                conn.commit()
        except Exception as e:
            conn.rollback()  
            print(f"Error: {e}")
        finally:
            cur.close()
        
    def get_paginated_customers(page, items_per_page):
        offset = (page - 1) * items_per_page
        db_setup = DatabaseSetup(DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_PORT)
        conn = db_setup.get_connection()
        cur = conn.cursor()

        try:
            cur.execute("""
                SELECT id_cust, name_cust, phone_cust, address_cust, status_cust
                FROM customers
                ORDER BY id_cust  -- Adjust ordering if necessary
                LIMIT %s OFFSET %s
            """, (items_per_page, offset))

            customers = cur.fetchall()

            cur.execute("SELECT COUNT(*) FROM customers")
            total_customers = cur.fetchone()[0]
            total_pages = (total_customers + items_per_page - 1) // items_per_page  # Calculate total pages

            customers_list = [{
                'id_cust': customer[0],
                'name_cust': customer[1],
                'phone_cust': customer[2],
                'address_cust': customer[3],
                'status_cust': customer[4]
            } for customer in customers]

            return customers_list, total_customers, total_pages
        except Exception as e:
            print(f"Error: {e}")
            return [], 0, 0
        finally:
            cur.close()
            conn.close()

    def getIDCustomer(self):
        return self.id_cust
    
    def setIDCustomer(self, id_cust):
        self.id_cust = id_cust
        
    def getNameCustomer(self):
        return self.__name_cust

    def setNameCustomer(self, name_cust):
        self.__name_cust = name_cust

    def getPhoneCustomer(self):
        return self.__phone_cust

    def setPhoneCustomer(self, phone_cust):
        self.__phone_cust = phone_cust

    def getAddressCustomer(self):
        return self.__address_cust

    def setAddressCustomer(self, address_cust):
        self.__address_cust = address_cust

    def getAdditionalInfoCustomer(self):
        return self.__additional_info_cust

    def setAdditionalInfoCustomer(self, additional_info_cust):
        self.__additional_info_cust = additional_info_cust

    def getStatusCustomer(self):
        return self.__status_cust

    def setStatusCustomer(self, status_cust):
        self.__status_cust = status_cust
        
    def existCustomer(self):
        db_setup = DatabaseSetup(DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_PORT)
        conn = db_setup.get_connection()
        cur = conn.cursor()
        try:
            cur.execute("""
                        SELECT id_cust
                        FROM customers
                        WHERE id_cust = %s
                    """, (self.id_cust, ))
            existingCustomer = cur.fetchone()
            return existingCustomer
        except Exception as e:
            conn.rollback()
            print(f"Error: {e}")
        finally:
            cur.close()
            conn.close()
        
# driver
# customer = Customer(id_cust=20)
# customer.deleteCustomer()
# customer.setNameCustomer("jonas")
# customer.setPhoneCustomer("0857")
# customer.setAddressCustomer("iceskating")
# customer.saveCustomer()

# cust = Customer(id_cust=35)
# cust.loadCustomer()
# print(cust.getIDCustomer())
# print(cust.getNameCustomer())
# print(cust.getPhoneCustomer())
# print(cust.getAddressCustomer())
# print(cust.getAdditionalInfoCustomer())
# print(cust.getStatusCustomer())

# print("berhasil")