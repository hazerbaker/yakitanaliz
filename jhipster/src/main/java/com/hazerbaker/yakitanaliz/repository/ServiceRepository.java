package com.hazerbaker.yakitanaliz.repository;

import com.hazerbaker.yakitanaliz.domain.Service;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Service entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ServiceRepository extends JpaRepository<Service, Long> {

}
