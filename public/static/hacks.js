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