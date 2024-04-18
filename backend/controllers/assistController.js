import Conferencia from "../models/Conferencia.js";

//-----------

//-----------cd 
const assistConference = async (req,res) => {
    const {id} = req.params;

    console.log(req.usuario);
    try {
        console.log("on try...");

        //conferencia.Horario.AsistentesRegistrados.push({'_id':req.usuario._id});
        const assist = await Conferencia.updateOne(
            {'_id':ObjectId(id)},
            {
                $push:{'Horario.AsistentesRegistrados':{'_id':req.usuario.id,'sexo':req.usuario.sexo}},
                $inc:{'Horario.CupoTotal':-1}
            }
        );
        console.log(assist);
        return res.status(200).json({msg:"Registro Exitoso"})
    } catch (error) {
        console.log("Error back...");
        return res.status(403).json({msg:'Fallo el registro'})
    }
};


const unAssistConference = async (req,res) => {
    const {id} = req.params;
    console.log(id);
    console.log(req.usuario);
    try {
        console.log("on try...");

        //conferencia.Horario.AsistentesRegistrados.push({'_id':req.usuario._id});
        const assist = await Conferencia.updateOne(
            {'_id':id},
            {
                $pull:{'Horario.AsistentesRegistrados':{'_id':req.usuario.id}},
                $inc:{'Horario.CupoTotal':1}
            }
        );
        console.log(assist);
        return res.json({msg:"Registro Exitoso"})
    } catch (error) {
        console.log("Error back...");
        return res.json({msg:'Fallo el registro'})
    }
};
//-----------
export {
    assistConference,
    unAssistConference
}