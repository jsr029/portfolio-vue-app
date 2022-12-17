const express = require('express')
//const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const stuffRoutes = require('./routes/stuff')
const userRoutes = require('./routes/user')

mongoose.connect('mongodb+srv://jean-ocr:1M2o3n4g@cluster0.nfqkwln.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
const app = express()

/**Intercepte toutes requetes content-type json 
 * et met à disposition le contenu, 
 * le corps de la requete sur l'objet requete dans req.body
 * Sinon autre methode plus ancienne avec body-parser donnant accès au corps de la requete
*/
app.use(express.json())
//app.use(bodyParser,json())

/**Premier middleware et sera appliqué à toutes les routes, middleware général */
app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
/**Middleware reçoit requete et reponse qui les gere, 
 * et va renvoyer la prochaine fonction middleware au server avec next() 
 * premier paramètre est une url
 * prix en centimes pour éviter les problèmes avec les décimaux
*/
app.use('/api/stuff',stuffRoutes)
app.use('/api/auth',userRoutes)
module.exports = app