# import db config
from _utils.database_setup import DatabaseSetup, DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_PORT

class Activity:
    def __init__(self, id_activity):
        self.id_activity = id_activity
        self.__id_cust = None
        self.__name_cust = None
        self.__id_car = None
        self.__model_car = None
        self.__date_range = None
        self.__total_price = None
        self.__status_car = None
        self.__status_cust = None
        self.__status_activity = None

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
            self.__name_cust = dataActivity[2]
            self.__id_car = dataActivity[3]
            self.__model_car = dataActivity[4]
            self.__date_range = dataActivity[5]
            self.__total_price = dataActivity[6]
            self.__status_car = dataActivity[7]
            self.__status_cust = dataActivity[8]
            self.__status_activity = dataActivity[9]

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
                print("ada")    
                cur.execute("""
                            UPDATE activities
                            SET id_cust = %s, 
                                name_cust = %s,
                                id_car = %s, 
                                model_car = %s,
                                date_range = %s, 
                                total_price = %s, 
                                status_car = %s, 
                                status_cust = %s,
                                status_activity = %s
                            WHERE id_activity = %s
                        """, (
                                self.__id_cust,
                                self.__name_cust,
                                self.__id_car,
                                self.__model_car,
                                self.__date_range,
                                self.__total_price,
                                self.__status_car,
                                self.__status_cust,
                                self.__status_activity,
                                self.id_activity
                        ))
            else:
                cur.execute("""
                            INSERT INTO activities (id_cust, name_cust, id_car, model_car, date_range, total_price, status_car, status_cust, status_activity)
                            VALUES (
                                %s, 
                                (SELECT name_cust FROM customers WHERE id_cust = %s), 
                                %s, 
                                (SELECT model_car FROM cars WHERE id_car = %s), 
                                %s, 
                                %s, 
                                %s, 
                                %s, 
                                %s
                            )
                            RETURNING id_activity
                        """, (
                            self.__id_cust,
                            self.__id_cust,
                            self.__id_car,
                            self.__id_car,
                            self.__date_range,
                            self.__total_price,
                            self.__status_car,
                            self.__status_cust,
                            self.__status_activity,
                        ))
                self.id_activity = cur.fetchone()[0]
            conn.commit()
        except Exception as e:
            print(f"Error: {e}")
            conn.rollback() # kalo ada error
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
            print(f"Error: {e}")
            conn.rollback() # kalo ada error
        finally:
            cur.close()

    def get_paginated_activities(page, items_per_page):
        offset = (page - 1) * items_per_page
        db_setup = DatabaseSetup(DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_PORT)
        conn = db_setup.get_connection()
        cur = conn.cursor()
        
        try:
            cur.execute("""
                SELECT id_activity, id_cust, name_cust, id_car, model_car, date_range, status_activity
                FROM activities 
                ORDER BY id_activity DESC
                LIMIT %s OFFSET %s
            """, (items_per_page, offset))
            
            activities = cur.fetchall()
            
            cur.execute("SELECT COUNT(*) FROM activities")
            total_activities = cur.fetchone()[0]
            total_pages = (total_activities + items_per_page - 1) // items_per_page
            
            activities_list = [{
                'id_activity': activity[0],
                'id_cust': activity[1],
                'name_cust': activity[2],
                'id_car': activity[3],
                'model_car': activity[4],
                'date_range': activity[5],
                'status_activity': activity[6],
            } for activity in activities]
            
            return activities_list, total_activities, total_pages
        
        except Exception as e:
            print(f"Error: {e}")
            return [], 0, 0
        finally:
            cur.close()
            conn.close()

    def get_total_price(date_range):
        db_setup = DatabaseSetup(DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_PORT)
        conn = db_setup.get_connection()
        cur = conn.cursor()
        
        try:
            cur.execute("""
                SELECT SUM(total_price)
                FROM activities
                WHERE date_range[1] BETWEEN %s AND %s
            """, (date_range[0], date_range[1]))
            total_price = cur.fetchone()[0]
            return total_price
        
        except Exception as e:
            print(f"Error: {e}")
            return 0
        finally:
            cur.close()
            conn.close

    # ganti jadi getPaginatedReport hehe
    def get_paginated_activity_daterange(page, items_per_page, date_range):
        offset = (page - 1) * items_per_page
        db_setup = DatabaseSetup(DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_PORT)
        conn = db_setup.get_connection()
        cur = conn.cursor()
        
        try:
            cur.execute("""
                SELECT id_activity, id_cust, name_cust, id_car, model_car, date_range, total_price
                FROM activities
                WHERE date_range[1] BETWEEN %s AND %s
                ORDER BY date_range[1]
                LIMIT %s OFFSET %s
            """, (date_range[0],date_range[1],items_per_page, offset))
            
            activities = cur.fetchall()
            
            cur.execute("SELECT COUNT(*) FROM activities")
            total_activities = cur.fetchone()[0]
            total_pages = (total_activities + items_per_page - 1) // items_per_page
            
            report_list = [{
                'id_activity': activity[0],
                'id_cust': activity[1],
                'name_cust': activity[2],
                'id_car': activity[3],
                'model_car': activity[4],
                'date_range': activity[5],
                'total_price': activity[6]
            } for activity in activities]
            
            return report_list, total_activities, total_pages
        except Exception as e:
            print(f"Error: {e}")
            return [], 0, 0
        finally:
            cur.close()
            conn.close()


    def getIDActivity(self):
        return self.id_activity
    
    def getIDCustomer(self):
        return self.__id_cust
    def getNameCustomer(self):
        return self.__name_cust
    
    def getModelCar(self):
        return self.__model_car
    
    def setNameCustomer(self, name_cust):
        self.__name_cust = name_cust
    
    def setModelCar(self, model_car):
        self.__model_car = model_car
    
    def getPrice(self):
        return self.__total_price
    
    def getStatusCar(self):
        return self.__status_car

    def getStatusCust(self):
        return self.__status_cust

    def getStatusActivity(self):
        return self.__status_activity
    
    def setIDCustomer(self, id_cust):
        self.__id_cust = id_cust
    
    def getIDCar(self):
        return self.__id_car
    
    def setIDCar(self, id_car):
        self.__id_car = id_car

    def setDateRange(self, date):
        self.__date_range = date
    
    def setTotalPrice(self, total_price):
        self.__total_price = total_price
    
    def setStatusCar(self, status_car):
        self.__status_car = status_car
    
    def setStatusCust(self, status_cust):
        self.__status_cust = status_cust
    
    def setStatusActivity(self, status_activity):
        self.__status_activity = status_activity
    
    def getDateRange(self):
        return self.__date_range