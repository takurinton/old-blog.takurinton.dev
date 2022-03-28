#!/bin/bash

json_file=`cat ${1}`
json_length=`echo ${json_file} | jq length`

for i in `seq 0 $(expr ${json_length} - 1)`
do
    summary=`echo ${json_file} | jq .[${i}].summary`
    url=`echo ${json_file} | jq .[${i}].url`
    
    echo "${url} ${summary}"
done
