# class notification
from src.backend._utils.database_setup import DatabaseSetup, DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_PORT

class Notification:
    def __init__(self, id_notif):
        self.id_notif = id_notif
        self.__date_end = None
        self.__id_activity = None
    
    def loadNotification(self):
        db_setup = DatabaseSetup(DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_PORT)
        conn = db_setup.get_connection()
        cur = conn.cursor()
        cur.execute("""
                    SELECT *
                    FROM notifications
                    WHERE id_notif = %s
                    """, (self.id_notif, ))
        dataNotification = cur.fetchone()
        if dataNotification:
            self.__date_end = dataNotification[1]
            self.__id_activity = dataNotification[2]
        # cur.close()
        # conn.close()
        
    def saveNotification(self):
        db_setup = DatabaseSetup(DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_PORT)
        conn = db_setup.get_connection()
        cur = conn.cursor()
        cur.execute("""
                    INSERT INTO notifications
                        (id_notif,
                        date_end,
                        id_activity)
                    VALUES (%s, %s, %s)
                    """,
                    (self.id_notif,
                     self.__date_end,
                     self.__id_activity))
        conn.commit()
        cur.close()
    
    def getIDNotification(self):
        return self.id_notif
    
    def setIDNotification(self, id_notif):
        self.id_notif = id_notif
    
    def getDateEnd(self):
        return self.__date_end
    
    def setDateEnd(self, date_end):
        self.__date_end = date_end
        
    def getIDActivity(self):
        return self.__id_activity
    
    def setIDActivity(self, id_activity):
        self.__id_activity = id_activity

# notif = Notification(id_notif=1)
# notif.setDateEnd('1990-01-01')
# notif.setIDActivity(10)
# notif.saveNotification()

# notif = Notification(id_notif=1)
# notif.loadNotification()
# print(notif.getIDNotification())
# print(notif.getDateEnd())
# print(notif.getIDActivity())


# print("berhasil")

