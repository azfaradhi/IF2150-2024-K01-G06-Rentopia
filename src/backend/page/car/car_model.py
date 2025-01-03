# import db config
from _utils.database_setup import DatabaseSetup, DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_PORT

class Car:
    def __init__(self, id_car):
        self.id_car = id_car
        self.__photo_car = None
        self.__model_car = None
        self.__type_car = None
        self.__seat_car = None
        self.__price_car = None
        self.__status_car = None

    def loadCar(self):
        db_setup = DatabaseSetup(DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_PORT)
        conn = db_setup.get_connection()
        cur = conn.cursor()

        cur.execute("""
                    SELECT * 
                    FROM cars 
                    WHERE id_car = %s
                """, (self.id_car, ))
        dataCar = cur.fetchone()

        if dataCar:
            self.__photo_car = dataCar[1]
            self.__model_car = dataCar[2]
            self.__type_car = dataCar[3]
            self.__seat_car = dataCar[4]
            self.__price_car = dataCar[5]
            self.__status_car = dataCar[6]

    def saveCar(self):
        db_setup = DatabaseSetup(DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_PORT)
        conn = db_setup.get_connection()
        cur = conn.cursor()

        try:
            cur.execute("""
                        SELECT id_car 
                        FROM cars 
                        WHERE id_car = %s
                    """, (self.id_car, ))
            existingCar = cur.fetchone()

            if existingCar:
                cur.execute("""
                            UPDATE cars
                            SET photo_car = %s, 
                                model_car = %s, 
                                type_car = %s, 
                                seat_car = %s, 
                                price_car = %s, 
                                status_car = %s
                            WHERE id_car = %s
                        """, (
                            self.__photo_car,
                            self.__model_car,
                            self.__type_car,
                            self.__seat_car,
                            self.__price_car,
                            self.__status_car,
                            self.id_car
                        ))
            else:
                cur.execute("""
                            INSERT INTO cars (id_car, photo_car, model_car, type_car, seat_car, price_car, status_car)
                            VALUES (%s, %s, %s, %s, %s, %s, %s)
                        """, (
                            self.id_car,
                            self.__photo_car,
                            self.__model_car,
                            self.__type_car,
                            self.__seat_car,
                            self.__price_car,
                            self.__status_car
                        ))
            conn.commit()
        except Exception as e:
            conn.rollback()
            print(f"Error: {e}")
        finally:
            cur.close()
            conn.close()

    def get_paginated_cars(page, items_per_page, filterseat, filteravailability):
        offset = (page - 1) * items_per_page
        db_setup = DatabaseSetup(DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_PORT)
        conn = db_setup.get_connection()
        cur = conn.cursor()
        
        filterseat = int(filterseat)
        filteravailability = int(filteravailability)
        if(filteravailability == 0):
            status = 'reserved'
        elif(filteravailability == 1):
            status = 'available'

        try:
            if ((filterseat < 0) and (filteravailability < 0)):
                cur.execute("""
                    SELECT id_car, photo_car, model_car, type_car, seat_car, price_car, status_car
                    FROM cars
                    ORDER BY id_car  -- Adjust ordering if necessary
                    LIMIT %s OFFSET %s
                """, (items_per_page, offset))
            elif(filterseat < 0):
                cur.execute("""
                    SELECT id_car, photo_car, model_car, type_car, seat_car, price_car, status_car
                    FROM cars
                    WHERE status_car = %s
                    ORDER BY id_car  -- Adjust ordering if necessary
                    LIMIT %s OFFSET %s
                """, (status, items_per_page, offset))
            elif(filteravailability < 0):
                cur.execute("""
                    SELECT id_car, photo_car, model_car, type_car, seat_car, price_car, status_car
                    FROM cars
                    WHERE seat_car = %s
                    ORDER BY id_car  -- Adjust ordering if necessary
                    LIMIT %s OFFSET %s
                """, (filterseat, items_per_page, offset))
            else:
                cur.execute("""
                    SELECT id_car, photo_car, model_car, type_car, seat_car, price_car, status_car
                    FROM cars
                    WHERE seat_car = %s AND status_car = %s
                    ORDER BY id_car  -- Adjust ordering if necessary
                    LIMIT %s OFFSET %s
                """, (filterseat, status, items_per_page, offset))
            cars = cur.fetchall()

            cur.execute("SELECT COUNT(*) FROM cars")
            total_cars = cur.fetchone()[0]

            total_pages = (total_cars + items_per_page - 1) // items_per_page

            cars_list = [{
                'id_car': car[0],
                'photo_car': car[1],
                'model_car': car[2],
                'type_car': car[3],
                'seat_car': car[4],
                'price_car': car[5],
                'status_car': car[6]
            } for car in cars]

            return cars_list, total_cars, total_pages

        except Exception as e:
            print(f"Error: {e}")
            return [], 0, 0
        finally:
            cur.close()
            conn.close()

    def deleteCar(self):
        db_setup = DatabaseSetup(DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_PORT)
        conn = db_setup.get_connection()
        cur = conn.cursor()

        try:
            cur.execute("""
                        SELECT id_car
                        FROM cars
                        WHERE id_car = %s
                    """, (self.id_car, ))
            existingCar = cur.fetchone()

            if existingCar:
                cur.execute("""
                        DELETE FROM cars
                        WHERE id_car = %s
                        """, (self.id_car, ))
                conn.commit()
        except Exception as e:
            conn.rollback() 
            print(f"Error: {e}")
        finally:
            cur.close()

    def filterByStatus(self, status_car):
        return self.__status_car == status_car
    
    def filterByStatus(self, seat_car):
        return self.__seat_car == seat_car

    def getPhotoCar(self):
        return self.__photo_car
    
    def setPhotoCar(self, photo_car):
        self.__photo_car = photo_car
    
    def getModelCar(self):
        return self.__model_car
    
    def setModelCar(self, model_car):
        self.__model_car = model_car

    def getTypeCar(self):
        return self.__type_car
    
    def setTypeCar(self, type_car):
        self.__type_car = type_car

    def getSeatCar(self):
        return self.__seat_car
    
    def setSeatCar(self, seat_car):
        self.__seat_car = seat_car

    def getPriceCar(self):
        return self.__price_car
    
    def setPriceCar(self, price_car):
        self.__price_car = price_car

    def getStatusCar(self):
        return self.__status_car
        
    def existCar(self):
        db_setup = DatabaseSetup(DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_PORT)
        conn = db_setup.get_connection()
        cur = conn.cursor()
        try:
            cur.execute("""
                        SELECT id_car
                        FROM cars
                        WHERE id_car = %s
                    """, (self.id_car, ))
            existingCar = cur.fetchone()
            if existingCar:
                return True
            else:
                return False
        except Exception as e:
            conn.rollback()
            print(f"Error: {e}")
        finally:
            cur.close()
            conn.close()
    
    def setStatusCar(self, status_car):
        self.__status_car = status_car
