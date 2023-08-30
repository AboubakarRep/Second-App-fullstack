package com.aboubakar.usersystem.service;

import com.aboubakar.usersystem.model.User;

import java.util.List;

public interface UserService {
    User saveUser(User user);

    List<User> getALlUsers();

    User getUserById(Long id);

    boolean deleteUser(Long id);

    User updateUser(Long id, User user);
}
