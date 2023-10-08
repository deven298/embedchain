prettier:
	black backend/ecwebapp/
	cd embedchain && yarn format:write

build_project:
	cd backend && pip install -r requirements.txt
	cd embedchain && yarn

build_backend_migrations:
	black backend/ecwebapp/
	cd backend/ecwebapp/ && python manage.py makemigrations && python manage.py migrate


build_backend:
	black backend/
	cd backend/ecwebapp && python manage.py runserver

run_ec_local:
	@echo "Running Embedchain locally"
	cd embedchain && npm run dev