$(function() {
    var i = -1,ii=cartArr.cartItems.length;
    while (++i<ii) {
    	$('.item-container').append('<div id="item_cart_title">'+cartArr.cartItems[i].title+'</div>');
	 	$('.item-container').append('<div id="item_cart_price">'+cartArr.cartItems[i].price+'</div>');
    }
});



var cartArr;
if (localStorage.cart !== 'undefined' && localStorage.cart != ""){
	cartArr = new cart(JSON.parse(localStorage.cart));
}
else
{
	cartArr = new cart();
}

function addItem (title, price) {

	    //var item = new cartItem (title, price);
	    var item = cartArr.addItem(title,price);
	    if (localStorage.cart !== 'undefined') {
	    	//cartArr.push(item);
	 		localStorage.setItem ('cart', cartArr.localStorageCart());
	 		$('.item-container').append('<div id="item_cart_title">'+item.title+'</div>');
	 		$('.item-container').append('<div id="item_cart_price">'+item.price+'</div>');
		}

}

// function cartItem(title,price)
// {
// 	this.title = title;
// 	this.price = price;
// 	this.toString = function(){
// 		return JSON.stringify(this);
// 	}
// }
function cart()
{
	this.cartItems = [];
	this.DEFAULT_ITEM_TITLE = "Bijans sex toy";
	this.DEFAULT_PRICE = 99.99;
	console.log(arguments);
	if(arguments.length>0&&arguments[0] instanceof Array)
	{
		var i = -1,ii=arguments[0].length;
		while(++i<ii)
		{
			if(typeof(arguments[0][i])=="object"){
				var newCartItem = new cartItem(this,arguments[0][i]);
				console.log(123,arguments[0][i])
				if(newCartItem)
				{
					this.cartItems.push(newCartItem);
				}
			}
		}
	}

	this.addItem = function(title,price)
	{
		if(typeof(price)=="undefined")
		{
			price = this.DEFAULT_PRICE;
		}
		this.cartItems.push(new cartItem(this, title, price));
		return {title:title,price:price};
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
}

function cartItem(cart)
{
	this.toString = function(){
 		return JSON.stringify(this);
 	}
 	if(arguments.length<1)
 	{
 		return false;
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
			this.price = (arguments[1].price && !isNaN(arguments.price) && arguments.price>=0 )|| cart.DEFAULT_PRICE;
			console.log(1)
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

	}
}



//thingy = new cartItem("Bijan's sex toy",1000);


//emptyArrayCanBeAnyNameHere = [new cartItem("Bijan's Breakfast",3)];
