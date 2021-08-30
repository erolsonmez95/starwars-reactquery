import React,{useState} from 'react'
import {useQuery} from 'react-query'
import Planet from './Planet';


const fetchPlanets= async ({queryKey}) =>{
   const [key, page] = queryKey;
   const res=await fetch( `https://swapi.dev/api/${key}/?page=${page}`);
   return res.json();
}
const Planets =() => {
    const [page,setPage] = useState(1);
    const query = ["planets", page];
    const { data, status} = useQuery(query,fetchPlanets,);

    return (
        <div>
            Planets
            {status === 'loading' && (
                <div>
                    Loading data...
                </div>
            )}
            {status === 'error' && (
                <div>
                    Error fetching data
                </div>
            )}
             {status === 'success' && (
               <>
               <button 
                 onClick={() => setPage(old => Math.max(old - 1, 1))} 
                 disabled={page === 1}>
                 Previous Page
               </button>
               <span>{ page }</span>
               <button 
                 onClick={() => setPage(old => (!data || !data.next ? old : old + 1))} 
                 disabled={!data || !data.next}>
                 Next page
               </button>
               <div>
                 { data.results.map(planet => <Planet key={planet.name} planet={planet} /> ) }
               </div>
             </>
            )}
                     

        </div>
    )
}

export default Planets
