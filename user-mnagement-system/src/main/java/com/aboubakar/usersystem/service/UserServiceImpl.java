package com.aboubakar.usersystem.service;

import com.aboubakar.usersystem.entity.UserEntity;
import com.aboubakar.usersystem.model.User;
import com.aboubakar.usersystem.repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl  implements UserService{
    //we have to create repository object because from this service impl we need to call database so repository
    private UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User saveUser(User user) {
        UserEntity userEntity = new UserEntity();
        BeanUtils.copyProperties(user, userEntity); //copy properties from user to userEntity object
        userRepository.save(userEntity);
        return user;
    }

    //get All users
    @Override
    public List<User> getALlUsers() {
        List<UserEntity> userEntities
                = userRepository.findAll();

        //we are to convert list of UserEntity to User for back to client
        List <User> users = userEntities
                .stream()
                .map(userEntity -> new User(
                        userEntity.getId(),
                        userEntity.getFirstName(),
                        userEntity.getLastName(),
                        userEntity.getEmailId()
                ))
                .collect(Collectors.toList()); //collect everything and convert to the list fro the stream
        return users;
    }


    //get user based on id
    @Override
    public User getUserById(Long id) {
        UserEntity userEntity
                = userRepository.findById(id).get();

        //convert userEntity to User
        User user = new User();
        BeanUtils.copyProperties(userEntity, user);
        return user;
    }

    @Override
    public boolean deleteUser(Long id) {
        UserEntity user = userRepository.findById(id).get();
        userRepository.delete((user));
        return true;
    }

    //update user based on id
    @Override
    public User updateUser(Long id, User user) {
        UserEntity userEntity =
                userRepository.findById(id).get();

        //now we need to update it
        userEntity.setEmailId(user.getEmailId()); //whatever email we got from the user object, i'm just updating
        //back in yhe user entity
        userEntity.setFirstName(user.getFirstName());
        userEntity.setLastName(user.getLastName());

        //no id because it should be the same

        //then we need to save
        userRepository.save(userEntity);
        return user;
    }


}
