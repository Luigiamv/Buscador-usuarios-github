let API = 'https://api.github.com/users/';


let dark = true;
let resultado = document.querySelector('.resultado');
let form = document.querySelector('.form');
let input = document.querySelector('.formInput');
let inputSearch = document.getElementById('search');
let Temacambiando = document.querySelector('.Temacambiando');
let Temanombre = document.querySelector('.Temanombre');
let temaCSS = document.querySelector('.temaCss');
let iconModo = document.querySelector('.iconModo');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let usunombre = inputSearch.value;

    if (usunombre) {
        datosPerfil(usunombre)
        inputSearch.value = '';
    }
});


Temacambiando.addEventListener('click', cambiarTemaColor);

async function datosPerfil(usunombre) {

    let userRepos = `${API}${usunombre}/repos`

    try {
        let respuesta = await fetch(API + usunombre);
        let respuesta1 = await fetch(userRepos);

        //if (!respuesta.ok) {
        /*if(respuesta.status === 404){
            throw new Error('Usuario no Existe, Intenta con otro nombre');
        }*/
        let datos = await respuesta.json();
        mostrarDatosUsuario(datos);

        let datos1 = await respuesta1.json();
        mostrarRepos(datos1);

    } catch (error) {
        //funcioError('Este Nombre esta libre no pertenece a ningun perfil de GitHub')
        mostrarNoEncontrado();
    }
}

function mostrarNoEncontrado() {
    let img = '<img class="not-found" style="width: 600px; height: 350px" src="img/Noencotrado.gif" alt="No se encuentra">';

    resultado.innerHTML = img;
}

function mostrarDatosUsuario(datos) {
    let {
        login,
        avatar_url: avatar,
        name, company, blog, public_repos: repos,
        location, email, bio, twitter_username: twitter,
        followers, following, created_at: joined,
    } = datos;

    let datosUsuario = `        

        <div>
            <img src="${avatar}" alt="${name}" class="avatar">
        </div>
        
        <h1 class="nombre">${name}</h1>       
        <h2 class="username">${login}</h2>
        <p class="bio">${bio}</p>

        <nav class="contacto">         
           <a href="https://twitter.com/${twitter}" class="link"><i class="fab fa-twitter">&nbsp${twitter}</i></a>
           <a href="#" class="link"><i class="fa fa-building"></i>${company}</a>
        </nav> 
        

       
    `;


    resultado.innerHTML = datosUsuario;

    function parseDate(fecha) {
        let ops = {
            weekday: 'short',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        return new Date(fecha).toLocaleString('es-ES', ops);
    }
}

function cambiarTemaColor() {
    dark = !dark;
    if (dark) {
        temaCSS.setAttribute('href', 'css/estiloLight.css');
        iconModo.setAttribute('class', 'fa fa-moon iconModo');
        Temanombre.textContent = 'OSCURO';
    } else {
        temaCSS.setAttribute('href', 'css/estiloDark.css');
        iconModo.setAttribute('class', 'fa fa-sun iconModo');
        Temanombre.textContent = 'CLARO';
    }
}

function mostrarRepos(repos) {
    const div = document.createElement('div')
    const divSingle = document.createElement('div')
    div.classList.add('repos')
    divSingle.classList.add('rep-single')


    let starOrder = repos.sort((a, b) => b.stargazers_count - a.stargazers_count)

    let topTen = starOrder.slice(0, 10)

    topTen.forEach(repositorio => {
        div.innerHTML = `<h3>Repositórios:</h3>`
        divSingle.innerHTML += `
        <a href="${repositorio.html_url}" target="_blank">${repositorio.name}</a>
        `
        div.appendChild(divSingle)
        resultado.appendChild(div)
    })
}

function debounce(callback, wait) {
    let timerId;
    return (...args) => {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            callback(...args);
        }, wait);
    };
}

document.getElementById('search').addEventListener('click', debounce(() => {
    console.log('click');
}, 1500))

//crear tarjeta de error por si el usuario que buscamos no existe, donde le pasamos como parametro msg
function funcioError(msg) {
    const cardHTML = `
    <div class="card"><h2>${msg}</h2></div>`

    main.innerHTML = cardHTML

}