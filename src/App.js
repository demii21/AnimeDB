import { useState, useEffect,Fragment } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import AnimePage from './components/AnimePage';
import { BrowserRouter, Routes, Route } from "react-router-dom"



function App() {
	const host = "http://localhost:5000"
	const [animeList, SetAnimeList] = useState([]);
	const [topAnime, SetTopAnime] = useState([]);
	const [search, SetSearch] = useState("");

	const GetTopAnime = async () => {
		let data = await fetch(`${host}/api/anime/topAnime`)
		let parsedData = await  data.json()
		
		SetTopAnime(parsedData.slice(0, 5));
	}
	const HandleSearch = async (e) => {
		e.preventDefault();
		FetchAnime(search);
	}
	const FetchAnime = async (query) => {
		try {
			const data = await fetch(`${host}/api/anime/search/?q=${query}`).then(res => res.json());
			SetAnimeList(data)
		}
		catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		try{
			GetTopAnime();
		}
		catch(err){
			console.error(err)
		}
		
	}, []);

	return (
		<div className="App">
			<Header />
			<div className="content-wrap">
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Fragment><Sidebar topAnime={topAnime} /><MainContent
							HandleSearch={HandleSearch}
							search={search}
							SetSearch={SetSearch}
							animeList={animeList} /></Fragment>} />
							
						<Route path="/:id" element={<AnimePage/>} />
					</Routes>
				</BrowserRouter>
			</div>

		</div>
	);
}

export default App;
