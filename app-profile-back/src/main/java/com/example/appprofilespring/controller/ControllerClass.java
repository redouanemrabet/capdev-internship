package com.example.appprofilespring.controller;

import com.example.appprofilespring.models.Profile;
import com.example.appprofilespring.repository.RepositoryClass;
import com.example.appprofilespring.service.ServiceClass;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.util.List;
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api")
public class ControllerClass {
   @Autowired
   ServiceClass serviceClass;
    @Autowired
    RepositoryClass repositoryClass;
   @PostMapping("createProfile")

   public void createProfile(@ModelAttribute MultipartFile file1,@ModelAttribute Profile pro){


       serviceClass.createProfile(file1,pro);
   }
   @GetMapping("selectProfiles")
   public List<Profile> selectProfiles(){
      List<Profile> list=serviceClass.getProfiles();
     System.out.println(list.get(1).getFirstName());
      for (int i = 0; i < list.size(); i++) {
         System.out.println(list.get(i).getFirstName());
      }
      return serviceClass.getProfiles();
   }
   @GetMapping("selectProfile")
   public Profile selectProfile(@RequestParam Long id){
      return serviceClass.getProfile(id);
      }
   @PutMapping("updateProfile")
   public void updatePro(@RequestBody Profile profile){
       serviceClass.updateProfile(profile);
   }
   @DeleteMapping("deleteProfile")
   public void deleteProfile(@RequestBody Profile profile){
       serviceClass.deleteProfile(profile);
   }
    @GetMapping("/download")
    public ResponseEntity<?> downloadFile(@RequestParam Long fileId) throws Exception
    {
        try
        {
            Profile dbFile = serviceClass.getFichier(fileId);
            return ResponseEntity
                    .ok()
                    .contentType(MediaType.parseMediaType("application/pdf"))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + dbFile.getDocName() + "\"")
                    .body(dbFile.getFile());
        }
        catch(Exception e)
        {
            e.printStackTrace();
            throw new Exception("Error downloading file");
        }
    }

}

