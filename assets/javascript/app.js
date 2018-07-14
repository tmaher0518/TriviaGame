var triviaQuestions = [{
	question: "What name does Brennan tell Dale his nickname is?",
	answerList: ["Nighthawk", "Dragon", "Dragonator", "Flash"],
	answer: 1
},{
	question: "What level of belt in Kung-fu has Brennan achieved?",
	answerList: ["Green", "Blue", "Purple", "Yellow"],
	answer: 0
},{
	question: "According to Brennan, what is he nicknamed, because of his amazing singing voice?",
	answerList: ["A mix between Fergie and Jesus", "The songbird of his generation", "Elvis Presley", "Fergie"],
	answer: 0
},{
	question: "What song does Derek and his family sing in the car?",
	answerList: ["Welcome to the Jungle", "Free Bird", "Sweet Child O' Mine", "YMCA"],
	answer: 2
},{
	question: "What does Dale always do when he is sleepwalking?",
	answerList: ["Screams obscenities", "Plays drums", "Puts his dads wallet in the refrigerator", "Puts pillows in the oven"],
	answer: 3
},{
	question: "Why is Dale upset with the amount of money his dad leaves him for food?",
	answerList: ["There is not enough for wings.", "There is not enough for soda.", "There was not enough for candy.", "It was Monopoly Money"],
	answer: 0
},{
	question: "What are the two ingredients in Fancy Sauce?",
	answerList: ["Ketchup and Mustard", "Ketchup and Mayo", "Ketchup and BBQ Sauce", "Ketchup and Ranch"],
	answer: 1
},{
	question: "What does Brennan say when Dale asks why he is so sweaty?",
	answerList: ["He was playing video games.", "He was playing drums.", "He was doing Karate in the garage.", "He was sleepwalking"],
	answer: 2
},{
	question: "What did Dale ask Brennan before the bunk beds collapsed?",
	answerList: ["Do you have nightmares?", "Do you like guacamole?", "Do you do Karate?", "Do you wet the bed?"],
	answer: 1
},{
	question: "How old is Dale?",
	answerList: ["38", "39", "40", "45"],
	answer: 2
},{
	question: "What is the name of the company Dale and Brennan pitch to Derek?",
	answerList: ["Boats and Pros", "Prestige Worldwide", "Boyz Worldwide", "Boats and Dragons"],
	answer: 1
},{
	question: "What does Brennan call his therapist?",
	answerList: ["Hot Pants", "Honey Bun", "Sweet Buns", "Angel Face"],
	answer: 3
},{
	question: "The brothers are a tribute band for whom?",
	answerList: ["Elton John","Billy Joel","Queen","Vanilla Ice"],
	answer: 1
},{
	question: "What is the instrument that Dale is extremely protective over?",
	answerList: ["Flute","Piano","Drums","Guitar"],
	answer: 2
},{
	question: "After getting in a fight, Dale and Brennan begin to bond while watching this?",
	answerList: ["Shark Week", "American Idol", "Soul Train","True Blood"],
	answer: 0
}];
var search = ['dale+dragon', 'kung-fu+brennan+green','brennan+fergie+jesus','derek+sweetchild']
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Yep, that's right!",
	incorrect: "Nope, that's not it.",
	endTime: "Out of time!",
	finished: "Did we just become best friends? Yep!"
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//This will set up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//This will pause at the time and set up answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//This will set the timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //This clears the question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	//Adding giphy api
	var giphyURL = "https://media.giphy.com/media/3o84smfKEfFdgx3oAM/giphy.gif" + search[currentQuestion] + "&limit=1&rating=g&api_key=dc6zaTOxFJmzC"
	$.ajax({url: giphyURL, method: 'GET'}).done(function(giphy){
		var currentGif = giphy.data;
		$.each(currentGif, function(index,value){
		var embedGif = value.images.original.url;
		newGif = $('<img>');
		newGif.attr('src', embedGif);
		newGif.addClass('gifImg');
		$('#gif').html(newGif);
		});
	});
	//This checks to see if answer is correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
    $('#startOverBtn').html('Start Over?');
}