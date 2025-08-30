package de.bund.idvk.backend.Model.Repository;

import de.bund.idvk.backend.Model.Benutzer;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class UserRepository {
    List <Benutzer> benutzer = new ArrayList<>();

     private final JdbcTemplate jdbctemplate;

    public UserRepository(JdbcTemplate jdbctemplate) {
        this.jdbctemplate = jdbctemplate;
    }
    public Benutzer save(Benutzer b){
        String sql = "INSERT INTO Benutzer (username, password, rolle) VALUES (?,?,?)";
        jdbctemplate.update(sql, b.getUsername(), b.getPassword(), b.getRolle());
        benutzer.add(b);
        return b;
    }
    public List<Benutzer> findAll() {
        return benutzer;
    }
    public boolean delete(Benutzer b){
        String sql = "DELETE FROM Benutzer WHERE username = (?)";
        jdbctemplate.update(sql, b.getUsername());
        return benutzer.remove(b);
    }
    public Benutzer update(Benutzer b){
        String sql ="UPDATE Benutzer SET rolle = (?) AND  username= (?) AND rolle =(?) AND score = (?)  WHERE id = (?)";
        jdbctemplate.update(sql, b.getRolle(), b.getUsername(), b.getRolle(), b.getScore(),  b.getId());
        for(int i=0; i < benutzer.size(); i++){
            if(benutzer.get(i).getId()== b.getId()){
                benutzer.remove(i);
            }
        }
        benutzer.add(b);
        return b;
    }
    public Benutzer findByObject(Benutzer b){
        return (Benutzer) benutzer.stream().filter(benu-> benu.getId()== b.getId());
    }

}
