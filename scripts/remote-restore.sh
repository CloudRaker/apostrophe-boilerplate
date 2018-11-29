#!/usr/bin/env bash

usage() {
    echo "Usage: $0 [-n] [-f] -u <User> -p <Password> -d <Backup File>" 1>&2;
    exit 1;
}

extraOpts="--gzip"

while getopts "nfd:u:p:" o; do
    case "${o}" in
        n)
            extraOpts="${extraOpts} --dryRun --verbose=5"
        ;;
        f)
            extraOpts="${extraOpts} --drop"
        ;;
        d)
            BACKUP_FILE=${OPTARG}
        ;;
        u)
            USER=${OPTARG}
        ;;
        p)
            PASSWORD=${OPTARG}
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

DB_NAME="CHANGEME"
DB_ADDRESS="CHANGEME"

# For Mongo Atlas
CONNECTION_OPTIONS="ssl=true&authSource=admin"

DB_URI="mongodb+srv://${USER}:${PASSWORD}@${DB_ADDRESS}/${DB_NAME}?${CONNECTION_OPTIONS}"

mongorestore --uri "${DB_URI}" ${extraOpts} --archive=${BACKUP_FILE};
