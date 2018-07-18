//generateQuizPage
const generateQuizPage = function(){
	removeLanding();
	nextQuestion(makeArray());
	//appendUserBrief(randGen());
}

const removeLanding = function(){
	$("li").each(function(){
		$(this).removeClass('clicked');
		$(this).removeClass('unclicked');
	});
	$('.intro-article').remove();
	$('.output').remove();
}

//Turns binary string to array
const makeArray = function(){
	return dec2bin().split("");
}

const nextQuestion = function(numberArray){
	$('.box').each(function(i){
		if(numberArray[i] == "0"){
			$(this).removeClass('clicked unclicked');
			$(this).addClass('blank');
		} else {
			$(this).removeClass('clicked unclicked');
			$(this).addClass('lightning');
		}
	});
}

const appendUserBrief = function(answer){
//$('main').prepend(`<article><p>${generatedNumber}</p></article>`);
	$('main').append(
		`<article class='multiple-choice'>
			<ul class='example-boxes'>
				<li class='options'></div></li>
				<li class='options'></div></li>
				<li class='options'></div></li>
				<li class='options'></div></li>
			</ul>
		</article>
	`);	
//optionBoxes(answer);


const optionBoxes = function(answer){
	// debugger;
	var answerBox = Math.floor(Math.random() * 4);
	var array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
	$('.options').each(function(index){
		if(index === answerBox){
			$(this).append(answer);
			removeArrayElement(answer, array);
			//take away the correct answer from the possilibities of the remainder
		} else {
			var num = nextBoxes(array); 
			$(this).append(num);	
			removeArrayElement(num, array);		
		};
	});
}

const removeArrayElement = function(input, arr){
	var index = array.indexOf(input);
	arr.splice(index, 1);
}

const nextBoxes = function(arr){
	var arraylength = arr.length; 
	var num = Math.floor(Math.random() * (arraylength - 1));
	var nextIndex = arr.indexOf(num);
	return arr[nextIndex];
}
//Generates random number 0-15
const randGen = function(){
	return Math.floor(Math.random() * 15);
}
//returns "0100", "1000", etc.
const dec2bin = function(){
	let num = randGen();
	if(num === 0){
		return "0000";
	} else if(num === 1){
		return "0001";
	} else if(num === 2){
		return "0010";
	} else if(num === 3){
		return "0011";
	} else if (num === 4){
		return "0100";
	} else if (num === 5){
		return "0101";
	} else if (num === 6){
		return "0110";
	} else if (num === 7){
		return "0111";
	} else if (num === 8){
		return "1000";
	} else if (num === 9){
		return "1001";
	} else if (num === 10){
		return "1010";
	} else if (num === 11){
		return "1011";
	} else if (num === 12){
		return "1100";
	} else if(num === 13){
		return "1101";
	} else if (num === 14){
		return "1110";
	} else if (num === 15){
		return "1111";
	} else {
		return "error";
	}
}

const highlightAnswer = function(){
	$('.options').on('click', function(){
		if($(this).html() == answer){
			$(this).animateHighlight("#cce98e", 1000);
		} else {
			$(this).animateHighlight("red", 1000);
		}
	});
}

var notLocked = true;
$.fn.animateHighlight = function(highlightColor, duration) {
    var highlightBg = highlightColor || "#FFFF9C";
    var animateMs = duration || 1500;
    var originalBg = this.css("backgroundColor");
    if (notLocked) {
        notLocked = false;
        this.stop().css("background-color", highlightBg)
            .animate({backgroundColor: originalBg}, animateMs);
        setTimeout( function() { notLocked = true; }, animateMs);
    }
};





























	// const optionsBoxes = function(answer){
	// 	const answerBox = Math.floor(Math.random() * 4);
	// 	const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
	// 	$('.options').each(function(index){
	// 		if(index === answerBox){
	// 			$(this).append(answer);
	// 		} else {
	// 			var index = array.indexOf(answer);
	// 			array.splice(index, 1);
	// 			//take away the correct answer from the possilibities of the remainder
	// 			var num = Math.floor(Math.random() * 14);
	// 			$(this).append(num);			
	// 		};
	// 	});
	// }

// const repeat = function(generateNumber){
// 	let num = randGen();
// 	while(num === generateNumber){
// 		repeat(generateNumber);
// 	}
// 	return num;
// }


// var counter = 0;

// $( "#target" ).submit(function( event ) {
//   alert( "Handler for .submit() called." );
//   event.preventDefault();
//   counter++;
//   if($(this) === correctNumberPlacement
//   //check if box cliked is same as right answer is on
//   //if so, add one to rightAnswers
//   //generate new question
//   //counter++ while counter <=5  
// });


// var rightAnswers = [];
