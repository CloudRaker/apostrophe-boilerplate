#!/usr/bin/env bash

usage() {
    echo "Usage: $0 [-n] [-f] -d <Backup File>" 1>&2;
    exit 1;
}

extraOpts="--gzip"

while getopts ":nfd:" o; do
    case "${o}" in
        n)
            extraOpts="${extraOpts} --dryRun --verbose=5";
        ;;
        f)
            extraOpts="${extraOpts} --drop";
        ;;
        d)
            BACKUP_FILE=${OPTARG};
        ;;
        *)
            usage;
        ;;
    esac
done
shift $((OPTIND - 1))

if [ -z ${BACKUP_FILE+x} ]; then
    usage
fi

DB_HOST="127.0.0.1"
DB_NAME="CHANGEME"

mongorestore -h ${DB_HOST}:27017 ${extraOpts} --archive=${BACKUP_FILE}
