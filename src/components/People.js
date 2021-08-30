import React,{useState} from 'react'
import {useQuery} from 'react-query'
import Person from './Person';


const fetchPeople= async ({queryKey}) =>{
    const [key, page] = queryKey;
    const res=await fetch( `https://swapi.dev/api/${key}/?page=${page}`);
   return res.json();
}
const People =() => {
    const [page,setPage] = useState(1);
    const query = ["people", page];
    const { data, status} = useQuery(query,fetchPeople);

    return (
        <div>
            People
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
                     { data.results.map(person => <Person key={person.name} person={person} /> ) }
                   </div>
                 </>
            )}
                     

        </div>
    )
}

export default People
