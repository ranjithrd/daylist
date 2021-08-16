import React from "react"
import { Route, BrowserRouter, Switch } from "react-router-dom"
import Home from "./pages/Home"

function App() {
	return (
		<div className="w-screen h-screen overflow-none bg-gray-50">
			<BrowserRouter>
				<Switch>
					<Route path="/" children={<Home />} />
				</Switch>
			</BrowserRouter>
		</div>
	)
}

export default App
