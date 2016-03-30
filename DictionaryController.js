//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//																							INITIALIZATION
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
var searchResultDisplay = document.getElementById("searchOutput");
var translateResultDisplay = document.getElementById("translateOutput");

zakasiWordList.sort();
englishWordList.sort();

var zakasiDictionaryIndex = {};
var englishDictionaryIndex = {};

var zakasiSectionLengths = {};
var englishSectionLengths = {};

//find separation points in the list of zakasi words
l = zakasiWordList.length;
for(i=0;i<l;i++){
	if (zakasiDictionaryIndex[zakasiWordList[i][0]] == null){
		zakasiDictionaryIndex[zakasiWordList[i][0]] = i;
	}
}
var zakasiDictionaryTabs = Object.keys(zakasiDictionaryIndex);
zakasiDictionaryTabs.sort();

l = zakasiDictionaryTabs.length;
for(i=0;i<l-1;i++){
	zakasiSectionLengths[zakasiDictionaryTabs[i]] = zakasiDictionaryIndex[zakasiDictionaryTabs[i+1]] - zakasiDictionaryIndex[zakasiDictionaryTabs[i]];
}
zakasiSectionLengths[zakasiDictionaryTabs[l-1]] = zakasiWordList.length - zakasiDictionaryIndex[zakasiDictionaryTabs[l-1]];


//find separation points in the list of english words
l = englishWordList.length;
for(i=0;i<l;i++){
	if (englishDictionaryIndex[englishWordList[i][0]] == null){
		englishDictionaryIndex[englishWordList[i][0]] = i;
	}
}

var englishDictionaryTabs = Object.keys(englishDictionaryIndex);
englishDictionaryTabs.sort();

l = englishDictionaryTabs.length;
for(i=0;i<l-1;i++){
	englishSectionLengths[englishDictionaryTabs[i]] = englishDictionaryIndex[englishDictionaryTabs[i+1]] - englishDictionaryIndex[englishDictionaryTabs[i]];
}
englishSectionLengths[englishDictionaryTabs[l-1]] = englishWordList.length - englishDictionaryIndex[englishDictionaryTabs[l-1]];

//set up the index tab bar
var languageSelector = document.getElementsByName("languageSelector");
var currentLanguage = languageSelector[0].checked//return true(1) if zakasi is checked
var currentTab = "";
var indexTabBar = document.getElementById("dictionaryIndex");
l = zakasiDictionaryTabs.length;
for(i=0;i<l;i++){
	var lastcreated = document.createElement("a");
	lastcreated.href = void(0);
	lastcreated.onclick = function(){
		currentTab = this.innerHTML.toLowerCase();
		selectIndexTab();
		return false;
	};
	lastcreated.appendChild(document.createTextNode(zakasiDictionaryTabs[i].toUpperCase()));
	indexTabBar.appendChild(lastcreated);
	indexTabBar.appendChild(document.createTextNode(" | "));
}

//set up the dictionary display
var dictionaryDisplay = document.getElementById("dictionaryDisplay");


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//																							FUNCTIONS
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


var showWords = function(){
	var title, begin, end, lastcreated, word, gram, def;
	dictionaryDisplay.innerHTML = "";
	if(currentLanguage){
		//set the title
		title = document.createTextNode("ZAKASI-ENGLISH: " + currentTab.toUpperCase());
		dictionaryDisplay.appendChild(document.createElement("h2").appendChild(title));
		dictionaryDisplay.appendChild(document.createElement("br"));
		dictionaryDisplay.appendChild(document.createElement("br"));
		//prepare the words
		begin = zakasiDictionaryIndex[currentTab];
		end = zakasiDictionaryIndex[currentTab]+zakasiSectionLengths[currentTab];
		for(i=begin;i<end;i++){
			var result = zakasiWords[zakasiWordList[i]];
			var gramString = "";
			var l = result.grammar.length;
			for(j=0;j<l;j++){
				gramString = gramString + result.grammar[j] + ", ";
			}
			word = document.createTextNode(zakasiWordList[i] + ":");
			gram = document.createTextNode(gramString);
			def = document.createTextNode(result.definition);
			lastcreated = dictionaryDisplay.appendChild(document.createElement("b"));
			lastcreated.appendChild(word);
			dictionaryDisplay.appendChild(document.createElement("br"));
			lastcreated = dictionaryDisplay.appendChild(document.createElement("i"));
			lastcreated.appendChild(gram);
			dictionaryDisplay.appendChild(def);
			dictionaryDisplay.appendChild(document.createElement("br"));
			dictionaryDisplay.appendChild(document.createElement("br"));
		}
	}else{
		title = document.createTextNode("ENGLISH-ZAKASI: " + currentTab.toUpperCase());
		dictionaryDisplay.appendChild(document.createElement("h2").appendChild(title));
		dictionaryDisplay.appendChild(document.createElement("br"));
		dictionaryDisplay.appendChild(document.createElement("br"));
		begin = englishDictionaryIndex[currentTab];
		end = englishDictionaryIndex[currentTab]+englishSectionLengths[currentTab];
		for(i=begin;i<end;i++){
			word = document.createTextNode(englishWordList[i] + ":");
			def = document.createTextNode(englishWords[englishWordList[i]]);
			lastcreated = dictionaryDisplay.appendChild(document.createElement("b"));
			lastcreated.appendChild(word);
			dictionaryDisplay.appendChild(document.createElement("br"));
			dictionaryDisplay.appendChild(def);
			dictionaryDisplay.appendChild(document.createElement("br"));
			dictionaryDisplay.appendChild(document.createElement("br"));
		}
	}
};

//process a search for a zakasi word
var searchZakasi = function(){
	var target = document.getElementById("searchBox");
	var result = zakasiWords[target.value.toLowerCase()];
	if (result != null){
		var gramString = "";
		var l = result.grammar.length;
		for(i=0;i<l;i++){
			gramString = gramString + result.grammar[i] + ", ";
		}
		var word = document.createTextNode(result.name + ":");
		var gram = document.createTextNode(gramString);
		var def = document.createTextNode(result.definition);
		searchResultDisplay.innerHTML = "";
		var lastcreated = searchResultDisplay.appendChild(document.createElement("b"));
		lastcreated.appendChild(word);
		searchResultDisplay.appendChild(document.createElement("br"));
		lastcreated = searchResultDisplay.appendChild(document.createElement("i"));
		lastcreated.appendChild(gram);
		searchResultDisplay.appendChild(def);
	}else{
		searchResultDisplay.innerHTML = '"' + target.value.toLowerCase() + '"' + "? that ain't gnollish!";
	}
};

//process a request for zakasi equivalents of a given english word
var searchEnglish = function(){
	var target = document.getElementById("translateBox");
	var result = englishWords[target.value.toLowerCase()];
	if (result != null){
		if(result.length == 0){
			console.log("somethin's wrong");
		}else{
			var transString = result[0];
			var l = result.length;
			for(i=1;i<l;i++){
				transString = transString + ", " + result[i];
			}
			var word = document.createTextNode(target.value.toLowerCase() + ":");
			var translations = document.createTextNode(transString);
			translateResultDisplay.innerHTML = "";
			var lastcreated = translateResultDisplay.appendChild(document.createElement("b"));
			lastcreated.appendChild(word);
			translateResultDisplay.appendChild(document.createElement("br"));
			translateResultDisplay.appendChild(translations);
		}
	}else{
		translateResultDisplay.innerHTML = "no translation for '" + target.value.toLowerCase() + "' available";
	}
};

var switchLanguage = function(){
	if(currentLanguage != languageSelector[0].checked){
		currentLanguage = languageSelector[0].checked;
		indexTabBar.innerHTML = "";
		if(currentLanguage){
			currentTab = zakasiDictionaryTabs[0];
			l = zakasiDictionaryTabs.length;
			for(i=0;i<l;i++){
				var lastcreated = document.createElement("a");
				lastcreated.href = void(0);
				lastcreated.onclick = function(){
					currentTab = this.innerHTML.toLowerCase();
					selectIndexTab();
					return false;
				};
				lastcreated.appendChild(document.createTextNode(zakasiDictionaryTabs[i].toUpperCase()));
				indexTabBar.appendChild(lastcreated);
				indexTabBar.appendChild(document.createTextNode(" | "));
			}
		}else{
			currentTab = englishDictionaryTabs[0];
			l = englishDictionaryTabs.length;
			for(i=0;i<l;i++){
				var lastcreated = document.createElement("a");
				lastcreated.href = void(0);
				lastcreated.onclick = function(){
					currentTab = this.innerHTML.toLowerCase();
					selectIndexTab();
					return false;
				};
				lastcreated.appendChild(document.createTextNode(englishDictionaryTabs[i].toUpperCase()));
				indexTabBar.appendChild(lastcreated);
				indexTabBar.appendChild(document.createTextNode(" | "));
			}
		}
		showWords();
	}
};

var selectIndexTab = function(){
	showWords();
};