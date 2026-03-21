package com.project.service.impl;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

import org.springframework.stereotype.Service;

import com.project.dto.OrderDTO;
import com.project.entity.AddressEntity;
import com.project.entity.CustomerEntity;
import com.project.entity.OrderEntity;
import com.project.entity.enums.OrderStatus;
import com.project.mapper.OrderMapper;
import com.project.repository.AddressRepository;
import com.project.repository.CustomerRepository;
import com.project.repository.OrderRepository;
import com.project.service.OrderService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {

    private final OrderRepository repo;
    private final OrderMapper mapper;
    private final CustomerRepository customerRepo;
    private final AddressRepository addressRepo;

    public OrderServiceImpl(OrderRepository repo,
                            OrderMapper mapper,
                            CustomerRepository customerRepo,
                            AddressRepository addressRepo) {
        this.repo = repo;
        this.mapper = mapper;
        this.customerRepo = customerRepo;
        this.addressRepo = addressRepo;
    }

    @Override
    public List<OrderDTO> findAll() {
        return mapper.toListDtos(repo.findAll());
    }

    @Override
    public List<OrderDTO> findByCustomerId(Long customerId) {
        return mapper.toListDtos(repo.findByCustomerId(customerId));
    }

    @Override
    public List<OrderDTO> findByStatus(OrderStatus status) {
        return mapper.toListDtos(repo.findByStatus(status));
    }

    @Override
    public OrderDTO findById(Long id) {
        OrderEntity order = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("The order with id: " + id + " does not exist"));
        return mapper.toDto(order);
    }

    @Override
    public OrderDTO createOrder(OrderDTO dto) {
        if (dto.getCustomerId() == null) {
            throw new RuntimeException("customerId is required");
        }
        if (dto.getAddressId() == null) {
            throw new RuntimeException("addressId is required");
        }
        if (dto.getPayMethod() == null || dto.getPayMethod().isBlank()) {
            throw new RuntimeException("payMethod is required");
        }

        CustomerEntity customer = customerRepo.findById(dto.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        AddressEntity address = addressRepo.findById(dto.getAddressId())
                .orElseThrow(() -> new RuntimeException("Address not found"));

        OrderEntity entity = mapper.toEntity(dto);
        entity.setCustomer(customer);
        entity.setAddress(address);
        entity.setStatus(OrderStatus.CREATED);
        entity.setTotalAmount(0);
        entity.setTotalPrice(BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP));

        OrderEntity saved = repo.save(entity);
        return mapper.toDto(saved);
    }

    @Override
    public OrderDTO updateStatus(Long orderId, OrderStatus status) {
        if (status == null) {
            throw new RuntimeException("Status is required");
        }

        OrderEntity orderFound = repo.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        orderFound.setStatus(status);

        OrderEntity saved = repo.save(orderFound);
        return mapper.toDto(saved);
    }

    @Override
    public OrderDTO findMyOrderById(Long orderId, String email) {
        OrderEntity order = repo.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (!order.getCustomer().getEmail().equalsIgnoreCase(email)) {
            throw new RuntimeException("Access denied");
        }

        return mapper.toDto(order);
    }

    @Override
    public List<OrderDTO> findMyOrders(String email) {
        CustomerEntity customer = customerRepo.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        List<OrderEntity> orders = repo.findByCustomerId(customer.getId());
        return mapper.toListDtos(orders);
    }

    @Override
    public OrderDTO createMyOrder(OrderDTO dto, String email) {
        if (dto.getAddressId() == null) {
            throw new RuntimeException("addressId is required");
        }
        if (dto.getPayMethod() == null || dto.getPayMethod().isBlank()) {
            throw new RuntimeException("payMethod is required");
        }

        CustomerEntity customer = customerRepo.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        AddressEntity address = addressRepo.findById(dto.getAddressId())
                .orElseThrow(() -> new RuntimeException("Address not found"));

        // Validación importante: la dirección debe pertenecer al usuario
        if (address.getCustomer() == null || !address.getCustomer().getId().equals(customer.getId())) {
            throw new RuntimeException("Address does not belong to the authenticated customer");
        }

        OrderEntity order = mapper.toEntity(dto);
        order.setCustomer(customer);
        order.setAddress(address);
        order.setStatus(OrderStatus.CREATED);
        order.setTotalAmount(0);
        order.setTotalPrice(BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP));

        OrderEntity saved = repo.save(order);
        return mapper.toDto(saved);
    }
}