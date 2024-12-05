# import all needed modules
# import cust
# import car
# import psycopg2
from src.backend._utils.database_setup import DatabaseSetup, DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_PORT

class Activity:
    def __init__(self, id_activity):
        self.id_activity = id_activity
        self.__id_cust = None
        self.__id_car = None
        self.__date_range = None
        self.__total_price = None
        self.__status_car = None
        self.__status_cust = None
        self.__status_activity = None
        self.__additional_info_activity = None

    def loadActivity(self):
        db_setup = DatabaseSetup(DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_PORT)
        conn = db_setup.get_connection()
        cur = conn.cursor()
        cur.execute("""
                    SELECT * 
                    FROM activities 
                    WHERE id_activity = %s
                """, (self.id_activity,))
        dataActivity = cur.fetchone()
        if dataActivity:
            self.__id_cust = dataActivity[1]
            self.__id_car = dataActivity[2]
            self.__date_range = dataActivity[3]
            self.__total_price = dataActivity[4]
            self.__status_car = dataActivity[5]
            self.__status_cust = dataActivity[6]
            self.__status_activity = dataActivity[7]
            self.__additional_info_activity = dataActivity[8]
        # cur.close()
        # conn.close()

    def saveActivity(self):
        db_setup = DatabaseSetup(DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_PORT)
        conn = db_setup.get_connection()
        cur = conn.cursor()

        try:
            cur.execute("""
                        SELECT id_activity
                        FROM activities
                        WHERE id_activity = %s
                    """, (self.id_activity, ))
            existingActivity = cur.fetchone()

            if existingActivity:
                cur.execute("""
                            UPDATE activities
                            SET id_cust = %s, 
                                id_car = %s, 
                                date_range = %s, 
                                total_price = %s, 
                                status_car = %s, 
                                status_cust = %s
                                status_activity = %s
                                additional_info_activity = %s
                            WHERE id_activity = %s
                        """, (
                                self.__id_cust,
                                self.__id_car,
                                self.__date_range,
                                self.__total_price,
                                self.__status_car,
                                self.__status_cust,
                                self.__status_activity,
                                self.__additional_info_activity,
                                self.id_activity
                        ))
            else:
                cur.execute("""
                            INSERT INTO activities (id_activity, id_cust, id_car, date_range, total_price, status_car, status_cust, status_activity, additional_info_activity)
                            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                        """, (
                            self.id_activity,
                            self.__id_cust,
                            self.__id_car,
                            self.__date_range,
                            self.__total_price,
                            self.__status_car,
                            self.__status_cust,
                            self.__status_activity,
                            self.__additional_info_activity
                        ))
            conn.commit()
        except Exception as e:
            conn.rollback()  # Rollback in case of an error
            print(f"Error saving car: {e}")
        finally:
            cur.close()
            conn.close()
    
    def deleteActivity(self):
        db_setup = DatabaseSetup(DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_PORT)
        conn = db_setup.get_connection()
        cur = conn.cursor()
        try:
            cur.execute("""
                        SELECT activities.id_activity
                        FROM activities
                        WHERE id_activity = %s
                    """, (self.id_activity, ))
            existingActivity = cur.fetchone()
            if existingActivity:
                cur.execute("""
                        DELETE FROM activities
                        WHERE id_activity = %s
                        """, (self.id_activity, ))
                conn.commit()
        except Exception as e:
            conn.rollback()  # Rollback in case of an error
            print(f"Error deleting activity: {e}")
        finally:
            cur.close()

    def getIDActivity(self):
        return self.id_activity
    
    def getIDCustomer(self):
        return self.__id_cust
    
    def setIDCustomer(self, id_cust):
        self.__id_cust = id_cust
    
    def getIDCar(self):
        return self.__id_car
    
    def setIDCar(self, id_car):
        self.__id_car = id_car
    
    def getDateRange(self):
        return self.__date_range
    
    
# act = Activity(id_activity=10)
# act.deleteActivity()
# print("berhasil")