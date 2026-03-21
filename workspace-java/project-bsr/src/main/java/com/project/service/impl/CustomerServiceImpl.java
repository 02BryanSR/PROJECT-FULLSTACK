package com.project.service.impl;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.dto.CustomerDTO;
import com.project.dto.CustomerReqDTO;
import com.project.entity.CustomerEntity;
import com.project.mapper.CustomerMapper;
import com.project.repository.CustomerRepository;
import com.project.service.CustomerService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {

    private final CustomerMapper mapper;
    private final CustomerRepository repo;
    private final PasswordEncoder passwordEncoder;

    public CustomerServiceImpl(CustomerMapper mapper,
                               CustomerRepository repo,
                               PasswordEncoder passwordEncoder) {
        this.mapper = mapper;
        this.repo = repo;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public List<CustomerDTO> findAll() {
        List<CustomerEntity> customers = repo.findAll();
        return mapper.toListDtos(customers);
    }

    @Override
    public List<CustomerDTO> findByLastName(String lastName) {
        List<CustomerEntity> customers = repo.findByLastNameContaining(lastName);
        return mapper.toListDtos(customers);
    }

    @Override
    public CustomerDTO findById(Long id) {
        CustomerEntity customer = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        return mapper.toDto(customer);
    }

    @Override
    public CustomerDTO findByEmailIngoreCase(String email) {
        CustomerEntity customer = repo.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        return mapper.toDto(customer);
    }

    @Override
    public CustomerDTO createCustomer(CustomerReqDTO dto) {
        validateCreate(dto);

        String email = dto.getEmail().trim();

        if (repo.findByEmailIgnoreCase(email).isPresent()) {
            throw new IllegalArgumentException("Email already in use");
        }

        CustomerEntity customer = new CustomerEntity();
        customer.setName(dto.getName().trim());
        customer.setLastName(dto.getLastName().trim());
        customer.setEmail(email);
        customer.setPassword(passwordEncoder.encode(dto.getPassword()));

        CustomerEntity saved = repo.save(customer);
        return mapper.toDto(saved);
    }

    @Override
    public CustomerDTO updateCustomer(CustomerReqDTO dto, Long id) {
        CustomerEntity customerFound = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        if (dto.getName() != null && !dto.getName().isBlank()) {
            customerFound.setName(dto.getName().trim());
        }

        if (dto.getLastName() != null && !dto.getLastName().isBlank()) {
            customerFound.setLastName(dto.getLastName().trim());
        }

        if (dto.getEmail() != null && !dto.getEmail().isBlank()) {
            String newEmail = dto.getEmail().trim();

            if (!customerFound.getEmail().equalsIgnoreCase(newEmail)
                    && repo.findByEmailIgnoreCase(newEmail).isPresent()) {
                throw new IllegalArgumentException("Email already in use");
            }

            customerFound.setEmail(newEmail);
        }

        if (dto.getPassword() != null && !dto.getPassword().isBlank()) {
            customerFound.setPassword(passwordEncoder.encode(dto.getPassword()));
        }

        CustomerEntity saved = repo.save(customerFound);
        return mapper.toDto(saved);
    }

    @Override
    public CustomerDTO updateMyProfile(CustomerReqDTO dto, String email) {
        CustomerEntity customerFound = repo.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        if (dto.getName() != null && !dto.getName().isBlank()) {
            customerFound.setName(dto.getName().trim());
        }

        if (dto.getLastName() != null && !dto.getLastName().isBlank()) {
            customerFound.setLastName(dto.getLastName().trim());
        }

        if (dto.getEmail() != null && !dto.getEmail().isBlank()) {
            String newEmail = dto.getEmail().trim();

            if (!customerFound.getEmail().equalsIgnoreCase(newEmail)
                    && repo.findByEmailIgnoreCase(newEmail).isPresent()) {
                throw new IllegalArgumentException("Email already in use");
            }

            customerFound.setEmail(newEmail);
        }

        if (dto.getPassword() != null && !dto.getPassword().isBlank()) {
            customerFound.setPassword(passwordEncoder.encode(dto.getPassword()));
        }

        CustomerEntity saved = repo.save(customerFound);
        return mapper.toDto(saved);
    }

    @Override
    public void deleteCustomer(Long id) {
        if (!repo.existsById(id)) {
            throw new RuntimeException("Customer not found");
        }
        repo.deleteById(id);
    }

    private void validateCreate(CustomerReqDTO dto) {
        if (dto == null) {
            throw new IllegalArgumentException("Customer data is required");
        }
        if (dto.getName() == null || dto.getName().isBlank()) {
            throw new IllegalArgumentException("Name is required");
        }
        if (dto.getLastName() == null || dto.getLastName().isBlank()) {
            throw new IllegalArgumentException("Last name is required");
        }
        if (dto.getEmail() == null || dto.getEmail().isBlank()) {
            throw new IllegalArgumentException("Email is required");
        }
        if (dto.getPassword() == null || dto.getPassword().isBlank()) {
            throw new IllegalArgumentException("Password is required");
        }
    }
}