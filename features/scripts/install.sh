#!/usr/bin/env bash
export DEBIAN_FRONTEND=noninteractive
sudo -E apt-get -q -y install mysql-server
/etc/init.d/mysql start
mysql -u root < ./features/scripts/database.sql
