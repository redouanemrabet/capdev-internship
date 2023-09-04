package com.example.appprofilespring.repository;

import com.example.appprofilespring.models.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepositoryClass extends JpaRepository<Profile,Long> {
}
