package de.bund.idvk.backend.Model.Repository;

import de.bund.idvk.backend.Model.User;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class UserRepository {
    List <User> users = new ArrayList<>();
    JdbcTemplate jdbcTemplate;
     private final JdbcTemplate jdbctemplate;

    public UserRepository(JdbcTemplate jdbctemplate) {
        this.jdbctemplate = jdbctemplate;
    }
    public User save(User user){
        String sql = "INSERT INTO User (username, password, rolle) VALUES (?,?,?)";
        jdbctemplate.update(sql, user.getUsername(), user.getPassword(), user.getRolle());
        users.add(user);
        return user;
    }
    public List<User> findAll() {

        String sql = "SELECT * FROM User";
        users.addAll(jdbctemplate.query(sql, new BeanPropertyRowMapper<>(User.class)));
        return ;
    }
    public boolean delete(User user){
        return
    }

}
