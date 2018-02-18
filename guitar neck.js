///////////////////////////////////////////////////////////////////////////////////////
//defines canvas object
///////////////////////////////////////////////////////////////////////////////////////
var can1 = function(fb){
///////////////////////////////////////////////////////////////////////////////////////
//canvas setup function
///////////////////////////////////////////////////////////////////////////////////////
fb.setup = function(){
	//assignment of canvas object to global variable
	//this allows user to call canvas functions from HTML page
	global_fb = fb;
	
	//class constants
	fb.BGC = 255;//standard background color
	fb.neckScale = 20;//sets scale for size of neck and dots and click range
	fb.xOff = 50;
	fb.yOff = 60;
	
	//object creation
	fb.createCanvas(350,600);//creates canvas
	fb.sizeSlider = fb.createSlider(10,40,40);//creates slider
	fb.neck1 = new neck(tunings[0].notes);
	fb.neck1.assignNotes();
	
	//assign attributes to objects
	fb.sizeSlider.position(200,10);//sets slider position
	fb.background(fb.BGC);//sets background color of canvas
	fb.popSelect();
	fb.updateNoteOnPage();
	fb.updateColumnColor();
	fb.syncTuning();
	fb.printNeck();
}
///////////////////////////////////////////////////////////////////////////////////////
//draws to the canvas
///////////////////////////////////////////////////////////////////////////////////////
fb.draw = function (){
fb.printNeck();
fb.printText();
}
///////////////////////////////////////////////////////////////////////////////////////
//runs code upon the click of a mouse
///////////////////////////////////////////////////////////////////////////////////////
fb.mouseClicked = function(){
fb.fretHit();
fb.updateNoteOnPage();
fb.updateActiveButtons();
fb.updateColumnColor();
getEle("scaleSelect").value = "-";
}
///////////////////////////////////////////////////////////////////////////////////////
//for updating the aX buttons to sync with the chosen scale
///////////////////////////////////////////////////////////////////////////////////////
fb.scaleUpdate = function(x){
//populates active buttons
for(i=0;i<scales.length;i++){
	if(scales[i].name == x){
		for(j=0; j<scales[i].active.length;j++){
			tempString = "a" + j;
			document.getElementById(tempString).innerHTML = scales[i].active[j];
			tempString = "c" + j;
			document.getElementById(tempString).value = scales[i].colors[j];			
			}
	}
}
fb.markedButtonUpdate();
}
///////////////////////////////////////////////////////////////////////////////////////
//updates the marked frets on neck1 with HTML "aX" button states and "cX" select states
///////////////////////////////////////////////////////////////////////////////////////
fb.markedButtonUpdate = function(){
var i, j, k;
for(i=0;i<12;i++){
	for(j=0;j<fb.neck1.getNoStrings();j++){
		for(k=0;k<fb.neck1.getNoFrets();k++){
			if(fb.neck1.strings[j].frets[k].note == getEle("n"+i).innerHTML){
				fb.neck1.strings[j].frets[k].marked = getEle("a"+i).innerHTML;
				fb.neck1.strings[j].frets[k].color = getEle("c"+i).value;
			}
		}
	}
}
}
///////////////////////////////////////////////////////////////////////////////////////
//updates screen buttons with the frets 'marked' value and 'color' value
///////////////////////////////////////////////////////////////////////////////////////
fb.updateActiveButtons = function(){
var i, j;
var tempString1="", tempString2="", tempString3="";

for(i=0; i<fb.neck1.getNoFrets();i++){
	for(j=0;j<12;j++){
		tempString1 = "n" + j;
		tempString2 = "a" + j;
		tempString3 = "c" + j;
		if(fb.neck1.strings[0].frets[i].note == getEle(tempString1).innerHTML){
			getEle(tempString2).innerHTML = fb.neck1.strings[0].frets[i].marked;
			getEle(tempString3).value = fb.neck1.strings[0].frets[i].color;
			fb.updateButtonColor();
		}
	}
}
}
///////////////////////////////////////////////////////////////////////////////////////
//updates the button colors for "aX"
///////////////////////////////////////////////////////////////////////////////////////
fb.updateButtonColor = function(){
var i, tempString;

for(i = 0; i < 12;i++){
	tempString = "a" + i;
	if(getEle(tempString).innerHTML == 1){
		getEle(tempString).style.backgroundColor = "#000000";
		getEle(tempString).style.color = "#000000";				
	}else{
		getEle(tempString).style.backgroundColor = getColor("White").HTMLcode;
		getEle(tempString).style.color = getColor("White").HTMLcode;
	}
}
}
///////////////////////////////////////////////////////////////////////////////////////
//gets color from "cX" and makes whole column that color
///////////////////////////////////////////////////////////////////////////////////////
fb.updateColumnColor = function(){
var i,j;
var temp1,temp2;

for(i=0;i<12;i++){
	temp2 = "c"+i;
	for(j=0;j<4;j++){
		temp1 = "rc" + j + i;
		getEle(temp1).style.backgroundColor = getColor(getEle(temp2).value).HTMLcode;
	}
}
}
///////////////////////////////////////////////////////////////////////////////////////
//updates the notes on the page based on the keySelect element
///////////////////////////////////////////////////////////////////////////////////////
fb.updateNoteOnPage = function(){
var tempList=[];
var i,j;
var tempString;

//makes a double long note list
for(i=0;i<2;i++){
	for(j=0;j<12;j++){
	tempList.push(noteList[j]);
	}
}

//compares page values to double long note list
for(i=0;i<12;i++){
	if(getEle("keySelect").value == tempList[i]){
		for(j=0;j<12;j++){
			getEle("n" + j).innerHTML = tempList[j+i];
		}
	}
}
}
///////////////////////////////////////////////////////////////////////////////////////
//populates objects in HTML javascript objects
///////////////////////////////////////////////////////////////////////////////////////
fb.popSelect = function(){
var tempString, tempBox, tempOption, i, j;

//populates tuning dropdown
for (i=0; i < tunings.length; i++){
	tempBox = getEle("tuneSelect");
	tempOption = document.createElement("option");
	tempOption.text = tunings[i].name;
	tempBox.add(tempOption);
	}

//populates string dropdowns
for (i=0; i < 12; i++){
	tempString = "s" + i;
	tempBox = getEle(tempString);
	for(j=0; j < noteList.length; j++){
		tempOption = document.createElement("option");
		tempOption.text = noteList[j];
		tempBox.add(tempOption);
		}
	//adds 'none' to the list
	tempOption = document.createElement("option");
	tempOption.text = "none"
	tempBox.add(tempOption);
	}

//populates the key box
for(i=0; i<12;i++){
	tempBox = getEle("keySelect");
	tempOption = document.createElement("option");
	tempOption.text = noteList[i];
	tempBox.add(tempOption);
}

//populates the scale box
for(i=0; i<scales.length;i++){
	tempBox = getEle("scaleSelect");
	tempOption = document.createElement("option");
	tempOption.text = scales[i].name;
	tempBox.add(tempOption);
}

//populates active buttons
for(i=0;i<scales.length;i++){
	if(scales[i].name == getEle("scaleSelect").value){
		for(j=0; j<scales[i].active.length;j++){
			tempString = "a" + j;
			document.getElementById(tempString).innerHTML = scales[i].active[j];
			}
	}
}
fb.updateButtonColor();

//populates color dropdowns
for(i=0;i<12;i++){
tempString = "c"+ i;
	for(j=0; j<colors.length;j++){
		tempBox = getEle(tempString);
		tempOption = document.createElement("option");
		tempOption.text = colors[j].name;
		tempBox.add(tempOption);
	}
}
}
///////////////////////////////////////////////////////////////////////////////////////
//changes string's note value with the appropriate select box changes
///////////////////////////////////////////////////////////////////////////////////////
fb.modTuning = function(){
var tempString;
var tempBox;
var i, j;
var newTuning = [];

for(i = 0; i< 12;i++){
	fb.neck1.strings[i].note = fb.getPageNote(i);
}

//makes a new neck with the tuning from string dropdowns
for(i=0;i<12;i++){
	newTuning[i] = fb.getPageNote(i);
}

fb.neck1 = new neck(newTuning);
fb.neck1.assignNotes();
fb.markedButtonUpdate();
}
///////////////////////////////////////////////////////////////////////////////////////
//gets tuning from tuneSelect and changes the
//string dropdowns to the appropriate values
//creates new neck with the new tuning
///////////////////////////////////////////////////////////////////////////////////////
fb.syncTuning = function(){
var tempString;
var tempBox;
var tempList = [];
var tempCount = 0;
var i, j;

//updates the string dropdown boxes
for(i=0;i<tunings.length;i++){
	if(tunings[i].name == getEle("tuneSelect").value){
		for(j=0;j<12;j++){
			tempString = "s" + j;
			tempBox = getEle(tempString);
			tempBox.value = tunings[i].notes[j];
		}
	}
fb.modTuning();
}

}
///////////////////////////////////////////////////////////////////////////////////////
//checks if mouse position is near a fret
//marks the fret value if it is near
///////////////////////////////////////////////////////////////////////////////////////
fb.fretHit = function(){
//range variable tightens the tolerance of how close you need to click to a fret
var range = fb.neckScale/4
var i, j;

for (i=0;i<=fb.neck1.getNoStrings()-1;i++){
	for(j=0;j<fb.neck1.getNoFrets();j++){
		if(fb.mouseX > fb.neck1.strings[i].frets[j].x-range && fb.mouseX < fb.neck1.strings[i].frets[j].x+range){
			if(fb.mouseY > fb.neck1.strings[i].frets[j].y-range && fb.mouseY < fb.neck1.strings[i].frets[j].y+range){
				//cout(fb.neck1.strings[i].frets[j].note);
				if(fb.neck1.strings[i].frets[j].marked == 0){
				fb.markAll(fb.neck1.strings[i].frets[j].note, 1);
				}
				else if(fb.neck1.strings[i].frets[j].marked == 1){
				fb.markAll(fb.neck1.strings[i].frets[j].note, 0);
				}
			}
		}
	}
}
}
///////////////////////////////////////////////////////////////////////////////////////
//marks all particular notes with a particular value
///////////////////////////////////////////////////////////////////////////////////////
fb.markAll = function(markNote, markedVal){
var i, j;
	for (i = 0; i<fb.neck1.getNoStrings(); i++){
		for(j=0; j<fb.neck1.getNoFrets();j++){
			if(fb.neck1.strings[i].frets[j].note == markNote){
				fb.neck1.strings[i].frets[j].marked = markedVal;
			}
		}
	}
}
///////////////////////////////////////////////////////////////////////////////////////
//draws the frets onto the canvas
///////////////////////////////////////////////////////////////////////////////////////
fb.printFrets = function(){
var i;
	//draws frets
	for (i=0; i<fb.neck1.getNoFrets();i++){
		fb.line(fb.neck1.strings[0].frets[i].x, fb.neck1.strings[0].frets[i].y, fb.neck1.strings[fb.neck1.getNoStrings()-1].frets[i].x, fb.neck1.strings[fb.neck1.getNoStrings()-1].frets[i].y);
	}
}
///////////////////////////////////////////////////////////////////////////////////////
//draws the strings onto the canvas
///////////////////////////////////////////////////////////////////////////////////////
fb.printStrings = function(){
var i, j;
	fb.strokeWeight(fb.neckScale/7);
	for (i = 0; i<fb.neck1.getNoStrings(); i++){
		for(j=0; j<fb.neck1.getNoFrets()-1;j++){
		fb.line(fb.neck1.strings[i].frets[j].x,fb.neck1.strings[i].frets[j].y,fb.neck1.strings[i].frets[j+1].x,fb.neck1.strings[i].frets[j+1].y);
		}
	}
	fb.strokeWeight(1);
}
///////////////////////////////////////////////////////////////////////////////////////
//draws marked frets onto the canvas
///////////////////////////////////////////////////////////////////////////////////////
fb.printMarked = function(){
var i, j;
var tempColor;
	for (i = 0; i<=fb.neck1.getNoStrings()-1; i++){
		for(j=0; j<fb.neck1.getNoFrets();j++){
			if(fb.neck1.strings[i].frets[j].marked == 1){
				if(fb.neck1.strings[i].frets[j].color != ""){
					tempColor = getColor(fb.neck1.strings[i].frets[j].color);					
				}else{
					tempColor = getColor("Black");
				}
			fb.fill(tempColor.R, tempColor.G, tempColor.B);
			fb.ellipse(fb.neck1.strings[i].frets[j].x, fb.neck1.strings[i].frets[j].y, fb.neckScale/2,fb.neckScale/2);
			fb.fill(1);
			}
		}
	}
}
///////////////////////////////////////////////////////////////////////////////////////
//prints fret numbers and string tunings
///////////////////////////////////////////////////////////////////////////////////////
fb.printText = function(){
var i, s, f;

fb.textSize(fb.neckScale);
//fret markers
fb.text("3",fb.neck1.strings[0].frets[3].x - fb.neckScale/1.5, fb.neck1.strings[0].frets[3].y + (fb.neckScale/3));
fb.text("5",fb.neck1.strings[0].frets[5].x - fb.neckScale/1.5, fb.neck1.strings[0].frets[5].y + (fb.neckScale/3));
fb.text("7",fb.neck1.strings[0].frets[7].x - fb.neckScale/1.5, fb.neck1.strings[0].frets[7].y + (fb.neckScale/3));
fb.text("9",fb.neck1.strings[0].frets[9].x - fb.neckScale/1.5, fb.neck1.strings[0].frets[9].y + (fb.neckScale/3));

fb.textAlign(fb.RIGHT);
fb.text("3",fb.neck1.strings[fb.neck1.getNoStrings()].frets[3].x, fb.neck1.strings[fb.neck1.getNoStrings()].frets[3].y + (fb.neckScale/3));
fb.text("5",fb.neck1.strings[fb.neck1.getNoStrings()].frets[5].x, fb.neck1.strings[fb.neck1.getNoStrings()].frets[5].y + (fb.neckScale/3));
fb.text("7",fb.neck1.strings[fb.neck1.getNoStrings()].frets[7].x, fb.neck1.strings[fb.neck1.getNoStrings()].frets[7].y + (fb.neckScale/3));
fb.text("9",fb.neck1.strings[fb.neck1.getNoStrings()].frets[9].x, fb.neck1.strings[fb.neck1.getNoStrings()].frets[9].y + (fb.neckScale/3));

//string notes
fb.textAlign(fb.CENTER);
fb.textSize(fb.neckScale/2);

for(i = 0; i < fb.neck1.getNoStrings(); i++){
	fb.push();
	if(fb.neck1.strings[i].note.length != 1){
		fb.translate(fb.neck1.strings[i].frets[0].x,fb.neck1.strings[i].frets[0].y - (fb.neckScale/4));
		fb.rotate(1.75*fb.PI);
		fb.textAlign(fb.LEFT);
		fb.textSize(fb.neckScale/2.5);
		fb.text(fb.neck1.strings[i].note,0,0);
		}else{
		fb.text(fb.neck1.strings[i].note,fb.neck1.strings[i].frets[0].x,fb.neck1.strings[i].frets[0].y - (fb.neckScale/2));
	}
	fb.pop();
}
}
///////////////////////////////////////////////////////////////////////////////////////
//calls all the painting/printing functions
///////////////////////////////////////////////////////////////////////////////////////
fb.printNeck = function(){
	fb.neckScale = fb.sizeSlider.value();
	fb.neck1.resizeNeck(fb.xOff, fb.yOff, fb.neckScale);
	fb.background(fb.BGC);
	fb.printFrets();
	fb.printStrings();
	fb.printMarked();
}
///////////////////////////////////////////////////////////////////////////////////////
//returns an specified note value from a 'select' in the document
///////////////////////////////////////////////////////////////////////////////////////
fb.getPageNote = function (x){
return document.getElementById("s" + x).value;
}
}

