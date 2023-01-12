# leftonread

### To setup project (Windows):
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

### To setup project (Mac):
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
