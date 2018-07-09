const VALUES = [0];


// $(function(){
// 	$('.unclicked').on('click', (e)=> {
// 		const val = $(e.currentTarget).text();
// 		const num = Number(val);
// 		VALUES.push(num);<
// 		console.log("hi");
// 		$(e.currentTarget).removeClass('unclicked');
// 		$(e.currentTarget).addClass('clicked');
// 	});
// });
function remove(){
	$('main').find('.output').remove();
}
function appendTotal(){
	$('.result').append(`<span class='output'>${getTotal()}</span>`);
}

function getTotal(){
	const val = VALUES.reduce(reducer);
	const hex = val.toString(16);
	return `0x${hex}`;
}

// function addLightning(){
// 	$('.flex-item')addClass(".lightning");
// }

$(function(){
	$('ul').on('click', '.unclicked', function(){
		const num = $(this).data('id');
		VALUES.push(num);
		$(this).removeClass('unclicked');
		$(this).addClass('clicked');
		remove();
		appendTotal();
	});

	$('ul').on('click', '.clicked', function(){
		const num = $(this).data('id');
		const indexToRemove = VALUES.indexOf(num);
		VALUES.splice(indexToRemove, 1);
		$(this).removeClass('clicked');
		$(this).addClass('unclicked');
		$(this).empty('clicked');
		remove();
		appendTotal();
	});

});


function reducer(total, number){
	return total + number;
}