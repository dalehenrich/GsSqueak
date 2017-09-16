# GsSqueak Proof of Concept

1. [Installation](#installation)
2. [Proof of Concepts](#proof-of-concepts)
3. [References](#references)

## Installation

### Install GsDevKit_home

```
git clone https://github.com/GsDevKit/GsDevKit_home.git
cd GsDevKit_home
. bin/defHOME_PATH.env
installServerClient
```

### Download GemStone/S 3.4.0 Alpha5

Until GemStone/S 3.4.0 is officially released, you must download an Alpha version of GemStone 3.4.0.
The following instructions are for manually installing GemStone/S 3.4.0 Alpha5:

```
cd $GS_HOME/shared/downloads/zip
curl "ftp://ftp.gemtalksystems.com/pub/GemStone64/3.4.0-Alpha5/GemStone64Bit3.4.0-x86_64.Linux.zip" -o GemStone64Bit3.4.0_Alpha5-x86_64.Linux.zip
unzip GemStone64Bit3.4.0_Alpha5-x86_64.Linux.zip
mv GemStone64Bit3.4.0-x86_64.Linux ../products
```

### Clone GsSqueak 

```
cd $GS_HOME/shared/repos
git clone https://github.com/dalehenrich/GsSqueak.git
```

### Create a GsSqueak stone

```
createStone -g -s $GS_HOME/shared/downloads/products/GemStone64Bit3.4.0-x86_64.Linux/bin/extent0.dbf gsSqueak_340 3.4.0
```

## Proof of Concepts

### Proof of Concept 1

The goal of the initial proof of concept is to provide an introduction to GemStone method environments. 

For GsSqueak, we will be using method environment 7.

1. Create a GsSqueak GemStone user whose [symbol list][6] contains a single *SymbolDictionary* named **Smalltalk**.
2. Populate **Smalltalk** with a minimal class hierarchy consisting of *ProtoObject*, *Object*, and *SmallInteger*. *ProtoObject* and *Object* will be new classes that are created in the **Smalltalk** symbol dictionary. *SmallInteger* will be the standard GemStone class, but it's method environment 7 superclass method look up chain will be routed through *Object*.
3. Implement *ProtoObject>>doesNotUnderstand:* in method enviroment 7 so that messages not understood in method environment 7 will be forwarded to method environment 0. 
4. Implement *SmallInteger>>foo:* in method environment 7 to forward to *SmallInteger>>+* in method environment 0.

Start a topaz session:

```
startTopaz gsSqueak_340 -l
```

at the `topaz>` prompt enter the following:

```
input $GS_HOME/shared/repos/GsSqueak/scripts/proofOfConcept_1.gs
```

## References

1. My original [PharoGs experiments][3].
2. James Foster's ESUG 2017 presentation [Running Pharo on the GemStone VM][2] and companion [PharoGs scripts and file ins][1].
3. GemStone/S 64 Programming Guide ([pdf][4]/[html][5]).
4. GemStone/S 64 Topaz User's Guide ([pdf][8]/[html][7]).

[1]: https://github.com/jgfoster/PharoGs/tree/james
[2]: https://www.slideshare.net/esug/running-pharo-on-the-gemstone-vm
[3]: https://github.com/dalehenrich/PharoGs
[4]: https://downloads.gemtalksystems.com/docs/GemStone64/3.3.x/GS64-ProgGuide-3.3.pdf
[5]: https://downloads.gemtalksystems.com/docs/GemStone64/3.3.x/GS64-ProgGuide-3.3/GS64-ProgGuide-3.3.htm

[6]: https://downloads.gemtalksystems.com/docs/GemStone64/3.3.x/GS64-ProgGuide-3.3/3-Symbols.htm
[7]: https://downloads.gemtalksystems.com/docs/GemStone64/3.3.x/GS64-Topaz-3.3/GS64-Topaz-3.3.htm
[8]: https://downloads.gemtalksystems.com/docs/GemStone64/3.3.x/GS64-Topaz-3.3.pdf
