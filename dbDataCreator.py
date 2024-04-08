import requests
import random
import datetime
import time
import numpy as np

# Function to generate random data for a single client
def generate_random_data():
    buy_date = datetime.datetime.now().strftime('%Y-%m-%dT%H:%M:%SZ')
    number_of_children = random.randint(0, 5)
    cities = [
        "Paris", "Marseille", "Lyon", "Toulouse", "Nice",
        "Nantes", "Strasbourg", "Montpellier", "Bordeaux",
        "Lille", "Rennes", "Reims"
    ]
    city = random.choice(cities)
    work_categories = [
        "Testeur qualité", "Développeur", "Designer", "Marketing", "Chef de projet",
        "Analyste", "Technicien support"
    ]
    work_category = random.choice(work_categories)
    collect_size = random.randint(1, 10)
    
    # Define average prices and standard deviation for different categories
    category_prices = {
        1: {"average": 40, "std_dev": 20},
        2: {"average": 70, "std_dev": 25},
        3: {"average": 20, "std_dev": 15},
        4: {"average": 60, "std_dev": 20},
        5: {"average": 50, "std_dev": 20},
        6: {"average": 30, "std_dev": 15},
        7: {"average": 80, "std_dev": 25},
        8: {"average": 90, "std_dev": 30},
        9: {"average": 100, "std_dev": 25},
    }
    
    # Define average prices and standard deviation for different work categories
    work_category_prices = {
        "Testeur qualité": {"average": 20, "std_dev": 15},
        "Développeur": {"average": 70, "std_dev": 25},
        "Designer": {"average": 40, "std_dev": 20},
        "Marketing": {"average": 50, "std_dev": 20},
        "Chef de projet": {"average": 60, "std_dev": 20},
        "Analyste": {"average": 30, "std_dev": 15},
        "Technicien support": {"average": 80, "std_dev": 25}
    }
    
    # Choose the average price and standard deviation based on both category and work category
    category_id = random.randint(1, 9)
    if category_id in category_prices:
        category_average_price = category_prices[category_id]["average"]
        category_std_dev = category_prices[category_id]["std_dev"]
    else:
        category_average_price = 45  # Default average price
        category_std_dev = 20  # Default standard deviation
    
    if work_category in work_category_prices:
        work_category_average_price = work_category_prices[work_category]["average"]
        work_category_std_dev = work_category_prices[work_category]["std_dev"]
    else:
        work_category_average_price = 45  # Default average price
        work_category_std_dev = 20  # Default standard deviation
    
    # Calculate the final average price as a combination of both category and work category averages
    final_average_price = (category_average_price + work_category_average_price) / 2
    
    # Generate prices using the final average and standard deviation
    prices = np.random.normal(final_average_price, (category_std_dev + work_category_std_dev) / 2, collect_size).astype(int)
    prices = np.clip(prices, 50, 200).tolist()  # Convert to Python list and clip prices
    collects = [{"articlePrice": price, "categoryId": category_id} for price in prices]

    return {
        "buyDate": buy_date,
        "numberOfChildren": number_of_children,
        "city": city,
        "workCategory": work_category,
        "collects": collects
    }

# Function to make API call to insert a single client
def insert_data_with_api(data, access_token):
    url = 'https://api.kheopsian.com/clients'
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }
    response = requests.post(url, json=data, headers=headers)
    if response.status_code == 201:
        return True
    else:
        print(f"Failed to insert data from API: {response.status_code}")
        return False

def login():
    url = 'https://api.kheopsian.com/auth/login'
    credentials = {
        "email": "adminUser@dataproject.com",
        "password": "adminUser"
    }
    response = requests.post(url, json=credentials)
    if response.status_code == 200:
        access_token = response.json().get("access_token")
        return access_token
    else:
        print(f"Failed to login: {response.status_code}")
        return None

def main():
    access_token = login()
    if access_token:
        # Generate a random number of clients between 5000 and 10000
        num_clients = random.randint(100, 500)
        successful_insertions = 0
        start_time = time.time()

        for _ in range(num_clients):
            data = generate_random_data()
            success = insert_data_with_api(data, access_token)
            if success:
                successful_insertions += 1

        end_time = time.time()
        total_time = end_time - start_time

        print(f"Total clients inserted: {successful_insertions}")
        print(f"Total time taken: {total_time} seconds")
    else:
        print("Failed to obtain access token. Exiting...")

if __name__ == "__main__":
    main()
