
//disable loading screen
//$id('loadingScreen').parentElement.removeChild($id('loadingScreen')); 

/*GLOBAL ALIASES*/
var $id =document.getElementById.bind(document);
var $name =document.getElementsByName.bind(document);
var $tag =document.getElementsByTagName.bind(document);
var $class =document.getElementsByClassName.bind(document);
var $create =document.createElement.bind(document);
var $query =document.querySelectorAll.bind(document);

//aliases assigned in *-control.js
var	$report, $inputs, $rows, $buttons, $printer, $profile, $request, $handler;

/*STRING.PROTOTYPE F's*/
////generate hash from string.prototype
String.prototype.hashCode =function() {
  var hash =0, i, chr, len;
  if (this.length ===0) return hash;
  for (i = 0, len =this.length; i <len; i++) {
    chr =this.charCodeAt(i);
    hash =((hash <<5) -hash) +chr;
    hash |=0; // Convert to 32bit integer
  }
  return hash >>>0;
};
//POLYFILL FOR IE
if(!String.prototype.endsWith){
  String.prototype.endsWith =function(searchString, position){
	  var subjectString =this.toString();
	  if(typeof position !=='number' ||!isFinite(position) ||Math.floor(position) !==position ||position >subjectString.length){
		position =subjectString.length;
	  }
	  position -=searchString.length;
	  var lastIndex =subjectString.indexOf(searchString, position);
	  return lastIndex !==-1 &&lastIndex ===position;
  };
}
function handler_logout_save(){
	$id('jBSaveContinue').removeEventListener('click', handler_toggle_save);
	$id('jBSaveContinue').removeEventListener('click', handler_map_save);
	$id('unsaved').className ="hidden";
	isupdated =undefined;
	dr.main.report.php.save(function(){		
		dr.browser.session.logout();
	});
	$id('jBSaveContinue').removeEventListener('click', handler_logout_save);
}
function handler_logout_continue(){
	$id('jBContinue').removeEventListener('click', handler_map_continue);
	$id('jBContinue').removeEventListener('click', handler_toggle_continue);
	$id('unsaved').className ="hidden";
	isupdated =undefined;
	$id('jBContinue').removeEventListener('click', handler_logout_continue);
	dr.browser.session.logout();
}
function handler_toggle_save(){
	$id('jBSaveContinue').removeEventListener('click', handler_map_save);
	$id('jBSaveContinue').removeEventListener('click', handler_logout_save);
	dr.main.report.php.save();
	$id('unsaved').className ="hidden";
	isupdated =undefined;
	dr.main.toggle('jDivProfile');
	$id('jBSaveContinue').removeEventListener('click', handler_toggle_save);
};	
function handler_toggle_continue(){
	$id('jBContinue').removeEventListener('click', handler_map_continue);
	$id('jBContinue').removeEventListener('click', handler_logout_continue);
	$id('unsaved').className ="hidden";
	isupdated =undefined;
	dr.main.toggle('jDivProfile');
	$id('jBContinue').removeEventListener('click', handler_toggle_continue);
};
var o_caller, o_extraCallback;
function handler_map_save(){
	$id('jBSaveContinue').removeEventListener('click', handler_toggle_save);
	$id('jBSaveContinue').removeEventListener('click', handler_logout_save);
	$id('unsaved').className ="hidden";
	isupdated =undefined;
	dr.main.report.php.save(function(){		
		dr.sidebar.map.select(o_caller, o_extraCallback);
	});
	$id('jBSaveContinue').removeEventListener('click', handler_map_save);
};	
function handler_map_continue(){
	$id('jBContinue').removeEventListener('click', handler_toggle_continue);
	$id('jBContinue').removeEventListener('click', handler_logout_continue);
	$id('unsaved').className ="hidden";
	isupdated =undefined;
	dr.sidebar.map.select(o_caller, o_extraCallback);
	$id('jBContinue').removeEventListener('click', handler_map_continue);
};
function handler_cancel(){
	$id('unsaved').className ="hidden";
	$id('jBSaveContinue').removeEventListener('click', handler_map_save);
	$id('jBSaveContinue').removeEventListener('click', handler_toggle_save);
	$id('jBSaveContinue').removeEventListener('click', handler_logout_save);
	$id('jBContinue').removeEventListener('click', handler_map_continue);
	$id('jBContinue').removeEventListener('click', handler_toggle_continue);
	$id('jBContinue').removeEventListener('click', handler_logout_continue);
	$id('jBJustCancel').removeEventListener('click', handler_cancel);
};	

/*CONSOLE F's*/
////enables console output
var __console;
console.enable = function(){
	if(__console !=undefined)console =__console;
	__console =undefined;
	return true;
}
////disables console output
console.disable = function(){
	console.clear();
	if(navigator.appName =='Microsoft Internet Explorer' || !!(navigator.userAgent.match(/Trident/) ||navigator.userAgent.match(/rv:11/)))
		console.log("Welcome to dualRepa");
	else console.log("%cWelcome to %cdualRepa","color:rgb(0,0,0);font-family:Calibri;font-size:3em","color:rgb(226,0,116);font-family:Calibri;font-size:3em");
	
	if(__console ==undefined) __console =console;
	console ={
	 	enable:__console.enable,
	 	disable:__console.disable,
	 	assert:function(){},
	 	clear:function(){},
	 	count:function(){},
	 	dir:function(){},
	 	dirxml:function(){},
	 	log:function(){},
	 	info:function(){},
	 	warn:function(){},
	 	error:__console.error,
	 	table:function(){},
	 	trace:function(){},
		time:function(){},
		timeEnd:function(){},
		profile:function(){},
		profileEnd:function(){},
		group:function(){},
		groupCollapsed:function(){},
		groupEnd:function(){}
	};
	return false;
}

/*VALUE CHECKING F's*/
function mask(data, fallback){
	if(fallback =="0"){
		if(data ===undefined ||data ===null ||isNaN(Number(data))) return Number(fallback);
		else return Number(data);
	}
	if(data ===undefined ||data ===null ||data ==="") return fallback;
	else return ""+data;
	
	/*
	if(fallback =="0"){
		if(isEmpty(data)) return Number(fallback);
		else return Number(data);
	}
	if(isEmpty(data)) return fallback;
	else return ""+data;
	*/
}
function isEmpty(data){
	if(Array.isArray(data)){
		for(let i =0; i <data.length; i++){
			if(!isEmpty(data[i])) return false;
		}
		return true;
	}
	if(typeof data ==='object'){
		for(var prop in data){
			if(data.hasOwnProperty(prop)) return false;
		}
		return true;
	}
	if(!isNaN(Number(data))){
		if(Number(data) ===0) return true;
		else return false;
	}
	if(data ===undefined ||data ===null ||data ==="") return true;
	else return false;
}
function canDel(data, type){
	switch(type){
		case 'description':
		case 'subject':
		case 'hours':
		case 'team':
		case 'entry':
		case 'day':{
			return isEmpty(data);
		}
		case 'idSubject':
		case 'idDay':
		case 'idWeekDay':
		case 'weekDay':
		case 'date':{
			return true;
		}
		case 'type':{
			if(data ===dr.env.report.type[0]) return true;
			else return false;
		}
	}
}
function getBrowserVendor(){
//finds vendor of browser rg. chrome
	// Internet Explorer 6-11
	var isIE =/*@cc_on!@*/false ||!!document.documentMode;
	if(isIE){
		return "ie";
	}
	// Edge 20+
	var isEdge =!isIE &&!!window.StyleMedia;
	if(isEdge){ 
		return "edge"; 
	}
	// Firefox 1.0+
	var isFirefox =typeof InstallTrigger !=='undefined';
	if(isFirefox){
		return "firefox"; 
	}
	var isIOSSafari =(!!window.navigator.userAgent.match(/iP(hone|pad|pod)/i))&&(!!window.navigator.userAgent.match(/WebKit/i))&&(!window.navigator.userAgent.match(/CriOS|OPiOS|mercury|FXiOS/));
	if(isIOSSafari){
		return "safari-ios";
	}
	// Safari 3.0+ "[object HTMLElementConstructor]" 
	var isSafari =/constructor/i.test(window.HTMLElement) ||(function (p) { return p.toString() ==="[object SafariRemoteNotification]"; })(!window['safari'] ||(typeof safari !=='undefined' &&safari.pushNotification));
	if(isSafari){
		return "safari";
	}
	// Opera 8.0+
	var isOpera =(!!window.opr &&!!opr.addons) ||!!window.opera ||navigator.userAgent.indexOf(' OPR/') >=0;
	// Chrome 1+
	var isChrome =!!window.chrome;
	// Blink engine detection
	var isBlink =(isChrome ||isOpera) &&!!window.CSS;
	if(isBlink){
		return "blink" +(isChrome ?" chrome":(isOpera ?" opera": "")); 
	}
	else if(isChrome){
		return "chrome";
	}
	else if(isOpera){ 
		return "opera"; 
	}
	return undefined;
}
/*DATE MANAGING F's*/
function prettyDate(date){		
	var dt =new Date(date);
	var ret ="";
	var month =["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
	var n =""+dt.getDate();
	ret +=n;
	if(n.endsWith("1") &&!n.endsWith("11")){
		ret +="st ";
	}
	else if(n.endsWith("2") &&!n.endsWith("12")){
		ret +="nd ";
	}
	else if(n.endsWith("3") &&!n.endsWith("13")){
		ret +="rd ";
	}
	else ret +="th ";
	ret +=month[dt.getMonth()] +" ";
	ret +=dt.getFullYear();
	return ret;

}
function euDate(date, direction){
	if(direction ===undefined) direction =0;
	var _dt =new Date(date);
	var dt =new Date(_dt);
	dt.setDate(_dt.getDate()+direction);	
	return dt.getFullYear() +"-"
		+((dt.getMonth() +1) <10 ?("0"+(dt.getMonth() +1)) :(dt.getMonth() +1)) +"-"
		+(dt.getDate() <10 ?("0"+dt.getDate()) :dt.getDate())
	;
}

////disable console globally
console.disable();

var fallbackPhoto ="data:image/png;base64,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"
