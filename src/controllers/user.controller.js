//const fs = require('fs').promises;
const Utenti = require('../models/userModel');

//FUNZIONI INTERNE, NON COLLEGATE A NESSUN ENDPOINT API
/*const leggiUtentiDalFile =  () => {
  return fs.readFile('database/Utenti  json',"utf8")
    .then((resp)=>{
      const data = JSON.parse(resp)
      return data; 
    }).catch((err)=>{
      return err;
    });
};*/

async function getUtenti() {
  const utenti = await Utenti.findAll();
  console.log(utenti);
  }
  //getUtenti();

/*const scriviSingoloUtenteSuFile = async (utente) => {
  try {
    await fs.writeFile('database/'+utente.nome+'_'+utente.id+'.json', JSON.stringify(utente, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Errore scrittura su singolo file!!!!!!!!!!!', error)
    return false;
  }
}*/

async function createUtenti(utente) {
  const utenti = await Utenti.create({ name: utente.nome, email: utente.email });
  console.log(utenti.toJSON());
  }
  //createUtenti();

const scriviUtentiSulFile = async (data) => {
  try {
    await createUtenti(data)//fs.writeFile('database/Utentis'+'.json', JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error('Errore scrittura su file!!!!!!!!!!!', error)
    return false;
  }
};


//FUNZIONI API 
const findAll = async (req, res) => {
  const data = await getUtenti();//leggiUtentiDalFile();
  res.status(200).json(data);
};

const findById = async (req, res) => {
  const idUtente = req.params.id;
  const data = await getUtenti(); //leggiUtentiDalFile();
  const utente = data.utenti.find(utenti => utenti.id === parseInt(idUtente, 10));
  if (utente) {
    res.status(200).json(utente);
  } else {
    res.status(404).send('404 - not found');
  }
};

const postById = async (req, res) => {
  try {
    const data = await getUtenti(); //leggiUtentiDalFile();
    const nuovoUtentiId = data.utenti.length + 1;
    
    const utente = req.body;
    utente.id = nuovoUtentiId;
    
    data.utenti.push(utente);
    
    const result = await scriviUtentiSulFile(data);
    if (result) {
      console.log('result : '+ result)
      const result2 = await createUtenti(utente)//scriviSingoloUtenteSuFile(utente);
      if (result2) {
        console.log('result2 : '+ result2)
        res.status(201).send({message: 'Utente inserito correttamente'});
      }
     
    }
    else {
      res.status(500).send({message: 'Errore inserimento utente'});
    }
   
  } catch (error) {
    console.log(error)
    res.status(500).send({message: 'Errore: ' + error});
  }
};

/*const updateById = async (req, res) => {
  const data = await leggiUtentiDalFile();
  const indiceUtenteTrovato = data.utenti.findIndex(Utenti => Utenti.id === parseInt(id, 10));
  if (indiceUtenteTrovato >= 0) {
      data.utenti[indiceUtenteTrovato] = req.body;
      await scriviUtentiSulFile(data);
      res.status(200).send({message: 'Utente aggiornato correttamente!'});
  } else {
    res.status(404).send('404 - not found');
  }
};*/

async function updateById(UtentiId) {
  const utenti = await Utenti.findByPk(UtentiId);
  utenti.name = 'Updated Name';
  await utenti.save();
  console.log(utenti.toJSON());
  }
  //updateUtenti(1);

/*const deleteById = async (req, res) => {
  const idUtente = req.params.id;
  const data = await leggiUtentiDalFile();
  const indiceUtenteTrovato = data.utenti.findIndex(Utenti => Utenti.id === parseInt(idUtente, 10));
  if (indiceUtenteTrovato !== -1) {
    data.utenti.splice(indiceUtenteTrovato, 1);
    await scriviUtentiSulFile(data);
    res.status(200).send({message: 'Utente cancellato correttamente'});
  } else {
    res.status(404).send('404 - not found');
  }
};*/

async function deleteById(UtentiId) {
  const utenti = await Utenti.findByPk(UtentiId);
  await utenti.destroy();
  console.log('Utenti deleted');
  }
  //deleteUtenti(1);


module.exports = {
  utentiController: {
    findAll,
    findById,
    postById,
    updateById,
    deleteById,
  }
};