import { Routes, Route } from 'react-router-dom';
import './App.scss';

import { NewPost } from './components/NewPost';
import { LayOut } from './components/LayOut';

function App() {
	return (
		<Routes>
			<Route path='/' element={<LayOut />}>
				<Route path='/posts/new/*' element={<NewPost />} />
			</Route>
		</Routes>
	)
}

export default App
