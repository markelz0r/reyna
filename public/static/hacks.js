$( ".item0" ).addClass( "active" );



$("#cart_items").val(localStorage.cart) //populating hiiden field on checout page

function loadPage() {
	$(".cont").css({"opacity" : "1" });
	console.log("Page loaded");

}