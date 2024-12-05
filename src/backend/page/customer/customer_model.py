# class customer
from src.backend._utils.database_setup import DatabaseSetup, DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_PORT

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
        # cur.close()
        # conn.close()
        
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
                            additional_info_cust = %s,
                            status_cust = %s
                        WHERE id_cust = %s
                        """, 
                        (self.__name_cust,
                         self.__phone_cust,
                        self.__address_cust,
                        self.__additional_info_cust,
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
                            additional_info_cust,
                            status_cust)
                        VALUES (%s, %s, %s, %s, %s, %s)
                        """, 
                        (self.id_cust,
                         self.__name_cust,
                         self.__phone_cust,
                        self.__address_cust,
                        self.__additional_info_cust,
                        self.__status_cust))
                conn.commit()
        except Exception as e:
            conn.rollback()  # Rollback in case of an error
            print(f"Error saving customer: {e}")
        finally:
            cur.close()

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
        

# customer = Customer(id_cust=10)
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