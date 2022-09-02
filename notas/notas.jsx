import React, { useState, useEffect } from "react";

// Se crea una function con dos arrays y su seteo en un arrays vacios
const TodoList = () => {
	const [descripcion, setDescripcion] = useState("");
	const [tareas, setTareas] = useState([]);
	//Fucion tecla, para que se inserte el imput al darle al enter y luego coja su valor e.target.value y se quede en blanco despues
	// el imput despues de darle al enter y setee las tareas y la descripción. Tambien se puede meter entre las "" lo que queremos
	// que salga en vez de quedarse en blanco.
	const tecla = (e) => {
		if (e.keyCode === 13) {
			e.target.value = "";
			setTareas([...tareas, descripcion]);
			setDescripcion("");

		}
	};


	// Aquí obtenemos la tarea (datos) de la api que conectamos
	useEffect(() => {

		fetch('https://assets.breatheco.de/apis/fake/todos/user/antonio', {
			method: "GET",
			//body: JSON.stringify([]),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
				console.log(resp.status); // el código de estado = 200 o código = 400 etc.
				//   console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)
				return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				//Aquí es donde debe comenzar tu código después de que finalice la búsqueda
				setTareas(data.map(nuevatarea => nuevatarea.label));
				console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
			})
			.catch(error => {
				//manejo de errores
				console.log(error);
			});
	}, []);


	// aqui subimos con el put lo que metemos en el imput de tarea corriendo la aplicación para que se añada en la api con nuestro usuario
	useEffect(() => {
		fetch('https://assets.breatheco.de/apis/fake/todos/user/antonio', {
			method: 'PUT', // or 'POST'
			body: JSON.stringify(tareas.map(i => ({ label: i, done: false }))), // data can be `string` or {object}!
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => res.json())
			.then(response => console.log('Success:', JSON.stringify(response)))
			.catch(error => console.error('Error:', error));
	});


	// Funcion eliminar. Aqui se crea una nueva variable aux donde va a filtrar si lo que estas metiendo en indice es distinto a i se reinicia con set el aux
	const EliminarOnClick = (indice) => {
		let aux = tareas.filter((tarea, i) => {
			return indice != i;
		})
		setTareas([...aux])
	};


	// Funcion para boton de eliminar
	const funcioneliminar = tareas.map((e, index) =>
		<li key={index}>{e}
			<div className="BorrarElemento">
				<button className="Eliminar" onClick={() => EliminarOnClick(index)}><i class="fa fa fa-trash-o" aria-hidden="true">X</i></button>
			</div>
		</li>);
	
		return (
			<div className="container-fluid">
				<div className="pt-4 text-center">
					<h1 className="fw-light display-1 opacity-25" style={{ color: "#ad4877" }}>TODO LIST</h1>
					<input clasName="form-control border-bottom w-100 mt-1" type="text" onKeyUp={tecla} onChange={e => setDescripcion(e.target.value)} value={descripcion} />
					<ul>{funcioneliminar}</ul>
			</div>
			{/* para que salgaf el numero de tareas que vas metiendo */}
			<div className="text-muted fw-lighter ms-2">{tareas.length} Item(s)</div>
			</div>
	)
};






//create your first component
const Home = () => {
	return (
		<TodoList />
	);
};

export default Home;