#!/bin/bash

buildRootDir=$HOME/projects/zikaronHaiProject/$1
buildWWWDir=$buildRootDir/www

npm run build

rm $buildWWWDir/* -vrf

cp build/* $buildWWWDir -rv

#sed -i 's/\/static\//static\//g' $buildWWWDir/index.html 

cd $buildRootDir

cordova run android







