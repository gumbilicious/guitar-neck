///////////////////////////////////////////////////////////////////////////////////////
//constructor for neck
///////////////////////////////////////////////////////////////////////////////////////
function neck(newTuning) {
this.strings = [];
var i;
//creates the strings array and sets the open notes on the strings
for (i = 0; i<newTuning.length; i++){
	this.strings.push(new string(newTuning[i]));
}
///////////////////////////////////////////////////////////////////////////////////////
//looks at the open string notes and assigns the note values
//to each fret
///////////////////////////////////////////////////////////////////////////////////////
this.assignNotes = function(){
var i, j, k;

for (i=0; i < this.strings.length; i++){//tunings[this.tuningNo].notes.length; i++){
	for (j=0; j < this.strings[i].frets.length-1; j++){
		for (k=0; k < noteList.length-1; k++){
			if(this.strings[i].frets[j].note == noteList[k]){
				this.strings[i].frets[j+1].note = noteList[k+1];
			}else if(this.strings[i].frets[j].note == "none"){
				this.strings[i].frets[j+1].note = "none";			
			}
		}
	}
}
}
///////////////////////////////////////////////////////////////////////////////////////
//returns the number of strings on the instrument
///////////////////////////////////////////////////////////////////////////////////////
this.getNoStrings = function(){
var i, tempCount = 0;

for(i = 0; i < this.strings.length; i++){
	if(this.strings[i].note != "none"){
		tempCount = tempCount + 1;
	}
}
return tempCount;
}
///////////////////////////////////////////////////////////////////////////////////////
//returns the number of frets on the instrument
///////////////////////////////////////////////////////////////////////////////////////
this.getNoFrets = function(){
	return this.strings[0].frets.length;
}
///////////////////////////////////////////////////////////////////////////////////////
//rescales the strings and frets
///////////////////////////////////////////////////////////////////////////////////////
this.resizeNeck = function(xOff, yOff, step){
var i;

for(i=0;i<this.strings.length;i++){
	this.strings[i].frets[0].x = xOff + (i*step);
	this.strings[i].resizeString(xOff + (i*step), yOff, step);
}
}

}

