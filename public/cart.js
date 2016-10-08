
var cartArr;
if (typeof(localStorage.cart) !== 'undefined' && localStorage.cart != ""){
	cartArr = new Cart(JSON.parse(localStorage.cart));
}
else
{
	cartArr = new Cart();
	localStorage.cart = '';
}


$(function() {
    var i = -1,ii=cartArr.cartItems.length;
    while (++i<ii) {
    //	$('.item-container').append('<tr id="cartitem_'+cartArr.cartItems[i].id+'"></tr>');
    //	$('#cartitem_'+cartArr.cartItems[i].id).append('<td id="item_cart_title">'+cartArr.cartItems[i].title+'</td>');
	// 	$('#cartitem_'+cartArr.cartItems[i].id).append('<td id="item_cart_price">'+cartArr.cartItems[i].price+'</td>');
	// 	$('#cartitem_'+cartArr.cartItems[i].id).append('<td id="item_cart_delete"><button onclick="cartArr.removeItem('+cartArr.cartItems[i].id+');$(\'#cartitem_'+cartArr.cartItems[i].id+'\').remove();updateLocalStorage();">Delete</button></td>');
	populateCart(cartArr.cartItems[i]);
    }
});




function addItem(button) {
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

}

function populateCart(cart) {
	console.log(cart);
	if (document.getElementById("cartitem_"+cart.category) == null) {

		$('.item-container').append('<tr id="cartitem_'+cart.category+'"></tr>');
		$('#cartitem_'+cart.category).append('<td class="item_cart_title">'+cart.title+'</td>');
		$('#cartitem_'+cart.category).append('<td class="item_cart_price">'+cart.price+'</td>');
		//$('#cartitem_'+cart.category).append('<td class="item_cart_quantity">'+cart.quantity+'</td>');
		$('#cartitem_'+cart.category).append('<td class="item_cart_quantity"><input type="number" class="item_cart_quantity_input" onchange="cartArr.itemQuantity(cartArr.getItemById('+cart.id+'),this.value)" value="'+cart.quantity+'"></td>');
		$('#cartitem_'+cart.category).append('<td class="item_cart_delete"><button onclick="cartArr.removeItem('+cart.id+');\
		$(\'#cartitem_'+cart.category+'\').remove();updateLocalStorage();">Delete</button></td>');

	}
	else
	{
		document.getElementById("cartitem_"+cart.category).getElementsByClassName("item_cart_quantity_input")[0].value = cart.quantity;
	}


}

function updateLocalStorage()
{
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
			if(item == null)
			{
				return undefined;
			}
		}

		var itemIndex = this.cartItems.indexOf(item);
		if(itemIndex>-1)
		{
			return this.cartItems.splice(itemIndex,1);
		}
	}
	this.itemQuantity = function(item,quantity) {
		console.log(item,quantity);
	}
	this.addItem = function(title,price,category)
	{
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
 	console.log('args  '+arguments)
 	if(arguments.length<1)
 	{
 		return false;
 	}
 	this.changeQuantity = function(quantity) {
 		this.quantity +=quantity;
 		if (this.quantity<=0) {
 			
 			this.cart.removeItem(this);s
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