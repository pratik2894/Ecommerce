import React, { useState, useEffect } from 'react';

const Home = ({ posts }) => {
  const [itemsAdded, setItemsAdded] = useState([]);

  useEffect(() => {
    // OPEN & CLOSE CART
    // OPEN & CLOSE CART
    const cartIcon = document.querySelector("#cart-icon");
    const cart = document.querySelector(".cart");
    const closeCart = document.querySelector("#cart-close");
    
    cartIcon.addEventListener("click", () => {
      cart.classList.add("active");
    });
    
    closeCart.addEventListener("click", () => {
      cart.classList.remove("active");
    });
    
    // Start when the document is ready
    if (document.readyState == "loading") {
      document.addEventListener("DOMContentLoaded", start);
    } else {
      start();
    }
    
    // =============== START ====================
    function start() {
      addEvents();
    }
    
    // ============= UPDATE & RERENDER ===========
    function update() {
      addEvents();
      updateTotal();
    }
    
    // =============== ADD EVENTS ===============
    function addEvents() {
      // Remove items from cart
      let cartRemove_btns = document.querySelectorAll(".cart-remove");
      console.log(cartRemove_btns);
      cartRemove_btns.forEach((btn) => {
        btn.addEventListener("click", handle_removeCartItem);
      });
    
      // Change item quantity
      let cartQuantity_inputs = document.querySelectorAll(".cart-quantity");
      cartQuantity_inputs.forEach((input) => {
        input.addEventListener("change", handle_changeItemQuantity);
      });
    
      // Add item to cart
      let addCart_btns = document.querySelectorAll(".add-cart");
      addCart_btns.forEach((btn) => {
        btn.addEventListener("click", handle_addCartItem);
      });
    
      // Buy Order
      const buy_btn = document.querySelector(".btn-buy");
      buy_btn.addEventListener("click", handle_buyOrder);
    }
    
    // ============= HANDLE EVENTS FUNCTIONS =============
    let itemsAdded = [];
    
    function handle_addCartItem() {
      let product = this.parentElement;
      let title = product.querySelector(".product-title").innerHTML;
      let price = product.querySelector(".product-price").innerHTML;
      let imgSrc = product.querySelector(".product-img").src;
      console.log(title, price, imgSrc);
    
      let newToAdd = {
        title,
        price,
        imgSrc,
      };
    
      // handle item is already exist
      if (itemsAdded.find((el) => el.title == newToAdd.title)) {
        alert("This Item Is Already Exist!");
        return;
      } else {
        itemsAdded.push(newToAdd);
      }
    
      // Add product to cart
      let cartBoxElement = CartBoxComponent(title, price, imgSrc);
      let newNode = document.createElement("div");
      newNode.innerHTML = cartBoxElement;
      const cartContent = cart.querySelector(".cart-content");
      cartContent.appendChild(newNode);
    
      update();
    }
    
    function handle_removeCartItem() {
      this.parentElement.remove();
      itemsAdded = itemsAdded.filter(
        (el) =>
          el.title !=
          this.parentElement.querySelector(".cart-product-title").innerHTML
      );
    
      update();
    }
    
    function handle_changeItemQuantity() {
      if (isNaN(this.value) || this.value < 1) {
        this.value = 1;
      }
      this.value = Math.floor(this.value); // to keep it integer
    
      update();
    }
    
    function handle_buyOrder() {
      if (itemsAdded.length <= 0) {
        alert("There is No Order to Place Yet! \nPlease Make an Order first.");
        return;
      }
      const cartContent = cart.querySelector(".cart-content");
      cartContent.innerHTML = "";
      alert("Your Order is Placed Successfully :)");
      itemsAdded = [];
    
      update();
    }
    
    // =========== UPDATE & RERENDER FUNCTIONS =========
    function updateTotal() {
      let cartBoxes = document.querySelectorAll(".cart-box");
      const totalElement = cart.querySelector(".total-price");
      let total = 0;
      cartBoxes.forEach((cartBox) => {
        let priceElement = cartBox.querySelector(".cart-price");
        let price = parseFloat(priceElement.innerHTML.replace("$", ""));
        let quantity = cartBox.querySelector(".cart-quantity").value;
        total += price * quantity;
      });
    
      // keep 2 digits after the decimal point
      total = total.toFixed(2);
      // or you can use also
      // total = Math.round(total * 100) / 100;
    
      totalElement.innerHTML = "$" + total;
    }
    
    // ============= HTML COMPONENTS =============
    function CartBoxComponent(title, price, imgSrc) {
      return `
        <div class="cart-box">
            <img src=${imgSrc} alt="" class="cart-img">
            <div class="detail-box">
                <div class="cart-product-title">${title}</div>
                <div class="cart-price">${price}</div>
                <input type="number" value="1" class="cart-quantity">
            </div>
            <!-- REMOVE CART  -->
            <i class='bx bxs-trash-alt cart-remove'></i>
        </div>`;
    }

}, []);

  // Rest of your functions and JSX

  return (
    <div>
              <div>
            <header>
        
        <div class="nav container">
            <a href="#" class="logo"><span>E</span>Commerce</a>
           
            <i class='bx bx-shopping-bag' id="cart-icon"></i>

            
            <div class="cart">
                <h2 class="cart-title">Your Cart</h2>

            
                <div class="cart-content">


                </div>

            
                <div class="total">
                    <div class="total-title">Total</div>
                    <div class="total-price">$0</div>
                </div>
                
                <button type="button" class="btn-buy">Buy Now</button>
               
                <i class='bx bx-x' id="cart-close"></i>
            </div>
        </div>
    </header>


    <section class="shop container">
        <h2 class="section-title">Shop Products</h2>
        <div class="shop-content">
        {posts.map((post, index) => (
            <div class="product-box">
                <img src={post.productImage} alt="" class="product-img"></img>
                <h2 class="product-title">{post.productname}</h2>
                <span class="product-price">${post.Price}</span>
                <i class='bx bx-shopping-bag add-cart'></i>
            </div>
           ))}
        
        </div>
    </section>
<br></br>
<br></br>
<footer class="site-footer">
<div class="container">
<div class="row">
<div class="col-sm-12 col-md-6">
<h6>About</h6>
<p class="text-justify">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
</div>
<div class="col-6 col-md-3">
<h6>Quick Links</h6>
<ul class="footer-links">
<li><a href="#">About Us</a></li>
<li><a href="#">Contact Us</a></li>
<li><a href="#">Contribute</a></li>
</ul>
</div>
</div>
<hr class="small"></hr>
</div>
<div class="container">
<div class="row">
<div class="col-md-8 col-sm-6 col-12">
<p class="copyright-text">Copyright © 2020 All Rights Reserved by
<a href="#"><span class="logo">Pratik.</span></a>
</p>
</div>

</div>
</div>
</footer>
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
 
      </div>
    </div>
  );
};

export default Home;
