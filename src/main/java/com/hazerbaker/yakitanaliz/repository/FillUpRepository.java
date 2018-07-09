package com.hazerbaker.yakitanaliz.repository;

import com.hazerbaker.yakitanaliz.domain.FillUp;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the FillUp entity.
 */
@Repository
public interface FillUpRepository extends JpaRepository<FillUp, Long> {

}
