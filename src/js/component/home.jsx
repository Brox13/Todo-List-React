import React, { useState, useEffect } from "react";

const TodoList = () => {
	const [descripcion, setDescripcion] = useState("");
	const [tareas, setTareas] = useState([]);
	const tecla = (e) => {
		if (e.keyCode === 13) {
			e.target.value = "";
			setTareas([...tareas, descripcion]);
			setDescripcion("");

		}
	};

	useEffect(() => {
		fetch('https://assets.breatheco.de/apis/fake/todos/user/antonio', {
			method: "GET",
			//body: JSON.stringify([]),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				console.log(resp.ok);
				console.log(resp.status);
				return resp.json();
			})
			.then(data => {
				setTareas(data.map(nuevatarea => nuevatarea.label));
				console.log(data);
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	useEffect(() => {
		fetch('https://assets.breatheco.de/apis/fake/todos/user/antonio', {
			method: 'PUT',
			body: JSON.stringify(tareas.map(i => ({ label: i, done: false }))),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => res.json())
			.then(response => console.log('Success:', JSON.stringify(response)))
			.catch(error => console.error('Error:', error));
	});

	const EliminarOnClick = (indice) => {
		let aux = tareas.filter((tarea, i) => {
			return indice != i;
		})
		setTareas([...aux])
	};

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
			<div className="text-muted fw-lighter ms-2">{tareas.length} Item(s)</div>
			</div>
	)
};





const Home = () => {
	return (
		<TodoList />
	);
};

export default Home;
