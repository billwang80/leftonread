# leftonread

### Useful links
- https://www.django-rest-framework.org/tutorial/quickstart/#:~:text=%23%20Create%20the%20project%20directory%20mkdir,pip%20install%20django%20pip%20install
- https://reactnative.dev/docs/environment-setup


### To export and import database:
```
python manage.py dumpdata > database.json
python manage.py loaddata database.json
```

### To setup project (Windows):
- clone repo
- run

```
cd leftonread/server
python -m venv env
.\env\Scripts\activate
pip install -r requirements.txt

cd ../client-mobile
npm install
```

### To setup project (Mac):
- clone repo
- run
```
cd leftonread/server
python -m venv env
source env/bin/activate
pip install -r requirements.txt

cd ../client-mobile
npm install
```

### To run dev server (Windows):
```
.\env\Scripts\activate
python manage.py migrate
python manage.py runserver
```

### To run dev server (Mac):
```
source env/bin/activate
python manage.py migrate
python manage.py runserver
```

### To run mobile client:
```
cd client-mobile
npx expo start
```
