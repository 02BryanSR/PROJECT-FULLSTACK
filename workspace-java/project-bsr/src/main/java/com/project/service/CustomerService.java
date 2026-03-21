package com.project.service;

import java.util.List;

import com.project.dto.CustomerDTO;
import com.project.dto.CustomerReqDTO;

public interface CustomerService {

    List<CustomerDTO> findAll();

    List<CustomerDTO> findByLastName(String lastName);

    CustomerDTO findById(Long id);

    CustomerDTO findByEmailIngoreCase(String email);

    CustomerDTO createCustomer(CustomerReqDTO dto);

    CustomerDTO updateCustomer(CustomerReqDTO dto, Long id);

    CustomerDTO updateMyProfile(CustomerReqDTO dto, String email);

    void deleteCustomer(Long id);
}