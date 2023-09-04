import React, { useRef, useState } from 'react'
import Icon from "../image/icon-retoure.png"
export default function Formulaire() {
  const [show, setShow] = useState(true)
  const [message, setMessage] = useState(false)
  const [name, setName] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState()
  const [ville, setVille] = useState("")
  const [dateNaissance, setDateNaissance] = useState()
  const [typeProfile, setTypeProfile] = useState("")
  const [seniorite, setSeniorite] = useState("")
  const [mobilityInternational, setMobilityInternational] = useState()
  const [mobilityINational, setMobilityNational] = useState()
  const [situationFamilial, setSituationFamilail] = useState("")
  const [linkProfileLinkedin, setLinkProfileLinkedin] = useState("")
  const [levelOfStudy, setLevelOfStudy] = useState("")
  const [lastPost, setLastPost] = useState("")
  const [diplome, setDiplome] = useState("")
  const [cv, setCv] = useState()
  const [commentaire, setCommentaire] = useState("")
  const [disponibilite, setDisponibilite] = useState("")


  const suivant = (e) => {
    e.preventDefault();
    setShow(false);
  }
  const saveProfile = (e) => {
    e.preventDefault();
    let profile = new FormData();
    profile.append("firstName", firstName);
    profile.append("lastName", lastName);
    profile.append("email", email);
    profile.append("address", address)
    profile.append("ville", ville)
    profile.append("typeOfProfile", typeProfile)
    profile.append("dateBirthday", new Date(dateNaissance))
    profile.append("currentSeniority", seniorite)
    profile.append("file1", cv)
    profile.append("mobilityInternational", false)
    profile.append("mobilityNational", false)
    profile.append("familySituation", situationFamilial)
    profile.append("linkProfileLinkedin", linkProfileLinkedin)
    profile.append("levelOfStudy", levelOfStudy)
    profile.append("lastPost", lastPost)
    profile.append("diploma", diplome)
    profile.append("comment", commentaire)
    profile.append("availability", disponibilite)



    //   const profile={"firstName":firstName,
    //   "lastName":lastName,
    //   "email":email,
    //   "address":address,
    //   "telephone":phone,
    //   "ville":ville,
    //   "dateBirthday":new Date(dateNaissance),
    //   "typeOfProfile":typeProfile,
    //   "currentSeniority":seniorite,
    //   "mobilityInternational":mobilityInternational,
    //   "mobilityNational":mobilityINational,
    //   "situationFamilial":situationFamilial,
    //   "linkProfileLinkedin":linkProfileLinkedin,
    //   "levelOfStudy":levelOfStudy,
    //   "lastPost":lastPost,
    //   "diploma":diplome,
    //   "comment":commentaire,
    //   "availability":disponibilite,
    //  " file1":cv
    //   }


    fetch("http://localhost:8085/api/createProfile", {
      mode: 'no-cors',
      method: "POST",
      headers: {
        'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
      },
      body: profile//stringify convent the js object to json string
    }).then(() => {
      console.log("new profile added")
      setShow()
      setMessage(true)
      console.log(show)
      console.log(message)
    }
    )


  }
  const retoure = (e) => {

    setShow(true);
    setName(firstName);
    console.log(show)
  }
  return (
    <div>
      {show && <div className='formulaire'>

        <div className='formulaire-titre'>
          <h1>Ajouter Un Profil </h1>
        </div>

        <div className='formulaire-body'>
          <form onSubmit={suivant} >
            <input type="text" placeholder=' Le nom du condidat' defaultValue={firstName} onChange={(e) => setFirstName(e.target.value)} required />

            <input type="text" placeholder=' Le prénom du condidat' defaultValue={lastName} onChange={(e) => setLastName(e.target.value)} required />
            <input type="email" placeholder=" L'email du condidat" defaultValue={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="number" placeholder='Le numéro du téléphone' defaultValue={phone} onChange={(e) => setPhone(e.target.value)} required />
            <input type="text" placeholder=" La ville du condidat" defaultValue={ville} onChange={(e) => setVille(e.target.value)} required />
            <input type="text" placeholder=" L'adresse du condidat" defaultValue={address} onChange={(e) => setAddress(e.target.value)} required />
            <input type="date" placeholder=" Date de naissance du condidat: MM/DD/YYYY" defaultValue={dateNaissance} onChange={(e) => setDateNaissance(e.target.value)} required />
            <input type="text" placeholder='Le type de profil' defaultValue={typeProfile} onChange={(e) => setTypeProfile(e.target.value)} required />
            <input type="text" placeholder='disponibilité ' defaultValue={disponibilite} onChange={(e) => setDisponibilite(e.target.value)} required />
            <input type="number" placeholder='la sénioritée actuelle' defaultValue={seniorite} onChange={(e) => setSeniorite(e.target.value)} required />
            <select name="select" className="select" id="select" defaultValue={mobilityInternational} onChange={(e) => setMobilityInternational(e.target.value)} required>
              <option value="" disabled selected hidden>La mobilité internationnal</option>
              <option>True</option>
              <option >False</option>

            </select>
            <select name="select" className="select" id="select" defaultValue={mobilityINational} onChange={(e) => setMobilityNational(e.target.value)} required>
              <option value="" disabled selected hidden>La mobilité nationnal</option>
              <option>True</option>
              <option >False</option>

            </select>
            <input type="text" placeholder='La situation familiale' defaultValue={situationFamilial} onChange={(e) => setSituationFamilail(e.target.value)} required />
            <input type="text" placeholder='Le lien de profile linkedin' defaultValue={linkProfileLinkedin} onChange={(e) => setLinkProfileLinkedin(e.target.value)} required />
            <input type="text" placeholder='Le dernier post' defaultValue={lastPost} onChange={(e) => setLastPost(e.target.value)} required />
            <input type="text" placeholder='Le diplome' defaultValue={diplome} onChange={(e) => setDiplome(e.target.value)} required />
            <input type="text" placeholder="Le niveau d'étude" defaultValue={levelOfStudy} onChange={(e) => setLevelOfStudy(e.target.value)} required />
            <textarea placeholder='commentaire...' defaultValue={commentaire} onChange={(e) => setCommentaire(e.target.value)} required></textarea>
            <button className='button-enregister' type="submit" >Suivant</button>

          </form>
        </div>
      </div>
      }
      {
        show == false &&
        <div className='formulaire1'>
          <div className='icon-retoure'>
            <img src={Icon} alt="icon  retour" onClick={(e) => {
              retoure();
              e.preventDefault();
            }} />
          </div>
          <div className='formulaire-apload-file' >
            <label htmlFor="importer-cv">Le Cv Du Condidat</label>
            <input type="file" id='importer-cv' onChange={(e) => { setCv(e.target.files[0]); console.log(cv) }} />
            <button className='button-enregister' onClick={saveProfile}>Sauvgarder</button>
          </div>
        </div>
      }
      {
        message == true &&
        <div className='formulaire2'>

          <div className='box'>
            <h2>les donnés sont bien envoyées</h2>
          </div>
          {/* <div className='retour-formulaire'>
    <h4>retour au formulaire</h4>
    <button>retourner</button>
    </div> */}
        </div>

      }

      {/* <footer>
          <div class="footer-fynacsys">© 2022  innovation. All rights reserved.</div>
        </footer> */}
    </div>

  )
}

