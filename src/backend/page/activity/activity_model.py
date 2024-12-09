# import all needed modules
# import cust
# import car
# import psycopg2
from _utils.database_setup import DatabaseSetup, DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_PORT

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
        print(f"Running loadActivity for id_activity: {self.id_activity}")
        db_setup = DatabaseSetup(DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_PORT)
        conn = db_setup.get_connection()
        print("Database connection established")
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
                                status_cust = %s,
                                status_activity = %s,
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
                            INSERT INTO activities (id_cust, id_car, date_range, total_price, status_car, status_cust, status_activity, additional_info_activity)
                            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                            RETURNING id_activity
                        """, (
                            self.__id_cust,
                            self.__id_car,
                            self.__date_range,
                            self.__total_price,
                            self.__status_car,
                            self.__status_cust,
                            self.__status_activity,
                            self.__additional_info_activity
                        ))
                self.id_activity = cur.fetchone()[0]
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

    def get_paginated_activities(page, items_per_page):
        offset = (page - 1) * items_per_page
        db_setup = DatabaseSetup(DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_PORT)
        conn = db_setup.get_connection()
        cur = conn.cursor()
        
        try:
            cur.execute("""
                SELECT a.id_activity, a.id_cust, c.name_cust, a.id_car, ca.model_car, a.date_range, a.status_activity
                FROM activities a
                JOIN customers c ON a.id_cust = c.id_cust
                JOIN cars ca ON a.id_car = ca.id_car
                ORDER BY a.id_activity
                LIMIT %s OFFSET %s
            """, (items_per_page, offset))
            
            activities = cur.fetchall()
            
            cur.execute("SELECT COUNT(*) FROM activities")
            total_activities = cur.fetchone()[0]
            total_pages = (total_activities + items_per_page - 1) // items_per_page  # Calculate total pages
            
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
            print(f"Error fetching paginated activities: {e}")
            return [], 0, 0
        finally:
            cur.close()
            conn.close()

    def get_paginated_activity_daterange(date_range):
        # offset = (page - 1) * items_per_page
        db_setup = DatabaseSetup(DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_PORT)
        conn = db_setup.get_connection()
        cur = conn.cursor()
        
        try:
            cur.execute("""
                SELECT a.id_activity, a.id_cust, c.name_cust, a.id_car, ca.model_car, a.date_range, a.total_price
                FROM activities a
                JOIN customers c ON a.id_cust = c.id_cust
                JOIN cars ca ON a.id_car = ca.id_car
                WHERE a.date_range[1] BETWEEN %s AND %s
            """, (date_range[0],date_range[1],))
            
            activities = cur.fetchall()
            
            # cur.execute("SELECT COUNT(*) FROM activities")
            # total_activities = cur.fetchone()[0]
            # total_pages = (total_activities + items_per_page - 1) // items_per_page  # Calculate total pages
            
            report_list = [{
                'id_activity': activity[0],
                'id_cust': activity[1],
                'name_cust': activity[2],
                'id_car': activity[3],
                'model_car': activity[4],
                'date_range': activity[5],
                'total_price': activity[6]
            } for activity in activities]
            
            return report_list
        except Exception as e:
            print(f"Error fetching report list: {e}")
            return [], 0, 0
        finally:
            cur.close()
            conn.close()


    def getIDActivity(self):
        return self.id_activity
    
    def getIDCustomer(self):
        return self.__id_cust
    
    def getPrice(self):
        return self.__total_price
    
    def getStatusCar(self):
        return self.__status_car

    def getStatusCust(self):
        return self.__status_cust

    def getStatusActivity(self):
        return self.__status_activity
    
    def getAdditionalInfo(self):
        return self.__additional_info_activity
    
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

    def setAdditionalInfo(self, additional_info):
        self.__additional_info_activity = additional_info
    
    def getDateRange(self):
        return self.__date_range
    
    
# act = Activity(id_activity=10)
# act.deleteActivity()
# print("berhasil")