#!/usr/bin/env bash

usage() {
    echo "Usage: $0 -u <User> -p <Password> -d <Backup File>" 1>&2;
    exit 1;
}

extraOpts=""
FORCE=0

while getopts "fu:p:d:" o; do
    case "${o}" in
        u)
            USER=${OPTARG}
        ;;
        p)
            PASSWORD=${OPTARG}
        ;;
        d)
            BACKUP_FILE=${OPTARG}
        ;;
        f)
            FORCE=1
        ;;
        *)
            usage
        ;;
    esac
done
shift $((OPTIND - 1))

if [ -z ${USER+x} ] || [ -z ${PASSWORD+x} ] || [ -z ${BACKUP_FILE+x} ]; then
    usage
fi

if [ -f ${BACKUP_FILE} ] && [ ${FORCE} -eq 0 ]; then
    echo "Not overwriting existing file '${BACKUP_FILE}' (pass -f to force)";
    exit 1;
fi

DB_NAME="CHANGEME"
DB_ADDRESS="CHANGEME"

# For Mongo Atlas
CONNECTION_OPTIONS="ssl=true&authSource=admin"

DB_URI="mongodb+srv://${USER}:${PASSWORD}@${DB_ADDRESS}/${DB_NAME}?${CONNECTION_OPTIONS}"

mongodump --uri ${DB_URI} --gzip --archive=${BACKUP_FILE};
