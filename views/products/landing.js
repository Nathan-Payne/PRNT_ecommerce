const layout = require('../layout');

module.exports = () => {
	return layout({
		content: `
            <section class="banner">
                <h3 class="text-bold-small">FREE SHIPPING ON ALL ORDERS</h3>
            </section>

            <hr>

            <section id="feature-section">
                <div class="feature-image">
                    <img src="/images/home_feature_img.jpg" alt="Feature Image">
                </div>
                <div class="feature-title">
                    <h1 class="hero-text">CATALOG</h1>
                    <h1 class="hero-text">2020</h1>
                </div>
                <a href="/products">
                    <button class="btn-outline-tr feature-button">EXPLORE</button>
                </a>
            </section>

            <hr>

            <section class="blank"></section>

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
        `
	});
};
