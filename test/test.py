from src.page.activity.entity.activity_model import Activity

if __name__ == "__main__":
    # Create an Activity object for a specific id_activity
    activity = Activity(id_activity=1)
    
    # Access properties
    print(activity.getIDActivity())
    print(activity.getIDCustomer())
    
    # Modify properties
    # activity.id_cust = 2
    # activity.id_car = 'ABC123'
    
    # # Save changes to the database
    # activity.save_activity()