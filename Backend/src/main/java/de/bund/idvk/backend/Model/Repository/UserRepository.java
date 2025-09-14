package de.bund.idvk.backend.Model.Repository;

import de.bund.idvk.backend.Model.Benutzer;

import jakarta.transaction.Transactional;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;
import java.util.List;

@EnableJpaRepositories
@Repository
public interface UserRepository extends JpaRepository<Benutzer, Long> {

    //CRUD Methoden als Repository
    @Transactional
    @Modifying
    @Query("INSERT INTO Benutzer (username, password, rolle) VALUES(:username,:password,:rolle)")
    void createBenutzer(String username, String password, String rolle);
    @NonNull
    @Query("SELECT new Benutzer(e.id, e.rolle, e.username, e.password) FROM Benutzer e")
    List<Benutzer> findAll();

    @Modifying
    @Query("DELETE FROM Benutzer WHERE id = :id")
    boolean delete(long id);

    @Query("SELECT new Benutzer(e.id, e.rolle, e.username, e.password) FROM Benutzer e WHERE e.username = :username")
    Benutzer findByUsername(String username);

}
