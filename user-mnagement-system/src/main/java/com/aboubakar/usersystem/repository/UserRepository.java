package com.aboubakar.usersystem.repository;

import com.aboubakar.usersystem.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> { //this jpa repository is of type user entity
    //id is the type LOng
}
