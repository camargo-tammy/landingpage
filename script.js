/* =========================================
   PIZZARIA SCHUELTER
========================================= */


/* =========================================
   MENU MOBILE
========================================= */

const menuMobile =
    document.getElementById("menuMobile");

const menu =
    document.querySelector(".menu");


menuMobile.addEventListener("click", () => {

    menu.classList.toggle("open");

});


document
    .querySelectorAll(".menu a")
    .forEach(link => {

        link.addEventListener("click", () => {

            menu.classList.remove("open");

        });

    });


/* =========================================
   FILTRO CARDÁPIO
========================================= */

const categories =
    document.querySelectorAll(".category");

const products =
    document.querySelectorAll(".product");


categories.forEach(category => {

    category.addEventListener("click", () => {

        categories.forEach(item => {

            item.classList.remove("active");

        });


        category.classList.add("active");


        const selected =
            category.dataset.category;


        products.forEach(product => {

            if (
                selected === "todos" ||
                product.dataset.category === selected
            ) {

                product.style.display = "block";

            } else {

                product.style.display = "none";

            }

        });

    });

});


/* =========================================
   CARRINHO
========================================= */

let cart =
    JSON.parse(
        localStorage.getItem(
            "schuelterCart"
        )
    ) || [];


const cartButton =
    document.getElementById("cartButton");

const cartElement =
    document.getElementById("cart");

const closeCart =
    document.getElementById("closeCart");

const overlay =
    document.getElementById("overlay");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const cartTotal =
    document.getElementById("cartTotal");


/* ABRIR */

cartButton.addEventListener("click", () => {

    cartElement.classList.add("open");

    overlay.classList.add("active");

});


/* FECHAR */

function closeCartFunction() {

    cartElement.classList.remove("open");

    overlay.classList.remove("active");

}


closeCart.addEventListener(
    "click",
    closeCartFunction
);


overlay.addEventListener(
    "click",
    closeCartFunction
);


/* =========================================
   ADICIONAR AO CARRINHO
========================================= */

document
    .querySelectorAll(".add-cart")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const name =
                    button.dataset.name;

                const price =
                    Number(
                        button.dataset.price
                    );


                const existing =
                    cart.find(
                        item =>
                            item.name === name
                    );


                if (existing) {

                    existing.quantity++;

                } else {

                    cart.push({

                        name: name,

                        price: price,

                        quantity: 1

                    });

                }


                saveCart();

                renderCart();

                showToast(
                    `${name} adicionada ao carrinho 🍕`
                );

            }
        );

    });


/* =========================================
   RENDER CARRINHO
========================================= */

function renderCart() {

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty">

                <span>
                    🍕
                </span>

                <p>
                    Seu carrinho está vazio.
                </p>

                <small>
                    Escolha uma pizza deliciosa!
                </small>

            </div>

        `;

    } else {

        cartItems.innerHTML = "";


        cart.forEach((item, index) => {

            const element =
                document.createElement("div");


            element.className =
                "cart-item";


            element.innerHTML = `

                <div>

                    <strong>
                        ${item.name}
                    </strong>

                    <span class="cart-item-price">
                        ${money(item.price)}
                    </span>

                </div>


                <div class="cart-controls">

                    <button
                        onclick="changeQuantity(${index}, -1)"
                    >
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="changeQuantity(${index}, 1)"
                    >
                        +
                    </button>

                </div>

            `;


            cartItems.appendChild(element);

        });

    }


    const quantity =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    const total =
        cart.reduce(
            (total, item) =>
                total +
                item.price *
                item.quantity,
            0
        );


    cartCount.textContent =
        quantity;


    cartTotal.textContent =
        money(total);

}


/* =========================================
   ALTERAR QUANTIDADE
========================================= */

function changeQuantity(index, amount) {

    cart[index].quantity += amount;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    saveCart();

    renderCart();

}


/* =========================================
   SALVAR CARRINHO
========================================= */

function saveCart() {

    localStorage.setItem(
        "schuelterCart",
        JSON.stringify(cart)
    );

}


/* =========================================
   DINHEIRO
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
   WHATSAPP
========================================= */

document
    .getElementById("finishOrder")
    .addEventListener(
        "click",
        () => {

            if (cart.length === 0) {

                showToast(
                    "Seu carrinho está vazio 🍕"
                );

                return;

            }


            let message =
                "🍕 *PEDIDO - PIZZARIA SCHUELTER*%0A%0A";


            cart.forEach(item => {

                message +=
                    `• ${item.quantity}x ${item.name}%0A`;

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
                `%0A💰 *Total: ${money(total)}*`;


            message +=
                "%0A%0A📍 Manoel Ribas - PR";


            const url =
                "https://wa.me/5543996366774?text=" +
                message;


            window.open(
                url,
                "_blank"
            );

        }
    );


/* =========================================
   MODAL LOGIN / CADASTRO
========================================= */

const authModal =
    document.getElementById("authModal");

const openAuth =
    document.getElementById("openAuth");

const closeAuth =
    document.getElementById("closeAuth");

const loginForm =
    document.getElementById("loginForm");

const registerForm =
    document.getElementById("registerForm");

const showRegister =
    document.getElementById("showRegister");

const showLogin =
    document.getElementById("showLogin");


/* ABRIR */

openAuth.addEventListener(
    "click",
    () => {

        authModal.classList.add("active");

        showLoginForm();

    }
);


/* FECHAR */

closeAuth.addEventListener(
    "click",
    () => {

        authModal.classList.remove("active");

    }
);


/* CLICAR FORA */

authModal.addEventListener(
    "click",
    event => {

        if (
            event.target === authModal
        ) {

            authModal.classList.remove(
                "active"
            );

        }

    }
);


/* =========================================
   TROCAR LOGIN / CADASTRO
========================================= */

showRegister.addEventListener(
    "click",
    showRegisterForm
);


showLogin.addEventListener(
    "click",
    showLoginForm
);


function showRegisterForm() {

    loginForm.classList.add(
        "hidden"
    );

    registerForm.classList.remove(
        "hidden"
    );

}


function showLoginForm() {

    registerForm.classList.add(
        "hidden"
    );

    loginForm.classList.remove(
        "hidden"
    );

}


/* =========================================
   CADASTRO
========================================= */

registerForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const name =
            document.getElementById(
                "registerName"
            ).value.trim();


        const phone =
            document.getElementById(
                "registerPhone"
            ).value.trim();


        const email =
            document.getElementById(
                "registerEmail"
            ).value.trim();


        const address =
            document.getElementById(
                "registerAddress"
            ).value.trim();


        const password =
            document.getElementById(
                "registerPassword"
            ).value;


        if (password.length < 6) {

            showToast(
                "A senha precisa ter pelo menos 6 caracteres."
            );

            return;

        }


        let users =
            JSON.parse(
                localStorage.getItem(
                    "schuelterUsers"
                )
            ) || [];


        const exists =
            users.some(
                user =>
                    user.email.toLowerCase() ===
                    email.toLowerCase()
            );


        if (exists) {

            showToast(
                "Esse e-mail já está cadastrado."
            );

            return;

        }


        users.push({

            name,
            phone,
            email,
            address,
            password

        });


        localStorage.setItem(
            "schuelterUsers",
            JSON.stringify(users)
        );


        localStorage.setItem(
            "schuelterLoggedUser",
            JSON.stringify({
                name,
                email
            })
        );


        registerForm.reset();


        authModal.classList.remove(
            "active"
        );


        updateAccountButton();


        showToast(
            `Cadastro realizado! Bem-vindo, ${name.split(" ")[0]} 🍕`
        );

    }
);


/* =========================================
   LOGIN
========================================= */

loginForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const email =
            document.getElementById(
                "loginEmail"
            ).value.trim();


        const password =
            document.getElementById(
                "loginPassword"
            ).value;


        const users =
            JSON.parse(
                localStorage.getItem(
                    "schuelterUsers"
                )
            ) || [];


        const user =
            users.find(
                item =>
                    item.email.toLowerCase() ===
                        email.toLowerCase() &&
                    item.password === password
            );


        if (!user) {

            showToast(
                "E-mail ou senha incorretos."
            );

            return;

        }


        localStorage.setItem(
            "schuelterLoggedUser",
            JSON.stringify({
                name: user.name,
                email: user.email
            })
        );


        loginForm.reset();


        authModal.classList.remove(
            "active"
        );


        updateAccountButton();


        showToast(
            `Bem-vindo de volta, ${user.name.split(" ")[0]}! 🍕`
        );

    }
);


/* =========================================
   BOTÃO DA CONTA
========================================= */

function updateAccountButton() {

    const user =
        JSON.parse(
            localStorage.getItem(
                "schuelterLoggedUser"
            )
        );


    if (user) {

        openAuth.textContent =
            `👋 ${user.name.split(" ")[0]}`;

    } else {

        openAuth.textContent =
            "👤 Cadastro";

    }

}


updateAccountButton();


/* =========================================
   TOAST
========================================= */

const toast =
    document.getElementById("toast");

const toastText =
    document.getElementById("toastText");


let toastTimeout;


function showToast(message) {

    toastText.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimeout
    );


    toastTimeout =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2500
        );

}


/* =========================================
   ESC
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeCartFunction();

            authModal.classList.remove(
                "active"
            );

        }

    }
);


/* =========================================
   INICIAR
========================================= */

renderCart();
