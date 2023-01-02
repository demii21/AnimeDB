import { useState, useEffect,Fragment } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import AnimePage from './components/AnimePage';
import { Routes, Route } from "react-router-dom"
import { InfinitySpin } from 'react-loader-spinner';
import Watched from './components/Watched';

function App() {

	const host = "http://localhost:5000"
	const [animeList, SetAnimeList] = useState([]);
	const [topAnime, SetTopAnime] = useState([]);
	const [search, SetSearch] = useState("");
	const [loading, setLoading] = useState(true);
	const GetTopAnime = async () => {
		let data = await fetch(`${host}/api/anime/topAnime`)
		let parsedData = await  data.json();
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
			setLoading(false);
		}
		catch(err){
			console.error(err)
		}
		
	}, []);


if(!loading){
	return (
		<div className="App">
			<Header />
			<div className="content-wrap">
				
					<Routes >
						<Route exact path="/" element={<Fragment><Sidebar topAnime={topAnime} /><MainContent
							HandleSearch={HandleSearch}
							search={search}
							SetSearch={SetSearch}
							animeList={animeList} /></Fragment>} />
							
						<Route  path="/:id" element={<Fragment><AnimePage/></Fragment>} />\
						<Route path="/watched" element={<Fragment><Sidebar topAnime={topAnime} /><Watched/></Fragment>} /> 
					</Routes>
				
			</div>

		</div>
	);
}
	else{
		return(
			<>
				<div className='spinner-center'> 
					<InfinitySpin width='200' color="#4fa94d" />
				</div>
			</>
		)
	}
}

export default App;
