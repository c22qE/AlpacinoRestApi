# Architectore MVC
# DB Disign in https://app.diagrams.net/

# nodejs version

nvm install 20.5.1
nvm use 20.5.1
yarn install

# DB

sudo apt install postgresql

# set new password

sudo passwd postgres

# your password

su - postgres -c "initdb --locale en_US.UTF-8 -D '/var/lib/postgres/data'"

# start DB and add autorun

systemctl enable postgresql
systemctl start postgresql

# create user "admin"

sudo -u postgres psql

CREATE USER alpacino WITH ENCRYPTED PASSWORD 'asfqgeg13gevddPuj1pf-asjopo=1-0das039h1nioaspjc10fniwcaojk10';

# Create DATABASE

CREATE DATABASE alpacino;

# Give user permissions for DataBase "alpacino"

GRANT ALL ON DATABASE alpacino TO alpacino;
GRANT ALL PRIVILEGES ON DATABASE alpacino TO alpacino;

# error: permission-denied-for-schema-public

ALTER DATABASE alpacino OWNER TO alpacino;

GRANT ALL ON SCHEMA public TO alpacino;

# exit

\q
systemctl restart postgresql

# log in

psql -U alpacino -d postgres -W

# List users

\du

# Delete

DROP USER IF EXISTS alpacino;
DROP DATABASE alpacino;

# Deploy - HTTPS

apt install certbot

# openssl

openssl genrsa --out server.key 2048
openssl req --new --key server.key --out server.csr

# self signed

openssl x509 --req --days 365 --in server.csr --signkey server.key --out server.crt

certbot certonly --standalone -d yourdomain.com
crontab -e
0 0 \* \* \* certbot renew

# p.s. delete \ \ \

# Deploy

yarn install
yarn pm2 start

# https://pm2.keymetrics.io/

// // Дата создания Order
// const currentDate = new Date();
// const day = currentDate.getDate();
// const month = currentDate.getMonth() + 1; // Месяцы в JavaScript начинаются с 0, поэтому добавляем 1
// const year = currentDate.getFullYear();
// const dateString = `${day}-${month}-${year}`;
// console.log(dateString);

netblondelle@awgarstone.com
