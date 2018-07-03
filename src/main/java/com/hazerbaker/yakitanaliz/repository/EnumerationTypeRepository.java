package com.hazerbaker.yakitanaliz.repository;

import com.hazerbaker.yakitanaliz.domain.EnumerationType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EnumerationType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EnumerationTypeRepository extends JpaRepository<EnumerationType, Long> {

}
