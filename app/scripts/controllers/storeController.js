function storeController($scope, $routeParams, DataService) {
//pagination
  $scope.currentPage = 0;
  $scope.itemsPerPage = 8;
  $scope.products= info.product;

  for (var i = 0; i < $scope.products.length; i++) {
        if (i % $scope.itemsPerPage === 0) {
            $scope.products[Math.floor(i / $scope.itemsPerPage)] = [ $scope.products[i] ];
        } else {
            $scope.products[Math.floor(i / $scope.itemsPerPage)].push($scope.products[i]);
        }
    }
  $scope.range = function (start, end) {
      var ret = [];
      if (!end) {
          end = start;
          start = 0;
      }
      for (var i = start; i < end/$scope.itemsPerPage; i++) {
          ret.push(i);
      }
      return ret;
  };

  $scope.prevPage = function () {
      if ($scope.currentPage > 0) {
          $scope.currentPage--;
      }
  };

$scope.nextPage = function () {
    if ($scope.currentPage < $scope.products.length/$scope.itemsPerPage- 1) {
        $scope.currentPage++;
    }
};

$scope.setPage = function () {
    $scope.currentPage = this.n;
}
    // get store and cart from service
    $scope.store = DataService.store;
    $scope.cart = DataService.cart;

    // use routing to pick the selected product
    if ($routeParams.productimage != null) {
        $scope.product = $scope.store.getProduct($routeParams.productimage);
    }
}

//products from info.js
function store() {
    this.products = info.product
  }
store.prototype.getProduct = function (image) {
    for (var i = 0; i < this.products.length; i++) {
        if (this.products[i].image == image)
            return this.products[i];
    }
    return null;
}


function product(image, name, description, price,discount) {
    this.image = image;
    this.name = name;
    this.description = description;
    this.price = price;
    this.discount = discount;
    }

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
                    if (item.image != null && item.name != null && item.price != null && item.quantity != null) {
                        item = new cartItem(item.image, item.name, item.price, item.quantity);
                        this.items.push(item);
                    }
                }
            }
            catch (err) {
                // ignore errors while loading...
            }
        }
    }

    // save items to local storage
    shoppingCart.prototype.saveItems = function () {
        if (localStorage != null && JSON != null) {
            localStorage[this.cartName + "_items"] = JSON.stringify(this.items);
        }
    }

    // adds an item to the cart
    shoppingCart.prototype.addItem = function (image, name, price,quantity) {
        quantity = this.toNumber(quantity);
        if (quantity != 0) {

            // update quantity for existing item
            var found = false;
            for (var i = 0; i < this.items.length && !found; i++) {
                var item = this.items[i];
                if (item.image == image) {
                    found = true;
                    item.quantity = this.toNumber(item.quantity + quantity);
                    if (item.quantity <= 0) {
                        this.items.splice(i, 1);
                    }
                }
            }

            // new item, add now
            if (!found) {
                var item = new cartItem(image, name, price,quantity);
                this.items.push(item);
            }

            // save changes
            this.saveItems();
        }
    }

    // get the total price for all items currently in the cart
    shoppingCart.prototype.getTotalPrice = function (image) {
        var total = 0;
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            if (image == null || item.image == image) {
                total += this.toNumber(item.quantity * item.price);
            }
        }
        return total;
    }

    // get the total price for all items currently in the cart
    shoppingCart.prototype.getTotalCount = function (image) {
        var count = 0;
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            if (image == null || item.image == image) {
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

    // define checkout parameters
  /*  shoppingCart.prototype.addCheckoutParameters = function (serviceName, merchantID, options) {

        // check parameters
        if (serviceName != "PayPal" && serviceName != "Google") {
            throw "serviceName must be 'PayPal' or 'Google'.";
        }
        if (merchantID == null) {
            throw "A merchantID is required in order to checkout.";
        }

        // save parameters
        this.checkoutParameters[serviceName] = new checkoutParameters(serviceName, merchantID, options);
    }

    // check out
    shoppingCart.prototype.checkout = function (serviceName, clearCart) {

        // select serviceName if we have to
        if (serviceName == null) {
            var p = this.checkoutParameters[Object.keys(this.checkoutParameters)[0]];
            serviceName = p.serviceName;
        }

        // sanity
        if (serviceName == null) {
            throw "Use the 'addCheckoutParameters' method to define at least one checkout service.";
        }

        // go to work
        var parms = this.checkoutParameters[serviceName];
        if (parms == null) {
            throw "Cannot get checkout parameters for '" + serviceName + "'.";
        }
        switch (parms.serviceName) {
            case "PayPal":
                this.checkoutPayPal(parms, clearCart);
                break;
            case "Google":
                this.checkoutGoogle(parms, clearCart);
                break;
            default:
                throw "Unknown checkout service: " + parms.serviceName;
        }
    }

    // check out using PayPal
    // for details see:
    // www.paypal.com/cgi-bin/webscr?cmd=p/pdn/howto_checkout-outside
    shoppingCart.prototype.checkoutPayPal = function (parms, clearCart) {

        // global data
        var data = {
            cmd: "_cart",
            business: parms.merchantID,
            upload: "1",
            rm: "2",
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
        form.attr("action", "https://www.paypal.com/cgi-bin/webscr");
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

    // check out using Google Wallet
    // for details see:
    // developers.google.com/checkout/developer/Google_Checkout_Custom_Cart_How_To_HTML
    // developers.google.com/checkout/developer/interactive_demo
    shoppingCart.prototype.checkoutGoogle = function (parms, clearCart) {

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
            data["item_merchant_id_" + ctr] = parms.merchantID;
        }

        // build form
        var form = $('<form/></form>');
        // NOTE: in production projects, use the checkout.google url below;
        // for debugging/testing, use the sandbox.google url instead.
        //form.attr("action", "https://checkout.google.com/api/checkout/v2/merchantCheckoutForm/Merchant/" + parms.merchantID);
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
    }

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
    }*/
    shoppingCart.prototype.toNumber = function (value) {
        value = value * 1;
        return isNaN(value) ? 0 : value;
    }

    function cartItem(image, name, price, quantity) {
        this.image = image;
        this.name = name;
        this.price = price * 1;
        this.quantity = quantity * 1;
    }


    //----------------------------------------------------------------
    // checkout parameters (one per supported payment service)
    //
  /*  function checkoutParameters(serviceName, merchantID, options) {
        this.serviceName = serviceName;
        this.merchantID = merchantID;
        this.options = options;
    }*/

    //----------------------------------------------------------------
    // items in the cart
    //
