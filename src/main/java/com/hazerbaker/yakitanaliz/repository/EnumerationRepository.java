package com.hazerbaker.yakitanaliz.repository;

import com.hazerbaker.yakitanaliz.domain.Enumeration;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Enumeration entity.
 */
@Repository
public interface EnumerationRepository extends JpaRepository<Enumeration, Long> {

}
