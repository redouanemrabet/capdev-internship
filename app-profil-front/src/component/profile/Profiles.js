import React, { useEffect, useRef, useState } from 'react'
import icon from '../../image/icon-fermer.png'
import { jsPDF } from "jspdf";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FileSaver from "file-saver";

function Profiles() {

  const [showComponent, setShowComponent] = useState(false)
  const [profiles, setProfiles] = useState([])
  const [profilesNonArchive, setPofilesNonArchive] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [profile, setProfile] = useState()
  const [profileModal, setProfileModal] = useState()
  const [showProfiles, setShowProfiles] = useState(false)
  const [profilesSearch, setProfilesSearch] = useState()
  const [message, setMessage] = useState("")
  useEffect(() => {
    fetch("http://localhost:8085/api/selectProfiles")
      .then(res => res.json())
      .then((result) => { setProfiles(result); })
    console.log(profiles);
  }, [])
  const showProfile = (id) => {

    setProfile()
    setShowProfiles()
    setShowComponent(true);

    profiles.map((p) => {
      if (p.id == id) {
        setProfile(p);
      }
    })
  }
  const closeProfile = () => {
    if (showProfiles == true) {
      setShowComponent()

    }
    else {
      setShowComponent(false);
    }
  }
  const getValue = (e) => {

    setInputValue(e.target.value);
  }
  const chercherByName = (e) => {
    e.preventDefault()
    const profils = [];
    if (inputValue == "") {
      setMessage("write the firstName or the lastName of the profile")
    }
    else {
      profiles.map((profile) => {
        if (profile.lastName == inputValue || profile.firstName == inputValue) {
          profils.push(profile);
        }
      })
      if (profils.length == 1) {
        const pro = profils[0];
        showProfile(pro.id);
        setInputValue("")
      }
      else if (profils.length == 0) {
        setShowProfiles(false)
        setMessage("this profile doesn't exist!!")
        setShowComponent(false)
        setInterval(() => {
          setMessage("")
        }, 6000);
      }
      else {
        setInputValue("")
        setProfilesSearch(profils);
        setShowComponent()
        setShowProfiles(true)
      }
    }
  }
  const createPDF = () => {
    const pdf = new jsPDF("portrait", "pt", "a4");
    const data = document.querySelector("#information-profile");
    pdf.html(data).then(() => {
      pdf.save("profile.pdf");
    });
  };
  const archiveProfile = (profile) => {

    fetch("http://localhost:8085/api/updateProfile", {

      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile)
    }).then(() => {
      // toast.success("Success Message:Center", { position: toast.POSITION.TOP_CENTER }) 
      window.location.reload(false);
    }
    )
    setProfileModal()
  }
  const uploadFile = (profile) => {


    fetch('http://localhost:8085/api/download?fileId='+profile.id)
      .then((res) => res.blob())
      .then((data) => {
        console.log(data)
        FileSaver.saveAs(data, "cv.pdf")
      });

  }


  return (

    <div >
      {showProfiles && <div className='file-profile-search' onDoubleClick={(e) => {
        closeProfile();
        e.preventDefault();
      }}>
        <div className='titre-recherche' >
          <h1>PROFILES</h1>
          {/* <div className='div-recherche'>
      <input type="text" placeholder='rechercher par nom' />
      <img src={icon} alt="" />
      </div> */}
          <div class="wrap">
            <div class="search">
              <input type="text" class="searchTerm" placeholder="What are you looking for?" onChange={getValue} />
              <button type="submit" class="searchButton" onClick={chercherByName}>
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="modal fade" style={{ margintop: '300px' }} id="recuperer-modal">
          <div className="modal-dialog modal-sm">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">
                  ×
                </button>
                <h4 className="modal-title">
                  Notification
                </h4>
              </div>
              <div className="modal-body">
                you realy want to archive this profile
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal" >
                  cancel
                </button>
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={(e) => { archiveProfile(profileModal) }}>
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
        <table className="table-profiles" >

          <tr >

            <th className='thh'> Id</th>
            <th className='thh'> First Name</th>
            <th className='thh'> Last Name</th>
            <th className='thh'> Email Id</th>
            <th className='thh'>City</th>
            <th className='thh'>Type Of Profile</th>

            <th className='thh'>Family Situation</th>
            <th className='thh'>Level Of study</th>

            <th className='thh'>Action</th>
          </tr>



          {
            profilesSearch.map(
              (profile) =>
                <tr key={profile.id}>
                  <td> {profile.id}</td>
                  <td> {profile.firstName}</td>
                  <td> {profile.lastName}</td>
                  <td> {profile.email}</td>
                  <td> {profile.ville}</td>
                  <td> {profile.typeOfProfile}</td>

                  <td> {profile.familySituation}</td>
                  <td> {profile.levelOfStudy}</td>

                  <td> <button className='show-button' onClick={e => {
                    showProfile(profile.id)
                    e.preventDefault();
                  }} id={profile.id} >Show</button><button className='delete-button' data-toggle="modal" data-target="#recuperer-modal" onClick={e => {
                    setProfileModal(profile);

                  }}>Archiver</button></td>



                </tr>
            )
          }


        </table>

      </div>}

      {showComponent == false && <div className='file-profile' onDoubleClick={(e) => {
        closeProfile();
        e.preventDefault();
      }}>
        <div className='titre-recherche' >
          <h1>PROFILES</h1>
          {/* <div className='div-recherche'>
      <input type="text" placeholder='rechercher par nom' />
      <img src={icon} alt="" />
      </div> */}

          <p>{message}</p>
          <div class="wrap">
            <div class="search">
              <input type="text" class="searchTerm" placeholder="What are you looking for?" onChange={getValue} />
              <button type="submit" class="searchButton" onClick={chercherByName}>
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="modal fade" style={{ margintop: '300px' }} id="recuperer-modal">
          <div className="modal-dialog modal-sm">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">
                  ×
                </button>
                <h4 className="modal-title">
                  Notification
                </h4>
              </div>
              <div className="modal-body">
                you realy want to Archive this profile
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal" >
                  cancel
                </button>
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={(e) => { archiveProfile(profileModal) }}>
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
        <table className="table table-striped" >

          <tr>

            <th> Id</th>
            <th> First Name</th>
            <th> Last Name</th>
            <th> Email Id</th>
            <th>City</th>
            <th>Type Of Profile</th>

            <th>Family Situation</th>
            <th>Level Of study</th>

            <th>Action</th>
          </tr>



          {
            profiles.map(
              (profile) => (
                profile.archive == false ?
                  <tr key={profile.id}>
                    <td> {profile.id}</td>
                    <td> {profile.firstName}</td>
                    <td> {profile.lastName}</td>
                    <td> {profile.email}</td>
                    <td> {profile.ville}</td>
                    <td> {profile.typeOfProfile}</td>

                    <td> {profile.familySituation}</td>
                    <td> {profile.levelOfStudy}</td>

                    <td> <button className='show-button' onClick={e => {
                      showProfile(profile.id)
                      e.preventDefault();
                    }} id={profile.id} >Show</button>
                      <button className='delete-button' data-toggle="modal" data-target="#recuperer-modal" onClick={e => {
                        setProfileModal(profile);

                      }}
                        onMouseEnter={() => toast.info('GeeksForGeeks')}>Archiver</button></td>



                  </tr> : null
              ))
          }


        </table>

      </div>}
      {showComponent && <div className='file-profile-id'>
        <div className='icon-fermer'>
          {/* <img src={icon} alt="icon fermer" /> */}
          <button className='fermer' onClick={closeProfile}>close</button>
          <button className='save' onClick={createPDF} >download</button>
        </div>
        <div className='information-profile' id='information-profile'>
          <pre>
            <h1>-Profile Details: </h1>
            <h2>-Informations personnel :</h2>
            <h3>-First Name:      <strong>{profile.firstName}</strong> </h3>
            <h3>-Last Name :      <strong>{profile.lastName}</strong></h3>
            <h3>-Email     :        <strong>{profile.email}</strong></h3>
            <h3>-Family Situation:<strong>{profile.familySituation}</strong></h3>
            <h3>-The Birthday:    <strong>{profile.dateBirthday}</strong></h3>
            <h2>-Informations profisionnel :</h2>
            <h3>-The Type Of Profile:<strong>{profile.typeOfProfile}</strong> </h3>
            <h3>-The Last Post:<strong>{profile.lastPost}</strong></h3>
            <h3>-The level Of Study: <strong>{profile.levelOfStudy}</strong></h3>
            <h3>-The City: <strong>{profile.ville}</strong></h3>
            <h3>-The Diploma: <strong>{profile.lastPost}</strong></h3>
            <h3>-The Link Cv:<strong><p onClick={(e)=>uploadFile(profile)} style={{ cursor: "pointer" }}>{profile.docName}</p></strong></h3>
            <h2>-Informations sur la mobilité :</h2>
            <h3>-The InterNational Mobility:<strong>{(profile.mobilityInternational).toString()}</strong></h3>
            <h3>-The National Mobility:<strong>{(profile.mobilityNational).toString()}</strong></h3>
            <h3>-The Avialability:<strong>{(profile.availability).toString()}</strong></h3>
            <h2>-Information réseaus :</h2>
            <h3>-The Link Linkedin:<strong>{profile.linkProfileLinkedin}</strong></h3>
          </pre>
        </div>
      </div>}
    </div>
  )
}

export default Profiles
