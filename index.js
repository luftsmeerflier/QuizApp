$(function(){
	landingPage();
	addClickFunctionality();
	startQuiz();
});	

//Landing Page Generation
function landingPage(){
	$('main').append(
		`<article class='boxes'>
			<ul class='boxes'>
				<li class='box unclicked' data-id='8'></li>
				<li class='box unclicked' data-id='4'></li>
				<li class='box unclicked' data-id='2'></li>
				<li class='box unclicked' data-id='1'></li>
			</ul>
		</article>`
	);

	$('article').append(`<p class='result'><span class='output'>0x0</span></p>`); 

	$('article').append(
		`<article class='intro-article'>
			<p class='intro'>This is a binary calculator</p>
			<p class='intro'>Output is in hexadecimal notation</p>
			<p class='intro'>Start the quiz when you are ready</p>
			<form id='start-quiz'>
				<button type=submit'>Start quiz</button>
			</form>
		 </article>`
	); 	
};

function addClickFunctionality(){
	const VALUES = [0];
	unclickedBoxes(VALUES);
	clickedBoxes(VALUES);
}

function startQuiz(){
	$('#start-quiz input[type=submit], #start-quiz button').on('click', function(event) { 
		event.preventDefault();
		generateQuizPage();
	});
}


//addClickFunctionality support functions:
	function unclickedBoxes(VALUES){
		$('ul').on('click', '.unclicked', function(){
			const num = $(this).data('id');
			VALUES.push(num);
			$(this).removeClass('unclicked');
			$(this).addClass('clicked');
			remove();
			appendTotal(VALUES);
		});
	}

	function clickedBoxes(VALUES){
		$('ul').on('click', '.clicked', function(){
			const num = $(this).data('id');
			const indexToRemove = VALUES.indexOf(num);
			VALUES.splice(indexToRemove, 1);
			$(this).removeClass('clicked');
			$(this).addClass('unclicked');
			$(this).empty('clicked');
			remove();
			appendTotal(VALUES);
		});
	}

	function remove(){
		$('main').find('.output').remove();
	}

	function appendTotal(VALUES){
		$('.result').append(`<span class='output'>${getTotal(VALUES)}</span>`);
	}

	function getTotal(VALUES){
		const val = VALUES.reduce(reducer);
		const hex = val.toString(16);
		return `0x${hex}`;
	}

	function reducer(total, number){
		return total + number;
	}

//generateQuizPage

const generateQuizPage = function(){
	removeLanding();
	let numberArray = makeArray();
	nextQuestion(numberArray);
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


//Generates random number 0-15
var randGen = function(){
	return Math.floor(Math.random() * 15);
}

//returns "0100", "1000", etc.
var dec2bin = function(){
	let num = randGen();
	appendUserBrief(num);
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

function appendUserBrief(answer){
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
			<form id="target" action="destination.html">
			  <input type="submit" value="Answer">
			</form>
			`);	

	optionBoxes(answer);
	$( '.options' ).on('click', function() {
	  $( this ).toggle( "pulsate" );
	});

	$('#start-quiz input[type=submit], #start-quiz button').on('click', function(event) { 
		event.preventDefault();
		generateQuizPage();
	});

}






const optionBoxes = function(answer){
	var answerBox = Math.floor(Math.random() * 4);
	var array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
	$('.options').each(function(index){
		if(index === answerBox){
			$(this).append(answer);
		} else {
			var index = array.indexOf(answer);
			array.splice(index, 1);
			//take away the correct answer from the possilibities of the remainder
			var num = Math.floor(Math.random() * 14);
			$(this).append(num);			
		};
	});

}


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
