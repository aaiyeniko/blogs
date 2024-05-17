# Blog Application
This is a minimal blog application that uses [React](https://github.com/facebook/create-react-app) client and [Laravel](https://laravel.com) API server

## Run the client server
### Prerequisite
- [Node](https://nodejs.org/en) at least v20.11.1

### Steps
- change directory to the client folder `cd client`
- run `npm i` to install packages
- run `npm start` to start the app.

## Run the api server
### Prerequisite
- PHP: at least PHP 8.0
- MySQL
- [Composer](https://getcomposer.org/) dependency manager for PHP

### Steps
- change directory to the api folder `cd api`
- run `composer install` to install packages
- copy `.env.example` to `.env`
- run the migration `php artisan migrate`
- run the application `php artisan serve`

## Database Seeder
- Run database seeder 
```
php artisan db:seed
# Run single seed
php artisan db:seed --class=UserSeeder

# Drop the database, migrate and run all database seeds...
php artisan migrate:fresh --seed
```