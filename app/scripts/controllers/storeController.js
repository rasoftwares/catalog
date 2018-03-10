app.controller('storeController', function($scope,$http,$filter,$routeParams,DataService){
//$scope.store = DataService.store;
  $scope.cart  = DataService.cart;
  $scope.pageTitle="catalogApp";
});



app.factory("DataService", function () {
    //var myStore = new store();
    var myCart = new shoppingCart();
    myCart.addCheckoutParameters("ccavenue", "168151");

    myCart.addCheckoutParameters("Google", "500640663394527",
        {
            ship_method_name_1: "UPS Next Day Air",
            ship_method_price_1: "20.00",
            ship_method_currency_1: "USD",
            ship_method_name_2: "UPS Ground",
            ship_method_price_2: "15.00",
            ship_method_currency_2: "USD"
        }
    );

    return {
        //store: myStore,
        cart: myCart
    };
});





//function store($scope,$http) {
//this.products = $scope.products;
//}





/*store.prototype.getProduct = function (image) {
    for (var i = 0; i <  $scope.products.length; i++) {
        if (  $scope.products[i].image == image)
            return $scope.products[i];
    }
    return null;

}*/


/*function product(id,image, name, description, price,discount) {
    this.id = id;
    this.image = image;
    this.name = name;
    this.description = description;
    this.price = price;
    this.discount = discount;
  }*/

    function shoppingCart(cartName) {
        this.cartName = cartName;
        this.clearCart = false;
        this.checkoutParameters = {};
        this.items = [];
        this.loadItems();


        var self = this;
        $(window).unload(function () {
            if (self.clearCart) {
                self.clearItems();
            }
            self.saveItems();
            self.clearCart = false;
        });
    }

    // load items from local storage
    shoppingCart.prototype.loadItems = function () {
        var items = localStorage != null ? localStorage[this.cartName + "_items"] : null;
        if (items != null && JSON != null) {
            try {
                var items = JSON.parse(items);
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    if (item.id != null && item.image != null && item.name != null && item.price != null && item.discout != null  && item.quantity != null) {
                        item = new cartItem(item.id,item.image, item.name,item.price,item.discount,item.quantity);
                        this.items.push(item);
                    }
                }
            }
            catch (err) {
              }
        }
    }

     shoppingCart.prototype.saveItems = function () {
        if (localStorage != null && JSON != null) {
            localStorage[this.cartName + "_items"] = JSON.stringify(this.items);
        }
    }

    // adds an item to the cart
    shoppingCart.prototype.addItem = function (id,image,name,price,discount,quantity) {
        quantity = this.toNumber(quantity);
        if (quantity != 0) {

            // update quantity for existing item
            var found = false;
            for (var i = 0; i < this.items.length && !found; i++) {
                var item = this.items[i];
                if (item.id == id) {
                    found = true;
                    item.quantity = this.toNumber(item.quantity + quantity);
                    if (item.quantity <= 0) {
                        this.items.splice(i,1);
                    }
                }
            }

            // new item, add now
            if (!found) {
                var item = new cartItem(id,image,name,price,discount,quantity);
                this.items.push(item);
            }

            // save changes
            this.saveItems();
        }
    }

    // get the total price for all items currently in the cart
    shoppingCart.prototype.getTotalPrice = function (id) {
        var total = 0;
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            if (id == null || item.id == id) {
                total += this.toNumber(item.quantity *item.price);
            }
        }
        return total;
    }

    // get the total price for all items currently in the cart
    shoppingCart.prototype.getTotalCount = function (id) {
        var count = 0;
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            if (id == null || item.id == id) {
                count += this.toNumber(item.quantity);
            }
        }
        return count;

    }

    // clear the cart
    shoppingCart.prototype.clearItems = function () {
        this.items = [];
        this.saveItems();
    }

    shoppingCart.prototype.toNumber = function (value) {
        value = value * 1;
        return isNaN(value) ? 0 : value;
    }

    function cartItem(id,image, name, price,discount,quantity) {
        this.id = id;
        this.image = image;
        this.name = name;
        this.price = (price-price*discount/100)* 1;
        this.discount= discount;
        this.quantity = quantity * 1;
    }

    // define checkout parameters
    shoppingCart.prototype.addCheckoutParameters = function (serviceName, merchantID, options) {

        // check parameters
        if (serviceName != "ccavenue" && serviceName != "Google") {
            throw "serviceName must be 'ccavenue' or 'Google'.";
        }
        if (merchantID == null) {
            throw "A merchantID is required in order to checkout.";
        }

        // save parameters
        this.checkoutParameters[serviceName] = new checkoutParameters(serviceName, merchantID, options);
    }

    // check out
      shoppingCart.prototype.checkout = function (serviceName, clearCart) {


        if (serviceName == null) {
            var p = this.checkoutParameters[Object.keys(this.checkoutParameters)[0]];
            serviceName = p.serviceName;
        }


        if (serviceName == null) {
            throw "Use the 'addCheckoutParameters' method to define at least one checkout service.";
        }

        // go to work
        var parms = this.checkoutParameters[serviceName];
        if (parms == null) {
            throw "Cannot get checkout parameters for '" + serviceName + "'.";
        }
        switch (parms.serviceName) {
            case "ccavenue":
                this.checkoutPayPal(parms, clearCart);
                break;
            case "Google":
                this.checkoutGoogle(parms, clearCart);
                break;
            default:
                throw "Unknown checkout service: " + parms.serviceName;
        }
    }


    // www.paypal.com/cgi-bin/webscr?cmd=p/pdn/howto_checkout-outside
    shoppingCart.prototype.checkoutPayPal = function (parms, clearCart) {

        // global data
        var data = {
            cmd: "_cart",
            business: parms.merchantID,
            upload: "1",
            Rs: "2",
            charset: "utf-8"
        };

        // item data
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            var ctr = i + 1;
            data["item_number_" + ctr] = item.image;
            data["item_name_" + ctr] = item.name;
            data["quantity_" + ctr] = item.quantity;
            data["amount_" + ctr] = item.price.toFixed(2);
        }

        // build form
        var form = $('<form/></form>');
        form.attr("action", " https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction");
        form.attr("method", "POST");
        form.attr("style", "display:none;");
        this.addFormFields(form, data);
        this.addFormFields(form, parms.options);
        $("body").append(form);

        // submit form
        this.clearCart = clearCart == null || clearCart;
        form.submit();
        form.remove();
    }


  /*shoppingCart.prototype.checkoutGoogle = function (parms, clearCart) {

        // global data
        var data = {};

        // item data
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            var ctr = i + 1;
            data["item_name_" + ctr] = item.image;
            data["item_description_" + ctr] = item.name;
            data["item_price_" + ctr] = item.price.toFixed(2);
            data["item_quantity_" + ctr] = item.quantity;
            data["item_discount_" + ctr] = item.discount;
            data["item_merchant_id_" + ctr] = parms.merchantID;
        }

        // build form
        var form = $('<form/></form>');

        form.attr("action", "https://sandbox.google.com/checkout/api/checkout/v2/checkoutForm/Merchant/" + parms.merchantID);
        form.attr("method", "POST");
        form.attr("style", "display:none;");
        this.addFormFields(form, data);
        this.addFormFields(form, parms.options);
        $("body").append(form);

        // submit form
        this.clearCart = clearCart == null || clearCart;
        form.submit();
        form.remove();
    }*/

    // utility methods
    shoppingCart.prototype.addFormFields = function (form, data) {
        if (data != null) {
            $.each(data, function (name, value) {
                if (value != null) {
                    var input = $("<input></input>").attr("type", "hidden").attr("name", name).val(value);
                    form.append(input);
                }
            });
        }
    }


    // checkout parameters (one per supported payment service)
   function checkoutParameters(serviceName, merchantID, options) {
        this.serviceName = serviceName;
        this.merchantID = merchantID;
        this.options = options;
    }
