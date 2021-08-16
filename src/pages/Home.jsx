import moment from "moment"
import React, { useEffect, useState } from "react"

function Home() {
	const [tasks, setTasks] = useState(
		JSON.parse(localStorage.getItem("tasks")) ?? [
			{
				name: "Create today's tasks",
				completed: false,
			},
		]
	)
	const [processedTasks, setProcessedTasks] = useState([])

	const [creating, setCreating] = useState(false)
	const [newTask, setNewTask] = useState("")

	function onNewChange(e) {
		setNewTask(e.target.value)
	}

	function addTask() {
		let t = [...tasks]
		t.push({
			name: newTask,
			completed: false,
		})
		setTasks(t)
		setCreating(false)
		setNewTask("")
	}

	function completeTask(task) {
		let t = [...tasks]
		t[tasks.indexOf(task)].completed = !t[tasks.indexOf(task)].completed
		setTasks(t)
	}

	function deleteTask(task) {
		let t = [...tasks]
		t = t.filter((e) => e !== task)
		setTasks(t)
	}

	useEffect(() => {
		let t = [...tasks]
		t.sort((t1, t2) => {
			return t1.completed && !t2.completed ? 1 : 0
		})
		localStorage.setItem("tasks", JSON.stringify(tasks))
		setProcessedTasks(t)
	}, [tasks])

	useEffect(() => {
		const refreshFromLocalStorage = setInterval(() => {
			if (localStorage.getItem("tasks") === null) return
			setTasks(JSON.parse(localStorage.getItem("tasks")))
		}, 500)
		return () => {
			clearInterval(refreshFromLocalStorage)
		}
	}, [])

	return (
		<div className="h-full w-full flex flex-col justify-center items-center space-y-8">
			<div className="flex flex-col items-center">
				<h1 className="text-3xl font-bold tracking-tighter">
					Today's tasks
				</h1>
				<sub className="text-lg font-light">
					{moment().startOf("day").format("dddd, D MMMM YYYY")}
				</sub>
			</div>
			<div className="flex flex-col px-8 py-2 pt-1 rounded-lg border-2 border-grey-800 shadow-lg w-9/12 md:w-1/2 items-start">
				{processedTasks.map((task, index) => (
					<div
						className={
							"w-full px-0 py-4 flex flex-row items-center space-x-2 " +
							(index > 0 ? "border-t-2" : "")
						}
						key={index}
					>
						<button
							className="w-full flex space-x-2"
							onClick={() => completeTask(task)}
						>
							<span className="material-icons-outlined text-xl">
								{task.completed ? "check_circle" : "circle"}
							</span>
							<h3
								className={
									"font-light text-lg " +
									(task.completed ? "line-through" : "")
								}
							>
								{task.name}
							</h3>
						</button>
						<button
							className="material-icons-outlined text-sm"
							onClick={() => deleteTask(task)}
						>
							delete
						</button>
					</div>
				))}
				<div
					className={
						"w-full px-0 py-4 flex flex-row items-center space-x-2 " +
						(creating ? "" : "opacity-60 ") +
						(tasks.length == 0 ? " border-0" : " border-t-2")
					}
				>
					{creating === false ? (
						<button
							onClick={() => setCreating(true)}
							className="w-full flex flex-row space-x-2 items-center"
						>
							<span className="material-icons-outlined text-xl">
								circle
							</span>
							<h3 className={"font-light text-lg "}>
								Create a new task...
							</h3>
						</button>
					) : (
						<div className="flex flex-col w-full items-start">
							<div className="flex flex-row space-x-2 w-full">
								<input
									type="text"
									id="taskname"
									name="taskname"
									placeholder="Enter a task..."
									value={newTask}
									onChange={onNewChange}
									className="w-full bg-gray-50 border-2 rounded-md p-2 text-base font-light"
								/>
								<button
									className="p-2 font-bold"
									onClick={addTask}
								>
									Create
								</button>
							</div>
							<button
								className="p-2 text-sm text-red-500"
								onClick={() => setCreating(false)}
							>
								Cancel
							</button>
						</div>
					)}
				</div>
			</div>
			<button
				className="p-2 text-sm text-red-500"
				onClick={() => setTasks([])}
			>
				Clear all tasks
			</button>
		</div>
	)
}

export default Home
