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

    <section>
        ${content}
    </section>

    <hr>

    <section id="about">
        <h1>WHO WE ARE</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus netus auctor tempus etiam purus bibendum mauris quam.</p>
        <button class="btn-outline-tr">JOIN THE MAILING LIST</button>
    </section>

    <hr>

    <footer id="contact">
        <div>
            <ul class="contact-info">
                <li>
                    <a href=""><i class="fa fa-phone"></i>+1 555 987 6543</a>
                </li>
                <li>
                    <a href=""><i class="fa fa-envelope"></i> shop@myshop.com</a>
                </li>
            </ul>
        </div>
        <div>
            <ul class="social">
                <li><a href=""><i class="fab fa-facebook"></i></a></li>
                <li><a href=""><i class="fab fa-twitter"></i></a></li>
                <li><a href=""><i class="fab fa-linkedin"></i></a></li>
                <li><a href=""><i class="fab fa-instagram"></i></a></li>
            </ul>
        </div>
    </footer>
    <hr>
</body>

</html>
  `;
};
