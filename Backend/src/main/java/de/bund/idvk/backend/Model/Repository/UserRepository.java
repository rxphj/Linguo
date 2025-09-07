package de.bund.idvk.backend.Model.Repository;

import de.bund.idvk.backend.Model.Benutzer;
import de.bund.idvk.backend.Model.Enums.Rolle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@EnableJpaRepositories
@Repository
public interface UserRepository extends JpaRepository<Benutzer, Long> {

    @Modifying
    @Query("INSERT INTO Benutzer (username, password, rolle) VALUES(:id,:password,:rolle)")
    void createBenutzer(String username, String password, Rolle rolle);

    @Query("SELECT new Benutzer(e.id, e.rolle, e.username, e.password) FROM Benutzer e")
    List<Benutzer> findAll();

    @Modifying
    @Query("DELETE FROM Benutzer WHERE id = :id")
    boolean delete(long id);

    @Query("SELECT username, password, rolle from Benutzer WHERE username = :username")
    Benutzer findByUsername(String username);

}
