# GsPharo Proof of Concept

## Install GsDevKit_home

```
git clone https://github.com/GsDevKit/GsDevKit_home.git
cd GsDevKit_home
. bin/defHOME_PATH.env
installServerClient
```

## Download GemStone/S 3.4.0 Alpha5

Until GemStone/S 3.4.0 is officially released, you must download an Alpha version of GemStone 3.4.0.
The following instructions are for manually installing GemStone/S 3.4.0 Alpha5:

```
cd $GS_HOME/shared/downloads/zip
curl "ftp://ftp.gemtalksystems.com/pub/GemStone64/3.4.0-Alpha5/GemStone64Bit3.4.0-x86_64.Linux.zip" -o GemStone64Bit3.4.0_Alpha5-x86_64.Linux.zip
unzip GemStone64Bit3.4.0_Alpha5-x86_64.Linux.zip
mv GemStone64Bit3.4.0-x86_64.Linux ../products
```

## Clone GsSqueak 

```
cd $GS_HOME/shared/repos
git clone https://github.com/dalehenrich/GsSqueak.git
```

## Create a GsSqueak stone

```
createStone -g -s $GE_HOME/shared/downloads/products/GemStone64Bit3.4.0-x86_64.Linux/bin/extent0.dbf gsSqueak_340 3.4.0
```

## run Proof of Concept

Start a topaz session:

```
startTopaz gsSqueak_340 -l
```

at the `topaz>` prompt enter the following:

```
input $GS_HOME/shared/repos/GsSqueak/proofOfConcept/proofOfConcept.gs
```

