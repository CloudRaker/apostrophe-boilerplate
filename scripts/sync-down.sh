#!/usr/bin/env bash

usage() {
    echo "Usage: $0 -u <User> -p <Password>" 1>&2;
    exit 1;
}

while getopts "u:p:" o; do
    case "${o}" in
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

if [ -z ${USER+x} ] || [ -z ${PASSWORD+x} ]; then
    usage
fi

tempfile=$(mktemp -t cr-apos-sync) || exit 1;

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"

${DIR}/remote-backup.sh -f -u ${USER} -p ${PASSWORD} -d ${tempfile} && \
${DIR}/local-restore.sh -f -d ${tempfile};

rm -f ${tempfile};
