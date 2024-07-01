## API Hit Tracking and Analytics Dashboard

This repository contains the frontend and backend of the API Analysis Assignment. The frontend code resides in the `Frontend` folder and Backend code reside on `Backend` folder.



## How to run code  

### Running the application from source code

```bash
# Clone the repository
git clone https://github.com/Gauravkumar2701/api-tracker.git

# Change the directory
cd api-tracker/backend/api_tracker 

# Install all the requirements
pip install -r requirements.txt

# Run the server
python manage.py makemigrations
python manage.py migrate
python manage.py runserver


# Backend start on the port 8000

# To run frontend
cd frontend

# install dependency
npm install

# Run the frontend
npm run dev

# Frontend starts on the port 5173
```
## Database configuration
```bash
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'postgres',
        'USER': 'postgres',
        'PASSWORD': 'postgres',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```