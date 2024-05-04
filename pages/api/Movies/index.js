import {Movies} from '@component/Data/Movies'

export default function handler(req,res){
    if (req.method==="GET"){
        res.status(200).json(Movies)
        
    } else if (req.method === "POST") {
        const { movie } = req.body;
        const currentMaxId = Math.max(...Movies.map(m => parseInt(m.id)));
        const newMovie = {
        id: (currentMaxId + 1).toString(),
        ...movie
        };
        Movies.push(newMovie);
        res.status(201).json(newMovie);
  }
}