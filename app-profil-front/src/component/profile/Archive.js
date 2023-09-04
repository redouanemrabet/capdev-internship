import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'; 
import Popup from 'reactjs-popup';
export default function Archive() {
  const [profiles,setProfiles]=useState([])
  const [inputValue,setInputValue]=useState("")
  const [profil,setProfile]=useState()
  const [showProfiles,setShowProfiles]=useState(false)
  const [profilesSearch,setProfilesSearch]=useState()
  const [message,setMessage]=useState("")
  useEffect(()=>{
    fetch("http://localhost:8085/api/selectProfiles")
    .then(res=>res.json())
    .then((result)=>{setProfiles(result);})
  
  },[])

 
  const getValue=(e)=>{
  setInputValue(e.target.value);
  }

  const retrieveProfile=(p)=>{


    fetch("http://localhost:8085/api/updateProfile",{
   
      method : "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(p)
     }).then(()=>{
     
       window.location.reload(false);
     }
     )
     setProfile()
   
    }
  
  const deleteProfile=(p)=>{
  
    fetch("http://localhost:8085/api/deleteProfile",{
   
      method : "DELETE",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(p)
     }).then(()=>{
      
      window.location.reload(false);
     }
     )
 
    }
  
  const chercherByName=(e)=>{
    e.preventDefault()
    const profils=[];
    if(inputValue=="") {
      setMessage("write the firstName or the lastName of the profile")
    } 
  else{
    profiles.map((profile)=>{
if(profile.lastName==inputValue || profile.firstName==inputValue){
     profils.push(profile);
}
    })
   if(profils.length==0){
      setShowProfiles(false)
      setMessage("this profile doesn't exist!!")
     
      setInterval(() => {
        setMessage("")
      }, 6000);
    }
    else{
      setInputValue("")
      setProfilesSearch(profils);
      
      setShowProfiles(true)
    }
  }
}
  return (
   
    <div className='div-archivd'>
    <div className='titre-recherche' >
      <h1>ARCHIVE</h1>
      {/* <div className='div-recherche'>
      <input type="text" placeholder='rechercher par nom' />
      <img src={icon} alt="" />
      </div> */}

      <p>{message}</p>
      
      <div class="wrap">
   <div class="search">
      <input type="text" class="searchTerm" placeholder="What are you looking for?" onChange={getValue}/>
      <button type="submit" class="searchButton" onClick={chercherByName}>
       Search
     </button>
   </div>
</div>
      </div>
      {showProfiles==false &&
      <table className = "table table-striped" >
                  
                        <tr className='trr'>

                            <th> Id</th>
                            <th> First Name</th>
                            <th> Last Name</th>
                            <th> Email Id</th>
                           
                        
                            <th>Action</th>
                        </tr>

                    
                 
                        {
                            profiles.map(
                                (profile) => (
                                  profile.archive==true?
                                <tr key = {profile.id}>
                                     <td> {profile.id}</td>   
                                     <td> {profile.firstName}</td>   
                                     <td> {profile.lastName}</td>   
                                     <td> {profile.email}</td>  
                              
                                   
                                     
                                     <td> <button className='show-button'  data-toggle="modal" data-target="#recuperer-modal"  onClick={(e)=>{
                                      setProfile(profile);
                                     
                                     }}>Retrieve</button><button className='delete-button'  data-toggle="modal" data-target="#delete-modal"  onClick={(e)=>{
                                      setProfile(profile);
                                     
                                     }} >Delete</button></td>
                                     
                                     
                                    
                                </tr>:null
                                ))
                        }

                    
      </table>
}
<div className="modal fade" style={{margintop:'300px'}} id="recuperer-modal">
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
					you realy want to Retrieve this profile
				</div>   
				<div className="modal-footer">
					<button type="button" className="btn btn-default" data-dismiss="modal" >
						cancel
					</button>
					<button type="button" className="btn btn-primary" data-dismiss="modal"  onClick={(e)=>{retrieveProfile(profil)}}>
						Ok
					</button>                                 
				</div>
			</div>                                                                       
		</div>                                      
	</div>
  <div className="modal fade" style={{margintop:'300px'}} id="delete-modal">
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
					you realy want to delete this profile
				</div>   
				<div className="modal-footer">
					<button type="button" className="btn btn-default" data-dismiss="modal" >
						cancel
					</button>
					<button type="button" className="btn btn-primary" data-dismiss="modal"  onClick={(e)=>{
                                      deleteProfile(profil);
                                     }}>
						Ok
					</button>                                 
				</div>
			</div>                                                                       
		</div>                                      
	</div>
{showProfiles &&
      <table className = "table table-striped" >
                  
                        <tr>

                            <th> Id</th>
                            <th> First Name</th>
                            <th> Last Name</th>
                            <th> Email Id</th>
                           
                        
                            <th>Action</th>
                        </tr>

                    
                 
                        {
                            profilesSearch.map(
                                (profile) => (
                                  profile.archive==true?
                                <tr key = {profile.id}>
                                     <td> {profile.id}</td>   
                                     <td> {profile.firstName}</td>   
                                     <td> {profile.lastName}</td>   
                                     <td> {profile.email}</td>  
                              
                                   
                                     
                                                   
                                     <td> <button className='show-button'  data-toggle="modal" data-target="#recuperer-modal"  onClick={(e)=>{
                                      setProfile(profile);
                                     
                                     }}>Retrieve</button><button className='delete-button'  data-toggle="modal" data-target="#delete-modal"  onClick={(e)=>{
                                      setProfile(profile);
                                     
                                     }} >Delete</button></td>
                                     
                                     
                                    
                                </tr>:null
                                ))
                        }

                    
                </table>
                
}

   
    </div>
  )
}
