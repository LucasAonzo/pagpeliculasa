const buscador = document.getElementById('buscador'); 
const antes = document.getElementById('btnAnterior');
const despues = document.getElementById('btnSiguiente');
let pagina = 1;
const contenedor = document.getElementById('contenedor');

const cargarPeliculas = async() => {
    try {
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX&page=${pagina}`);

        console.log(respuesta);

        // Si la respuesta es correcta
        if(respuesta.status === 200){
            const datos = await respuesta.json();

            let peliculas = '';
            datos.results.forEach(pelicula => {
                peliculas += `
                <div class="col" id=${pelicula.id}>
                <div class="card ">
                  <img src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" class="card-img-top" alt="...">
                  <div class="card-body">
                    <h5 class="card-title">${pelicula.title}</h5>
                    <p class="card-text">${pelicula.overview}</p>
                    <p class="card-release">Fecha lanzamiento: ${pelicula.release_date} </p>
                  </div>
                </div>
              </div>
                `;
            });

            document.getElementById('contenedor').innerHTML = peliculas;

        } else if(respuesta.status === 401){
            console.log('Error en la API');
        }
    } catch (error) {
        console.log(error);
    }
}

cargarPeliculas();

buscador.addEventListener('input', () => {
    const search = buscador.value;
    console.log(search);
    if(search.length > 2){
        
        const endpoint = `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=192e0b9821564f26f52949758ea3c473`;
        fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            let peliculas = '';
            data.results.forEach(pelicula => {
                peliculas += `
                <div class="col" id=${pelicula.id}>
                <div class="card" id=${pelicula.id}>
                  <img src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" class="card-img-top" alt="...">
                  <div class="card-body">
                    <h5 class="card-title">${pelicula.title}</h5>
                    <p class="card-text">${pelicula.overview}</p>
                    <p class="card-release">Fecha lanzamiento: ${pelicula.release_date} </p>
                  </div>
                </div>
              </div>
                `;
            });

            document.getElementById('contenedor').innerHTML = peliculas;

        })
    } else {
        cargarPeliculas();
    }
})

btnSiguiente.addEventListener('click', () => {
	if(pagina < 1000){
		pagina += 1;
		cargarPeliculas();
    window.scrollTo({ top: 0, behavior: 'smooth' });
		let pag = '';
		pag += `
			<p id="pagina">${pagina}</p>
		`;
		document.getElementById('pagina').innerHTML = pag;
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
	window.scrollTo(0, 0);
});

btnAnterior.addEventListener('click', () => {
	if(pagina > 1){
		pagina -= 1;
		cargarPeliculas();
    window.scrollTo({ top: 0, behavior: 'smooth' });
		let pag = '';
		pag += `
			<p id="pagina">${pagina}</p>
		`;
		document.getElementById('pagina').innerHTML = pag;
    window.scrollTo({ top: 0, behavior: 'smooth' });
	}
	window.scrollTo({ top: 0, behavior: 'smooth' });
});

contenedor.addEventListener('click', (e) => {
    /*obtener id etiqueta hijo*/
    const id = e.target.parentElement.parentElement.id;
    console.log(id);
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=192e0b9821564f26f52949758ea3c473`;
    fetch(url)
    /*open video in new tab*/
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let video = '';
        video += `
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">${data.title}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <iframe width="560" height="315" src="${url}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
        `;
        document.getElementById('video').innerHTML = video;

    
})
})
