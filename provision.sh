#!/usr/bin/env bash

DEPLOY_USER='cloudraker';
DEPLOY_GROUP='deploy';

function grant {
chown ${DEPLOY_USER}:${DEPLOY_GROUP} $1;
}


function install_dependencies {
apt update && \
apt install -y software-properties-common && \
add-apt-repository -y -n universe && \
add-apt-repository -y -n ppa:certbot/certbot && \
apt update && \
apt install -y nginx python-certbot-nginx git \
;
}

function setup_user {
addgroup $DEPLOY_GROUP && \
adduser --disabled-password --gecos'' ${DEPLOY_USER} && \
adduser ${DEPLOY_USER} ${DEPLOY_GROUP} \
;
}

function setup_environment {
touch /etc/nginx/conf.d/mechanic.conf && grant /etc/nginx/conf.d/mechanic.conf;

mkdir /srv && grant /srv;
}

