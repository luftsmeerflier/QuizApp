//Add progress meter


//Add readme
//link to articles on binary, hex "don't know binary? etc."
//Inform user if incorrect, correct : alert for now
//Pull Jquery from a CDN
// refactor li options to radio buttons
//Use form instead of ul

//As a user, I should know how many are correct or wrong
//Requirements as feature requests
const App = {
	modal : {

	},
	numQuestions: 10,
	counter : 0,
	answers : [],
	landingPage : {

	},
	quizPage : {

	}
};

App.modal.intro = function(){
	$('main').append(`
	<div class="modal">
	 <p>Click on the boxes to use this binary calculator</p>
	 <p>The output is in hexadecimal (base-16) notation</p>
	 <p>Learn about <a href="https://www.coursera.org/lecture/technical-support-fundamentals/how-to-count-in-binary-LrRHA">binary</a> and <a href="https://en.wikipedia.org/wiki/Hexadecimal">hexadecimal</a></p>
	  <button class="modal__button-close" role="close window" tabindex="1">Close</button>
	</div>
	`);

   $('.modal__button-close').bind('click', function() {
      $('.modal').remove();
   });
}

App.modal.generate = function(){
	$('main').append(`
	<div class="modal">
	 <p>Click a number below corresponding to the value above</p>
	 <p>Use tab navigation if you please, and press enter or the spacebar</p>
	  <button class="modal__button-close" role="close window" tabindex="1">Close</button>
	</div>
	`);

   $('.modal__button-close').bind('click', function() {
      $('.modal').remove();
   });
}

App.modal.endScreen = function(){
	$('main').append(`
		<div class="modal">
	  <p>You got ${correct()}/10</p>
	  <button class="restart" tabindex="1">Restart</button>
	</div>
	`);
   $('.restart').on('click', function() {
   	App.answers = [];
		App.quizPage.generateQuizPage(App.randGen());
   });
   function correct(){
   	let num = 0;
   	for(answer of App.answers){
   		if(answer == 'correct'){
   			num++;
   		}
   	}
   	return num;
   }
}
		//$('.result').append(`<div class='output'>${App.landingPage.getTotal(VALUES)}</span>`);

//Landing Page Generation
App.landingPage.generateLandingPage = function(){
	App.landingPage.generateBoxes();
	$('main').addClass('landing');
	App.modal.intro();
	$('article').append(`<div class="result"><div class='output'><p>0x0<p></div></div>`); 
	$('article').append(
		`<form id='start-quiz' class=''>
			<button type=submit' autofocus>Start quiz</button>
		</form>`
	); 	
	App.landingPage.clickFunctionalityBoxes();
	App.landingPage.startQuiz();
};

App.landingPage.generateBoxes = function(){
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

App.landingPage.clickFunctionalityBoxes = function(){
	const VALUES = [0];
	App.landingPage.unclickedBoxes(VALUES);
	App.landingPage.clickedBoxes(VALUES);
}

//addClickFunctionality support functions:
App.landingPage.unclickedBoxes = function(VALUES){
	$('ul').on('click', '.unclicked', function(){
		const num = $(this).data('id');
		VALUES.push(num);
		$(this).removeClass('unclicked');
		$(this).addClass('clicked');
		$('main').find('.output').remove();
		$('.result').append(`<span class='output'><p>${App.landingPage.getTotal(VALUES)}</p></span>`);
	});
}

App.landingPage.clickedBoxes = function(VALUES){
	$('ul').on('click', '.clicked', function(){
		const num = $(this).data('id');
		const indexToRemove = VALUES.indexOf(num);
		VALUES.splice(indexToRemove, 1);
		$(this).removeClass('clicked');
		$(this).addClass('unclicked');
		$(this).empty('clicked');
		$('main').find('.output').remove();
		$('.result').append(`<span class='output'><p>${App.landingPage.getTotal(VALUES)}</p></span>`);
	});
}

App.landingPage.startQuiz = function(){
	$('#start-quiz input[type=submit], #start-quiz button').on('click', function(event) { 
		event.preventDefault();
		//randGen for answer param
		let answer = App.randGen();
		App.quizPage.generateQuizPage(answer);
		App.modal.generate();
	});
}

App.landingPage.getTotal = function(VALUES){
	const val = VALUES.reduce(reducer);
	const hex = val.toString(16);
	return `0x${hex}`;
	function reducer(total, number){
		return total + number;
	}
}



//generateQuizPage


App.quizPage.generateQuizPage = function(answer){
	let intArray = App.quizPage.makeArray(answer);
	App.quizPage.removeLanding(answer, intArray);
	App.quizPage.statusBar();
	App.landingPage.generateBoxes();
	App.quizPage.createOptionBoxes(answer, intArray);
	App.quizPage.renderAnswers(answer);
	App.quizPage.selectOption(answer);
}

App.renderWindow = function(){
	if(App.answers.length == App.numQuestions){
		App.quizPage.generateQuizPage(0);
		App.quizPage.updateStatusBar();
		window.setTimeout(function(){
			App.modal.endScreen();
		}, 500);
	} else {
		window.setTimeout(function(){ 
			App.quizPage.generateQuizPage(App.randGen());
			App.quizPage.updateStatusBar();
		}, 700);
	}
}

App.quizPage.statusBar = function(){
	$('main').append(`
    <div class="status-bar">
      <ul>
	      <li data-id='1'></li>
	      <li data-id='2'></li>
	      <li data-id='3'></li>
	      <li data-id='4'></li>
	      <li data-id='5'></li>
	      <li data-id='6'></li>
	      <li data-id='7'></li>
	      <li data-id='8'></li>
	      <li data-id='9'></li>
	      <li data-id='10'></li>
      </ul>
    </div> 
    <article class="article-header">
    	<h1>Guess the number!</h1>
    </article>
	`);
	App.quizPage.updateStatusBar();
}

App.quizPage.updateStatusBar = function(){
		$('.status-bar li').each(function(index, element){
			let litmus = App.answers[index];
			$(element).addClass(litmus);
		});
}	

App.quizPage.selectOption = function(answer){
	$('.options').each(function(event){
		$(event.currentTarget).removeClass('correct');
		$(event.currentTarget).removeClass('incorrect');
	});
	$('.options').on('click keypress',function(event){
	   if(event.type === 'click'){
        	innerFunction();
    	} else if(event.type === 'keypress'){
        const code = event.charCode || event.keyCode;
        if((code === 32) || (code === 13)){
        		innerFunction();
        }
    }
	});


	function innerFunction(){
		let currentTarget = $(event.currentTarget);
		let val = currentTarget.html();
		if(val == answer){
			currentTarget.addClass('animate-correct');
			App.answers.push('correct');
			$('h1').replaceWith(`<h1>Correct!</h1>`);
		} else {
			currentTarget.addClass('animate-incorrect');
			App.answers.push('incorrect');
			$('h1').replaceWith(`<h1>Incorrect - it's ${answer}</h1>`);
		}
		//find out value of last answer
		if(App.answers[App.answers.length - 1] == 'correct'){
			setTimeout(function(){
				App.renderWindow();
			}, 250);
		} else {
			setTimeout(function(){
				App.renderWindow();
			}, 1000);
		}
	}
}



// a11y
App.quizPage.a11yClick = function(event){
    if(event.type === 'click'){
        return true;
    }
    else if(event.type === 'keypress'){
        var code = event.charCode || event.keyCode;
        if((code === 32)|| (code === 13)){
            return true;
        }
    }
    else{
        return false;
    }
}

$('li').on('click keypress', function(event){
  if(a11yClick(event) === true){
  		App.quizPage.a11yClick();
  }
});

App.quizPage.removeLanding = function(){
	$('main').removeClass('landing');
	$('main').addClass('quizPage');
	$('main > *').remove();
}


App.quizPage.renderAnswers = function(answers) {
	let array = App.quizPage.generateAnswers(answers);
 	array.forEach((element, index) => {
    	$('.options')[index].append(element);
  	});			
}



//Turns binary string to array
App.quizPage.makeArray = function(ans){
	return App.quizPage.dec2bin(ans).split("");
}

//returns "0100", "1000", etc.
App.quizPage.dec2bin = function(num){
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

const makeDisplayBoxes = function(numberArray, answer){
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
App.randGen = function(){
	return Math.floor(Math.random() * 15);
}

App.quizPage.createOptionBoxes = function(answer, numberArray){
	//$('main').prepend(`<article><p>${generatedNumber}</p></article>`);
	$('main').append(
		`<article class='multiple-choice'>
			<ul class='example-boxes' role='listbox'>
				<li class='options' role='button' tabindex="1"></li>
				<li class='options' role='button' tabindex="2"></li>
				<li class='options' role='button' tabindex="3"></li>
				<li class='options' role='button' tabindex="4"></li>
			</ul>
		</article>
	`);	
	$('.box').each(function(index){
		if(numberArray[index] == "0"){
			$(this).removeClass('clicked unclicked');
			$(this).addClass('blank');
		} else {
			$(this).removeClass('clicked unclicked');
			$(this).addClass('lightning');
		}
	});
}

App.quizPage.renderAnswers = function(answers) {
	let array = App.quizPage.generateAnswers(answers);
 	array.forEach((element, index) => {
    	$('.options')[index].append(element);
  	});			
}

// article.multiple-choice > ul > li > label

App.quizPage.generateAnswers = function(answer) {
	let array = [];
	for(let i = 0; i < 4; i++){
		let flag = true; 
		let number = App.quizPage.generateNumber(answer, array);
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

App.quizPage.generateNumber = function(answer, array){
	let number = App.randGen();
	if(number !== answer && !array.find(function(element){ return element === answer})) {
		return number;
	} else {
		return App.quizPage.generateNumber(answer, array);
	}
}

// $(function(){
// 	App.landingPage.generateLandingPage();
// });	
$( document ).ready(function(){
	App.landingPage.generateLandingPage();
});	