package com.example.appprofilespring.service;

import com.example.appprofilespring.models.Profile;
import com.example.appprofilespring.repository.RepositoryClass;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
@Service

public class ServiceClass {
    @Autowired
    RepositoryClass repositoryClass;


    public List<Profile> getProfiles() {
        return repositoryClass.findAll();
    }

    public Profile getProfile(Long id) {
        return repositoryClass.findById(id).orElseThrow(RuntimeException::new);
    }

    public void createProfile(MultipartFile file1, Profile pro) {
     /*   List<Profile> list=this.getProfiles();
        String message=null;
        Profile profile1 = null;
        System.out.println(list.get(1).getFirstName());
        for (int i = 0; i < list.size(); i++) {
           if(list.get(i).getFirstName()==profile.getFirstName()&&list.get(i).getLastName()==profile.getLastName()){
               profile1=list.get(i);

           }
           else {

               profile1=null;
           }

        }
        if(profile1==null){
            repositoryClass.save(profile);
            message="the profile est well saved !!!!";
        }
        else{
            message="le profile est deja exist!!";
        }
        return message;*/
        String fileName = StringUtils.cleanPath(file1.getOriginalFilename());
        pro.setDocName(fileName);


        try {
            pro.setFile(file1.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }
        repositoryClass.save(pro);

    }

    public void deleteProfile(Profile profile){
        repositoryClass.deleteById(profile.getId());
    }
    public void updateProfile(Profile profile){
     if(profile.isArchive()==true) {
         profile.setArchive(false);
     }else{
         profile.setArchive(true);
     }
        repositoryClass.save(profile);

    }
    public Profile getFichier(Long fileId) {
        return  repositoryClass.findById(fileId).orElseThrow(RuntimeException::new);
    }

}
