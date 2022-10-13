import './App.css';
import Row from './Row';
import requests from './request';
import Banner from './Banner';
import Navbar from './Navbar';
import MovieDetail from './MovieDetail';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CastDetail from './CastDetail';

function App() {
  
  return (
    <div className="netflix">
      <BrowserRouter>
      <Navbar/>
      <Routes>
      <Route path="/" element={<><Banner/>
                            <Row title="NETFLIX ORIGINALS" fetchUrl={requests.fetchNetflixOriginals} isLargeRow={true}  />      
                            <Row title=" Trending Movie"  fetchUrl={requests.fetchTrending} isLargeRow={false}/>
                            <Row title=" Action Movie"  fetchUrl={requests.fetchActionMovies} isLargeRow={false}/>
                            <Row title=" Comdey Movie"  fetchUrl={requests.fetchComedyMovies} isLargeRow={false}/>
                            <Row title=" Horror Movie"  fetchUrl={requests.fetchHorrorMovies} isLargeRow={false}/>
                            <Row title=" Romance Movie"  fetchUrl={requests.fetchRomanceMovies} isLargeRow={false}/>
                            <Row title=" Documentaries"  fetchUrl={requests.fetchDocumentries} isLargeRow={false}/></>}/>
      
                            <Route path="/tv/:id" element={<MovieDetail/>} />
                            <Route path="/movie/:id" element={<MovieDetail/>} />
                            <Route path="/castDetail/:id" element={<CastDetail/>} />
                          </Routes>
                          </BrowserRouter>
    </div>
  );
}

export default App;
