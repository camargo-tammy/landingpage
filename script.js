/* =========================================
   PIZZARIA SCHUELTER
   JAVASCRIPT
========================================= */


/* =========================================
   CONFIGURAÇÕES
========================================= */


/*
    COLOQUE AQUI O NÚMERO DO WHATSAPP.

    Exemplo:

    5542999999999

    Sem:
    +
    espaços
    parênteses
    hífen
*/

const WHATSAPP =
    "COLOQUE_NUMERO_AQUI";



/* =========================================
   CARDÁPIO
========================================= */

const menu = {

    pizzas: [

        {
            name: "Calabresa Especial",
            description:
                "Mussarela, calabresa, cebola e orégano.",
            price: 42.90,
            icon: "🍕"
        },


        {
            name: "Frango com Catupiry",
            description:
                "Frango temperado, mussarela e catupiry.",
            price: 49.90,
            icon: "🍗"
        },


        {
            name: "Portuguesa",
            description:
                "Mussarela, presunto, ovo, cebola e orégano.",
            price: 47.90,
            icon: "🍕"
        },


        {
            name: "Mussarela",
            description:
                "Mussarela, tomate e orégano.",
            price: 39.90,
            icon: "🧀"
        },


        {
            name: "Bacon",
            description:
                "Mussarela, bacon crocante e orégano.",
            price: 46.90,
            icon: "🥓"
        },


        {
            name: "4 Queijos",
            description:
                "Uma combinação cremosa de queijos.",
            price: 49.90,
            icon: "🧀"
        }

    ],



    hamburgueres: [

        {
            name: "Schuelter Burger",
            description:
                "Hambúrguer artesanal, queijo, molho especial e salada.",
            price: 29.90,
            icon: "🍔"
        },


        {
            name: "X-Bacon",
            description:
                "Hambúrguer, queijo, bacon e molho especial.",
            price: 32.90,
            icon: "🥓"
        },


        {
            name: "X-Frango",
            description:
                "Frango, queijo, salada e molho especial.",
            price: 29.90,
            icon: "🍔"
        }

    ],



    bebidas: [

        {
            name: "Coca-Cola",
            description:
                "Refrigerante geladinho.",
            price: 8.00,
            icon: "🥤"
        },


        {
            name: "Guaraná",
            description:
                "Refrigerante geladinho.",
            price: 8.00,
            icon: "🥤"
        },


        {
            name: "Água",
            description:
                "Água mineral.",
            price: 4.00,
            icon: "💧"
        }

    ],



    sobremesas: [

        {
            name: "Brigadeiro",
            description:
                "Doce cremoso de chocolate.",
            price: 8.00,
            icon: "🍫"
        },


        {
            name: "Brownie",
            description:
                "Brownie de chocolate.",
            price: 12.00,
            icon: "🍫"
        },


        {
            name: "Sobremesa da Casa",
            description:
                "Consulte as opções disponíveis.",
            price: 10.00,
            icon: "🍰"
        }

    ]

};



/* =========================================
   CARRINHO
========================================= */

let cart = [];



/* =========================================
   ELEMENTOS
========================================= */

const menuGrid =
    document.getElementById("menuGrid");

const cartElement =
    document.getElementById("cart");

const overlay =
    document.getElementById("overlay");

const cartItems =
    document.getElementById("cartItems");

const cartTotal =
    document.getElementById("cartTotal");

const cartCount =
    document.getElementById("cartCount");



/* =========================================
   FORMATAÇÃO
========================================= */

function money(value) {

    return value.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}



/* =========================================
   RENDERIZAR CARDÁPIO
========================================= */

function renderMenu(category = "pizzas") {

    menuGrid.innerHTML = "";


    menu[category].forEach(
        (item, index) => {

            const card =
                document.createElement("article");


            card.className =
                "menu-item";


            card.innerHTML = `

                <div class="menu-icon">
                    ${item.icon}
                </div>


                <div class="menu-item-info">

                    <h3>
                        ${item.name}
                    </h3>


                    <p>
                        ${item.description}
                    </p>


                    <div class="menu-item-bottom">

                        <span class="menu-price">
                            ${money(item.price)}
                        </span>


                        <button
                            class="menu-add"
                            data-category="${category}"
                            data-index="${index}"
                        >
                            +
                        </button>

                    </div>

                </div>

            `;


            menuGrid.appendChild(card);

        }
    );

}



/* =========================================
   CATEGORIAS
========================================= */

document
    .querySelectorAll(".category")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".category")
                    .forEach(btn => {

                        btn.classList.remove(
                            "active"
                        );

                    });


                button.classList.add(
                    "active"
                );


                renderMenu(
                    button.dataset.category
                );

            }
        );

    });



/* =========================================
   ADICIONAR PRODUTO
========================================= */

document.addEventListener(
    "click",
    event => {

        if (
            !event.target.classList.contains(
                "menu-add"
            )
        ) {
            return;
        }


        const category =
            event.target.dataset.category;


        const index =
            Number(
                event.target.dataset.index
            );


        addToCart(
            menu[category][index]
        );

    }
);



/* =========================================
   BOTÕES DOS DESTAQUES
========================================= */

document
    .querySelectorAll(".add-button")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                addToCart({

                    name:
                        button.dataset.name,

                    price:
                        Number(
                            button.dataset.price
                        ),

                    icon:
                        "🍕"

                });

            }
        );

    });



/* =========================================
   ADICIONAR AO CARRINHO
========================================= */

function addToCart(item) {

    const existing =
        cart.find(
            product =>
                product.name === item.name
        );


    if (existing) {

        existing.quantity++;

    }

    else {

        cart.push({

            ...item,

            quantity: 1

        });

    }


    updateCart();

    openCart();


    /* pequena animação */

    const button =
        document.getElementById(
            "floatingCart"
        );


    button.animate(
        [
            {
                transform:
                    "scale(1)"
            },

            {
                transform:
                    "scale(1.25)"
            },

            {
                transform:
                    "scale(1)"
            }
        ],
        {
            duration: 350
        }
    );

}



/* =========================================
   ATUALIZAR CARRINHO
========================================= */

function updateCart() {

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <div>
                    🍕
                </div>

                <p>
                    Seu carrinho está vazio.
                </p>

                <small>
                    Adicione uma pizza deliciosa!
                </small>

            </div>

        `;

    }

    else {

        cartItems.innerHTML = "";


        cart.forEach(
            (item, index) => {

                const element =
                    document.createElement(
                        "div"
                    );


                element.className =
                    "cart-item";


                element.innerHTML = `

                    <div class="menu-icon">
                        ${item.icon}
                    </div>


                    <div class="cart-item-info">

                        <strong>
                            ${item.name}
                        </strong>


                        <div class="cart-item-price">

                            ${money(
                                item.price *
                                item.quantity
                            )}

                        </div>

                    </div>


                    <div class="quantity">

                        <button
                            onclick="changeQuantity(${index}, -1)"
                        >
                            −
                        </button>


                        <strong>
                            ${item.quantity}
                        </strong>


                        <button
                            onclick="changeQuantity(${index}, 1)"
                        >
                            +
                        </button>

                    </div>

                `;


                cartItems.appendChild(
                    element
                );

            }
        );

    }



    const total =
        cart.reduce(
            (sum, item) =>
                sum +
                item.price *
                item.quantity,
            0
        );


    const quantity =
        cart.reduce(
            (sum, item) =>
                sum +
                item.quantity,
            0
        );


    cartTotal.textContent =
        money(total);


    cartCount.textContent =
        quantity;

}



/* =========================================
   ALTERAR QUANTIDADE
========================================= */

function changeQuantity(
    index,
    amount
) {

    cart[index].quantity +=
        amount;


    if (
        cart[index].quantity <= 0
    ) {

        cart.splice(
            index,
            1
        );

    }


    updateCart();

}



/* =========================================
   ABRIR CARRINHO
========================================= */

function openCart() {

    cartElement.classList.add(
        "open"
    );


    overlay.classList.add(
        "active"
    );


    document.body.style.overflow =
        "hidden";

}



/* =========================================
   FECHAR CARRINHO
========================================= */

function closeCart() {

    cartElement.classList.remove(
        "open"
    );


    overlay.classList.remove(
        "active"
    );


    document.body.style.overflow =
        "";

}



document
    .getElementById("floatingCart")
    .addEventListener(
        "click",
        openCart
    );


document
    .getElementById("closeCart")
    .addEventListener(
        "click",
        closeCart
    );


overlay.addEventListener(
    "click",
    closeCart
);



/* =========================================
   WHATSAPP
========================================= */

document
    .getElementById("checkoutButton")
    .addEventListener(
        "click",
        () => {

            if (cart.length === 0) {

                alert(
                    "Seu carrinho está vazio! 🍕"
                );

                return;

            }


            if (
                WHATSAPP ===
                "COLOQUE_NUMERO_AQUI"
            ) {

                alert(
                    "Configure o número do WhatsApp no arquivo script.js."
                );

                return;

            }



            let message =
                "🍕 *NOVO PEDIDO - PIZZARIA SCHUELTER*%0A%0A";


            cart.forEach(item => {

                message +=
                    `• ${item.quantity}x ${item.name} - ${money(item.price * item.quantity)}%0A`;

            });


            const total =
                cart.reduce(
                    (sum, item) =>
                        sum +
                        item.price *
                        item.quantity,
                    0
                );


            message +=
                `%0A💰 *TOTAL: ${money(total)}*`;


            message +=
                "%0A%0A📍 Manoel Ribas - PR";


            const url =
                `https://wa.me/${WHATSAPP}?text=${message}`;


            window.open(
                url,
                "_blank"
            );

        }
    );



/* =========================================
   MENU MOBILE
========================================= */

const menuButton =
    document.getElementById(
        "menuButton"
    );


const mobileMenu =
    document.getElementById(
        "mobileMenu"
    );


menuButton.addEventListener(
    "click",
    () => {

        mobileMenu.classList.toggle(
            "open"
        );

    }
);



/* Fecha menu ao clicar */

document
    .querySelectorAll(
        ".mobile-menu a"
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                mobileMenu.classList.remove(
                    "open"
                );

            }
        );

    });



/* =========================================
   ANIMAÇÕES AO ROLAR
========================================= */

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";

                    }

                }
            );

        },
        {
            threshold: .1
        }
    );



document
    .querySelectorAll(
        ".featured-card, .menu-item, .about-content, .hours-card"
    )
    .forEach(element => {

        element.style.opacity =
            "0";


        element.style.transform =
            "translateY(25px)";


        element.style.transition =
            "opacity .7s ease, transform .7s ease";


        observer.observe(
            element
        );

    });



/* =========================================
   INICIAR
========================================= */

renderMenu("pizzas");

updateCart();
