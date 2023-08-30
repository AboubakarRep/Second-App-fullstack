package com.aboubakar.usersystem.controller;

import com.aboubakar.usersystem.model.User;
import com.aboubakar.usersystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(value = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class UserController {
    @Autowired
    private UserService userService;

    public UserController(UserService userService) { //constructor
        this.userService = userService;
    }

    //method for store the entire user itself
    @PostMapping("/users")
    public User saveUser(@RequestBody User user){
        return userService.saveUser(user);
    }

    //get list of suers
    @GetMapping("/users")
    public List<User> getALlUsers(){
        return userService.getALlUsers();
    }

    //get user based on id
    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") Long id){ //path variable is nothing that the id
        User user = null;
        user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    //for delete data based on id
    @DeleteMapping("/users/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable("id") Long id){
        boolean deleted = false;
        deleted = userService.deleteUser(id);
        Map<String, Boolean> response = new HashMap<>(); //map of type of string and boolean
        response.put("deleted", deleted); //here deleted has the value true
        return ResponseEntity.ok(response);
    }

    //method for update the data based n id
    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable("id") Long id,
                                           @RequestBody User user){ //path variable and request body are required
        user = userService.updateUser(id, user);//we need id and user
        return ResponseEntity.ok(user);
    }
}
