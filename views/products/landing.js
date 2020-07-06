const layout = require('../layout');

module.exports = () => {
	return layout({
		content: `
            <section class="banner">
                <h3 class="text-bold-small">FREE SHIPPING ON ALL ORDERS</h3>
            </section>

            

            <hr>

            <section class="blank"></section>

            <hr>

            <section id="about">
                <h1>WHO WE ARE</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus netus auctor tempus etiam purus bibendum mauris quam.</p>
                <button class="btn-outline-tr">JOIN THE MAILING LIST</button>
            </section>

        `
	});
};
