//zakasi name generator stuff

var trisyllablePrefixList = [
	"k",
	"z",
	"y",
	"r",
	"sh",
	"ab",
	"az",
	"ak",
	"ish",
	"iz",
	"gaz",
	"garg",
	"sheeg",
	"shik",
	"shak",
	"shiz",
	"shaz",
	"jak",
	"jah",
	"jaz",
	"jeek",
	"jiz",
	"jeez",
	"keek",
	"kak",
	"kaz",
	"vaz",
	"yeen",
	"yeeg",
	"yeez",
	"yeeh",
	"yah",
	"zarg",
	"zak",
	"rash",
	"rag",
	"rak",
	"rik",
	"reek",
	"mak",
	"snik",
	"snak",
	"skiz",
	"skaz",
	"hah",
	"hih",
	"heeh",
	"heen",
	"heek",
	"haz",
	"hiz",
];

var trisyllableSuffixListMasculine = [
	"irak",
	"arak",
	"ahar",
	"ahir",
	"ihar",
	"izar",
	"azar",
	"ahai",
	"asheer",
];

var trisyllableSuffixListFeminine = [
	"aja",
	"ira",
	"iri",
	"ara",
	"ikna",
	"azi",
	"iza",
	"izu",
	"enzi",
];

var bisyllablePrefixList = [
	"zaj",
	"haz",
	"rag",
	"grar",
	"yar",
	"kih",
	"kah",
	"keer",
];

var bisyllableSuffixListMasculine = [
	"eer",
	"ak",
	"ar",
];

var bisyllableSuffixListFeminine = [
	"a",
	"i",
];

var wierdBisyllables = [
	"ragsheer",
	"hazrak",
	"shigrak",
	"karnak",
];

var banList = [
	"shazira",
	"keekarak",
	"yeegarak",
	"gnollen",
	"zargarak",
	"jaziri",
	"grara",
	"graa",
];


var gender = "masculine";
var randomNameOutput = document.getElementById("randomNameOutput");
var genderSelector = document.getElementsByName("genderSelector");

var selectGender = function(){
	if(genderSelector[0].checked){
		gender = genderSelector[0].value;
	}else{
		gender = genderSelector[1].value;
	}
};

var generateName = function(){
	var prefix, suffix;
	var choice = Math.floor(Math.random()*100)%100;
	if (choice > 25){
		prefix = trisyllablePrefixList[Math.floor(Math.random()*1000)%trisyllablePrefixList.length];
		if (gender == "masculine"){
			suffix = trisyllableSuffixListMasculine[Math.floor(Math.random()*1000)%trisyllableSuffixListMasculine.length];
		}else{
			suffix = trisyllableSuffixListFeminine[Math.floor(Math.random()*1000)%trisyllableSuffixListFeminine.length];
		}
	}else if (choice > 10){
		prefix = bisyllablePrefixList[Math.floor(Math.random()*1000)%bisyllablePrefixList.length];
		if (gender == "masculine"){
			suffix = bisyllableSuffixListMasculine[Math.floor(Math.random()*1000)%bisyllableSuffixListMasculine.length];
		}else{
			suffix = bisyllableSuffixListFeminine[Math.floor(Math.random()*1000)%bisyllableSuffixListFeminine.length];
		}
	}else{
		prefix = wierdBisyllables[Math.floor(Math.random()*1000)%wierdBisyllables.length];
		suffix = "";
	}
	return prefix + suffix;
};

//returns true if name is banned
var checkBanlist = function(name){
	var flag = false;
	var l = banList.length;
	for(i=0;i<l;i++){
		if (banList[i] == name){
			flag = true;
			break;
		}
	}
	return flag;
};

var getName = function(){
	var name = generateName();
	while(checkBanlist(name)){
		console.log(checkBanlist(name));
		name = generateName();
	}
	randomNameOutput.innerHTML = "";
	randomNameOutput.appendChild(document.createTextNode(name));
	console.log(name);
};


//maybe add a third option for wierd names like ragsheer and hazrak