
var cartArr;
if (typeof(localStorage.cart) !== 'undefined' && localStorage.cart != ""){
	cartArr = new Cart(JSON.parse(localStorage.cart));
}
else
{
	cartArr = new Cart();
	localStorage.cart = "[]";
}

cartArr.generateTotal();

$(function() {
	if (localStorage.cart !== ("" || "[]")) {
		$(".cart_wrap").css("display","block");
		
		setTimeout(function(){ $("#shoppingCart").css("opacity","1"); }, 1);
	}
	

    var i = -1,ii=cartArr.cartItems.length;
    total();
    while (++i<ii) {
    //	$('.item-container').append('<tr id="cartitem_'+cartArr.cartItems[i].id+'"></tr>');
    //	$('#cartitem_'+cartArr.cartItems[i].id).append('<td id="item_cart_title">'+cartArr.cartItems[i].title+'</td>');
	// 	$('#cartitem_'+cartArr.cartItems[i].id).append('<td id="item_cart_price">'+cartArr.cartItems[i].price+'</td>');
	// 	$('#cartitem_'+cartArr.cartItems[i].id).append('<td id="item_cart_delete"><button onclick="cartArr.removeItem('+cartArr.cartItems[i].id+');$(\'#cartitem_'+cartArr.cartItems[i].id+'\').remove();updateLocalStorage();">Delete</button></td>');
	populateCart(cartArr.cartItems[i]);
    }
});

$('#someInput').bind('input', function() { 
    $(this).val() // get the current value of the input field.
});




function addItem(button) {
		$(".cart_wrap").css("display","block");
		setTimeout(function(){ $("#shoppingCart").css("opacity","1"); }, 300);
		var parent = button.parentNode;
		console.log(button);
		var titleTag = parent.getElementsByClassName('item_name')[0] ;
		var priceTag = parent.getElementsByClassName('item_price')[0] ;
		var categoryTag = parent.getElementsByClassName('item_category')[0] ;
		var title = titleTag.innerHTML;
		var price = parseFloat(priceTag.innerHTML);
		var category = categoryTag.value;

	    //var item = new cartItem (title, price);
	    var item = cartArr.addItem(title,price,category);
	    if (localStorage.cart !== 'undefined') {
	    	//cartArr.push(item);
	 		updateLocalStorage();
	 		populateCart(item);

	 		
		}
		//$("#shoppingCart").css("display","block");
}

function populateCart(cart) {
	console.log(cart);
	if (document.getElementById("cartitem_"+cart.category) == null) {

		$('.item-container').append('<tr id="cartitem_'+cart.category+'"></tr>');
		$('#cartitem_'+cart.category).append('<td class="item_cart_title">'+cart.title+'</td>');
		$('#cartitem_'+cart.category).append('<td class="item_cart_price">'+cart.price+' &#x20bd;'+'</td>');
		//$('#cartitem_'+cart.category).append('<td class="item_cart_quantity">'+cart.quantity+'</td>');
		icon = '<i class="fa fa-trash" aria-hidden="true"></i>';
		$('#cartitem_'+cart.category).append('<td class="item_cart_quantity"><input type="number" min="1" class="item_cart_quantity_input" onkeyup="cartArr.itemQuantity(cartArr.getItemById('+cart.id+'),this.value);updateLocalStorage();" onclick="cartArr.itemQuantity(cartArr.getItemById('+cart.id+'),this.value);updateLocalStorage();" value="'+cart.quantity+'"></td>');
		$('#cartitem_'+cart.category).append('<td class="item_cart_delete"><button type="button" class="btn btn-danger" onclick="cartArr.removeItem('+cart.id+');$(\'#cartitem_'+cart.category+'\').remove();updateLocalStorage();">'+icon+'</button></td>');
		total();
	}
	else
	{
		total();
		document.getElementById("cartitem_"+cart.category).getElementsByClassName("item_cart_quantity_input")[0].value = cart.quantity;
		
		
	}


}



function total() {
	$('#cart-total').text(cartArr.TOTAL+" ₽");
}

function updateLocalStorage()
{
	total();
	localStorage.setItem ('cart', cartArr.localStorageCart());
	
}


// function cartItem(title,price)
// {
// 	this.title = title;
// 	this.price = price;
// 	this.toString = function(){
// 		return JSON.stringify(this);
// 	}
// }
function Cart()
{
	this.cartItems = [];
	this.DEFAULT_ITEM_TITLE = "Bijans sex toy";
	this.DEFAULT_PRICE = 99.99;
	this.DEFAULT_CATEGORY = undefined;
	this.TOTAL = 0;

	this.generateTotal = function() {
		this.TOTAL = 0;
		for (var i = this.cartItems.length - 1; i >= 0; i--) {
			this.TOTAL += this.cartItems[i].price * this.cartItems[i].quantity;
		}

	}
	this.getItemById = function(id)
	{
		var index = this.cartItems.length;
		var searching = true;
		while(searching&&index--)
		{
			if(this.cartItems[index].id == id)
			{
				searching = false;
			}
		}
		if(index>-1)
		{
			return this.cartItems[index];
		}
		else
		{
			return null;
		}
	}



	this.getItemByCategory = function(category)
	{
		var index = this.cartItems.length;
		var searching = true;
		while(searching&&index--)
		{
			if(this.cartItems[index].category == category)
			{
				searching = false;
			}
		}
		if(index>-1)
		{
			return this.cartItems[index];
		}
		else
		{
			return null;
		}
	}


	this.itemIndex = function(item)
	{
		var index = this.cartItems.length;
		while(index--)
		{
			if(this.cartItems[index] == item)
			{
				return index;
			}
		}
		return -1;
	}
	this.removeItem = function(item)
	{
		
		
		if(!(item instanceof CartItem))
		{

			item = this.getItemById(item);
			this.TOTAL -= item.price * item.quantity;
			if(item == null)
			{
				return undefined;
			}
		}
		if (this.cartItems.length == 1) {
			$("#shoppingCart").css("opacity","0");
			setTimeout(function(){ $(".cart_wrap").css("display","none");}, 400);
		}
		var itemIndex = this.cartItems.indexOf(item);
		if(itemIndex>-1)
		{
			console.log("this kek "+this.cartItems.length)
			return this.cartItems.splice(itemIndex,1);
		}
		
	}
	this.itemQuantity = function(item,quantity) {
		console.log(item,parseInt(quantity));
		current = item.getQuantity();
		console.log('current - '+current)
		if (current>quantity)
			this.TOTAL -= item.price
		if (current<quantity)
			this.TOTAL += item.price
		item.changeQuantity(parseInt(quantity)-current);
	}
	this.addItem = function(title,price,category)
	{
		this.TOTAL += price;
		var cartItem = this.getItemByCategory(category);
		if (cartItem == null) {
			this.cartItems.push(cartItem = new CartItem(this, {title: title, price: price,category:category}));
			return cartItem;
		}
		else {
			cartItem.changeQuantity(1);
			return cartItem;
		}

	}
	this.toString = function(){
 		var i = -1,ii=this.cartItems.length;
 		while(++i<ii)
 		{
 			delete this.cartItems[i].cart;
 		}
 		var r = JSON.stringify(this);
 		i=-1;
 		while(++i<ii)
 		{
 			this.cartItem[i].cart = this;
 		}
 		return r;

 	}
 	this.localStorageCart = function(){
 		var i = -1,ii=this.cartItems.length;
 		while(++i<ii)
 		{
 			delete this.cartItems[i].cart;
 		}
 		console.log(this.cartItems)
 		var r = JSON.stringify(this.cartItems);
 		i=-1;
 		while(++i<ii)
 		{
 			this.cartItems[i].cart = this;
 		}
 		return r;
 	}
 	this.generateId = function()
 	{
 		var id = (new Date).getTime();
 		while(this.getItemById(id)!==null)
 		{
 			id++
 		}
 		return id;
 	}

	if(arguments.length>0&&arguments[0] instanceof Array)
	{
		var i = -1,ii=arguments[0].length;
		while(++i<ii)
		{
			if(typeof(arguments[0][i])=="object"){
				var newCartItem = new CartItem(this,arguments[0][i]);
				console.log(123,arguments[0][i])
				if(newCartItem)
				{
					this.cartItems.push(newCartItem);
				}
			}
		}
	}
}

function CartItem(cart)
{
	this.toString = function(){
 		return JSON.stringify(this);
 	}
 	this.getQuantity = function() {
 		return this.quantity;
 	}
 	console.log('args  '+arguments)
 	if(arguments.length<1)
 	{
 		return false;
 	}
 	this.changeQuantity = function(quantity) {
 		this.quantity +=quantity;
 		if (this.quantity<=0) {
 			
 			this.cart.removeItem(this);
 			return 0;
 		}
 		return this.quantity;
 	}

 	this.cart = cart;
	if(arguments.length<2)
	{
		this.title = cart.DEFAULT_ITEM_TITLE;
		this.price = cart.DEFAULT_PRICE;
		console.log(5)
	}
	else if(arguments.length==2)
	{
		if(typeof(arguments[1])=="object")
		{
			this.title = arguments[1].title || cart.DEFAULT_TITLE_ITEM;
			this.price = typeof(arguments[1].price) == "number" && arguments[1].price>=0 ? arguments[1].price : cart.DEFAULT_PRICE;
			console.log(this.cart);
			this.id = typeof(arguments[1].id) == "number" ? arguments[1].id : this.cart.generateId();
			this.category = typeof(arguments[1].category) == "string" ? arguments[1].category : cart.DEFAULT_CATEGORY;
		//	this.price = arguments[1].price || cart.DEFAULT_PRICE;

			this.quantity = typeof(arguments[1].quantity) == "number" && arguments[1].quantity>0 ? arguments[1].quantity : 1;

			console.log(arguments.price)
			console.log('yes')
		}
		else if(typeof(arguments[1])=="string")
		{
			this.title = arguments[1];
			this.price = cart.DEFAULT_PRICE;
			console.log(2)
		}
		else
		{
			this.title = cart.DEFAULT_ITEM_TITLE;
			this.price = cart.DEFAULT_PRICE;
			console.log(3,this.title)
		}
	}else{
		this.price = typeof(arguments[2])!="undefined"&&!isNaN(arguments[2])&&arguments[2]>=0?arguments[2]:cart.DEFAULT_PRICE;
		this.title = typeof(arguments[1])=="string"?arguments[1]:cart.DEFAULT_ITEM_TITLE;
		console.log('biatch '+typeof(arguments[2]));

	}
}