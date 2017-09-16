#ifErr 1 stk
#ifErr 2 stack
#ifErr 3 abort
#ifErr 4 exit

set user SystemUser p swordfish
login

run
| gsSqueak |
gsSqueak := AllUsers userWithId: 'GsSqueak' ifAbsent: [ nil ].
gsSqueak ~~ nil
  ifTrue: [
    AllUsers removeAndCleanup: gsSqueak.
    System commitTransaction.
 ].
(AllUsers
  addNewUserWithId: 'GsSqueak'
  password: 'swordfish')
    addPrivilege: #'CodeModification';
    addPrivilege: #'UserPassword';
    addPrivilege: #'OtherPassword';
    yourself.
System commitTransaction.
%

set compile_env: 7

category: 'env 7 experiment'
method: SmallInteger
foo: arg

  ^ self @env0: + arg
%

category: 'env 7 experiment'
method: SmallInteger
foo: arg

  ^ self @env0: + arg
%

set compile_env: 0

classmethod: System
superclassFor: aClass env: env put: anObject

<primitive: 2001> "enter protected mode"
| prot |
prot := System _protectedMode .
[
 ^aClass superclassForEnv: env put: anObject.
] ensure:[
  prot _leaveProtectedMode
]
%

commit

logout

set u GsSqueak password swordfish
login

run
| symbolList userProfile sys |
sys := Globals at: #System.
userProfile := sys myUserProfile.
symbolList := userProfile symbolList.
(symbolList objectNamed: #'Smalltalk') ifNil: [
	symbolList 
		createDictionaryNamed: #'Smalltalk' at: 0;
		yourself.
].
%

# commit and logout/login to synch the transient and persisten symbol lists
commit 
logout
login

run
(nil subclass: 'ProtoObject'
	instVarNames: #()
	classVars: #()
	classInstVars: #()
	poolDictionaries: {}
	inDictionary: Smalltalk
	newVersionOf: (Smalltalk at: #ProtoObject ifAbsent: [nil])
	description: '0'
	options: #()
	) category: 'GemStone'.
%

run
(ProtoObject subclass: 'Object'
	instVarNames: #()
	classVars: #()
	classInstVars: #()
	poolDictionaries: {}
	inDictionary: Smalltalk
	newVersionOf: (Smalltalk at: #Object ifAbsent: [nil])
	description: '0'
	options: #()
	) category: 'GemStone'.
%

category: 'gemstone prim env 0'
method: Object
doesNotUnderstand: aMessageDescriptor

"The method is for compatiblity with Gs64 v2.x, and assumes you are using 
   only method environment 0  for all of your Smalltalk code."

| ex sel args |
(ex := MessageNotUnderstood _basicNew)
  receiver: self selector: (sel := aMessageDescriptor at: 1) 
		args: (args := aMessageDescriptor at: 2) envId: 0 .
^ex signal .
%

set compile_env: 7

category: 'gemstone prim env 7'
method: Object
doesNotUnderstand: aMessageDescriptor
  "invoke MessageNotUnderstood indirectly in env 0"

^ self @env0: doesNotUnderstand: aMessageDescriptor
%

set compile_env: 0

commit

logout
set user SystemUser p swordfish
login

run
| gsSqueak gsSqueakObjectClass|
gsSqueak := AllUsers userWithId: 'GsSqueak'.
gsSqueakObjectClass := gsSqueak symbolList objectNamed: #Object.
System superclassFor: SmallInteger env: 7 put: gsSqueakObjectClass.
%

commit
logout


set u GsSqueak password swordfish
login

break method Integer + 

set compile_env: 0

run
3 / 4
%

expecterror GemStoneError 2010
run
3 foo: 4
%

set compile_env: 7

expecterror GemStoneError 2010
run
3 / 4
%

run
3 foo: 4
%


