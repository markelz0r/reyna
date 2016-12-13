
$( ".item0" ).addClass( "active" );



$("#cart_items").val(localStorage.cart) //populating hiiden field on checout page

function loadPage() {
	$(".cont").css({"opacity" : "1" });
	console.log("Page loaded");

}

function loadTime(date,index) {
	var d = new Date(date);
	document.getElementById("time"+index).innerHTML = d;
}

function mouseOver() {
if (!("ontouchstart" in document.documentElement))
		$("#cart-total").css({"background-color" : "transparent", "color":"black"});
}

function mouseOut() {

	$("#cart-total").css({"background-color" : "black", "color":"white"});
}

function mouseOver1() {
if (!("ontouchstart" in document.documentElement))
		$(".price").css({"background-color" : "transparent", "color":"black"});
}

function mouseOut1() {
	$(".price").css({"background-color" : "black", "color":"white"});
}

if (!("ontouchstart" in document.documentElement)) {
document.documentElement.className += " no-touch";
}