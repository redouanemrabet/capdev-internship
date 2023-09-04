package com.example.appprofilespring.models;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data
@Entity(name="profile")
@Table(name = "profile")
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name="first_name")
    private String firstName;
    @Column(name="last_name")
    private  String lastName;
    @Column(name = "email")
    private String email;
    @Column(name="ville")
    private String ville;
    @Column(name = "date_birthday")
    private Date dateBirthday;
    @Column(name = "type_of_profile")
    private String typeOfProfile;
    @Column(name = "address")
    private  String address;
    @Column(name = "current_seniority")
    private String currentSeniority;
    @Column(name = "mobility_international")
    private boolean mobilityInternational;
    @Column(name = "mobility_national")
    private boolean mobilityNational;
    @Column(name = "family_situation")
    private String familySituation;
    @Column(name="telephone")
    private long telephone;
    @Column(name = "link_profile_linkedin")
    private String linkProfileLinkedin;
    @Column(name = "last_post")
    private String lastPost;
    @Column(name = "diploma")
    private String diploma;
    @Column(name = "leve_of_study")
    private String levelOfStudy;
    @Column(name = "availability")
    private  String availability;
    @Column(name = "comment")
    private String comment;
    @Column(name = "archive")
    private boolean archive;
    @Column(name="file")
    @Lob
    private byte[] file;

    @Column
    private String docName;



    public Profile() {
    }


}
