#!/bin/bash
for SRC in `find ./ -depth`
do
    DST=`dirname "${SRC}"`/`basename "${SRC}" | tr '[A-Z]' '[a-z]'`
    echo ${SRC}"----"${DST}

    if [ "${SRC}" != "${DST}" ]
    then

         mv -T "${SRC}" "${DST}"
    fi
done