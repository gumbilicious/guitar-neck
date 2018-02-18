///////////////////////////////////////////////////////////////////////////////////////
//defines a javascript object that is a collection of frets
///////////////////////////////////////////////////////////////////////////////////////
function string(openNote) {
this.note = "";
this.frets=[];
this.noteList= [];
var i;

//creates 13 frets on a string
for (var i =0; i<13 ; i++){
	this.frets.push(new fret());
}
//sets open note on string
this.frets[0].note = openNote;
this.note = openNote;
///////////////////////////////////////////////////////////////////////////////////////
//allows a new scale to be used on the frets
///////////////////////////////////////////////////////////////////////////////////////
this.resizeString = function(xOff, yOff, step){
var i;

for (i = 0; i< this.frets.length;i++){
	this.frets[i].setPos(xOff,yOff+(i*step));	
	}
}
}
