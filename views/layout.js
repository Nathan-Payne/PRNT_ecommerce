module.exports = ({ content }) => {
	return `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PRNT Store</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" rel="stylesheet">
    <link href="/css/main.css" rel="stylesheet">
</head>

<body>
    <main>
        <header>
            <nav class="navbar">

                <div class="ham-container">
                    <input type="checkbox" id="nav-toggle">
                    <label for="nav-toggle" class="hamburger-menu">
                        <div class="menu-lines">
                            <div class="line"></div>
                            <div class="line"></div>
                            <div class="line"></div>
                        </div>
                    </label>
                    <ul class="nav-items">
                        <li class="nav-item"><a href="/products">products</a></li>
                        <li class="nav-item"><a href="/">contact us</a></li>
                        <li class="nav-item"><a href="/cart">cart</a></li>
                        <li class="nav-item"><a href="/products">nature</a></li>
                        <li class="nav-item"><a href="/products">minimal</a></li>
                        <li class="nav-item"><a href="/products">architectural</a></li>
                        <li class="nav-item"><a href="/"><span>SALE ITEMS</span></a></li>
                        <li class="nav-item"><a href="/"><span>NEW</span></a></li>
                    </ul>
                </div>

                <div class="logo-container">
                    <a href="/">
                        <h2 class="logo">PRNT</h2>
                    </a>
                </div>

                <div class="cart-icon">
                    <a href="/cart"><i class="fa fa-shopping-cart"></i></a>
                </div>

            </nav>
        </header>
        
        <hr>

        ${content}
        
        <hr>
    </main>
</body>

</html>
  `;
};
