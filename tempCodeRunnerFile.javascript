function wordBlanks(myNoun,myAdjective,myVerb,myAdverb) {
var result = " "
result = result + "The" + " "+ myNoun + " " + myVerb +" " +myAdverb +" " + "to the office" ;
return result; 
}
console.log(wordBlanks("bike","fast","run","faster"))