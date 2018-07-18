$(function(){
	generateLandingPage();
	clickFunctionalityBoxes();
	startQuiz();
});	

//Landing Page Generation
function generateLandingPage(){
	generateBoxes();

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

function generateBoxes(){
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
}

const clickFunctionalityBoxes = function(){
	const VALUES = [0];
	unclickedBoxes(VALUES);
	clickedBoxes(VALUES);
}

const startQuiz = function(){
	$('#start-quiz input[type=submit], #start-quiz button').on('click', function(event) { 
		event.preventDefault();
		//randGen for answer param
		generateQuizPage(randGen());
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


const generateQuizPage = function(answer){
	removeLanding();
	generateBoxes();
	makeDisplayBoxes(makeArray(answer));
	createOptionBoxes(answer);
	renderAnswers(answer);
	selectOption(answer);
}

const selectOption = function(answer){
	$('.options').each(function(event){
		$(event.currentTarget).removeClass('correct');
		$(event.currentTarget).removeClass('incorrect');
	});
	$('.options').on('click',function(event){
		let currentTarget = $(event.currentTarget);
		let val = currentTarget.html();
		if(val == answer){
			currentTarget.addClass('correct');
		} else {
			currentTarget.addClass('incorrect');
		}
		window.setTimeout(function(){ generateQuizPage(randGen())}, 700);
	});
}



// const selectOption = function(answer){
// 	click().delay;
// 	generateQuizPage(randGen());

// 	function click(){
// 		$('.options').on('click', function(){
// 			var choice = $(this).html();
// 		if(choice == answer){
// 			$(this).addClass('correct');
// 		} else {
// 			$(this).addClass('incorrect');
// 		}
// 	}
// }

const removeLanding = function(){
	$('main > *').remove();
}

//Turns binary string to array
const makeArray = function(ans){
	return dec2bin(ans).split("");
}

//returns "0100", "1000", etc.
var dec2bin = function(num){
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

const makeDisplayBoxes = function(numberArray){
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

const createOptionBoxes = function(){
	//$('main').prepend(`<article><p>${generatedNumber}</p></article>`);
	$('main').append(
		`<article class='multiple-choice'>
			<ul class='example-boxes'>
				<li class='options'></li>
				<li class='options'></li>
				<li class='options'></li>
				<li class='options'></li>
			</ul>
		</article>
	`);	
}

function renderAnswers(answers) {
	let array = generateAnswers(answers);
 	array.forEach((element, index) => {
    	$('.options')[index].append(element);
  	});			
}

// article.multiple-choice > ul > li > label

function generateAnswers(answer) {
	let array = [];
	for(let i = 0; i < 4; i++){
		let flag = true; 
		let number = generateNumber(answer, array);
		for(let j = 0; j < array.length; j++){
			if(array[j] === number){
				flag = false;
			}
		}
		if(flag == true){
			array.push(number);
		} else {
			i--;
		}
	}
	let answerIndex = Math.floor(Math.random() * 4);
	array.splice(answerIndex, 1, answer);
  	return array;
}

function generateNumber(answer, array){
	let number = randGen();
	if(number !== answer && !array.find(function(element){ return element === answer})) {
		return number;
	} else {
		return generateNumber(answer, array);
	}
}