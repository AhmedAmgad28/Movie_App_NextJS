import React from 'react';

const MovieId = ({movie}) => {
    return (
        <div>
            {movie.title}
        </div>
    );
}

export default MovieId;
export async function getStaticProps(context){
    const {id}=context.params;
    const res= await fetch(`http://localhost:3000/api/Movies/${id}`)
    const data =await res.json()
    return {
     props:{movie:data}
    }
}        
export function getStaticPaths(){
    return {
        paths:[
            {params:{id:'1'}},
            {params:{id:'2'}},
            {params:{id:'3'}},
            {params:{id:'4'}},
            {params:{id:'5'}},
            {params:{id:'6'}},
            {params:{id:'7'}},
            {params:{id:'8'}},
            {params:{id:'9'}},
            {params:{id:'10'}},
        ],
        fallback:true
    }
}